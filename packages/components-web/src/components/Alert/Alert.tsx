import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'gray';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 标题文案
   */
  title?: React.ReactNode;
  /**
   * 描述文案
   */
  description?: React.ReactNode;
  /**
   * 语义类型
   * @default 'info'
   */
  variant?: AlertVariant;
  /**
   * 自定义左侧图标
   */
  icon?: React.ReactNode;
  /**
   * 是否显示左侧图标
   * @default true
   */
  showIcon?: boolean;
  /**
   * 右侧操作区
   */
  action?: React.ReactNode;
  /**
   * 是否显示关闭按钮
   * @default false
   */
  closable?: boolean;
  /**
   * 非受控模式下的初始显示状态
   * @default true
   */
  defaultVisible?: boolean;
  /**
   * 受控显示状态
   */
  visible?: boolean;
  /**
   * 点击关闭按钮时触发
   */
  onClose?: () => void;
  /**
   * 关闭按钮可访问名称
   * @default '关闭提示'
   */
  closeLabel?: string;
}

const ALERT_ICON_MAP: Record<AlertVariant, string> = {
  info: 'ic-info-round-fill',
  success: 'ic-finish-round-fill',
  warning: 'ic-warning-round-fill',
  error: 'ic-error-round-fill',
  gray: 'ic-reduce-round-fill',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      title,
      description,
      variant = 'info',
      icon,
      showIcon = true,
      action,
      closable = false,
      defaultVisible = true,
      visible,
      onClose,
      closeLabel = '关闭提示',
      children,
      role = 'alert',
      ...props
    },
    ref
  ) => {
    const [innerVisible, setInnerVisible] = React.useState(defaultVisible);
    const isControlled = visible !== undefined;
    const mergedVisible = isControlled ? visible : innerVisible;

    if (!mergedVisible) {
      return null;
    }

    const resolvedIcon =
      icon ?? (showIcon ? <Icon name={ALERT_ICON_MAP[variant]} aria-hidden="true" /> : null);

    const handleClose = () => {
      if (!isControlled) {
        setInnerVisible(false);
      }
      onClose?.();
    };

    return (
      <div
        ref={ref}
        className={clsx('lds-alert', `lds-alert--${variant}`, className)}
        role={role}
        {...props}
      >
        {showIcon && resolvedIcon ? (
          <div className="lds-alert__icon" aria-hidden="true">
            {resolvedIcon}
          </div>
        ) : null}

        <div className="lds-alert__content">
          {title ? <div className="lds-alert__title">{title}</div> : null}
          {description ? <div className="lds-alert__description">{description}</div> : null}
          {children ? <div className="lds-alert__extra">{children}</div> : null}
        </div>

        {action ? <div className="lds-alert__action">{action}</div> : null}

        {closable ? (
          <button
            type="button"
            className="lds-alert__close"
            aria-label={closeLabel}
            onClick={handleClose}
          >
            <Icon name="ic-error-line" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
