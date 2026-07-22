import React from 'react';
import { clsx } from 'clsx';
import { Tag, type TagProps } from '../Tag/Tag';

export type TableCellAlign = 'left' | 'center' | 'right';
export type TableFixedColumn = 'left' | 'right';

const getTableAlignClassName = (align?: TableCellAlign) => {
  if (!align) return undefined;
  return `is-align-${align}`;
};

const getTableFixedClassName = (fixed?: TableFixedColumn) => {
  if (!fixed) return undefined;
  return `is-fixed-${fixed}`;
};

export const TableWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onScroll, style, ...props }, ref) => {
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const [{ hasScrolledLeft, hasScrolledRight, hasFixedLeft, hasFixedRight, leftShadowBoundary, rightShadowBoundary }, setScrollState] =
      React.useState({
        hasScrolledLeft: false,
        hasScrolledRight: false,
        hasFixedLeft: false,
        hasFixedRight: false,
        leftShadowBoundary: 0,
        rightShadowBoundary: 0,
      });

    const updateScrollState = React.useCallback(() => {
      const scroller = scrollerRef.current;

      if (!scroller) return;

      const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
      const scrollerRect = scroller.getBoundingClientRect();
      const leftFixedCell = scroller.querySelector<HTMLElement>('.lds-table__thead .is-fixed-left, tbody .is-fixed-left');
      const rightFixedCell = scroller.querySelector<HTMLElement>('.lds-table__thead .is-fixed-right, tbody .is-fixed-right');

      const nextState = {
        hasScrolledLeft: scroller.scrollLeft > 1,
        hasScrolledRight: maxScrollLeft - scroller.scrollLeft > 1,
        hasFixedLeft: Boolean(leftFixedCell),
        hasFixedRight: Boolean(rightFixedCell),
        leftShadowBoundary: leftFixedCell ? Math.round(leftFixedCell.getBoundingClientRect().right - scrollerRect.left) : 0,
        rightShadowBoundary: rightFixedCell ? Math.round(scrollerRect.right - rightFixedCell.getBoundingClientRect().left) : 0,
      };

      setScrollState((prevState) => {
        if (
          prevState.hasScrolledLeft === nextState.hasScrolledLeft &&
          prevState.hasScrolledRight === nextState.hasScrolledRight &&
          prevState.hasFixedLeft === nextState.hasFixedLeft &&
          prevState.hasFixedRight === nextState.hasFixedRight &&
          prevState.leftShadowBoundary === nextState.leftShadowBoundary &&
          prevState.rightShadowBoundary === nextState.rightShadowBoundary
        ) {
          return prevState;
        }

        return nextState;
      });
    }, []);

    React.useImperativeHandle(ref, () => scrollerRef.current!, []);

    React.useEffect(() => {
      const scroller = scrollerRef.current;

      if (!scroller) return;

      updateScrollState();

      const resizeObserver =
        typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(() => {
              updateScrollState();
            })
          : null;

      resizeObserver?.observe(scroller);

      const table = scroller.querySelector('table');
      if (table) {
        resizeObserver?.observe(table);
      }

      return () => {
        resizeObserver?.disconnect();
      };
    }, [updateScrollState]);

    const wrapperStyle = {
      '--lds-table-fixed-left-shadow-boundary': `${leftShadowBoundary}px`,
      '--lds-table-fixed-right-shadow-boundary': `${rightShadowBoundary}px`,
      ...(style as React.CSSProperties | undefined),
    } as React.CSSProperties;

    return (
      <div
        className={clsx(
          'lds-table-wrapper',
          hasScrolledLeft && 'is-scrolled-left',
          hasScrolledRight && 'is-scrolled-right',
          hasFixedLeft && 'has-fixed-left',
          hasFixedRight && 'has-fixed-right',
          className
        )}
        style={wrapperStyle}
      >
        <div
          ref={scrollerRef}
          className="lds-table-wrapper__scroller"
          onScroll={(event) => {
            onScroll?.(event);
            updateScrollState();
          }}
          {...props}
        />
        <span className="lds-table-wrapper__fixed-shadow lds-table-wrapper__fixed-shadow--left" aria-hidden="true" />
        <span className="lds-table-wrapper__fixed-shadow lds-table-wrapper__fixed-shadow--right" aria-hidden="true" />
      </div>
    );
  }
);
TableWrapper.displayName = 'TableWrapper';

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => <table ref={ref} className={clsx('lds-table', className)} {...props} />
);
Table.displayName = 'Table';

export const Thead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={clsx('lds-table__thead', className)} {...props} />
);
Thead.displayName = 'Thead';

export const Tbody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <tbody ref={ref} {...props} />
);
Tbody.displayName = 'Tbody';

export const Tr = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => <tr ref={ref} className={clsx('lds-table__row', className)} {...props} />
);
Tr.displayName = 'Tr';

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  fixed?: TableFixedColumn;
}
export const Th = React.forwardRef<HTMLTableCellElement, ThProps>(({ className, align, fixed, ...props }, ref) => (
  <th
    ref={ref}
    className={clsx('lds-table__th', getTableAlignClassName(align), getTableFixedClassName(fixed), className)}
    {...props}
  />
));
Th.displayName = 'Th';

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  fixed?: TableFixedColumn;
}
export const Td = React.forwardRef<HTMLTableCellElement, TdProps>(({ className, align, fixed, ...props }, ref) => (
  <td
    ref={ref}
    className={clsx('lds-table__td', getTableAlignClassName(align), getTableFixedClassName(fixed), className)}
    {...props}
  />
));
Td.displayName = 'Td';

export const TableCellProduct = ({ img, title, tag, tagVariant = 'default', id }: any) => (
  <div className="lds-table-cell--product">
    <img src={img} alt="商品图" className="lds-table-cell__product-img" />
    <div className="lds-table-cell__product-info">
      <div className="lds-table-cell__product-title-wrap">
        <h4 className="lds-table-cell__product-title">{title}</h4>
        {tag && (
          <Tag
            size="small"
            variant={tagVariant === 'default' ? 'outline' : 'light'}
            color={tagVariant === 'orange' ? 'orange' : tagVariant === 'red' ? 'red' : 'gray'}
          >
            {tag}
          </Tag>
        )}
      </div>
      <div className="lds-table-cell__product-meta">
        <span className="lds-table-cell__product-id">商品ID：{id}</span>
      </div>
    </div>
  </div>
);

export const TableCellAmount = ({ children }: any) => <div className="lds-table-cell--amount">{children}</div>;
export interface TableCellTagProps extends TagProps {
  containerClassName?: string;
}
export const TableCellTag = ({
  containerClassName,
  className,
  size = 'small',
  variant = 'light',
  color = 'gray',
  ...props
}: TableCellTagProps) => (
  <div className={clsx('lds-table-cell--tag', containerClassName)}>
    <Tag className={className} size={size} variant={variant} color={color} {...props} />
  </div>
);
export const TableCellOperation = ({ children }: any) => <div className="lds-table-cell--operation">{children}</div>;

export interface TableCellActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  danger?: boolean;
  disabled?: boolean;
}
export const TableCellAction = React.forwardRef<HTMLAnchorElement, TableCellActionProps>(
  ({ className, danger, disabled = false, href, onClick, tabIndex, ...props }, ref) => (
    <a
      ref={ref}
      className={clsx('lds-table-cell__action', danger && 'is-danger', disabled && 'is-disabled', className)}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    />
  )
);
TableCellAction.displayName = 'TableCellAction';
