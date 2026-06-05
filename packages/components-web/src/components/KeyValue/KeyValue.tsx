import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

function toCssSize(value?: number | string) {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
}

export type KeyValueLayout = 'horizontal' | 'vertical';

interface KeyValueContextValue {
  labelWidth?: number | string;
  layout: KeyValueLayout;
}

const DEFAULT_LABEL_WIDTH = '84px';
const DEFAULT_LAYOUT: KeyValueLayout = 'horizontal';
const KeyValueContext = React.createContext<KeyValueContextValue>({
  labelWidth: DEFAULT_LABEL_WIDTH,
  layout: DEFAULT_LAYOUT,
});

export interface KeyValueProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 一行展示的列数
   * @default 2
   */
  columns?: number;
  /**
   * 统一设置左侧标签宽度
   * 默认仅在横向布局下生效
   * @default 84
   */
  labelWidth?: number | string;
  /**
   * 默认布局方式
   * @default 'horizontal'
   */
  layout?: KeyValueLayout;
}

export interface KeyValueItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 左侧标题内容
   */
  label?: React.ReactNode;
  /**
   * 当前项展示值
   */
  value?: React.ReactNode;
  /**
   * 栅格跨列数
   * @default 1
   */
  span?: number;
  /**
   * 单独覆盖当前项的布局方式
   */
  layout?: KeyValueLayout;
  /**
   * 单独覆盖当前项的标题宽度
   */
  labelWidth?: number | string;
  /**
   * 标题帮助提示文案
   */
  tooltip?: string;
  /**
   * 点击帮助图标的回调
   */
  onTooltipClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 帮助图标无障碍名称
   * @default '查看字段说明'
   */
  tooltipAriaLabel?: string;
  /**
   * 数字型内容，切换为数字字体
   * @default false
   */
  numeric?: boolean;
  /**
   * 空值时的占位内容
   * @default '--'
   */
  emptyFallback?: React.ReactNode;
}

export interface KeyValueTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 主文案内容
   */
  value?: React.ReactNode;
  /**
   * 附加链接文案
   */
  linkText?: React.ReactNode;
  /**
   * 链接地址
   */
  href?: string;
  /**
   * 链接点击回调
   */
  onLinkClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 链接打开方式
   */
  target?: React.HTMLAttributeAnchorTarget;
  /**
   * 链接 rel
   */
  rel?: string;
  /**
   * 末尾图标，一般用于编辑或跳转
   */
  icon?: React.ReactNode;
  /**
   * 点击图标回调
   */
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 图标无障碍名称
   * @default '执行附加操作'
   */
  iconAriaLabel?: string;
  /**
   * 是否单行省略
   * @default false
   */
  ellipsis?: boolean;
}

export interface KeyValueTagsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface KeyValueImagesProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface KeyValueImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图片地址
   */
  src: string;
  /**
   * 图片描述
   */
  alt: string;
  /**
   * 图片下方说明
   */
  label?: React.ReactNode;
}

export const KeyValue = React.forwardRef<HTMLDivElement, KeyValueProps>(
  ({ className, style, columns = 2, labelWidth = 84, layout = DEFAULT_LAYOUT, ...props }, ref) => {
    const mergedStyle = {
      ...style,
      ['--lds-key-value-columns' as const]: String(Math.max(columns, 1)),
      ...(layout === 'horizontal'
        ? ({
            ['--lds-key-value-label-width' as const]: toCssSize(labelWidth) ?? DEFAULT_LABEL_WIDTH,
          } as React.CSSProperties)
        : null),
    } as React.CSSProperties;

    return (
      <KeyValueContext.Provider value={{ labelWidth, layout }}>
        <div
          ref={ref}
          className={clsx('lds-key-value', `lds-key-value--${layout}`, className)}
          style={mergedStyle}
          {...props}
        />
      </KeyValueContext.Provider>
    );
  }
);

KeyValue.displayName = 'KeyValue';

export const KeyValueItem = React.forwardRef<HTMLDivElement, KeyValueItemProps>(
  (
    {
      className,
      label,
      value,
      span = 1,
      layout,
      labelWidth,
      tooltip,
      onTooltipClick,
      tooltipAriaLabel = '查看字段说明',
      numeric = false,
      emptyFallback = '--',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(KeyValueContext);
    const resolvedLayout = layout ?? context.layout;
    const resolvedValue = value ?? children ?? emptyFallback;
    const isEmpty = resolvedValue === emptyFallback;
    const shouldRenderTooltip = Boolean(tooltip) || Boolean(onTooltipClick);
    const mergedStyle = {
      ...style,
      ['--lds-key-value-item-span' as const]: String(Math.max(span, 1)),
      ...(labelWidth !== undefined
        ? ({
            ['--lds-key-value-label-width' as const]: toCssSize(labelWidth),
          } as React.CSSProperties)
        : null),
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={clsx(
          'lds-key-value__item',
          `lds-key-value__item--${resolvedLayout}`,
          numeric && 'lds-key-value__item--numeric',
          className
        )}
        style={mergedStyle}
        {...props}
      >
        <div className="lds-key-value__label">
          <div className="lds-key-value__label-inner">
            <span className="lds-key-value__label-text">{label}</span>
            {shouldRenderTooltip ? (
              <button
                type="button"
                className="lds-key-value__tooltip"
                title={tooltip}
                aria-label={tooltipAriaLabel}
                onClick={onTooltipClick}
              >
                <Icon name="ic-help-line" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
        <div className={clsx('lds-key-value__value', isEmpty && 'is-empty')}>{resolvedValue}</div>
      </div>
    );
  }
);

KeyValueItem.displayName = 'KeyValueItem';

export const KeyValueText = React.forwardRef<HTMLDivElement, KeyValueTextProps>(
  (
    {
      className,
      value,
      linkText,
      href,
      onLinkClick,
      target,
      rel,
      icon,
      onIconClick,
      iconAriaLabel = '执行附加操作',
      ellipsis = false,
      ...props
    },
    ref
  ) => {
    const textNode = (
      <span className={clsx('lds-key-value-text__value', ellipsis && 'is-ellipsis')}>
        {value}
      </span>
    );

    let linkNode: React.ReactNode = null;
    if (linkText !== undefined) {
      if (href) {
        linkNode = (
          <a
            className="lds-key-value-text__link"
            href={href}
            target={target}
            rel={rel ?? (target === '_blank' ? 'noreferrer noopener' : undefined)}
            onClick={onLinkClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
          >
            {linkText}
          </a>
        );
      } else {
        linkNode = (
          <button
            type="button"
            className="lds-key-value-text__link lds-key-value-text__link--button"
            onClick={onLinkClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
          >
            {linkText}
          </button>
        );
      }
    }

    return (
      <div ref={ref} className={clsx('lds-key-value-text', className)} {...props}>
        {textNode}
        {linkNode}
        {icon ? (
          onIconClick ? (
            <button
              type="button"
              className="lds-key-value-text__icon-action"
              aria-label={iconAriaLabel}
              onClick={onIconClick}
            >
              {icon}
            </button>
          ) : (
            <span className="lds-key-value-text__icon">{icon}</span>
          )
        ) : null}
      </div>
    );
  }
);

KeyValueText.displayName = 'KeyValueText';

export const KeyValueTags = React.forwardRef<HTMLDivElement, KeyValueTagsProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('lds-key-value-tags', className)} {...props} />
  )
);

KeyValueTags.displayName = 'KeyValueTags';

export const KeyValueImages = React.forwardRef<HTMLDivElement, KeyValueImagesProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('lds-key-value-images', className)} {...props} />
  )
);

KeyValueImages.displayName = 'KeyValueImages';

export const KeyValueImage = React.forwardRef<HTMLDivElement, KeyValueImageProps>(
  ({ className, src, alt, label, ...props }, ref) => (
    <div ref={ref} className={clsx('lds-key-value-image', className)} {...props}>
      <div className="lds-key-value-image__frame">
        <img className="lds-key-value-image__img" src={src} alt={alt} />
      </div>
      {label !== undefined ? <div className="lds-key-value-image__label">{label}</div> : null}
    </div>
  )
);

KeyValueImage.displayName = 'KeyValueImage';
