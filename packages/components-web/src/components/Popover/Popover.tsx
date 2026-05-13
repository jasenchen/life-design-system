import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

const POPOVER_ANIMATION_MS = 180;
const VIEWPORT_PADDING = 16;

export type PopoverPlacement =
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'top-start'
  | 'top-center'
  | 'top-end';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Trigger element used to toggle the popover.
   */
  trigger: React.ReactElement;
  /**
   * Content rendered inside the popover panel.
   */
  children: React.ReactNode;
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Uncontrolled initial open state.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Preferred placement relative to the trigger.
   * @default 'bottom-start'
   */
  placement?: PopoverPlacement;
  /**
   * Gap between trigger and panel.
   * @default 8
   */
  offset?: number;
  /**
   * Force the panel width to match the trigger width.
   * @default false
   */
  matchTriggerWidth?: boolean;
  /**
   * Close when clicking outside of the trigger + panel.
   * @default true
   */
  closeOnClickOutside?: boolean;
  /**
   * Close when pressing Escape.
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Render content in a custom container. Defaults to document.body.
   */
  getContainer?: () => HTMLElement | null;
  /**
   * Additional class for the floating panel.
   */
  contentClassName?: string;
  /**
   * Additional style for the floating panel.
   */
  contentStyle?: React.CSSProperties;
  /**
   * ARIA role for the floating panel.
   * @default 'dialog'
   */
  contentRole?: React.AriaRole;
}

type PositionStyle = {
  top: number;
  left: number;
  minWidth?: number;
  maxHeight?: number;
};

const mergeRefs = <T,>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(value);
        return;
      }

      (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
};

const getFocusableTarget = (container: HTMLElement | null): HTMLElement | null => {
  if (!container) return null;

  const selectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  return container.querySelector<HTMLElement>(selectors.join(','));
};

const getPlacementSide = (placement: PopoverPlacement): 'top' | 'bottom' => {
  return placement.startsWith('top') ? 'top' : 'bottom';
};

const getPlacementAlign = (placement: PopoverPlacement): 'start' | 'center' | 'end' => {
  if (placement.endsWith('end')) return 'end';
  if (placement.endsWith('center')) return 'center';
  return 'start';
};

const getPositionForPlacement = (
  placement: PopoverPlacement,
  anchorRect: DOMRect,
  contentRect: DOMRect,
  offset: number
) => {
  const side = getPlacementSide(placement);
  const align = getPlacementAlign(placement);

  const top =
    side === 'top'
      ? anchorRect.top - contentRect.height - offset
      : anchorRect.bottom + offset;

  let left = anchorRect.left;
  if (align === 'center') {
    left = anchorRect.left + (anchorRect.width - contentRect.width) / 2;
  } else if (align === 'end') {
    left = anchorRect.right - contentRect.width;
  }

  return { top, left, side };
};

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      className,
      style,
      open,
      defaultOpen = false,
      onOpenChange,
      placement = 'bottom-start',
      offset = 8,
      matchTriggerWidth = false,
      closeOnClickOutside = true,
      closeOnEsc = true,
      getContainer,
      contentClassName,
      contentStyle,
      contentRole = 'dialog',
      ...props
    },
    ref
  ) => {
    const contentId = useId();
    const triggerRef = useRef<HTMLElement | null>(null);
    const triggerWrapperRef = useRef<HTMLSpanElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [shouldRender, setShouldRender] = useState(defaultOpen);
    const [visible, setVisible] = useState(false);
    const [resolvedPlacement, setResolvedPlacement] = useState<PopoverPlacement>(placement);
    const [positionStyle, setPositionStyle] = useState<PositionStyle>({
      top: 0,
      left: 0,
    });

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;

    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isControlled, onOpenChange]
    );

    const container = useMemo(() => {
      if (typeof document === 'undefined') return null;
      return getContainer?.() ?? document.body;
    }, [getContainer]);

    const updatePosition = useCallback(() => {
      const triggerElement =
        triggerRef.current ?? getFocusableTarget(triggerWrapperRef.current) ?? triggerWrapperRef.current;
      const contentElement = contentRef.current;

      if (!triggerElement || !contentElement) {
        return;
      }

      const anchorRect = triggerElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const preferred = getPositionForPlacement(placement, anchorRect, contentRect, offset);
      let nextPlacement = placement;
      let nextTop = preferred.top;
      let nextLeft = preferred.left;

      const prefersBottom = getPlacementSide(placement) === 'bottom';
      const canOpenBelow =
        anchorRect.bottom + offset + contentRect.height <= viewportHeight - VIEWPORT_PADDING;
      const canOpenAbove =
        anchorRect.top - offset - contentRect.height >= VIEWPORT_PADDING;

      if (prefersBottom && !canOpenBelow && canOpenAbove) {
        nextPlacement = placement.replace('bottom', 'top') as PopoverPlacement;
      } else if (!prefersBottom && !canOpenAbove && canOpenBelow) {
        nextPlacement = placement.replace('top', 'bottom') as PopoverPlacement;
      }

      const resolved = getPositionForPlacement(nextPlacement, anchorRect, contentRect, offset);
      nextTop = resolved.top;
      nextLeft = resolved.left;

      const clampedLeft = Math.min(
        Math.max(nextLeft, VIEWPORT_PADDING),
        Math.max(VIEWPORT_PADDING, viewportWidth - contentRect.width - VIEWPORT_PADDING)
      );

      const availableHeight =
        resolved.side === 'bottom'
          ? viewportHeight - anchorRect.bottom - offset - VIEWPORT_PADDING
          : anchorRect.top - offset - VIEWPORT_PADDING;

      setResolvedPlacement(nextPlacement);
      setPositionStyle({
        top: Math.max(VIEWPORT_PADDING, nextTop),
        left: clampedLeft,
        minWidth: matchTriggerWidth ? anchorRect.width : undefined,
        maxHeight: Math.max(96, availableHeight),
      });
    }, [matchTriggerWidth, offset, placement]);

    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        setVisible(false);

        let rafId2 = 0;
        const rafId1 = window.requestAnimationFrame(() => {
          updatePosition();
          rafId2 = window.requestAnimationFrame(() => {
            updatePosition();
            setVisible(true);
          });
        });

        return () => {
          window.cancelAnimationFrame(rafId1);
          window.cancelAnimationFrame(rafId2);
        };
      }

      setVisible(false);

      const timer = window.setTimeout(() => {
        setShouldRender(false);
        const focusTarget =
          triggerRef.current ??
          getFocusableTarget(triggerWrapperRef.current) ??
          triggerWrapperRef.current;
        focusTarget?.focus();
      }, POPOVER_ANIMATION_MS);

      return () => window.clearTimeout(timer);
    }, [isOpen, updatePosition]);

    useLayoutEffect(() => {
      if (!shouldRender) {
        return undefined;
      }

      updatePosition();

      const handleWindowChange = () => updatePosition();
      window.addEventListener('resize', handleWindowChange);
      window.addEventListener('scroll', handleWindowChange, true);

      const resizeObserver =
        typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(() => updatePosition())
          : null;

      if (triggerRef.current) {
        resizeObserver?.observe(triggerRef.current);
      }
      if (contentRef.current) {
        resizeObserver?.observe(contentRef.current);
      }

      return () => {
        window.removeEventListener('resize', handleWindowChange);
        window.removeEventListener('scroll', handleWindowChange, true);
        resizeObserver?.disconnect();
      };
    }, [shouldRender, updatePosition]);

    useEffect(() => {
      if (!shouldRender || !closeOnEsc) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeOnEsc, setOpen, shouldRender]);

    useEffect(() => {
      if (!shouldRender || !closeOnClickOutside) {
        return undefined;
      }

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node | null;
        const wrapper = triggerWrapperRef.current;
        const contentElement = contentRef.current;

        if (!target) return;
        if (wrapper?.contains(target) || contentElement?.contains(target)) {
          return;
        }

        setOpen(false);
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [closeOnClickOutside, setOpen, shouldRender]);

    const triggerElement = React.cloneElement(trigger, {
      ref: mergeRefs((trigger as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref, triggerRef),
      'aria-expanded': isOpen,
      'aria-controls': shouldRender ? contentId : undefined,
      'aria-haspopup': contentRole === 'dialog' ? 'dialog' : contentRole,
      'data-state': isOpen ? 'open' : 'closed',
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        trigger.props.onClick?.(event);
        if (event.defaultPrevented) return;
        setOpen(!isOpen);
      },
    });

    const mergedContentStyle = {
      ...contentStyle,
      top: positionStyle.top,
      left: positionStyle.left,
      ...(positionStyle.minWidth !== undefined
        ? {
            minWidth: positionStyle.minWidth,
          }
        : null),
      ...(positionStyle.maxHeight !== undefined
        ? {
            ['--lds-popover-max-height' as const]: `${positionStyle.maxHeight}px`,
          }
        : null),
    } as React.CSSProperties;

    return (
      <span
        ref={triggerWrapperRef}
        className={clsx('lds-popover-anchor', className)}
        style={style}
        {...props}
      >
        {triggerElement}
        {shouldRender && container
          ? createPortal(
              <div
                ref={mergeRefs(ref, contentRef)}
                id={contentId}
                role={contentRole}
                className={clsx('lds-popover', visible && 'is-open', contentClassName)}
                data-state={isOpen ? 'open' : 'closed'}
                data-side={getPlacementSide(resolvedPlacement)}
                data-align={getPlacementAlign(resolvedPlacement)}
                style={mergedContentStyle}
              >
                {children}
              </div>,
              container
            )
          : null}
      </span>
    );
  }
);

Popover.displayName = 'Popover';
