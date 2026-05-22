import React, { forwardRef, useState } from 'react';
import { clsx } from 'clsx';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * 尺寸大小
   * @default 'default-size'
   */
  size?: 'default-size' | 'small';
  /**
   * 开关状态变更回调
   */
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = 'default-size',
      checked,
      defaultChecked,
      disabled = false,
      readOnly = false,
      onChange,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState<boolean>(() => Boolean(defaultChecked));
    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (!isControlled) {
        setInternalChecked(event.target.checked);
      }

      onCheckedChange?.(event.target.checked);
      onChange?.(event);
    };

    return (
      <label
        className={clsx(
          'lds-switch',
          `lds-switch--${size}`,
          {
            'lds-switch--checked': currentChecked,
            'lds-switch--disabled': disabled,
            'lds-switch--readonly': readOnly,
          },
          className
        )}
      >
        <input
          {...props}
          ref={ref}
          type="checkbox"
          role="switch"
          className="lds-switch__input"
          checked={currentChecked}
          disabled={disabled}
          readOnly={readOnly}
          aria-checked={currentChecked}
          onChange={handleChange}
        />
        <span className="lds-switch__track" aria-hidden="true">
          <span className="lds-switch__thumb" />
        </span>
      </label>
    );
  }
);

Switch.displayName = 'Switch';
