import '@life-ds/icons';
import React from 'react';
import { clsx } from 'clsx';
import { ICON_3DL_DATA_URLS } from './icon3dlAssets';

export type IconVariant = 'default' | '3dl';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The ID of the icon in the SVG sprite (e.g., 'ic-add-round-line')
   */
  name: string;
  /**
   * The icon rendering style. Defaults to the injected SVG sprite.
   */
  variant?: IconVariant;
}

export const Icon = React.forwardRef<SVGSVGElement | HTMLImageElement, IconProps>(
  ({ name, variant = 'default', className, children: _children, ...props }, ref) => {
    const icon3dlSrc = variant === '3dl' ? ICON_3DL_DATA_URLS[name as keyof typeof ICON_3DL_DATA_URLS] : undefined;

    if (icon3dlSrc) {
      const imgProps = props as unknown as React.ImgHTMLAttributes<HTMLImageElement>;
      const isAriaHidden = imgProps['aria-hidden'] === true || imgProps['aria-hidden'] === 'true';
      const accessibleLabel =
        typeof imgProps.alt === 'string'
          ? imgProps.alt
          : typeof imgProps['aria-label'] === 'string'
            ? imgProps['aria-label']
            : isAriaHidden
              ? ''
              : name;

      return (
        <img
          ref={ref as React.Ref<HTMLImageElement>}
          src={icon3dlSrc}
          alt={accessibleLabel}
          draggable={false}
          className={clsx('icon', 'icon--3dl', className)}
          {...imgProps}
        />
      );
    }

    return (
      <svg ref={ref as React.Ref<SVGSVGElement>} className={clsx('icon', className)} {...props}>
        <use href={`#${name}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
