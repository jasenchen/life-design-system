import React from 'react';
import { clsx } from 'clsx';
import { Tag, type TagProps } from '../Tag/Tag';

export type TableCellAlign = 'left' | 'center' | 'right';

const getTableAlignClassName = (align?: TableCellAlign) => {
  if (!align) return undefined;
  return `is-align-${align}`;
};

export const TableWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={clsx('lds-table-wrapper', className)} {...props} />
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
}
export const Th = React.forwardRef<HTMLTableCellElement, ThProps>(({ className, align, ...props }, ref) => (
  <th ref={ref} className={clsx('lds-table__th', getTableAlignClassName(align), className)} {...props} />
));
Th.displayName = 'Th';

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
}
export const Td = React.forwardRef<HTMLTableCellElement, TdProps>(({ className, align, ...props }, ref) => (
  <td ref={ref} className={clsx('lds-table__td', getTableAlignClassName(align), className)} {...props} />
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
