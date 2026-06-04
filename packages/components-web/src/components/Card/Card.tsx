import React from 'react';
import { clsx } from 'clsx';

export type CardSize = 'small' | 'large';
export type CardDividerVariant = 'solid' | 'dashed';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片尺寸
   * @default 'small'
   */
  size?: CardSize;
  /**
   * 是否启用交互态
   * 开启后 hover 会出现投影
   * @default false
   */
  interactive?: boolean;
}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 描述文案
   */
  description?: React.ReactNode;
  /**
   * 标题附加内容，常用于状态标签
   */
  addon?: React.ReactNode;
  /**
   * 头部右侧扩展区
   */
  extra?: React.ReactNode;
  /**
   * 左侧图标或插画
   */
  icon?: React.ReactNode;
}

export interface CardDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * 分隔线样式
   * @default 'solid'
   */
  variant?: CardDividerVariant;
}

export interface CardMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 指标列数
   */
  columns?: number;
  /**
   * 是否显示指标之间的分割线
   * @default false
   */
  divided?: boolean;
}

export interface CardMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 指标标题
   */
  label?: React.ReactNode;
  /**
   * 指标值
   */
  value?: React.ReactNode;
  /**
   * 指标值后缀
   */
  suffix?: React.ReactNode;
  /**
   * 指标右上角补充信息
   */
  extra?: React.ReactNode;
  /**
   * 指标补充说明
   */
  description?: React.ReactNode;
  /**
   * 趋势说明标签，如“较昨日”
   */
  trendLabel?: React.ReactNode;
  /**
   * 趋势值，如“+22.56%”
   */
  trendValue?: React.ReactNode;
  /**
   * 趋势方向
   * @default 'neutral'
   */
  trendDirection?: 'up' | 'down' | 'neutral';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size = 'small', interactive = false, onClick, ...props }, ref) => {
    const isInteractive = interactive || typeof onClick === 'function';

    return (
      <div
        ref={ref}
        className={clsx(
          'lds-card',
          `lds-card--${size}`,
          isInteractive && 'lds-card--interactive',
          className
        )}
        onClick={onClick}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, addon, extra, icon, children, ...props }, ref) => {
    const hasStructuredContent =
      title !== undefined ||
      description !== undefined ||
      addon !== undefined ||
      extra !== undefined ||
      icon !== undefined;

    if (!hasStructuredContent) {
      return <div ref={ref} className={clsx('lds-card__header', className)} {...props} children={children} />;
    }

    return (
      <div ref={ref} className={clsx('lds-card__header', className)} {...props}>
        <div className="lds-card__header-main">
          {icon ? <div className="lds-card__header-icon">{icon}</div> : null}
          <div className="lds-card__header-copy">
            {(title !== undefined || addon !== undefined) && (
              <div className="lds-card__title-row">
                {title !== undefined ? <div className="lds-card__title">{title}</div> : null}
                {addon !== undefined ? <div className="lds-card__title-addon">{addon}</div> : null}
              </div>
            )}
            {description !== undefined ? (
              <div className="lds-card__description">{description}</div>
            ) : null}
            {children}
          </div>
        </div>
        {extra !== undefined ? <div className="lds-card__header-extra">{extra}</div> : null}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('lds-card__title', className)} {...props} />
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx('lds-card__description', className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('lds-card__body', className)} {...props} />
  )
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('lds-card__footer', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

export const CardDivider = React.forwardRef<HTMLHRElement, CardDividerProps>(
  ({ className, variant = 'solid', ...props }, ref) => (
    <hr
      ref={ref}
      className={clsx('lds-card__divider', `lds-card__divider--${variant}`, className)}
      {...props}
    />
  )
);

CardDivider.displayName = 'CardDivider';

export const CardMetrics = React.forwardRef<HTMLDivElement, CardMetricsProps>(
  ({ className, columns, divided = false, style, ...props }, ref) => {
    const metricsStyle = {
      ...(style ?? {}),
      ...(columns
        ? ({
            ['--lds-card-metrics-columns' as string]: String(columns),
          } as React.CSSProperties)
        : null),
    };

    return (
      <div
        ref={ref}
        className={clsx('lds-card__metrics', divided && 'lds-card__metrics--divided', className)}
        style={metricsStyle}
        {...props}
      />
    );
  }
);

CardMetrics.displayName = 'CardMetrics';

export const CardMetric = React.forwardRef<HTMLDivElement, CardMetricProps>(
  (
    {
      className,
      label,
      value,
      suffix,
      extra,
      description,
      trendLabel,
      trendValue,
      trendDirection = 'neutral',
      children,
      ...props
    },
    ref
  ) => {
    const hasStructuredContent =
      label !== undefined ||
      value !== undefined ||
      suffix !== undefined ||
      extra !== undefined ||
      description !== undefined ||
      trendLabel !== undefined ||
      trendValue !== undefined;

    if (!hasStructuredContent) {
      return <div ref={ref} className={clsx('lds-card__metric', className)} {...props} children={children} />;
    }

    return (
      <div ref={ref} className={clsx('lds-card__metric', className)} {...props}>
        {(label !== undefined || extra !== undefined) && (
          <div className="lds-card__metric-head">
            {label !== undefined ? <div className="lds-card__metric-label">{label}</div> : null}
            {extra !== undefined ? <div className="lds-card__metric-extra">{extra}</div> : null}
          </div>
        )}
        {(value !== undefined || suffix !== undefined) && (
          <div className="lds-card__metric-value-row">
            {value !== undefined ? <div className="lds-card__metric-value">{value}</div> : null}
            {suffix !== undefined ? <div className="lds-card__metric-suffix">{suffix}</div> : null}
          </div>
        )}
        {description !== undefined ? (
          <div className="lds-card__metric-description">{description}</div>
        ) : null}
        {(trendLabel !== undefined || trendValue !== undefined) && (
          <div className={clsx('lds-card__metric-trend', `lds-card__metric-trend--${trendDirection}`)}>
            {trendLabel !== undefined ? (
              <span className="lds-card__metric-trend-label">{trendLabel}</span>
            ) : null}
            {trendValue !== undefined ? (
              <span className="lds-card__metric-trend-value">{trendValue}</span>
            ) : null}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CardMetric.displayName = 'CardMetric';
