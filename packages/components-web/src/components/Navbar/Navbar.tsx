import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';

export type NavbarTheme = 'light' | 'dark';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: NavbarTheme;
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, theme, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('lds-navbar', theme && `lds-navbar--${theme}`, className)}
      data-theme={theme}
      {...props}
    >
      <div className="lds-navbar__left">
        <div className="lds-navbar__logo" aria-label="来客 Logo">
          <span className="lds-navbar__logo-image" aria-hidden="true" />
        </div>
      </div>

      <div className="lds-navbar__middle">
        <div className="lds-navbar__search">
          <Input
            size="default-size"
            prefixIcon={<Icon name="ic-search-line" />}
            placeholder="你可以问：在哪里修改官方抖音号"
            readOnly
          />
        </div>

        <nav className="lds-navbar__nav">
          <a href="#" className="lds-navbar__nav-item is-active">首页</a>
          <a href="#" className="lds-navbar__nav-item">生意经</a>
          <a href="#" className="lds-navbar__nav-item">本地推</a>
          <a href="#" className="lds-navbar__nav-item">学习中心</a>
        </nav>
      </div>

      <div className="lds-navbar__right">
        <div className="lds-navbar__action">
          <Icon name="ic-reset-line" />
          <span>返回旧版</span>
        </div>
        <div className="lds-navbar__divider" />
        <div className="lds-navbar__action">
          <Icon name="ic-mobile-line" />
          <span>App下载</span>
        </div>
        <div className="lds-navbar__divider" />
        <div className="lds-navbar__user">
          <div className="lds-navbar__avatar lds-navbar__avatar--preset" aria-hidden="true">
            85
          </div>
          <div className="lds-navbar__user-info">
            <span className="lds-navbar__username">北京八十五度...</span>
            <Icon name="ic-arrow-down-line" />
          </div>
        </div>
      </div>
    </div>
  )
);
Navbar.displayName = 'Navbar';
