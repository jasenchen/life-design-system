import React from 'react';
import { clsx } from 'clsx';

export type ButtonSize = 'large' | 'default-size' | 'small';
export type ButtonVariant = 'primary' | 'default' | 'secondary' | 'text' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The size of the button.
   * @default 'default-size'
   */
  size?: ButtonSize;
  /**
   * The visual emphasis of the button.
   * @default 'default'
   */
  variant?: ButtonVariant;
  /**
   * Optional leading icon. For the icon variant, this is the only content.
   */
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'default-size', variant = 'default', icon, children, ...props }, ref) => {
    const isTextIconOnly = variant === 'text' && icon && React.Children.count(children) === 0;

    return (
      <button
        ref={ref}
        className={clsx(
          'lds-mobile-btn',
          `lds-mobile-btn--${size}`,
          `lds-mobile-btn--${variant}`,
          isTextIconOnly && 'lds-mobile-btn--text-icon-only',
          className
        )}
        {...props}
      >
        {icon && <span className="lds-mobile-btn__icon">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
