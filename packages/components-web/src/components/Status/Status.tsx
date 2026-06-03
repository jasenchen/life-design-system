import React from 'react';
import { clsx } from 'clsx';

export type StatusColor = 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'black';

export interface StatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 主状态文案
   */
  title: React.ReactNode;
  /**
   * 副文案，支持两行内的说明或富文本强调
   */
  description?: React.ReactNode;
  /**
   * 状态栏颜色
   * @default 'black'
   */
  color?: StatusColor;
}

export const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ className, title, description, color = 'black', children, ...props }, ref) => {
    const mergedDescription = description ?? children;

    return (
      <div
        ref={ref}
        className={clsx('lds-status', `lds-status--${color}`, className)}
        {...props}
      >
        <div className="lds-status__title">{title}</div>
        {mergedDescription ? <div className="lds-status__description">{mergedDescription}</div> : null}
      </div>
    );
  }
);

Status.displayName = 'Status';
