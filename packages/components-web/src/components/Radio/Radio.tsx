import React from 'react';
import { clsx } from 'clsx';

export type RadioVariant = 'default' | 'capsule' | 'card';
export type RadioSize = 'large' | 'default-size' | 'small' | 'mini';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 单选框视觉样式
   * @default 'default'
   */
  variant?: RadioVariant;
  /**
   * 尺寸大小
   * @default 'default-size'
   */
  size?: RadioSize;
  /**
   * 主文案
   */
  label?: React.ReactNode;
  /**
   * 卡片样式下的辅助文案
   */
  description?: React.ReactNode;
  /**
   * 卡片样式下的宽度。
   * - 传数字时按 px 处理
   * - 传字符串时支持任意合法 CSS 宽度值，如 `240px`、`100%`
   * @default 180
   */
  cardWidth?: number | string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default-size',
      label,
      description,
      cardWidth,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const hasLabel = label !== undefined && label !== null;
    const hasDescription = description !== undefined && description !== null;
    const isCapsule = variant === 'capsule';
    const isCard = variant === 'card';
    const isDefault = variant === 'default';
    const wrapperStyle =
      isCard && cardWidth !== undefined
        ? ({
            ['--lds-radio-card-width' as string]:
              typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth,
          } as React.CSSProperties)
        : undefined;

    return (
      <label
        className={clsx(
          'lds-radio',
          `lds-radio--${variant}`,
          `lds-radio--${size}`,
          disabled && 'lds-radio--disabled',
          isCapsule && 'lds-capsule-wrapper',
          className
        )}
        style={wrapperStyle}
      >
        <input
          type="radio"
          className="lds-radio__input"
          disabled={disabled}
          ref={ref}
          style={style}
          {...props}
        />
        <span
          className={clsx(
            'lds-radio__visual',
            isCapsule && 'lds-capsule',
            isCapsule && `lds-capsule--${size}`,
            isCard && 'lds-radio__visual--card'
          )}
        >
          {isDefault ? (
            <span className="lds-radio__control" aria-hidden="true">
              <span className="lds-radio__dot" />
            </span>
          ) : null}

          {hasLabel || hasDescription ? (
            <span className="lds-radio__content">
              {hasLabel ? (
                <span className={clsx(isCard ? 'lds-radio__title' : 'lds-radio__label')}>
                  {label}
                </span>
              ) : null}
              {hasDescription ? (
                <span className="lds-radio__description">{description}</span>
              ) : null}
            </span>
          ) : null}
        </span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';
