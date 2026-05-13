"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Capsule: () => Capsule,
  Checkbox: () => Checkbox,
  Dialog: () => Dialog,
  Drawer: () => Drawer,
  Filter: () => Filter,
  FilterDatePicker: () => FilterDatePicker,
  FilterGroup: () => FilterGroup,
  FilterSelect: () => FilterSelect,
  FilterTimePicker: () => FilterTimePicker,
  Form: () => Form,
  FormItem: () => FormItem,
  Icon: () => Icon,
  Input: () => Input,
  Menu: () => Menu,
  Navbar: () => Navbar,
  PageHeader: () => PageHeader,
  Pagination: () => Pagination,
  Popover: () => Popover,
  Tab: () => Tab,
  Table: () => Table,
  TableCellAction: () => TableCellAction,
  TableCellAmount: () => TableCellAmount,
  TableCellOperation: () => TableCellOperation,
  TableCellProduct: () => TableCellProduct,
  TableWrapper: () => TableWrapper,
  Tabs: () => Tabs,
  Tag: () => Tag,
  Tbody: () => Tbody,
  Td: () => Td,
  Textarea: () => Textarea,
  Th: () => Th,
  Thead: () => Thead,
  Tr: () => Tr,
  Upload: () => Upload,
  useFormItemStatus: () => useFormItemStatus
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/Button.tsx
var import_react = __toESM(require("react"));
var import_clsx = require("clsx");
var import_jsx_runtime = require("react/jsx-runtime");
var Button = import_react.default.forwardRef(
  ({ className, size = "default-size", variant = "default", icon, children, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref,
        className: (0, import_clsx.clsx)(
          "lds-btn",
          `lds-btn--${size}`,
          `lds-btn--${variant}`,
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lds-btn__icon", children: icon }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Icon/Icon.tsx
var import_react2 = __toESM(require("react"));
var import_clsx2 = require("clsx");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Icon = import_react2.default.forwardRef(
  ({ name, className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { ref, className: (0, import_clsx2.clsx)("icon", className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("use", { href: `#${name}` }) });
  }
);
Icon.displayName = "Icon";

// src/components/Capsule/Capsule.tsx
var import_react3 = __toESM(require("react"));
var import_clsx3 = require("clsx");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Capsule = import_react3.default.forwardRef(
  ({ className, size = "default-size", label, disabled, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: (0, import_clsx3.clsx)("lds-capsule-wrapper", className, disabled && "is-disabled"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "radio", ref, disabled, ...props }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: (0, import_clsx3.clsx)("lds-capsule", `lds-capsule--${size}`), children: label })
    ] });
  }
);
Capsule.displayName = "Capsule";

// src/components/Input/Input.tsx
var import_react5 = __toESM(require("react"));
var import_clsx5 = require("clsx");

// src/components/Form/Form.tsx
var import_react4 = __toESM(require("react"));
var import_clsx4 = require("clsx");
var import_jsx_runtime4 = require("react/jsx-runtime");
var DEFAULT_LABEL_WIDTH = "90px";
var DEFAULT_LAYOUT = "horizontal";
var FormLayoutContext = import_react4.default.createContext(DEFAULT_LAYOUT);
var FormItemStatusContext = import_react4.default.createContext({ hasError: false });
function toCssSize(value) {
  if (value === void 0) {
    return void 0;
  }
  return typeof value === "number" ? `${value}px` : value;
}
function useFormItemStatus() {
  return import_react4.default.useContext(FormItemStatusContext);
}
var Form = import_react4.default.forwardRef(
  ({ className, style, labelWidth = 90, layout = DEFAULT_LAYOUT, ...props }, ref) => {
    var _a;
    const mergedStyle = {
      ...style,
      ["--lds-form-label-width"]: (_a = toCssSize(labelWidth)) != null ? _a : DEFAULT_LABEL_WIDTH
    };
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormLayoutContext.Provider, { value: layout, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        ref,
        className: (0, import_clsx4.clsx)("lds-form", `lds-form--${layout}`, className),
        style: mergedStyle,
        ...props
      }
    ) });
  }
);
Form.displayName = "Form";
var FormItem = import_react4.default.forwardRef(
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
    layout,
    children,
    style,
    ...props
  }, ref) => {
    const inheritedLayout = import_react4.default.useContext(FormLayoutContext);
    const resolvedLayout = layout != null ? layout : inheritedLayout;
    const message = error != null ? error : description;
    const hasError = error !== void 0 && error !== null && error !== false;
    const shouldRenderTooltip = Boolean(tooltip) || Boolean(onTooltipClick);
    const mergedStyle = {
      ...style,
      ...labelWidth !== void 0 ? {
        ["--lds-form-label-width"]: toCssSize(labelWidth)
      } : null
    };
    const labelContent = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "lds-form-item__label-text", children: label }),
      shouldRenderTooltip ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: "lds-form-item__tooltip",
          title: tooltip,
          "aria-label": tooltipAriaLabel,
          onClick: onTooltipClick,
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "ic-help-line", "aria-hidden": "true" })
        }
      ) : null,
      required ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "lds-form-item__required", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "ic-required-line" }) }) : null
    ] });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        ref,
        className: (0, import_clsx4.clsx)("lds-form-item", `lds-form-item--${resolvedLayout}`, className),
        style: mergedStyle,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "lds-form-item__label", children: htmlFor ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "lds-form-item__label-inner", htmlFor, children: labelContent }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "lds-form-item__label-inner", children: labelContent }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "lds-form-item__main", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormItemStatusContext.Provider, { value: { hasError }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "lds-form-item__control", children }) }),
            message ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: (0, import_clsx4.clsx)("lds-form-item__message", hasError && "is-error"),
                role: hasError ? "alert" : void 0,
                children: message
              }
            ) : null
          ] })
        ]
      }
    );
  }
);
FormItem.displayName = "FormItem";

// src/components/Input/Input.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Input = import_react5.default.forwardRef(
  ({ className, wrapperClassName, size = "default-size", prefixIcon, suffixIcon, clearable, onClear, disabled, isFocused, error, showCount = false, value, defaultValue, maxLength, ...props }, ref) => {
    var _a;
    const { hasError } = useFormItemStatus();
    const mergedError = error != null ? error : hasError;
    const countValue = (_a = value != null ? value : defaultValue) != null ? _a : "";
    const currentLength = typeof countValue === "number" ? String(countValue).length : String(countValue).length;
    const countText = maxLength !== void 0 ? `${currentLength}/${maxLength}` : `${currentLength}`;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: (0, import_clsx5.clsx)(
          "lds-input-wrapper",
          `lds-input-wrapper--${size}`,
          disabled && "is-disabled",
          isFocused && "is-focused",
          mergedError && "is-error",
          wrapperClassName
        ),
        children: [
          prefixIcon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lds-input__prefix", children: prefixIcon }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "input",
            {
              ref,
              className: (0, import_clsx5.clsx)("lds-input", className),
              disabled,
              value,
              defaultValue,
              maxLength,
              ...props
            }
          ),
          showCount ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lds-input__count", children: countText }) : null,
          clearable && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lds-input__clear", onClick: onClear, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "ic-error-round" }) }),
          suffixIcon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "lds-input__suffix", children: suffixIcon })
        ]
      }
    );
  }
);
Input.displayName = "Input";

// src/components/Textarea/Textarea.tsx
var import_react6 = __toESM(require("react"));
var import_clsx6 = require("clsx");
var import_jsx_runtime6 = require("react/jsx-runtime");
function getTextLength(value) {
  if (typeof value === "string") {
    return value.length;
  }
  if (typeof value === "number") {
    return String(value).length;
  }
  return 0;
}
var Textarea = import_react6.default.forwardRef(
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
    const [innerValueLength, setInnerValueLength] = import_react6.default.useState(() => getTextLength(defaultValue));
    const mergedError = error != null ? error : hasError;
    const currentLength = isControlled ? getTextLength(value) : innerValueLength;
    const handleChange = import_react6.default.useCallback(
      (event) => {
        if (!isControlled) {
          setInnerValueLength(event.target.value.length);
        }
        onChange == null ? void 0 : onChange(event);
      },
      [isControlled, onChange]
    );
    const countText = maxLength !== void 0 ? `${currentLength}/${maxLength}` : `${currentLength}`;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: (0, import_clsx6.clsx)(
          "lds-textarea-wrapper",
          `lds-textarea-wrapper--${size}`,
          isFocused && "is-focused",
          mergedError && "is-error",
          disabled && "is-disabled",
          wrapperClassName
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "textarea",
            {
              ref,
              className: (0, import_clsx6.clsx)("lds-textarea", className),
              disabled,
              value,
              defaultValue,
              maxLength,
              onChange: handleChange,
              ...props
            }
          ),
          showCount ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "lds-textarea__footer", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "lds-textarea__count", children: countText }) }) : null,
          showResizeHandle ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "lds-textarea__resize-handle", "aria-hidden": "true" }) : null
        ]
      }
    );
  }
);
Textarea.displayName = "Textarea";

// src/components/Filter/Filter.tsx
var import_react7 = __toESM(require("react"));
var import_clsx7 = require("clsx");
var import_jsx_runtime7 = require("react/jsx-runtime");
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
var Filter = import_react7.default.forwardRef((props, ref) => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        ref,
        className: (0, import_clsx7.clsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__label", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__divider", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__control", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  const iconNode = rightIcon != null ? rightIcon : defaultIconName ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: defaultIconName, className: "lds-filter__icon-svg", "aria-hidden": "true" }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "button",
    {
      ref,
      type: "button",
      className: (0, import_clsx7.clsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__label", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__control", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__value", children: filled ? value : placeholder != null ? placeholder : value }) }),
        iconNode ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "lds-filter__icon", children: iconNode }) : null
      ]
    }
  );
});
Filter.displayName = "Filter";

// src/components/FilterSelect/FilterSelect.tsx
var import_react9 = __toESM(require("react"));
var import_clsx9 = require("clsx");

// src/components/Popover/Popover.tsx
var import_react8 = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_clsx8 = require("clsx");
var import_jsx_runtime8 = require("react/jsx-runtime");
var POPOVER_ANIMATION_MS = 180;
var VIEWPORT_PADDING = 16;
var mergeRefs = (...refs) => {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
        return;
      }
      ref.current = value;
    });
  };
};
var getFocusableTarget = (container) => {
  if (!container) return null;
  const selectors = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ];
  return container.querySelector(selectors.join(","));
};
var getPlacementSide = (placement) => {
  return placement.startsWith("top") ? "top" : "bottom";
};
var getPlacementAlign = (placement) => {
  if (placement.endsWith("end")) return "end";
  if (placement.endsWith("center")) return "center";
  return "start";
};
var getPositionForPlacement = (placement, anchorRect, contentRect, offset) => {
  const side = getPlacementSide(placement);
  const align = getPlacementAlign(placement);
  const top = side === "top" ? anchorRect.top - contentRect.height - offset : anchorRect.bottom + offset;
  let left = anchorRect.left;
  if (align === "center") {
    left = anchorRect.left + (anchorRect.width - contentRect.width) / 2;
  } else if (align === "end") {
    left = anchorRect.right - contentRect.width;
  }
  return { top, left, side };
};
var Popover = import_react8.default.forwardRef(
  ({
    trigger,
    children,
    className,
    style,
    open,
    defaultOpen = false,
    onOpenChange,
    placement = "bottom-start",
    offset = 8,
    matchTriggerWidth = false,
    closeOnClickOutside = true,
    closeOnEsc = true,
    getContainer,
    contentClassName,
    contentStyle,
    contentRole = "dialog",
    ...props
  }, ref) => {
    const contentId = (0, import_react8.useId)();
    const triggerRef = (0, import_react8.useRef)(null);
    const triggerWrapperRef = (0, import_react8.useRef)(null);
    const contentRef = (0, import_react8.useRef)(null);
    const [uncontrolledOpen, setUncontrolledOpen] = (0, import_react8.useState)(defaultOpen);
    const [shouldRender, setShouldRender] = (0, import_react8.useState)(defaultOpen);
    const [visible, setVisible] = (0, import_react8.useState)(false);
    const [resolvedPlacement, setResolvedPlacement] = (0, import_react8.useState)(placement);
    const [positionStyle, setPositionStyle] = (0, import_react8.useState)({
      top: 0,
      left: 0
    });
    const isControlled = open !== void 0;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const setOpen = (0, import_react8.useCallback)(
      (nextOpen) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange == null ? void 0 : onOpenChange(nextOpen);
      },
      [isControlled, onOpenChange]
    );
    const container = (0, import_react8.useMemo)(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    const updatePosition = (0, import_react8.useCallback)(() => {
      var _a, _b;
      const triggerElement2 = (_b = (_a = triggerRef.current) != null ? _a : getFocusableTarget(triggerWrapperRef.current)) != null ? _b : triggerWrapperRef.current;
      const contentElement = contentRef.current;
      if (!triggerElement2 || !contentElement) {
        return;
      }
      const anchorRect = triggerElement2.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const preferred = getPositionForPlacement(placement, anchorRect, contentRect, offset);
      let nextPlacement = placement;
      let nextTop = preferred.top;
      let nextLeft = preferred.left;
      const prefersBottom = getPlacementSide(placement) === "bottom";
      const canOpenBelow = anchorRect.bottom + offset + contentRect.height <= viewportHeight - VIEWPORT_PADDING;
      const canOpenAbove = anchorRect.top - offset - contentRect.height >= VIEWPORT_PADDING;
      if (prefersBottom && !canOpenBelow && canOpenAbove) {
        nextPlacement = placement.replace("bottom", "top");
      } else if (!prefersBottom && !canOpenAbove && canOpenBelow) {
        nextPlacement = placement.replace("top", "bottom");
      }
      const resolved = getPositionForPlacement(nextPlacement, anchorRect, contentRect, offset);
      nextTop = resolved.top;
      nextLeft = resolved.left;
      const clampedLeft = Math.min(
        Math.max(nextLeft, VIEWPORT_PADDING),
        Math.max(VIEWPORT_PADDING, viewportWidth - contentRect.width - VIEWPORT_PADDING)
      );
      const availableHeight = resolved.side === "bottom" ? viewportHeight - anchorRect.bottom - offset - VIEWPORT_PADDING : anchorRect.top - offset - VIEWPORT_PADDING;
      setResolvedPlacement(nextPlacement);
      setPositionStyle({
        top: Math.max(VIEWPORT_PADDING, nextTop),
        left: clampedLeft,
        minWidth: matchTriggerWidth ? anchorRect.width : void 0,
        maxHeight: Math.max(96, availableHeight)
      });
    }, [matchTriggerWidth, offset, placement]);
    (0, import_react8.useEffect)(() => {
      if (isOpen) {
        setShouldRender(true);
        setVisible(false);
        let rafId2 = 0;
        const rafId1 = window.requestAnimationFrame(() => {
          updatePosition();
          rafId2 = window.requestAnimationFrame(() => {
            updatePosition();
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
        var _a, _b;
        setShouldRender(false);
        const focusTarget = (_b = (_a = triggerRef.current) != null ? _a : getFocusableTarget(triggerWrapperRef.current)) != null ? _b : triggerWrapperRef.current;
        focusTarget == null ? void 0 : focusTarget.focus();
      }, POPOVER_ANIMATION_MS);
      return () => window.clearTimeout(timer);
    }, [isOpen, updatePosition]);
    (0, import_react8.useLayoutEffect)(() => {
      if (!shouldRender) {
        return void 0;
      }
      updatePosition();
      const handleWindowChange = () => updatePosition();
      window.addEventListener("resize", handleWindowChange);
      window.addEventListener("scroll", handleWindowChange, true);
      const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => updatePosition()) : null;
      if (triggerRef.current) {
        resizeObserver == null ? void 0 : resizeObserver.observe(triggerRef.current);
      }
      if (contentRef.current) {
        resizeObserver == null ? void 0 : resizeObserver.observe(contentRef.current);
      }
      return () => {
        window.removeEventListener("resize", handleWindowChange);
        window.removeEventListener("scroll", handleWindowChange, true);
        resizeObserver == null ? void 0 : resizeObserver.disconnect();
      };
    }, [shouldRender, updatePosition]);
    (0, import_react8.useEffect)(() => {
      if (!shouldRender || !closeOnEsc) {
        return void 0;
      }
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeOnEsc, setOpen, shouldRender]);
    (0, import_react8.useEffect)(() => {
      if (!shouldRender || !closeOnClickOutside) {
        return void 0;
      }
      const handlePointerDown = (event) => {
        const target = event.target;
        const wrapper = triggerWrapperRef.current;
        const contentElement = contentRef.current;
        if (!target) return;
        if ((wrapper == null ? void 0 : wrapper.contains(target)) || (contentElement == null ? void 0 : contentElement.contains(target))) {
          return;
        }
        setOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [closeOnClickOutside, setOpen, shouldRender]);
    const triggerElement = import_react8.default.cloneElement(trigger, {
      ref: mergeRefs(trigger.ref, triggerRef),
      "aria-expanded": isOpen,
      "aria-controls": shouldRender ? contentId : void 0,
      "aria-haspopup": contentRole === "dialog" ? "dialog" : contentRole,
      "data-state": isOpen ? "open" : "closed",
      onClick: (event) => {
        var _a, _b;
        (_b = (_a = trigger.props).onClick) == null ? void 0 : _b.call(_a, event);
        if (event.defaultPrevented) return;
        setOpen(!isOpen);
      }
    });
    const mergedContentStyle = {
      ...contentStyle,
      top: positionStyle.top,
      left: positionStyle.left,
      ...positionStyle.minWidth !== void 0 ? {
        minWidth: positionStyle.minWidth
      } : null,
      ...positionStyle.maxHeight !== void 0 ? {
        ["--lds-popover-max-height"]: `${positionStyle.maxHeight}px`
      } : null
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "span",
      {
        ref: triggerWrapperRef,
        className: (0, import_clsx8.clsx)("lds-popover-anchor", className),
        style,
        ...props,
        children: [
          triggerElement,
          shouldRender && container ? (0, import_react_dom.createPortal)(
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "div",
              {
                ref: mergeRefs(ref, contentRef),
                id: contentId,
                role: contentRole,
                className: (0, import_clsx8.clsx)("lds-popover", visible && "is-open", contentClassName),
                "data-state": isOpen ? "open" : "closed",
                "data-side": getPlacementSide(resolvedPlacement),
                "data-align": getPlacementAlign(resolvedPlacement),
                style: mergedContentStyle,
                children
              }
            ),
            container
          ) : null
        ]
      }
    );
  }
);
Popover.displayName = "Popover";

// src/components/FilterSelect/FilterSelect.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var useControllableState = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = (0, import_react9.useState)(defaultValue);
  const isControlled = value !== void 0;
  const stateValue = isControlled ? value : internalValue;
  const setValue = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange == null ? void 0 : onChange(nextValue);
  };
  return [stateValue, setValue];
};
var FilterSelect = import_react9.default.forwardRef(
  ({
    className,
    label,
    placeholder = "\u8BF7\u9009\u62E9",
    size = "default-size",
    disabled = false,
    isActive = false,
    filterClassName,
    width,
    value,
    defaultValue,
    options,
    open,
    defaultOpen = false,
    onOpenChange,
    onChange,
    matchTriggerWidth = true,
    panelWidth,
    ...props
  }, ref) => {
    const [selectedValue, setSelectedValue] = useControllableState({
      value,
      defaultValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const selectedOption = (0, import_react9.useMemo)(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue]
    );
    const trigger = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Filter,
      {
        type: "select",
        label,
        placeholder,
        size,
        disabled,
        className: filterClassName,
        width,
        isActive: isActive || isOpen,
        value: selectedOption == null ? void 0 : selectedOption.label
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Popover,
      {
        ref,
        trigger,
        open: isOpen,
        onOpenChange: setIsOpen,
        matchTriggerWidth,
        closeOnClickOutside: true,
        closeOnEsc: true,
        contentRole: "listbox",
        className,
        contentClassName: "lds-filter-select__popover",
        contentStyle: panelWidth !== void 0 ? { width: panelWidth } : void 0,
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "lds-filter-select__list", children: options.map((option) => {
          const selected = option.value === selectedValue;
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": selected,
              disabled: option.disabled,
              className: (0, import_clsx9.clsx)("lds-filter-select__option", {
                "is-selected": selected
              }),
              onClick: () => {
                if (option.disabled) return;
                setSelectedValue(option.value);
                onChange == null ? void 0 : onChange(option.value, option);
                setIsOpen(false);
              },
              children: [
                option.iconName ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "lds-filter-select__option-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: option.iconName }) }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "lds-filter-select__option-label", children: option.label }),
                selected ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "lds-filter-select__option-check", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "ic-finish-line" }) }) : null
              ]
            },
            option.value
          );
        }) })
      }
    );
  }
);
FilterSelect.displayName = "FilterSelect";

// src/components/FilterDatePicker/FilterDatePicker.tsx
var import_react10 = __toESM(require("react"));
var import_clsx10 = require("clsx");
var import_jsx_runtime10 = require("react/jsx-runtime");
var WEEK_DAYS = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
var useControllableState2 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = (0, import_react10.useState)(defaultValue);
  const isControlled = value !== void 0;
  const stateValue = isControlled ? value : internalValue;
  const setValue = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange == null ? void 0 : onChange(nextValue);
  };
  return [stateValue, setValue];
};
var formatDateValue = (date) => {
  if (!date) return void 0;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};
var isSameDate = (a, b) => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
var buildCalendarCells = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const startDate = new Date(year, month, 1 - startOffset);
  return Array.from({ length: 35 }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month
    };
  });
};
var FilterDatePicker = import_react10.default.forwardRef(
  ({
    className,
    label,
    placeholder = "\u8BF7\u9009\u62E9",
    size = "default-size",
    disabled = false,
    isActive = false,
    filterClassName,
    width,
    value,
    defaultValue = null,
    open,
    defaultOpen = false,
    onOpenChange,
    onChange,
    disabledDate,
    ...props
  }, ref) => {
    const [selectedDate, setSelectedDate] = useControllableState2({
      value,
      defaultValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState2({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const [visibleMonth, setVisibleMonth] = (0, import_react10.useState)(
      () => selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : /* @__PURE__ */ new Date()
    );
    const calendarCells = (0, import_react10.useMemo)(() => buildCalendarCells(visibleMonth), [visibleMonth]);
    const trigger = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Filter,
      {
        type: "date",
        label,
        placeholder,
        size,
        disabled,
        className: filterClassName,
        width,
        isActive: isActive || isOpen,
        value: formatDateValue(selectedDate)
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Popover,
      {
        ref,
        trigger,
        open: isOpen,
        onOpenChange: (nextOpen) => {
          if (nextOpen) {
            setVisibleMonth(
              selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : /* @__PURE__ */ new Date()
            );
          }
          setIsOpen(nextOpen);
        },
        className,
        contentClassName: "lds-filter-date-picker__popover",
        contentStyle: { width: 380 },
        closeOnClickOutside: true,
        closeOnEsc: true,
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "lds-filter-date-picker", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "lds-filter-date-picker__header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "lds-filter-date-picker__nav-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "button",
                {
                  type: "button",
                  className: "lds-filter-date-picker__nav",
                  onClick: () => setVisibleMonth(
                    new Date(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1)
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "ic-\bdouble-left-line", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "button",
                {
                  type: "button",
                  className: "lds-filter-date-picker__nav",
                  onClick: () => setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "ic-arrow-left-line", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "lds-filter-date-picker__title", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { children: [
                visibleMonth.getFullYear(),
                "\u5E74"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { children: [
                visibleMonth.getMonth() + 1,
                "\u6708"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "lds-filter-date-picker__nav-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "button",
                {
                  type: "button",
                  className: "lds-filter-date-picker__nav",
                  onClick: () => setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "ic-arrow-right-line", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "button",
                {
                  type: "button",
                  className: "lds-filter-date-picker__nav",
                  onClick: () => setVisibleMonth(
                    new Date(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1)
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { name: "ic-\b\bdouble-right-line", "aria-hidden": "true" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "lds-filter-date-picker__weekdays", children: WEEK_DAYS.map((weekDay) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "lds-filter-date-picker__weekday", children: weekDay }, weekDay)) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "lds-filter-date-picker__grid", children: calendarCells.map((cell) => {
            var _a;
            const isSelected = isSameDate(cell.date, selectedDate);
            const isDisabled = (_a = disabledDate == null ? void 0 : disabledDate(cell.date)) != null ? _a : false;
            return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "button",
              {
                type: "button",
                disabled: isDisabled,
                className: (0, import_clsx10.clsx)("lds-filter-date-picker__cell", {
                  "is-outside": !cell.isCurrentMonth,
                  "is-selected": isSelected
                }),
                onClick: () => {
                  if (isDisabled) return;
                  setSelectedDate(cell.date);
                  onChange == null ? void 0 : onChange(cell.date);
                  setIsOpen(false);
                },
                children: cell.day
              },
              cell.date.toISOString()
            );
          }) })
        ] })
      }
    );
  }
);
FilterDatePicker.displayName = "FilterDatePicker";

// src/components/FilterTimePicker/FilterTimePicker.tsx
var import_react11 = __toESM(require("react"));
var import_clsx11 = require("clsx");
var import_jsx_runtime11 = require("react/jsx-runtime");
var useControllableState3 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = (0, import_react11.useState)(defaultValue);
  const isControlled = value !== void 0;
  const stateValue = isControlled ? value : internalValue;
  const setValue = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange == null ? void 0 : onChange(nextValue);
  };
  return [stateValue, setValue];
};
var buildTimeRange = (count, step) => Array.from({ length: Math.ceil(count / step) }).map(
  (_, index) => String(index * step).padStart(2, "0")
);
var scrollSelectedCellIntoView = (column, selectedValue) => {
  if (!column || !selectedValue) return;
  const selectedCell = column.querySelector(`[data-time-value="${selectedValue}"]`);
  if (!selectedCell) return;
  selectedCell.scrollIntoView({
    block: "center",
    inline: "nearest",
    behavior: "auto"
  });
};
var FilterTimePicker = import_react11.default.forwardRef(
  ({
    className,
    label,
    placeholder = "\u8BF7\u9009\u62E9",
    size = "default-size",
    disabled = false,
    isActive = false,
    filterClassName,
    width,
    value,
    defaultValue,
    open,
    defaultOpen = false,
    onOpenChange,
    onChange,
    hourStep = 1,
    minuteStep = 1,
    ...props
  }, ref) => {
    var _a, _b;
    const hourColumnRef = (0, import_react11.useRef)(null);
    const minuteColumnRef = (0, import_react11.useRef)(null);
    const [selectedValue, setSelectedValue] = useControllableState3({
      value,
      defaultValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState3({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const initialHour = (_a = selectedValue == null ? void 0 : selectedValue.split(":")[0]) != null ? _a : "00";
    const initialMinute = (_b = selectedValue == null ? void 0 : selectedValue.split(":")[1]) != null ? _b : "00";
    const [draftHour, setDraftHour] = (0, import_react11.useState)(initialHour);
    const [draftMinute, setDraftMinute] = (0, import_react11.useState)(initialMinute);
    const hours = (0, import_react11.useMemo)(() => buildTimeRange(24, hourStep), [hourStep]);
    const minutes = (0, import_react11.useMemo)(() => buildTimeRange(60, minuteStep), [minuteStep]);
    (0, import_react11.useEffect)(() => {
      if (!isOpen) return;
      let frameId2 = 0;
      const frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          scrollSelectedCellIntoView(hourColumnRef.current, draftHour);
          scrollSelectedCellIntoView(minuteColumnRef.current, draftMinute);
        });
      });
      return () => {
        cancelAnimationFrame(frameId1);
        cancelAnimationFrame(frameId2);
      };
    }, [draftHour, draftMinute, isOpen]);
    const trigger = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      Filter,
      {
        type: "time",
        label,
        placeholder,
        size,
        disabled,
        className: filterClassName,
        width,
        isActive: isActive || isOpen,
        value: selectedValue
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      Popover,
      {
        ref,
        trigger,
        open: isOpen,
        onOpenChange: (nextOpen) => {
          var _a2, _b2;
          if (nextOpen) {
            const nextHour = (_a2 = selectedValue == null ? void 0 : selectedValue.split(":")[0]) != null ? _a2 : "00";
            const nextMinute = (_b2 = selectedValue == null ? void 0 : selectedValue.split(":")[1]) != null ? _b2 : "00";
            setDraftHour(nextHour);
            setDraftMinute(nextMinute);
          }
          setIsOpen(nextOpen);
        },
        className,
        contentClassName: "lds-filter-time-picker__popover",
        closeOnClickOutside: true,
        closeOnEsc: true,
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "lds-filter-time-picker", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { ref: hourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "button",
            {
              type: "button",
              "data-time-value": hour,
              className: (0, import_clsx11.clsx)("lds-filter-time-picker__cell", {
                "is-selected": draftHour === hour
              }),
              onClick: () => {
                const nextValue = `${hour}:${draftMinute}`;
                setDraftHour(hour);
                setSelectedValue(nextValue);
                onChange == null ? void 0 : onChange(nextValue);
              },
              children: hour
            },
            hour
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { ref: minuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "button",
            {
              type: "button",
              "data-time-value": minute,
              className: (0, import_clsx11.clsx)("lds-filter-time-picker__cell", {
                "is-selected": draftMinute === minute
              }),
              onClick: () => {
                const nextValue = `${draftHour}:${minute}`;
                setDraftMinute(minute);
                setSelectedValue(nextValue);
                onChange == null ? void 0 : onChange(nextValue);
                setIsOpen(false);
              },
              children: minute
            },
            minute
          )) })
        ] })
      }
    );
  }
);
FilterTimePicker.displayName = "FilterTimePicker";

// src/components/FilterGroup/FilterGroup.tsx
var import_react12 = __toESM(require("react"));
var import_clsx12 = require("clsx");
var import_jsx_runtime12 = require("react/jsx-runtime");
var FilterGroup = import_react12.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        ref,
        className: (0, import_clsx12.clsx)("lds-filter-group", className),
        style: {
          ...style,
          // CSS vars for responsive grid behaviour.
          ["--lds-filter-group-min-item-width"]: `${minItemWidth}px`,
          ["--lds-filter-group-gap"]: `${gap}px`
        },
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "lds-filter-group__grid", children }),
          shouldRenderActionsRow ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "lds-filter-group__actions-row", children: actions ? actions : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
            onQuery ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Button, { variant: "secondary", size, onClick: onQuery, children: queryText }) : null,
            onReset ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Button, { variant: "default", size, onClick: onReset, children: resetText }) : null
          ] }) }) : null
        ]
      }
    );
  }
);
FilterGroup.displayName = "FilterGroup";

// src/components/Tabs/Tabs.tsx
var import_react13 = __toESM(require("react"));
var import_clsx13 = require("clsx");
var import_jsx_runtime13 = require("react/jsx-runtime");
var TabsContext = (0, import_react13.createContext)({});
var Tabs = import_react13.default.forwardRef(
  ({ className, variant = "primary", size = "small", defaultValue, value, onChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = (0, import_react13.useState)(defaultValue);
    const activeValue = value !== void 0 ? value : internalValue;
    const handleChange = (newValue) => {
      if (value === void 0) {
        setInternalValue(newValue);
      }
      onChange == null ? void 0 : onChange(newValue);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TabsContext.Provider, { value: { activeValue, onChange: handleChange }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "div",
      {
        ref,
        className: (0, import_clsx13.clsx)("lds-tabs", `lds-tabs--${variant}`, `lds-tabs--${size}`, className),
        ...props,
        children
      }
    ) });
  }
);
Tabs.displayName = "Tabs";
var Tab = import_react13.default.forwardRef(
  ({ className, value, active, disabled, children, onClick, ...props }, ref) => {
    const context = (0, import_react13.useContext)(TabsContext);
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
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "a",
      {
        ref,
        className: (0, import_clsx13.clsx)("lds-tab", isActive && "is-active", disabled && "is-disabled", className),
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
Tab.displayName = "Tab";

// src/components/Navbar/Navbar.tsx
var import_react14 = __toESM(require("react"));
var import_clsx14 = require("clsx");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Navbar = import_react14.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { ref, className: (0, import_clsx14.clsx)("lds-navbar", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lds-navbar__left", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lds-navbar__logo", "aria-label": "\u6765\u5BA2 Logo", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "lds-navbar__logo-image", "aria-hidden": "true" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lds-navbar__middle", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lds-navbar__search", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Input,
        {
          size: "default-size",
          prefixIcon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "ic-search-line" }),
          placeholder: "\u4F60\u53EF\u4EE5\u95EE\uFF1A\u5728\u54EA\u91CC\u4FEE\u6539\u5B98\u65B9\u6296\u97F3\u53F7",
          readOnly: true
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("nav", { className: "lds-navbar__nav", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "#", className: "lds-navbar__nav-item is-active", children: "\u9996\u9875" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "#", className: "lds-navbar__nav-item", children: "\u751F\u610F\u7ECF" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "#", className: "lds-navbar__nav-item", children: "\u672C\u5730\u63A8" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "#", className: "lds-navbar__nav-item", children: "\u5B66\u4E60\u4E2D\u5FC3" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lds-navbar__right", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lds-navbar__action", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "ic-reset-line" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "\u8FD4\u56DE\u65E7\u7248" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lds-navbar__divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lds-navbar__action", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "ic-mobile-line" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "App\u4E0B\u8F7D" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lds-navbar__divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lds-navbar__user", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lds-navbar__avatar lds-navbar__avatar--preset", "aria-hidden": "true", children: "85" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lds-navbar__user-info", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "lds-navbar__username", children: "\u5317\u4EAC\u516B\u5341\u4E94\u5EA6..." }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "ic-arrow-down-line" })
        ] })
      ] })
    ] })
  ] })
);
Navbar.displayName = "Navbar";

// src/components/Menu/Menu.tsx
var import_react15 = __toESM(require("react"));
var import_clsx15 = require("clsx");
var import_jsx_runtime15 = require("react/jsx-runtime");
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
var Menu = import_react15.default.forwardRef(
  ({
    className,
    activeItemKey,
    defaultActiveItemKey = "store-store-management",
    onItemChange,
    ...props
  }, ref) => {
    const [innerActiveItemKey, setInnerActiveItemKey] = (0, import_react15.useState)(defaultActiveItemKey);
    const [collapsedMap, setCollapsedMap] = (0, import_react15.useState)(
      () => Object.fromEntries(DEFAULT_MENU_GROUPS.map((group) => [group.key, Boolean(group.defaultCollapsed)]))
    );
    const effectiveActiveItemKey = activeItemKey != null ? activeItemKey : innerActiveItemKey;
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { ref, className: (0, import_clsx15.clsx)("lds-menu", className), ...props, children: DEFAULT_MENU_GROUPS.map((group) => {
      var _a;
      const collapsed = (_a = collapsedMap[group.key]) != null ? _a : false;
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: (0, import_clsx15.clsx)("lds-menu-group", collapsed && "is-collapsed"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
          "div",
          {
            className: "lds-menu-group__header",
            onClick: () => setCollapsedMap((prev) => ({
              ...prev,
              [group.key]: !collapsed
            })),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { name: group.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "lds-menu-group__title", children: group.title }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { className: "lds-menu-group__action", name: collapsed ? "ic-arrow-down-line" : "ic-arrow-up-line" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "lds-menu-group__content", children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: (0, import_clsx15.clsx)(
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
var import_react16 = __toESM(require("react"));
var import_clsx16 = require("clsx");
var import_jsx_runtime16 = require("react/jsx-runtime");
var PageHeader = import_react16.default.forwardRef(
  ({ className, title, tabs, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { ref, className: (0, import_clsx16.clsx)("lds-page-header", className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h1", { className: "lds-page-header__title", children: title }),
      tabs && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "lds-page-header__tabs", children: tabs })
    ] });
  }
);
PageHeader.displayName = "PageHeader";

// src/components/Table/Table.tsx
var import_react18 = __toESM(require("react"));
var import_clsx18 = require("clsx");

// src/components/Tag/Tag.tsx
var import_react17 = __toESM(require("react"));
var import_clsx17 = require("clsx");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Tag = import_react17.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
      "span",
      {
        ref,
        className: (0, import_clsx17.clsx)(
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
          leftIcon ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "lds-tag__icon lds-tag__icon--left", children: leftIcon }) : null,
          children ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "lds-tag__content", children }) : null,
          rightIcon ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "lds-tag__icon lds-tag__icon--right", children: rightIcon }) : null
        ]
      }
    );
  }
);
Tag.displayName = "Tag";

// src/components/Table/Table.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var TableWrapper = import_react18.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { ref, className: (0, import_clsx18.clsx)("lds-table-wrapper", className), ...props })
);
TableWrapper.displayName = "TableWrapper";
var Table = import_react18.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("table", { ref, className: (0, import_clsx18.clsx)("lds-table", className), ...props })
);
Table.displayName = "Table";
var Thead = import_react18.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("thead", { ref, className: (0, import_clsx18.clsx)("lds-table__thead", className), ...props })
);
Thead.displayName = "Thead";
var Tbody = import_react18.default.forwardRef(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("tbody", { ref, ...props })
);
Tbody.displayName = "Tbody";
var Tr = import_react18.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("tr", { ref, className: (0, import_clsx18.clsx)("lds-table__row", className), ...props })
);
Tr.displayName = "Tr";
var Th = import_react18.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("th", { ref, className: (0, import_clsx18.clsx)("lds-table__th", className), ...props })
);
Th.displayName = "Th";
var Td = import_react18.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("td", { ref, className: (0, import_clsx18.clsx)("lds-table__td", className), ...props })
);
Td.displayName = "Td";
var TableCellProduct = ({ img, title, tag, tagVariant = "default", id }) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "lds-table-cell--product", children: [
  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("img", { src: img, alt: "\u5546\u54C1\u56FE", className: "lds-table-cell__product-img" }),
  /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "lds-table-cell__product-info", children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "lds-table-cell__product-title-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h4", { className: "lds-table-cell__product-title", children: title }),
      tag && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        Tag,
        {
          size: "small",
          variant: tagVariant === "default" ? "outline" : "light",
          color: tagVariant === "orange" ? "orange" : tagVariant === "red" ? "red" : "gray",
          children: tag
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "lds-table-cell__product-meta", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "lds-table-cell__product-id", children: [
      "\u5546\u54C1ID\uFF1A",
      id
    ] }) })
  ] })
] });
var TableCellAmount = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "lds-table-cell--amount", children });
var TableCellOperation = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "lds-table-cell--operation", children });
var TableCellAction = import_react18.default.forwardRef(
  ({ className, danger, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("a", { ref, className: (0, import_clsx18.clsx)("lds-table-cell__action", danger && "is-danger", className), ...props })
);
TableCellAction.displayName = "TableCellAction";

// src/components/Checkbox/Checkbox.tsx
var import_react19 = require("react");
var import_clsx19 = require("clsx");
var import_jsx_runtime19 = require("react/jsx-runtime");
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
var Checkbox = (0, import_react19.forwardRef)(
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
    const [internalChecked, setInternalChecked] = (0, import_react19.useState)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
      "label",
      {
        className: (0, import_clsx19.clsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "lds-checkbox__input-wrapper", children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "lds-checkbox__inner", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "lds-checkbox__icon", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", { viewBox: iconConfig.viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { d: iconConfig.path, fill: "currentColor" }) }) }) })
          ] }),
          showLabel && label ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "lds-checkbox__label", children: label }) : null
        ]
      }
    );
  }
);
Checkbox.displayName = "Checkbox";

// src/components/Pagination/Pagination.tsx
var import_react20 = __toESM(require("react"));
var import_clsx20 = require("clsx");
var import_jsx_runtime20 = require("react/jsx-runtime");
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
var Pagination = import_react20.default.forwardRef(
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
    const [innerCurrent, setInnerCurrent] = (0, import_react20.useState)(() => defaultCurrent);
    const [innerPageSize, setInnerPageSize] = (0, import_react20.useState)(() => {
      var _a;
      return (_a = defaultPageSize != null ? defaultPageSize : pageSizeOptions[0]) != null ? _a : 10;
    });
    const [jumpValue, setJumpValue] = (0, import_react20.useState)("");
    const effectivePageSize = isPageSizeControlled ? pageSize : innerPageSize;
    const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, effectivePageSize)));
    const effectiveCurrent = clampInt(isPageControlled ? current : innerCurrent, 1, totalPages);
    (0, import_react20.useEffect)(() => {
      if (!isPageControlled && innerCurrent !== effectiveCurrent) {
        setInnerCurrent(effectiveCurrent);
      }
    }, [effectiveCurrent, isPageControlled, totalPages]);
    const items = (0, import_react20.useMemo)(() => {
      return getPageItems(effectiveCurrent, totalPages, siblingCount);
    }, [effectiveCurrent, totalPages, siblingCount]);
    const pageRange = (0, import_react20.useMemo)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
      "nav",
      {
        ref,
        className: (0, import_clsx20.clsx)("lds-pagination", `lds-pagination--${size}`, className),
        "aria-label": "Pagination",
        ...props,
        children: [
          showTotal ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "lds-pagination__total", children: showTotal(total, pageRange) }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "lds-pagination__pages", children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              "button",
              {
                type: "button",
                className: "lds-pagination__arrow lds-pagination__arrow--prev",
                onClick: () => setPage(effectiveCurrent - 1),
                disabled: disabled || !canPrev,
                "aria-label": "Previous Page",
                children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Icon, { className: "lds-pagination__icon", name: "ic-arrow-left-line", "aria-hidden": "true" })
              }
            ),
            items.map((it, idx) => {
              if (it === "ellipsis") {
                return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "lds-pagination__ellipsis", "aria-hidden": "true", children: "..." }, `ellipsis-${idx}`);
              }
              const page = it;
              const isActive = page === effectiveCurrent;
              return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
                "button",
                {
                  type: "button",
                  className: (0, import_clsx20.clsx)("lds-pagination__item", isActive && "is-active"),
                  onClick: () => setPage(page),
                  disabled,
                  "aria-current": isActive ? "page" : void 0,
                  "aria-label": `Page ${page}`,
                  children: page
                },
                page
              );
            }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              "button",
              {
                type: "button",
                className: "lds-pagination__arrow lds-pagination__arrow--next",
                onClick: () => setPage(effectiveCurrent + 1),
                disabled: disabled || !canNext,
                "aria-label": "Next Page",
                children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Icon, { className: "lds-pagination__icon", name: "ic-arrow-right-line", "aria-hidden": "true" })
              }
            )
          ] }),
          showSizeChanger ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "lds-pagination__size-changer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              "select",
              {
                className: "lds-pagination__size-select",
                value: effectivePageSize,
                onChange: (e) => setSize(Number(e.target.value)),
                disabled,
                "aria-label": "Page Size",
                children: pageSizeOptions.map((n) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("option", { value: n, children: [
                  n,
                  "\u6761/\u9875"
                ] }, n))
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "lds-pagination__size-label", children: [
              effectivePageSize,
              "\u6761/\u9875"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Icon, { className: "lds-pagination__size-icon", name: "ic-arrow-down-line", "aria-hidden": "true" })
          ] }) : null,
          showQuickJumper ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "lds-pagination__quick-jumper", children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "lds-pagination__quick-text", children: "\u8DF3\u81F3" }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "lds-pagination__quick-input", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "lds-pagination__quick-text", children: "\u9875" })
          ] }) : null
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";

// src/components/Drawer/Drawer.tsx
var import_react21 = __toESM(require("react"));
var import_react_dom2 = require("react-dom");
var import_clsx21 = require("clsx");
var import_jsx_runtime21 = require("react/jsx-runtime");
var DRAWER_ANIMATION_MS = 280;
var Drawer = import_react21.default.forwardRef(
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
    const titleId = (0, import_react21.useId)();
    const [shouldRender, setShouldRender] = (0, import_react21.useState)(open);
    const [visible, setVisible] = (0, import_react21.useState)(false);
    const container = (0, import_react21.useMemo)(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    (0, import_react21.useEffect)(() => {
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
    (0, import_react21.useEffect)(() => {
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
    (0, import_react21.useEffect)(() => {
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
    return (0, import_react_dom2.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
        "div",
        {
          className: (0, import_clsx21.clsx)("lds-drawer-root", visible && "is-open"),
          onClick: (event) => {
            if (event.target === event.currentTarget && maskClosable) {
              onClose == null ? void 0 : onClose();
            }
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "lds-drawer-root__mask", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
              "div",
              {
                ref,
                className: (0, import_clsx21.clsx)("lds-drawer", `lds-drawer--${size}`, className),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? titleId : void 0,
                style: mergedStyle,
                ...props,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "lds-drawer__header", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "lds-drawer__header-main", children: [
                      title ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("h2", { id: titleId, className: "lds-drawer__title", children: title }) : null,
                      extra ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "lds-drawer__extra", children: extra }) : null
                    ] }),
                    showCloseButton ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "lds-drawer__close",
                        onClick: () => onClose == null ? void 0 : onClose(),
                        "aria-label": closeLabel,
                        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: (0, import_clsx21.clsx)("lds-drawer__body", bodyClassName), children }),
                  shouldShowFooter ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "lds-drawer__footer", children: footer }) : null
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
var import_react22 = __toESM(require("react"));
var import_react_dom3 = require("react-dom");
var import_clsx22 = require("clsx");
var import_jsx_runtime22 = require("react/jsx-runtime");
var DIALOG_ANIMATION_MS = 300;
var DIALOG_ICON_MAP = {
  neutral: "ic-info-round-fill",
  warning: "ic-warning-round-fill",
  danger: "ic-error-round-fill",
  success: "ic-finish-round-fill"
};
var Dialog = import_react22.default.forwardRef(
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
    const titleId = (0, import_react22.useId)();
    const descriptionId = (0, import_react22.useId)();
    const [shouldRender, setShouldRender] = (0, import_react22.useState)(open);
    const [visible, setVisible] = (0, import_react22.useState)(false);
    const container = (0, import_react22.useMemo)(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    (0, import_react22.useEffect)(() => {
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
    (0, import_react22.useEffect)(() => {
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
    (0, import_react22.useEffect)(() => {
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
    const resolvedIcon = icon != null ? icon : type !== "custom" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Icon, { name: DIALOG_ICON_MAP[type], "aria-hidden": "true" }) : null;
    return (0, import_react_dom3.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
        "div",
        {
          className: (0, import_clsx22.clsx)("lds-dialog-root", visible && "is-open"),
          onClick: (event) => {
            if (event.target === event.currentTarget && maskClosable) {
              onClose == null ? void 0 : onClose();
            }
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "lds-dialog-root__mask", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
              "div",
              {
                ref,
                className: (0, import_clsx22.clsx)("lds-dialog", `lds-dialog--${type}`, className),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? titleId : void 0,
                "aria-describedby": description ? descriptionId : void 0,
                style: mergedStyle,
                ...props,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: (0, import_clsx22.clsx)("lds-dialog__body", bodyClassName), children: [
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "lds-dialog__main", children: [
                      showIcon && resolvedIcon ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "lds-dialog__icon", "aria-hidden": "true", children: resolvedIcon }) : null,
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "lds-dialog__content", children: [
                        title ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("h2", { id: titleId, className: "lds-dialog__title", children: title }) : null,
                        description ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { id: descriptionId, className: "lds-dialog__description", children: description }) : null,
                        children ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "lds-dialog__extra", children }) : null
                      ] })
                    ] }),
                    showCloseButton ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "lds-dialog__close",
                        onClick: () => onClose == null ? void 0 : onClose(),
                        "aria-label": closeLabel,
                        children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ] }),
                  shouldShowFooter ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "lds-dialog__footer", children: footer }) : null
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
var import_react23 = __toESM(require("react"));
var import_clsx23 = require("clsx");
var import_jsx_runtime23 = require("react/jsx-runtime");
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
var Upload = import_react23.default.forwardRef(
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
    const inputRef = import_react23.default.useRef(null);
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = import_react23.default.useState(defaultValue);
    const mergedValue = (_a = isControlled ? value : innerValue) != null ? _a : [];
    const visibleItems = mergedValue.slice(0, maxCount);
    const shouldRenderTrigger = visibleItems.length < maxCount;
    const mergedError = error != null ? error : hasError;
    const mergedVisualState = mergedError ? "error" : visualState;
    const updateValue = import_react23.default.useCallback(
      (nextValue) => {
        const normalized = nextValue.slice(0, maxCount);
        if (!isControlled) {
          setInnerValue(normalized);
        }
        onChange == null ? void 0 : onChange(normalized);
      },
      [isControlled, maxCount, onChange]
    );
    const handleSelectFiles = import_react23.default.useCallback(
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
    const handleRemove = import_react23.default.useCallback(
      (index) => {
        const nextItems = visibleItems.filter((_, currentIndex) => currentIndex !== index);
        updateValue(nextItems);
      },
      [updateValue, visibleItems]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "div",
      {
        ref,
        className: (0, import_clsx23.clsx)("lds-upload", disabled && "is-disabled", className),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "lds-upload__list", children: [
            visibleItems.map((item, index) => {
              var _a2, _b, _c;
              return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
                "div",
                {
                  className: "lds-upload__item",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                      "img",
                      {
                        className: "lds-upload__image",
                        src: item.url,
                        alt: (_c = item.name) != null ? _c : `\u5DF2\u4E0A\u4F20\u56FE\u7247 ${index + 1}`
                      }
                    ),
                    !disabled ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "lds-upload__remove",
                        "aria-label": removeAriaLabel,
                        onClick: () => handleRemove(index),
                        children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ]
                },
                (_b = (_a2 = item.id) != null ? _a2 : item.url) != null ? _b : `${index}`
              );
            }),
            shouldRenderTrigger ? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
              "button",
              {
                type: "button",
                className: (0, import_clsx23.clsx)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Icon, { name: "ic-add-line", "aria-hidden": "true" }),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "lds-upload__text", children: triggerText })
                ]
              }
            ) : null
          ] }),
          children ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "lds-upload__extra", children }) : null
        ]
      }
    );
  }
);
Upload.displayName = "Upload";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Capsule,
  Checkbox,
  Dialog,
  Drawer,
  Filter,
  FilterDatePicker,
  FilterGroup,
  FilterSelect,
  FilterTimePicker,
  Form,
  FormItem,
  Icon,
  Input,
  Menu,
  Navbar,
  PageHeader,
  Pagination,
  Popover,
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
});
