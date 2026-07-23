// src/components/Button/Button.tsx
import React from "react";
import { clsx } from "clsx";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ className, size = "default-size", variant = "default", icon, children, ...props }, ref) => {
    const isTextIconOnly = variant === "text" && icon && React.Children.count(children) === 0;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: clsx(
          "lds-mobile-btn",
          `lds-mobile-btn--${size}`,
          `lds-mobile-btn--${variant}`,
          isTextIconOnly && "lds-mobile-btn--text-icon-only",
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("span", { className: "lds-mobile-btn__icon", children: icon }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
export {
  Button
};
