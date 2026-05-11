// src/components/Button/Button.tsx
import React from "react";
import { clsx } from "clsx";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ className, size = "default-size", variant = "default", icon, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: clsx(
          "lds-btn",
          `lds-btn--${size}`,
          `lds-btn--${variant}`,
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("span", { className: "lds-btn__icon", children: icon }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Icon/Icon.tsx
import React2 from "react";
import { clsx as clsx2 } from "clsx";
import { jsx as jsx2 } from "react/jsx-runtime";
var Icon = React2.forwardRef(
  ({ name, className, ...props }, ref) => {
    return /* @__PURE__ */ jsx2("svg", { ref, className: clsx2("icon", className), ...props, children: /* @__PURE__ */ jsx2("use", { href: `#${name}` }) });
  }
);
Icon.displayName = "Icon";

// src/components/Capsule/Capsule.tsx
import React3 from "react";
import { clsx as clsx3 } from "clsx";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Capsule = React3.forwardRef(
  ({ className, size = "default-size", label, disabled, ...props }, ref) => {
    return /* @__PURE__ */ jsxs2("label", { className: clsx3("lds-capsule-wrapper", className, disabled && "is-disabled"), children: [
      /* @__PURE__ */ jsx3("input", { type: "radio", ref, disabled, ...props }),
      /* @__PURE__ */ jsx3("span", { className: clsx3("lds-capsule", `lds-capsule--${size}`), children: label })
    ] });
  }
);
Capsule.displayName = "Capsule";

// src/components/Input/Input.tsx
import React5 from "react";
import { clsx as clsx5 } from "clsx";

// src/components/Form/Form.tsx
import React4 from "react";
import { clsx as clsx4 } from "clsx";
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var DEFAULT_LABEL_WIDTH = "90px";
var FormItemStatusContext = React4.createContext({ hasError: false });
function toCssSize(value) {
  if (value === void 0) {
    return void 0;
  }
  return typeof value === "number" ? `${value}px` : value;
}
function useFormItemStatus() {
  return React4.useContext(FormItemStatusContext);
}
var Form = React4.forwardRef(
  ({ className, style, labelWidth = 90, ...props }, ref) => {
    var _a;
    const mergedStyle = {
      ...style,
      ["--lds-form-label-width"]: (_a = toCssSize(labelWidth)) != null ? _a : DEFAULT_LABEL_WIDTH
    };
    return /* @__PURE__ */ jsx4("div", { ref, className: clsx4("lds-form", className), style: mergedStyle, ...props });
  }
);
Form.displayName = "Form";
var FormItem = React4.forwardRef(
  ({
    className,
    label,
    htmlFor,
    required = false,
    tooltip,
    onTooltipClick,
    tooltipAriaLabel = "\u67E5\u770B\u5B57\u6BB5\u8BF4\u660E",
    description,
    error,
    labelWidth,
    children,
    style,
    ...props
  }, ref) => {
    const message = error != null ? error : description;
    const hasError = error !== void 0 && error !== null && error !== false;
    const shouldRenderTooltip = Boolean(tooltip) || Boolean(onTooltipClick);
    const mergedStyle = {
      ...style,
      ...labelWidth !== void 0 ? {
        ["--lds-form-label-width"]: toCssSize(labelWidth)
      } : null
    };
    const labelContent = /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx4("span", { className: "lds-form-item__label-text", children: label }),
      shouldRenderTooltip ? /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          className: "lds-form-item__tooltip",
          title: tooltip,
          "aria-label": tooltipAriaLabel,
          onClick: onTooltipClick,
          children: /* @__PURE__ */ jsx4(Icon, { name: "ic-help-line", "aria-hidden": "true" })
        }
      ) : null,
      required ? /* @__PURE__ */ jsx4("span", { className: "lds-form-item__required", "aria-hidden": "true", children: /* @__PURE__ */ jsx4(Icon, { name: "ic-required-line" }) }) : null
    ] });
    return /* @__PURE__ */ jsxs3("div", { ref, className: clsx4("lds-form-item", className), style: mergedStyle, ...props, children: [
      /* @__PURE__ */ jsx4("div", { className: "lds-form-item__label", children: htmlFor ? /* @__PURE__ */ jsx4("label", { className: "lds-form-item__label-inner", htmlFor, children: labelContent }) : /* @__PURE__ */ jsx4("div", { className: "lds-form-item__label-inner", children: labelContent }) }),
      /* @__PURE__ */ jsxs3("div", { className: "lds-form-item__main", children: [
        /* @__PURE__ */ jsx4(FormItemStatusContext.Provider, { value: { hasError }, children: /* @__PURE__ */ jsx4("div", { className: "lds-form-item__control", children }) }),
        message ? /* @__PURE__ */ jsx4(
          "div",
          {
            className: clsx4("lds-form-item__message", hasError && "is-error"),
            role: hasError ? "alert" : void 0,
            children: message
          }
        ) : null
      ] })
    ] });
  }
);
FormItem.displayName = "FormItem";

// src/components/Input/Input.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var Input = React5.forwardRef(
  ({ className, wrapperClassName, size = "default-size", prefixIcon, suffixIcon, clearable, onClear, disabled, isFocused, error, ...props }, ref) => {
    const { hasError } = useFormItemStatus();
    const mergedError = error != null ? error : hasError;
    return /* @__PURE__ */ jsxs4(
      "div",
      {
        className: clsx5(
          "lds-input-wrapper",
          `lds-input-wrapper--${size}`,
          disabled && "is-disabled",
          isFocused && "is-focused",
          mergedError && "is-error",
          wrapperClassName
        ),
        children: [
          prefixIcon && /* @__PURE__ */ jsx5("span", { className: "lds-input__prefix", children: prefixIcon }),
          /* @__PURE__ */ jsx5(
            "input",
            {
              ref,
              className: clsx5("lds-input", className),
              disabled,
              ...props
            }
          ),
          clearable && /* @__PURE__ */ jsx5("span", { className: "lds-input__clear", onClick: onClear, children: /* @__PURE__ */ jsx5(Icon, { name: "ic-error-round" }) }),
          suffixIcon && /* @__PURE__ */ jsx5("span", { className: "lds-input__suffix", children: suffixIcon })
        ]
      }
    );
  }
);
Input.displayName = "Input";

// src/components/Textarea/Textarea.tsx
import React6 from "react";
import { clsx as clsx6 } from "clsx";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function getTextLength(value) {
  if (typeof value === "string") {
    return value.length;
  }
  if (typeof value === "number") {
    return String(value).length;
  }
  return 0;
}
var Textarea = React6.forwardRef(
  ({
    className,
    wrapperClassName,
    size = "default-size",
    isFocused = false,
    error,
    disabled = false,
    showCount = true,
    showResizeHandle = true,
    value,
    defaultValue,
    maxLength,
    onChange,
    ...props
  }, ref) => {
    const { hasError } = useFormItemStatus();
    const isControlled = value !== void 0;
    const [innerValueLength, setInnerValueLength] = React6.useState(() => getTextLength(defaultValue));
    const mergedError = error != null ? error : hasError;
    const currentLength = isControlled ? getTextLength(value) : innerValueLength;
    const handleChange = React6.useCallback(
      (event) => {
        if (!isControlled) {
          setInnerValueLength(event.target.value.length);
        }
        onChange == null ? void 0 : onChange(event);
      },
      [isControlled, onChange]
    );
    const countText = maxLength !== void 0 ? `${currentLength}/${maxLength}` : `${currentLength}`;
    return /* @__PURE__ */ jsxs5(
      "div",
      {
        className: clsx6(
          "lds-textarea-wrapper",
          `lds-textarea-wrapper--${size}`,
          isFocused && "is-focused",
          mergedError && "is-error",
          disabled && "is-disabled",
          wrapperClassName
        ),
        children: [
          /* @__PURE__ */ jsx6(
            "textarea",
            {
              ref,
              className: clsx6("lds-textarea", className),
              disabled,
              value,
              defaultValue,
              maxLength,
              onChange: handleChange,
              ...props
            }
          ),
          showCount ? /* @__PURE__ */ jsx6("div", { className: "lds-textarea__footer", children: /* @__PURE__ */ jsx6("span", { className: "lds-textarea__count", children: countText }) }) : null,
          showResizeHandle ? /* @__PURE__ */ jsx6("span", { className: "lds-textarea__resize-handle", "aria-hidden": "true" }) : null
        ]
      }
    );
  }
);
Textarea.displayName = "Textarea";

// src/components/Filter/Filter.tsx
import React7 from "react";
import { clsx as clsx7 } from "clsx";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var getDefaultRightIconName = (type) => {
  if (type === "select") return "ic-arrow-down-line";
  if (type === "date") return "ic-calendar-line";
  if (type === "time") return "ic-time-round-line";
  return null;
};
var isFilledValue = (value) => {
  if (value === null || value === void 0) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
};
var Filter = React7.forwardRef((props, ref) => {
  const {
    size = "default-size",
    label,
    placeholder,
    disabled = false,
    isActive = false,
    rightIcon,
    width
  } = props;
  if (props.type === "input") {
    const { className: className2, value: value2, defaultValue, onChange, inputProps, style: style2, ...rest2 } = props;
    const filled2 = isFilledValue(value2 != null ? value2 : defaultValue);
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        ref,
        className: clsx7(
          "lds-filter",
          `lds-filter--${size}`,
          "lds-filter--input",
          {
            "is-disabled": disabled,
            "is-active": isActive,
            "is-filled": filled2
          },
          className2
        ),
        style: { ...width !== void 0 ? { width } : null, ...style2 },
        onMouseDown: (e) => {
          var _a;
          if ((_a = e.target) == null ? void 0 : _a.closest("input")) return;
          const input = e.currentTarget.querySelector("input");
          input == null ? void 0 : input.focus();
        },
        ...rest2,
        children: [
          /* @__PURE__ */ jsx7("span", { className: "lds-filter__label", children: label }),
          /* @__PURE__ */ jsx7("span", { className: "lds-filter__divider", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx7("span", { className: "lds-filter__control", children: /* @__PURE__ */ jsx7(
            "input",
            {
              className: "lds-filter__input",
              disabled,
              value: value2,
              defaultValue,
              placeholder: typeof placeholder === "string" ? placeholder : void 0,
              onChange: (e) => onChange == null ? void 0 : onChange(e.target.value, e),
              ...inputProps
            }
          ) })
        ]
      }
    );
  }
  const { type, className, value, onClick, style, ...rest } = props;
  const filled = isFilledValue(value);
  const defaultIconName = getDefaultRightIconName(type);
  const iconNode = rightIcon != null ? rightIcon : defaultIconName ? /* @__PURE__ */ jsx7(Icon, { name: defaultIconName, className: "lds-filter__icon-svg", "aria-hidden": "true" }) : null;
  return /* @__PURE__ */ jsxs6(
    "button",
    {
      ref,
      type: "button",
      className: clsx7(
        "lds-filter",
        `lds-filter--${size}`,
        `lds-filter--${type}`,
        {
          "is-disabled": disabled,
          "is-active": isActive,
          "is-filled": filled
        },
        className
      ),
      style: { ...width !== void 0 ? { width } : null, ...style },
      disabled,
      onClick,
      ...rest,
      children: [
        /* @__PURE__ */ jsx7("span", { className: "lds-filter__label", children: label }),
        /* @__PURE__ */ jsx7("span", { className: "lds-filter__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx7("span", { className: "lds-filter__control", children: /* @__PURE__ */ jsx7("span", { className: "lds-filter__value", children: filled ? value : placeholder != null ? placeholder : value }) }),
        iconNode ? /* @__PURE__ */ jsx7("span", { className: "lds-filter__icon", children: iconNode }) : null
      ]
    }
  );
});
Filter.displayName = "Filter";

// src/components/FilterGroup/FilterGroup.tsx
import React8 from "react";
import { clsx as clsx8 } from "clsx";
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var FilterGroup = React8.forwardRef(
  ({
    className,
    size = "small",
    minItemWidth = 294,
    gap = 12,
    onQuery,
    onReset,
    showActions,
    actions,
    queryText = "\u67E5\u8BE2",
    resetText = "\u91CD\u7F6E",
    children,
    style,
    ...props
  }, ref) => {
    const shouldShowDefaultActions = Boolean(showActions != null ? showActions : onQuery || onReset);
    const shouldRenderActionsRow = Boolean(actions || shouldShowDefaultActions);
    return /* @__PURE__ */ jsxs7(
      "div",
      {
        ref,
        className: clsx8("lds-filter-group", className),
        style: {
          ...style,
          // CSS vars for responsive grid behaviour.
          ["--lds-filter-group-min-item-width"]: `${minItemWidth}px`,
          ["--lds-filter-group-gap"]: `${gap}px`
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx8("div", { className: "lds-filter-group__grid", children }),
          shouldRenderActionsRow ? /* @__PURE__ */ jsx8("div", { className: "lds-filter-group__actions-row", children: actions ? actions : /* @__PURE__ */ jsxs7(Fragment2, { children: [
            onQuery ? /* @__PURE__ */ jsx8(Button, { variant: "secondary", size, onClick: onQuery, children: queryText }) : null,
            onReset ? /* @__PURE__ */ jsx8(Button, { variant: "default", size, onClick: onReset, children: resetText }) : null
          ] }) }) : null
        ]
      }
    );
  }
);
FilterGroup.displayName = "FilterGroup";

// src/components/Tabs/Tabs.tsx
import React9, { createContext, useContext, useState } from "react";
import { clsx as clsx9 } from "clsx";
import { jsx as jsx9 } from "react/jsx-runtime";
var TabsContext = createContext({});
var Tabs = React9.forwardRef(
  ({ className, variant = "primary", size = "small", defaultValue, value, onChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeValue = value !== void 0 ? value : internalValue;
    const handleChange = (newValue) => {
      if (value === void 0) {
        setInternalValue(newValue);
      }
      onChange == null ? void 0 : onChange(newValue);
    };
    return /* @__PURE__ */ jsx9(TabsContext.Provider, { value: { activeValue, onChange: handleChange }, children: /* @__PURE__ */ jsx9(
      "div",
      {
        ref,
        className: clsx9("lds-tabs", `lds-tabs--${variant}`, `lds-tabs--${size}`, className),
        ...props,
        children
      }
    ) });
  }
);
Tabs.displayName = "Tabs";
var Tab = React9.forwardRef(
  ({ className, value, active, disabled, children, onClick, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isActive = value !== void 0 && context.activeValue === value || active;
    const handleClick = (e) => {
      var _a;
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (value !== void 0) {
        (_a = context.onChange) == null ? void 0 : _a.call(context, value);
      }
      onClick == null ? void 0 : onClick(e);
    };
    return /* @__PURE__ */ jsx9(
      "a",
      {
        ref,
        className: clsx9("lds-tab", isActive && "is-active", disabled && "is-disabled", className),
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
Tab.displayName = "Tab";

// src/components/Navbar/Navbar.tsx
import React10 from "react";
import { clsx as clsx10 } from "clsx";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var Navbar = React10.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs8("div", { ref, className: clsx10("lds-navbar", className), ...props, children: [
    /* @__PURE__ */ jsx10("div", { className: "lds-navbar__left", children: /* @__PURE__ */ jsx10("div", { className: "lds-navbar__logo", "aria-label": "\u6765\u5BA2 Logo", children: /* @__PURE__ */ jsx10("span", { className: "lds-navbar__logo-image", "aria-hidden": "true" }) }) }),
    /* @__PURE__ */ jsxs8("div", { className: "lds-navbar__middle", children: [
      /* @__PURE__ */ jsx10("div", { className: "lds-navbar__search", children: /* @__PURE__ */ jsx10(
        Input,
        {
          size: "default-size",
          prefixIcon: /* @__PURE__ */ jsx10(Icon, { name: "ic-search-line" }),
          placeholder: "\u4F60\u53EF\u4EE5\u95EE\uFF1A\u5728\u54EA\u91CC\u4FEE\u6539\u5B98\u65B9\u6296\u97F3\u53F7",
          readOnly: true
        }
      ) }),
      /* @__PURE__ */ jsxs8("nav", { className: "lds-navbar__nav", children: [
        /* @__PURE__ */ jsx10("a", { href: "#", className: "lds-navbar__nav-item is-active", children: "\u9996\u9875" }),
        /* @__PURE__ */ jsx10("a", { href: "#", className: "lds-navbar__nav-item", children: "\u751F\u610F\u7ECF" }),
        /* @__PURE__ */ jsx10("a", { href: "#", className: "lds-navbar__nav-item", children: "\u672C\u5730\u63A8" }),
        /* @__PURE__ */ jsx10("a", { href: "#", className: "lds-navbar__nav-item", children: "\u5B66\u4E60\u4E2D\u5FC3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "lds-navbar__right", children: [
      /* @__PURE__ */ jsxs8("div", { className: "lds-navbar__action", children: [
        /* @__PURE__ */ jsx10(Icon, { name: "ic-reset-line" }),
        /* @__PURE__ */ jsx10("span", { children: "\u8FD4\u56DE\u65E7\u7248" })
      ] }),
      /* @__PURE__ */ jsx10("div", { className: "lds-navbar__divider" }),
      /* @__PURE__ */ jsxs8("div", { className: "lds-navbar__action", children: [
        /* @__PURE__ */ jsx10(Icon, { name: "ic-mobile-line" }),
        /* @__PURE__ */ jsx10("span", { children: "App\u4E0B\u8F7D" })
      ] }),
      /* @__PURE__ */ jsx10("div", { className: "lds-navbar__divider" }),
      /* @__PURE__ */ jsxs8("div", { className: "lds-navbar__user", children: [
        /* @__PURE__ */ jsx10("div", { className: "lds-navbar__avatar lds-navbar__avatar--preset", "aria-hidden": "true", children: "85" }),
        /* @__PURE__ */ jsxs8("div", { className: "lds-navbar__user-info", children: [
          /* @__PURE__ */ jsx10("span", { className: "lds-navbar__username", children: "\u5317\u4EAC\u516B\u5341\u4E94\u5EA6..." }),
          /* @__PURE__ */ jsx10(Icon, { name: "ic-arrow-down-line" })
        ] })
      ] })
    ] })
  ] })
);
Navbar.displayName = "Navbar";

// src/components/Menu/Menu.tsx
import React11, { useState as useState2 } from "react";
import { clsx as clsx11 } from "clsx";
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
var DEFAULT_MENU_GROUPS = [
  {
    key: "common",
    title: "\u5E38\u7528",
    icon: "ic-all-line",
    items: [
      { key: "common-store-management", label: "\u95E8\u5E97\u7BA1\u7406" },
      { key: "common-group-buy-product-management", label: "\u56E2\u8D2D\u5546\u54C1\u7BA1\u7406" },
      { key: "common-store-decoration", label: "\u5E97\u94FA\u88C5\u4FEE" },
      { key: "common-review-management", label: "\u8BC4\u4EF7\u7BA1\u7406" }
    ]
  },
  {
    key: "store",
    title: "\u5E97\u94FA",
    icon: "ic-store-line",
    items: [
      { key: "store-merchant-info", label: "\u5546\u5BB6\u4FE1\u606F" },
      { key: "store-store-management", label: "\u95E8\u5E97\u7BA1\u7406" },
      { key: "store-area-management", label: "\u533A\u57DF\u7BA1\u7406" },
      { key: "store-auth-management", label: "\u6388\u6743\u7BA1\u7406" },
      { key: "store-qualification-center", label: "\u8D44\u8D28\u4E2D\u5FC3" },
      { key: "store-store-decoration", label: "\u5E97\u94FA\u88C5\u4FEE" },
      { key: "store-cooperation-management", label: "\u5408\u4F5C\u7BA1\u7406" },
      { key: "store-business-center", label: "\u4E1A\u52A1\u4E2D\u5FC3" },
      { key: "store-review-management", label: "\u8BC4\u4EF7\u7BA1\u7406" },
      { key: "store-approval-center", label: "\u5BA1\u6279\u4E2D\u5FC3" },
      { key: "store-service-app-auth", label: "\u670D\u52A1\u5E94\u7528\u6388\u6743" },
      { key: "store-talent-management", label: "\u804C\u4EBA\u7BA1\u7406" },
      { key: "store-official-douyin", label: "\u5B98\u65B9\u6296\u97F3\u53F7" },
      { key: "store-charity-project", label: "\u516C\u76CA\u9879\u76EE" }
    ]
  },
  {
    key: "order",
    title: "\u8BA2\u5355",
    icon: "ic-menu-trade-line",
    items: [
      { key: "order-group-buy-coupon", label: "\u56E2\u8D2D\u5238\u5904\u7406" },
      { key: "order-after-sale", label: "\u552E\u540E\u5904\u7406" }
    ]
  },
  {
    key: "finance",
    title: "\u8D22\u52A1",
    icon: "ic-wallet-line",
    items: [
      { key: "finance-daily-income", label: "\u6BCF\u65E5\u6536\u76CA" },
      { key: "finance-daily-arrival", label: "\u6BCF\u65E5\u5230\u8D26" },
      { key: "finance-withdraw-record", label: "\u63D0\u73B0\u8BB0\u5F55" },
      { key: "finance-service-fee-return", label: "\u670D\u52A1\u8D39\u8FD4\u8FD8\u8FD8" },
      { key: "finance-payment-account", label: "\u6536\u6B3E\u8D26\u6237" },
      { key: "finance-deposit", label: "\u4FDD\u8BC1\u91D1" },
      { key: "finance-relief-loan", label: "\u653E\u5FC3\u501F" },
      { key: "finance-marketing-account", label: "\u8425\u9500\u8D26\u6237" },
      { key: "finance-self-invoice", label: "\u81EA\u52A9\u5F00\u7968" },
      { key: "finance-merchant-invoice", label: "\u5546\u5BB6\u4EA4\u7968" }
    ]
  },
  {
    key: "creator-commerce",
    title: "\u8FBE\u4EBA\u5E26\u8D27",
    icon: "ic-commoditynew-line",
    items: [
      { key: "creator-commerce-store-promotion", label: "\u5168\u5E97\u63A8\u5E7F" },
      { key: "creator-commerce-plan-management", label: "\u8BA1\u5212\u7BA1\u7406" },
      { key: "creator-commerce-creator-square", label: "\u8FBE\u4EBA\u5E7F\u573A" },
      { key: "creator-commerce-ocean-engine-xingtu", label: "\u5DE8\u91CF\u661F\u56FE" }
    ]
  },
  {
    key: "content-promotion",
    title: "\u5185\u5BB9\u63A8\u5E7F",
    icon: "ic-trumpet-line",
    items: [
      { key: "content-promotion-customer-card", label: "\u83B7\u5BA2\u5361" },
      { key: "content-promotion-video-management", label: "\u89C6\u9891\u7BA1\u7406" },
      { key: "content-promotion-live-management", label: "\u76F4\u64AD\u7BA1\u7406" },
      { key: "content-promotion-live-pro", label: "\u76F4\u64AD\u4E13\u4E1A\u7248" },
      { key: "content-promotion-live-assistant", label: "\u76F4\u64AD\u52A9\u624B" },
      { key: "content-promotion-cash-wallet", label: "\u73B0\u91D1\u94B1\u5305" }
    ]
  }
];
var Menu = React11.forwardRef(
  ({
    className,
    activeItemKey,
    defaultActiveItemKey = "store-store-management",
    onItemChange,
    ...props
  }, ref) => {
    const [innerActiveItemKey, setInnerActiveItemKey] = useState2(defaultActiveItemKey);
    const [collapsedMap, setCollapsedMap] = useState2(
      () => Object.fromEntries(DEFAULT_MENU_GROUPS.map((group) => [group.key, Boolean(group.defaultCollapsed)]))
    );
    const effectiveActiveItemKey = activeItemKey != null ? activeItemKey : innerActiveItemKey;
    return /* @__PURE__ */ jsx11("div", { ref, className: clsx11("lds-menu", className), ...props, children: DEFAULT_MENU_GROUPS.map((group) => {
      var _a;
      const collapsed = (_a = collapsedMap[group.key]) != null ? _a : false;
      return /* @__PURE__ */ jsxs9("div", { className: clsx11("lds-menu-group", collapsed && "is-collapsed"), children: [
        /* @__PURE__ */ jsxs9(
          "div",
          {
            className: "lds-menu-group__header",
            onClick: () => setCollapsedMap((prev) => ({
              ...prev,
              [group.key]: !collapsed
            })),
            children: [
              /* @__PURE__ */ jsx11(Icon, { name: group.icon }),
              /* @__PURE__ */ jsx11("span", { className: "lds-menu-group__title", children: group.title }),
              /* @__PURE__ */ jsx11(Icon, { className: "lds-menu-group__action", name: collapsed ? "ic-arrow-down-line" : "ic-arrow-up-line" })
            ]
          }
        ),
        /* @__PURE__ */ jsx11("div", { className: "lds-menu-group__content", children: group.items.map((item) => /* @__PURE__ */ jsx11(
          "div",
          {
            className: clsx11(
              "lds-menu-item",
              item.key === effectiveActiveItemKey && "is-active"
            ),
            onClick: () => {
              if (activeItemKey === void 0) {
                setInnerActiveItemKey(item.key);
              }
              onItemChange == null ? void 0 : onItemChange(item.key);
            },
            children: item.label
          },
          item.key
        )) })
      ] }, group.key);
    }) });
  }
);
Menu.displayName = "Menu";

// src/components/PageHeader/PageHeader.tsx
import React12 from "react";
import { clsx as clsx12 } from "clsx";
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var PageHeader = React12.forwardRef(
  ({ className, title, tabs, ...props }, ref) => {
    return /* @__PURE__ */ jsxs10("div", { ref, className: clsx12("lds-page-header", className), ...props, children: [
      /* @__PURE__ */ jsx12("h1", { className: "lds-page-header__title", children: title }),
      tabs && /* @__PURE__ */ jsx12("div", { className: "lds-page-header__tabs", children: tabs })
    ] });
  }
);
PageHeader.displayName = "PageHeader";

// src/components/Table/Table.tsx
import React14 from "react";
import { clsx as clsx14 } from "clsx";

// src/components/Tag/Tag.tsx
import React13 from "react";
import { clsx as clsx13 } from "clsx";
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
var Tag = React13.forwardRef(
  ({
    className,
    size = "default-size",
    variant = "light",
    color = "gray",
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    const isInteractive = typeof props.onClick === "function";
    return /* @__PURE__ */ jsxs11(
      "span",
      {
        ref,
        className: clsx13(
          "lds-tag",
          `lds-tag--${size}`,
          `lds-tag--${variant}`,
          `lds-tag--${color}`,
          {
            "lds-tag--interactive": isInteractive
          },
          className
        ),
        ...props,
        children: [
          leftIcon ? /* @__PURE__ */ jsx13("span", { className: "lds-tag__icon lds-tag__icon--left", children: leftIcon }) : null,
          children ? /* @__PURE__ */ jsx13("span", { className: "lds-tag__content", children }) : null,
          rightIcon ? /* @__PURE__ */ jsx13("span", { className: "lds-tag__icon lds-tag__icon--right", children: rightIcon }) : null
        ]
      }
    );
  }
);
Tag.displayName = "Tag";

// src/components/Table/Table.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var TableWrapper = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx14("div", { ref, className: clsx14("lds-table-wrapper", className), ...props })
);
TableWrapper.displayName = "TableWrapper";
var Table = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx14("table", { ref, className: clsx14("lds-table", className), ...props })
);
Table.displayName = "Table";
var Thead = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx14("thead", { ref, className: clsx14("lds-table__thead", className), ...props })
);
Thead.displayName = "Thead";
var Tbody = React14.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx14("tbody", { ref, ...props })
);
Tbody.displayName = "Tbody";
var Tr = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx14("tr", { ref, className: clsx14("lds-table__row", className), ...props })
);
Tr.displayName = "Tr";
var Th = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx14("th", { ref, className: clsx14("lds-table__th", className), ...props })
);
Th.displayName = "Th";
var Td = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx14("td", { ref, className: clsx14("lds-table__td", className), ...props })
);
Td.displayName = "Td";
var TableCellProduct = ({ img, title, tag, tagVariant = "default", id }) => /* @__PURE__ */ jsxs12("div", { className: "lds-table-cell--product", children: [
  /* @__PURE__ */ jsx14("img", { src: img, alt: "\u5546\u54C1\u56FE", className: "lds-table-cell__product-img" }),
  /* @__PURE__ */ jsxs12("div", { className: "lds-table-cell__product-info", children: [
    /* @__PURE__ */ jsxs12("div", { className: "lds-table-cell__product-title-wrap", children: [
      /* @__PURE__ */ jsx14("h4", { className: "lds-table-cell__product-title", children: title }),
      tag && /* @__PURE__ */ jsx14(
        Tag,
        {
          size: "small",
          variant: tagVariant === "default" ? "outline" : "light",
          color: tagVariant === "orange" ? "orange" : tagVariant === "red" ? "red" : "gray",
          children: tag
        }
      )
    ] }),
    /* @__PURE__ */ jsx14("div", { className: "lds-table-cell__product-meta", children: /* @__PURE__ */ jsxs12("span", { className: "lds-table-cell__product-id", children: [
      "\u5546\u54C1ID\uFF1A",
      id
    ] }) })
  ] })
] });
var TableCellAmount = ({ children }) => /* @__PURE__ */ jsx14("div", { className: "lds-table-cell--amount", children });
var TableCellOperation = ({ children }) => /* @__PURE__ */ jsx14("div", { className: "lds-table-cell--operation", children });
var TableCellAction = React14.forwardRef(
  ({ className, danger, ...props }, ref) => /* @__PURE__ */ jsx14("a", { ref, className: clsx14("lds-table-cell__action", danger && "is-danger", className), ...props })
);
TableCellAction.displayName = "TableCellAction";

// src/components/Checkbox/Checkbox.tsx
import { forwardRef, useState as useState3 } from "react";
import { clsx as clsx15 } from "clsx";
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
var CHECKED_ICON_PATHS = {
  large: {
    viewBox: "0 0 22 22",
    path: "M14.3926 7.28591C14.7382 6.85522 15.3681 6.78612 15.7989 7.13162C16.2295 7.47719 16.2987 8.10708 15.9532 8.53787L10.8399 14.9129C10.6581 15.1393 10.3869 15.2752 10.0967 15.2859C9.80655 15.2966 9.52606 15.181 9.32815 14.9685L6.26761 11.6814C5.89159 11.2773 5.91449 10.6446 6.31839 10.2683C6.72262 9.89203 7.35614 9.91392 7.73245 10.3181L10.003 12.7576L14.3926 7.28591Z"
  },
  "default-size": {
    viewBox: "0 0 20 20",
    path: "M13.1746 6.48142C13.53 6.05876 14.161 6.00402 14.5837 6.35935C15.0064 6.71475 15.0611 7.34583 14.7058 7.76853L9.76538 13.6435C9.57861 13.8656 9.30457 13.9958 9.01441 14C8.72415 14.0041 8.44572 13.8818 8.25269 13.665L5.69312 10.79C5.32591 10.3775 5.36269 9.74515 5.77515 9.37791C6.18763 9.01074 6.82002 9.04749 7.18726 9.45994L8.97827 11.4717L13.1746 6.48142Z"
  },
  small: {
    viewBox: "0 0 18 18",
    path: "M11.5469 5.93752C11.8574 5.54938 12.4244 5.48639 12.8125 5.79689C13.2006 6.1074 13.2636 6.67438 12.9531 7.06252L8.95312 12.0625C8.79321 12.2624 8.55539 12.3843 8.2998 12.3985C8.04419 12.4126 7.79429 12.3178 7.61327 12.1367L5.11327 9.63674C4.7618 9.28527 4.7618 8.71477 5.11327 8.3633C5.46475 8.01183 6.03524 8.01183 6.38671 8.3633L8.1748 10.1514L11.5469 5.93752Z"
  }
};
var INDETERMINATE_ICON_PATHS = {
  large: {
    viewBox: "0 0 22 22",
    path: "M15.5 10C16.0523 10 16.5 10.4477 16.5 11C16.5 11.5523 16.0523 12 15.5 12H6.5C5.94772 12 5.5 11.5523 5.5 11C5.5 10.4477 5.94772 10 6.5 10H15.5Z"
  },
  "default-size": {
    viewBox: "0 0 20 20",
    path: "M14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9H14Z"
  },
  small: {
    viewBox: "0 0 18 18",
    path: "M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H6C5.58579 9.75 5.25 9.41421 5.25 9C5.25 8.58579 5.58579 8.25 6 8.25H12Z"
  }
};
var Checkbox = forwardRef(
  ({
    className,
    size = "default-size",
    indeterminate = false,
    showLabel = false,
    label,
    checked,
    disabled = false,
    readOnly = false,
    onChange,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState3(() => {
      return Boolean(props.defaultChecked);
    });
    const isControlled = checked !== void 0;
    const currentChecked = isControlled ? checked : internalChecked;
    const iconConfig = indeterminate ? INDETERMINATE_ICON_PATHS[size] : CHECKED_ICON_PATHS[size];
    const handleChange = (e) => {
      if (disabled || readOnly) return;
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange == null ? void 0 : onChange(e);
    };
    return /* @__PURE__ */ jsxs13(
      "label",
      {
        className: clsx15(
          "lds-checkbox",
          `lds-checkbox--${size}`,
          {
            "lds-checkbox--checked": currentChecked && !indeterminate,
            "lds-checkbox--indeterminate": indeterminate,
            "lds-checkbox--disabled": disabled
          },
          className
        ),
        children: [
          /* @__PURE__ */ jsxs13("span", { className: "lds-checkbox__input-wrapper", children: [
            /* @__PURE__ */ jsx15(
              "input",
              {
                type: "checkbox",
                className: "lds-checkbox__input",
                checked: currentChecked,
                disabled,
                readOnly,
                "aria-checked": indeterminate ? "mixed" : currentChecked,
                onChange: handleChange,
                ref,
                ...props
              }
            ),
            /* @__PURE__ */ jsx15("span", { className: "lds-checkbox__inner", children: /* @__PURE__ */ jsx15("span", { className: "lds-checkbox__icon", children: /* @__PURE__ */ jsx15("svg", { viewBox: iconConfig.viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ jsx15("path", { d: iconConfig.path, fill: "currentColor" }) }) }) })
          ] }),
          showLabel && label ? /* @__PURE__ */ jsx15("span", { className: "lds-checkbox__label", children: label }) : null
        ]
      }
    );
  }
);
Checkbox.displayName = "Checkbox";

// src/components/Pagination/Pagination.tsx
import React16, { useEffect, useMemo, useState as useState4 } from "react";
import { clsx as clsx16 } from "clsx";
import { jsx as jsx16, jsxs as jsxs14 } from "react/jsx-runtime";
function clampInt(n, min, max) {
  if (!Number.isFinite(n)) return min;
  const x = Math.trunc(n);
  return Math.min(max, Math.max(min, x));
}
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}
function getPageItems(current, totalPages, siblingCount) {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) return range(1, totalPages);
  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;
  const firstPageIndex = 1;
  const lastPageIndex = totalPages;
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, "ellipsis", lastPageIndex];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, "ellipsis", ...rightRange];
  }
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [firstPageIndex, "ellipsis", ...middleRange, "ellipsis", lastPageIndex];
}
var Pagination = React16.forwardRef(
  ({
    className,
    size = "default-size",
    total,
    current,
    defaultCurrent = 1,
    pageSize,
    defaultPageSize,
    pageSizeOptions = [10, 20, 50],
    showSizeChanger = true,
    showQuickJumper = true,
    hideOnSinglePage = true,
    disabled = false,
    siblingCount = 1,
    onChange,
    onPageSizeChange,
    showTotal,
    ...props
  }, ref) => {
    const isPageControlled = current !== void 0;
    const isPageSizeControlled = pageSize !== void 0;
    const [innerCurrent, setInnerCurrent] = useState4(() => defaultCurrent);
    const [innerPageSize, setInnerPageSize] = useState4(() => {
      var _a;
      return (_a = defaultPageSize != null ? defaultPageSize : pageSizeOptions[0]) != null ? _a : 10;
    });
    const [jumpValue, setJumpValue] = useState4("");
    const effectivePageSize = isPageSizeControlled ? pageSize : innerPageSize;
    const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, effectivePageSize)));
    const effectiveCurrent = clampInt(isPageControlled ? current : innerCurrent, 1, totalPages);
    useEffect(() => {
      if (!isPageControlled && innerCurrent !== effectiveCurrent) {
        setInnerCurrent(effectiveCurrent);
      }
    }, [effectiveCurrent, isPageControlled, totalPages]);
    const items = useMemo(() => {
      return getPageItems(effectiveCurrent, totalPages, siblingCount);
    }, [effectiveCurrent, totalPages, siblingCount]);
    const pageRange = useMemo(() => {
      if (total <= 0) return [0, 0];
      const start = (effectiveCurrent - 1) * effectivePageSize + 1;
      const end = Math.min(total, effectiveCurrent * effectivePageSize);
      return [start, end];
    }, [effectiveCurrent, effectivePageSize, total]);
    const emitChange = (nextPage, nextPageSize) => {
      onChange == null ? void 0 : onChange(nextPage, nextPageSize);
    };
    const setPage = (nextPage) => {
      if (disabled) return;
      const p = clampInt(nextPage, 1, totalPages);
      if (!isPageControlled) setInnerCurrent(p);
      emitChange(p, effectivePageSize);
    };
    const setSize = (nextSize) => {
      if (disabled) return;
      const nextPageSize = Math.max(1, Math.trunc(nextSize));
      if (!isPageSizeControlled) setInnerPageSize(nextPageSize);
      onPageSizeChange == null ? void 0 : onPageSizeChange(nextPageSize);
      if (!isPageControlled) setInnerCurrent(1);
      emitChange(1, nextPageSize);
    };
    const handleQuickJumpCommit = () => {
      if (disabled) return;
      const trimmed = jumpValue.trim();
      if (!trimmed) return;
      const parsed = Number(trimmed);
      if (!Number.isFinite(parsed)) return;
      setPage(parsed);
      setJumpValue("");
    };
    if (hideOnSinglePage && totalPages <= 1) return null;
    const canPrev = effectiveCurrent > 1;
    const canNext = effectiveCurrent < totalPages;
    return /* @__PURE__ */ jsxs14(
      "nav",
      {
        ref,
        className: clsx16("lds-pagination", `lds-pagination--${size}`, className),
        "aria-label": "Pagination",
        ...props,
        children: [
          showTotal ? /* @__PURE__ */ jsx16("span", { className: "lds-pagination__total", children: showTotal(total, pageRange) }) : null,
          /* @__PURE__ */ jsxs14("div", { className: "lds-pagination__pages", children: [
            /* @__PURE__ */ jsx16(
              "button",
              {
                type: "button",
                className: "lds-pagination__arrow lds-pagination__arrow--prev",
                onClick: () => setPage(effectiveCurrent - 1),
                disabled: disabled || !canPrev,
                "aria-label": "Previous Page",
                children: /* @__PURE__ */ jsx16(Icon, { className: "lds-pagination__icon", name: "ic-arrow-left-line", "aria-hidden": "true" })
              }
            ),
            items.map((it, idx) => {
              if (it === "ellipsis") {
                return /* @__PURE__ */ jsx16("span", { className: "lds-pagination__ellipsis", "aria-hidden": "true", children: "..." }, `ellipsis-${idx}`);
              }
              const page = it;
              const isActive = page === effectiveCurrent;
              return /* @__PURE__ */ jsx16(
                "button",
                {
                  type: "button",
                  className: clsx16("lds-pagination__item", isActive && "is-active"),
                  onClick: () => setPage(page),
                  disabled,
                  "aria-current": isActive ? "page" : void 0,
                  "aria-label": `Page ${page}`,
                  children: page
                },
                page
              );
            }),
            /* @__PURE__ */ jsx16(
              "button",
              {
                type: "button",
                className: "lds-pagination__arrow lds-pagination__arrow--next",
                onClick: () => setPage(effectiveCurrent + 1),
                disabled: disabled || !canNext,
                "aria-label": "Next Page",
                children: /* @__PURE__ */ jsx16(Icon, { className: "lds-pagination__icon", name: "ic-arrow-right-line", "aria-hidden": "true" })
              }
            )
          ] }),
          showSizeChanger ? /* @__PURE__ */ jsxs14("div", { className: "lds-pagination__size-changer", children: [
            /* @__PURE__ */ jsx16(
              "select",
              {
                className: "lds-pagination__size-select",
                value: effectivePageSize,
                onChange: (e) => setSize(Number(e.target.value)),
                disabled,
                "aria-label": "Page Size",
                children: pageSizeOptions.map((n) => /* @__PURE__ */ jsxs14("option", { value: n, children: [
                  n,
                  "\u6761/\u9875"
                ] }, n))
              }
            ),
            /* @__PURE__ */ jsxs14("span", { className: "lds-pagination__size-label", children: [
              effectivePageSize,
              "\u6761/\u9875"
            ] }),
            /* @__PURE__ */ jsx16(Icon, { className: "lds-pagination__size-icon", name: "ic-arrow-down-line", "aria-hidden": "true" })
          ] }) : null,
          showQuickJumper ? /* @__PURE__ */ jsxs14("div", { className: "lds-pagination__quick-jumper", children: [
            /* @__PURE__ */ jsx16("span", { className: "lds-pagination__quick-text", children: "\u8DF3\u81F3" }),
            /* @__PURE__ */ jsx16("span", { className: "lds-pagination__quick-input", children: /* @__PURE__ */ jsx16(
              Input,
              {
                size: "small",
                value: jumpValue,
                onChange: (e) => setJumpValue(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleQuickJumpCommit();
                },
                onBlur: handleQuickJumpCommit,
                disabled,
                inputMode: "numeric",
                pattern: "[0-9]*",
                placeholder: "",
                "aria-label": "Jump To Page"
              }
            ) }),
            /* @__PURE__ */ jsx16("span", { className: "lds-pagination__quick-text", children: "\u9875" })
          ] }) : null
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";

// src/components/Drawer/Drawer.tsx
import React17, { useEffect as useEffect2, useId, useMemo as useMemo2, useState as useState5 } from "react";
import { createPortal } from "react-dom";
import { clsx as clsx17 } from "clsx";
import { jsx as jsx17, jsxs as jsxs15 } from "react/jsx-runtime";
var DRAWER_ANIMATION_MS = 280;
var Drawer = React17.forwardRef(
  ({
    className,
    open = false,
    title,
    size = "default-size",
    footer,
    showFooter,
    extra,
    children,
    maskClosable = true,
    closeOnEsc = true,
    showCloseButton = true,
    onClose,
    getContainer,
    width,
    bodyClassName,
    closeLabel = "\u5173\u95ED\u62BD\u5C49",
    style,
    ...props
  }, ref) => {
    const titleId = useId();
    const [shouldRender, setShouldRender] = useState5(open);
    const [visible, setVisible] = useState5(false);
    const container = useMemo2(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    useEffect2(() => {
      if (open) {
        setShouldRender(true);
        setVisible(false);
        let rafId2 = 0;
        const rafId1 = window.requestAnimationFrame(() => {
          rafId2 = window.requestAnimationFrame(() => {
            setVisible(true);
          });
        });
        return () => {
          window.cancelAnimationFrame(rafId1);
          window.cancelAnimationFrame(rafId2);
        };
      }
      setVisible(false);
      const timer = window.setTimeout(() => {
        setShouldRender(false);
      }, DRAWER_ANIMATION_MS);
      return () => window.clearTimeout(timer);
    }, [open]);
    useEffect2(() => {
      if (!shouldRender || !closeOnEsc) {
        return void 0;
      }
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose == null ? void 0 : onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeOnEsc, onClose, shouldRender]);
    useEffect2(() => {
      if (!shouldRender || typeof document === "undefined") {
        return void 0;
      }
      const { body } = document;
      const previousOverflow = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = previousOverflow;
      };
    }, [shouldRender]);
    if (!shouldRender || !container) {
      return null;
    }
    const mergedStyle = {
      ...style,
      ...width !== void 0 ? {
        ["--lds-drawer-width"]: typeof width === "number" ? `${width}px` : width
      } : null
    };
    const shouldShowFooter = showFooter != null ? showFooter : footer !== void 0;
    return createPortal(
      /* @__PURE__ */ jsxs15(
        "div",
        {
          className: clsx17("lds-drawer-root", visible && "is-open"),
          onClick: (event) => {
            if (event.target === event.currentTarget && maskClosable) {
              onClose == null ? void 0 : onClose();
            }
          },
          children: [
            /* @__PURE__ */ jsx17("div", { className: "lds-drawer-root__mask", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs15(
              "div",
              {
                ref,
                className: clsx17("lds-drawer", `lds-drawer--${size}`, className),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? titleId : void 0,
                style: mergedStyle,
                ...props,
                children: [
                  /* @__PURE__ */ jsxs15("div", { className: "lds-drawer__header", children: [
                    /* @__PURE__ */ jsxs15("div", { className: "lds-drawer__header-main", children: [
                      title ? /* @__PURE__ */ jsx17("h2", { id: titleId, className: "lds-drawer__title", children: title }) : null,
                      extra ? /* @__PURE__ */ jsx17("div", { className: "lds-drawer__extra", children: extra }) : null
                    ] }),
                    showCloseButton ? /* @__PURE__ */ jsx17(
                      "button",
                      {
                        type: "button",
                        className: "lds-drawer__close",
                        onClick: () => onClose == null ? void 0 : onClose(),
                        "aria-label": closeLabel,
                        children: /* @__PURE__ */ jsx17(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ jsx17("div", { className: clsx17("lds-drawer__body", bodyClassName), children }),
                  shouldShowFooter ? /* @__PURE__ */ jsx17("div", { className: "lds-drawer__footer", children: footer }) : null
                ]
              }
            )
          ]
        }
      ),
      container
    );
  }
);
Drawer.displayName = "Drawer";

// src/components/Dialog/Dialog.tsx
import React18, { useEffect as useEffect3, useId as useId2, useMemo as useMemo3, useState as useState6 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { clsx as clsx18 } from "clsx";
import { jsx as jsx18, jsxs as jsxs16 } from "react/jsx-runtime";
var DIALOG_ANIMATION_MS = 300;
var DIALOG_ICON_MAP = {
  neutral: "ic-info-round-fill",
  warning: "ic-warning-round-fill",
  danger: "ic-error-round-fill",
  success: "ic-finish-round-fill"
};
var Dialog = React18.forwardRef(
  ({
    className,
    open = false,
    title,
    description,
    type = "neutral",
    icon,
    showIcon = true,
    footer,
    showFooter,
    children,
    maskClosable = true,
    closeOnEsc = true,
    showCloseButton = true,
    onClose,
    getContainer,
    width,
    bodyClassName,
    closeLabel = "\u5173\u95ED\u5BF9\u8BDD\u6846",
    style,
    ...props
  }, ref) => {
    const titleId = useId2();
    const descriptionId = useId2();
    const [shouldRender, setShouldRender] = useState6(open);
    const [visible, setVisible] = useState6(false);
    const container = useMemo3(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    useEffect3(() => {
      if (open) {
        setShouldRender(true);
        setVisible(false);
        let rafId2 = 0;
        const rafId1 = window.requestAnimationFrame(() => {
          rafId2 = window.requestAnimationFrame(() => {
            setVisible(true);
          });
        });
        return () => {
          window.cancelAnimationFrame(rafId1);
          window.cancelAnimationFrame(rafId2);
        };
      }
      setVisible(false);
      const timer = window.setTimeout(() => {
        setShouldRender(false);
      }, DIALOG_ANIMATION_MS);
      return () => window.clearTimeout(timer);
    }, [open]);
    useEffect3(() => {
      if (!shouldRender || !closeOnEsc) {
        return void 0;
      }
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose == null ? void 0 : onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeOnEsc, onClose, shouldRender]);
    useEffect3(() => {
      if (!shouldRender || typeof document === "undefined") {
        return void 0;
      }
      const { body } = document;
      const previousOverflow = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = previousOverflow;
      };
    }, [shouldRender]);
    if (!shouldRender || !container) {
      return null;
    }
    const mergedStyle = {
      ...style,
      ...width !== void 0 ? {
        ["--lds-dialog-width"]: typeof width === "number" ? `${width}px` : width
      } : null
    };
    const shouldShowFooter = showFooter != null ? showFooter : footer !== void 0;
    const resolvedIcon = icon != null ? icon : type !== "custom" ? /* @__PURE__ */ jsx18(Icon, { name: DIALOG_ICON_MAP[type], "aria-hidden": "true" }) : null;
    return createPortal2(
      /* @__PURE__ */ jsxs16(
        "div",
        {
          className: clsx18("lds-dialog-root", visible && "is-open"),
          onClick: (event) => {
            if (event.target === event.currentTarget && maskClosable) {
              onClose == null ? void 0 : onClose();
            }
          },
          children: [
            /* @__PURE__ */ jsx18("div", { className: "lds-dialog-root__mask", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs16(
              "div",
              {
                ref,
                className: clsx18("lds-dialog", `lds-dialog--${type}`, className),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? titleId : void 0,
                "aria-describedby": description ? descriptionId : void 0,
                style: mergedStyle,
                ...props,
                children: [
                  /* @__PURE__ */ jsxs16("div", { className: clsx18("lds-dialog__body", bodyClassName), children: [
                    /* @__PURE__ */ jsxs16("div", { className: "lds-dialog__main", children: [
                      showIcon && resolvedIcon ? /* @__PURE__ */ jsx18("div", { className: "lds-dialog__icon", "aria-hidden": "true", children: resolvedIcon }) : null,
                      /* @__PURE__ */ jsxs16("div", { className: "lds-dialog__content", children: [
                        title ? /* @__PURE__ */ jsx18("h2", { id: titleId, className: "lds-dialog__title", children: title }) : null,
                        description ? /* @__PURE__ */ jsx18("div", { id: descriptionId, className: "lds-dialog__description", children: description }) : null,
                        children ? /* @__PURE__ */ jsx18("div", { className: "lds-dialog__extra", children }) : null
                      ] })
                    ] }),
                    showCloseButton ? /* @__PURE__ */ jsx18(
                      "button",
                      {
                        type: "button",
                        className: "lds-dialog__close",
                        onClick: () => onClose == null ? void 0 : onClose(),
                        "aria-label": closeLabel,
                        children: /* @__PURE__ */ jsx18(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ] }),
                  shouldShowFooter ? /* @__PURE__ */ jsx18("div", { className: "lds-dialog__footer", children: footer }) : null
                ]
              }
            )
          ]
        }
      ),
      container
    );
  }
);
Dialog.displayName = "Dialog";

// src/components/Upload/Upload.tsx
import React19 from "react";
import { clsx as clsx19 } from "clsx";
import { jsx as jsx19, jsxs as jsxs17 } from "react/jsx-runtime";
var DEFAULT_TRIGGER_TEXT = "\u4E0A\u4F20";
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => {
      var _a;
      return reject((_a = reader.error) != null ? _a : new Error("Failed to read file."));
    };
    reader.readAsDataURL(file);
  });
}
var Upload = React19.forwardRef(
  ({
    className,
    value,
    defaultValue = [],
    onChange,
    disabled = false,
    accept = "image/*",
    multiple = false,
    maxCount = 1,
    triggerText = DEFAULT_TRIGGER_TEXT,
    visualState = "normal",
    error,
    inputId,
    name,
    removeAriaLabel = "\u5220\u9664\u56FE\u7247",
    triggerAriaLabel = "\u4E0A\u4F20\u56FE\u7247",
    children,
    ...props
  }, ref) => {
    var _a;
    const { hasError } = useFormItemStatus();
    const inputRef = React19.useRef(null);
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = React19.useState(defaultValue);
    const mergedValue = (_a = isControlled ? value : innerValue) != null ? _a : [];
    const visibleItems = mergedValue.slice(0, maxCount);
    const shouldRenderTrigger = visibleItems.length < maxCount;
    const mergedError = error != null ? error : hasError;
    const mergedVisualState = mergedError ? "error" : visualState;
    const updateValue = React19.useCallback(
      (nextValue) => {
        const normalized = nextValue.slice(0, maxCount);
        if (!isControlled) {
          setInnerValue(normalized);
        }
        onChange == null ? void 0 : onChange(normalized);
      },
      [isControlled, maxCount, onChange]
    );
    const handleSelectFiles = React19.useCallback(
      async (event) => {
        var _a2;
        const files = Array.from((_a2 = event.target.files) != null ? _a2 : []);
        if (!files.length) {
          return;
        }
        const availableCount = Math.max(maxCount - visibleItems.length, 0);
        const selectedFiles = files.slice(0, availableCount);
        try {
          const nextItems = await Promise.all(
            selectedFiles.map(async (file, index) => ({
              id: `${file.name}-${file.lastModified}-${index}`,
              name: file.name,
              url: await readFileAsDataUrl(file),
              file
            }))
          );
          updateValue([...visibleItems, ...nextItems]);
        } finally {
          event.target.value = "";
        }
      },
      [maxCount, updateValue, visibleItems]
    );
    const handleRemove = React19.useCallback(
      (index) => {
        const nextItems = visibleItems.filter((_, currentIndex) => currentIndex !== index);
        updateValue(nextItems);
      },
      [updateValue, visibleItems]
    );
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        ref,
        className: clsx19("lds-upload", disabled && "is-disabled", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx19(
            "input",
            {
              ref: inputRef,
              id: inputId,
              className: "lds-upload__input",
              type: "file",
              accept,
              multiple,
              name,
              disabled,
              onChange: handleSelectFiles
            }
          ),
          /* @__PURE__ */ jsxs17("div", { className: "lds-upload__list", children: [
            visibleItems.map((item, index) => {
              var _a2, _b, _c;
              return /* @__PURE__ */ jsxs17(
                "div",
                {
                  className: "lds-upload__item",
                  children: [
                    /* @__PURE__ */ jsx19(
                      "img",
                      {
                        className: "lds-upload__image",
                        src: item.url,
                        alt: (_c = item.name) != null ? _c : `\u5DF2\u4E0A\u4F20\u56FE\u7247 ${index + 1}`
                      }
                    ),
                    !disabled ? /* @__PURE__ */ jsx19(
                      "button",
                      {
                        type: "button",
                        className: "lds-upload__remove",
                        "aria-label": removeAriaLabel,
                        onClick: () => handleRemove(index),
                        children: /* @__PURE__ */ jsx19(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ]
                },
                (_b = (_a2 = item.id) != null ? _a2 : item.url) != null ? _b : `${index}`
              );
            }),
            shouldRenderTrigger ? /* @__PURE__ */ jsxs17(
              "button",
              {
                type: "button",
                className: clsx19(
                  "lds-upload__trigger",
                  mergedVisualState === "hover" && "is-hover",
                  mergedVisualState === "active" && "is-active",
                  mergedVisualState === "error" && "is-error"
                ),
                disabled,
                onClick: () => {
                  var _a2;
                  return (_a2 = inputRef.current) == null ? void 0 : _a2.click();
                },
                "aria-label": triggerAriaLabel,
                children: [
                  /* @__PURE__ */ jsx19(Icon, { name: "ic-add-line", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx19("span", { className: "lds-upload__text", children: triggerText })
                ]
              }
            ) : null
          ] }),
          children ? /* @__PURE__ */ jsx19("div", { className: "lds-upload__extra", children }) : null
        ]
      }
    );
  }
);
Upload.displayName = "Upload";
export {
  Button,
  Capsule,
  Checkbox,
  Dialog,
  Drawer,
  Filter,
  FilterGroup,
  Form,
  FormItem,
  Icon,
  Input,
  Menu,
  Navbar,
  PageHeader,
  Pagination,
  Tab,
  Table,
  TableCellAction,
  TableCellAmount,
  TableCellOperation,
  TableCellProduct,
  TableWrapper,
  Tabs,
  Tag,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  Upload,
  useFormItemStatus
};
