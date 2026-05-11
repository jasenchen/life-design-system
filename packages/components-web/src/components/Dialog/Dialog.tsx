import React, { useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

const DIALOG_ANIMATION_MS = 300;

export type DialogType = 'neutral' | 'warning' | 'danger' | 'success' | 'custom';

export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 使用约束：
   * 为了保留打开 / 关闭动效，父组件应保持 Dialog 挂载，通过 open 控制显隐，
   * 不要在关闭时立刻通过条件渲染将组件从 React 树中移除。
   */
  /**
   * 是否打开对话框
   * 建议始终保持组件挂载，仅切换 open，以确保退场动画能够完整执行。
   * @default false
   */
  open?: boolean;
  /**
   * 标题区域
   */
  title?: React.ReactNode;
  /**
   * 描述文案
   */
  description?: React.ReactNode;
  /**
   * 语义类型，会影响默认图标与颜色
   * @default 'neutral'
   */
  type?: DialogType;
  /**
   * 自定义图标内容
   */
  icon?: React.ReactNode;
  /**
   * 是否显示左侧图标
   * @default true
   */
  showIcon?: boolean;
  /**
   * 自定义底部区域
   */
  footer?: React.ReactNode;
  /**
   * 是否显示底部区域，默认跟随 footer 是否传入
   */
  showFooter?: boolean;
  /**
   * 点击蒙层是否关闭
   * @default true
   */
  maskClosable?: boolean;
  /**
   * 按下 Esc 是否关闭
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * 是否显示右上角关闭按钮
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * 关闭回调
   */
  onClose?: () => void;
  /**
   * 获取挂载容器，默认挂载到 document.body
   */
  getContainer?: () => HTMLElement | null;
  /**
   * 自定义对话框宽度，默认 402px
   */
  width?: number | string;
  /**
   * 自定义内容区域类名
   */
  bodyClassName?: string;
  /**
   * 关闭按钮可访问名称
   * @default '关闭对话框'
   */
  closeLabel?: string;
}

const DIALOG_ICON_MAP: Record<Exclude<DialogType, 'custom'>, string> = {
  neutral: 'ic-info-round-fill',
  warning: 'ic-warning-round-fill',
  danger: 'ic-error-round-fill',
  success: 'ic-finish-round-fill',
};

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      className,
      open = false,
      title,
      description,
      type = 'neutral',
      icon,
      showIcon = true,
      footer,
      showFooter,
      children,
      maskClosable = true,
      closeOnEsc = true,
      showCloseButton = true,
      onClose,
      getContainer,
      width,
      bodyClassName,
      closeLabel = '关闭对话框',
      style,
      ...props
    },
    ref
  ) => {
    const titleId = useId();
    const descriptionId = useId();
    const [shouldRender, setShouldRender] = useState(open);
    const [visible, setVisible] = useState(false);

    const container = useMemo(() => {
      if (typeof document === 'undefined') return null;
      return getContainer?.() ?? document.body;
    }, [getContainer]);

    useEffect(() => {
      if (open) {
        setShouldRender(true);
        setVisible(false);

        let rafId2 = 0;
        const rafId1 = window.requestAnimationFrame(() => {
          rafId2 = window.requestAnimationFrame(() => {
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
      }, DIALOG_ANIMATION_MS);

      return () => window.clearTimeout(timer);
    }, [open]);

    useEffect(() => {
      if (!shouldRender || !closeOnEsc) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeOnEsc, onClose, shouldRender]);

    useEffect(() => {
      if (!shouldRender || typeof document === 'undefined') {
        return undefined;
      }

      const { body } = document;
      const previousOverflow = body.style.overflow;
      body.style.overflow = 'hidden';

      return () => {
        body.style.overflow = previousOverflow;
      };
    }, [shouldRender]);

    if (!shouldRender || !container) {
      return null;
    }

    const mergedStyle = {
      ...style,
      ...(width !== undefined
        ? {
            ['--lds-dialog-width' as const]: typeof width === 'number' ? `${width}px` : width,
          }
        : null),
    } as React.CSSProperties;

    const shouldShowFooter = showFooter ?? footer !== undefined;

    const resolvedIcon =
      icon ??
      (type !== 'custom' ? <Icon name={DIALOG_ICON_MAP[type]} aria-hidden="true" /> : null);

    return createPortal(
      <div
        className={clsx('lds-dialog-root', visible && 'is-open')}
        onClick={(event) => {
          if (event.target === event.currentTarget && maskClosable) {
            onClose?.();
          }
        }}
      >
        <div className="lds-dialog-root__mask" aria-hidden="true" />
        <div
          ref={ref}
          className={clsx('lds-dialog', `lds-dialog--${type}`, className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          style={mergedStyle}
          {...props}
        >
          <div className={clsx('lds-dialog__body', bodyClassName)}>
            <div className="lds-dialog__main">
              {showIcon && resolvedIcon ? (
                <div className="lds-dialog__icon" aria-hidden="true">
                  {resolvedIcon}
                </div>
              ) : null}

              <div className="lds-dialog__content">
                {title ? (
                  <h2 id={titleId} className="lds-dialog__title">
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <div id={descriptionId} className="lds-dialog__description">
                    {description}
                  </div>
                ) : null}
                {children ? <div className="lds-dialog__extra">{children}</div> : null}
              </div>
            </div>

            {showCloseButton ? (
              <button
                type="button"
                className="lds-dialog__close"
                onClick={() => onClose?.()}
                aria-label={closeLabel}
              >
                <Icon name="ic-error-line" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          {shouldShowFooter ? <div className="lds-dialog__footer">{footer}</div> : null}
        </div>
      </div>,
      container
    );
  }
);

Dialog.displayName = 'Dialog';
