import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tabs?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onBackClick?: React.MouseEventHandler<HTMLButtonElement>;
  backButtonAriaLabel?: string;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      title,
      tabs,
      variant = 'primary',
      onBackClick,
      backButtonAriaLabel = '返回上一页',
      ...props
    },
    ref
  ) => {
    const isSecondary = variant === 'secondary';

    return (
      <div
        ref={ref}
        className={clsx('lds-page-header', `lds-page-header--${variant}`, className)}
        {...props}
      >
        {isSecondary ? (
          <div className="lds-page-header__secondary-layout">
            <button
              type="button"
              className="lds-page-header__back-button"
              onClick={onBackClick}
              aria-label={backButtonAriaLabel}
            >
              <Icon name="ic-arrow-left-l-line" aria-hidden="true" />
            </button>
            <div className="lds-page-header__content">
              <h1 className="lds-page-header__title">{title}</h1>
              {tabs && <div className="lds-page-header__tabs">{tabs}</div>}
            </div>
          </div>
        ) : (
          <>
            <h1 className="lds-page-header__title">{title}</h1>
            {tabs && <div className="lds-page-header__tabs">{tabs}</div>}
          </>
        )}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
