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

// src/components/Alert/Alert.tsx
import React3 from "react";
import { clsx as clsx3 } from "clsx";

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

// src/components/Alert/Alert.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ALERT_ICON_MAP = {
  info: "ic-info-round-fill",
  success: "ic-finish-round-fill",
  warning: "ic-warning-round-fill",
  error: "ic-error-round-fill",
  gray: "ic-reduce-round-fill"
};
var Alert = React3.forwardRef(
  ({
    className,
    title,
    description,
    variant = "info",
    icon,
    showIcon = true,
    action,
    closable = false,
    defaultVisible = true,
    visible,
    onClose,
    closeLabel = "\u5173\u95ED\u63D0\u793A",
    children,
    role = "alert",
    ...props
  }, ref) => {
    const [innerVisible, setInnerVisible] = React3.useState(defaultVisible);
    const isControlled = visible !== void 0;
    const mergedVisible = isControlled ? visible : innerVisible;
    if (!mergedVisible) {
      return null;
    }
    const resolvedIcon = icon != null ? icon : showIcon ? /* @__PURE__ */ jsx3(Icon, { name: ALERT_ICON_MAP[variant], "aria-hidden": "true" }) : null;
    const handleClose = () => {
      if (!isControlled) {
        setInnerVisible(false);
      }
      onClose == null ? void 0 : onClose();
    };
    return /* @__PURE__ */ jsxs2(
      "div",
      {
        ref,
        className: clsx3("lds-alert", `lds-alert--${variant}`, className),
        role,
        ...props,
        children: [
          showIcon && resolvedIcon ? /* @__PURE__ */ jsx3("div", { className: "lds-alert__icon", "aria-hidden": "true", children: resolvedIcon }) : null,
          /* @__PURE__ */ jsxs2("div", { className: "lds-alert__content", children: [
            title ? /* @__PURE__ */ jsx3("div", { className: "lds-alert__title", children: title }) : null,
            description ? /* @__PURE__ */ jsx3("div", { className: "lds-alert__description", children: description }) : null,
            children ? /* @__PURE__ */ jsx3("div", { className: "lds-alert__extra", children }) : null
          ] }),
          action ? /* @__PURE__ */ jsx3("div", { className: "lds-alert__action", children: action }) : null,
          closable ? /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              className: "lds-alert__close",
              "aria-label": closeLabel,
              onClick: handleClose,
              children: /* @__PURE__ */ jsx3(Icon, { name: "ic-error-line", "aria-hidden": "true" })
            }
          ) : null
        ]
      }
    );
  }
);
Alert.displayName = "Alert";

// src/components/Message/Message.tsx
import React4 from "react";
import { clsx as clsx4 } from "clsx";
import { createRoot } from "react-dom/client";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var MESSAGE_ICON_MAP = {
  info: "ic-info-round-fill",
  success: "ic-finish-round-fill",
  warning: "ic-warning-round-fill",
  error: "ic-error-round-fill"
};
var MESSAGE_HOST_ID = "life-ds-message-host";
var MESSAGE_EXIT_DURATION = 200;
var MESSAGE_DEFAULT_DURATION = 3e3;
var messageSeed = 0;
var hostElement = null;
var hostRoot = null;
var messages = [];
var closeTimers = /* @__PURE__ */ new Map();
var removeTimers = /* @__PURE__ */ new Map();
var canUseDOM = () => typeof window !== "undefined" && typeof document !== "undefined";
var clearMessageTimers = (key) => {
  const closeTimer = closeTimers.get(key);
  if (closeTimer !== void 0) {
    window.clearTimeout(closeTimer);
    closeTimers.delete(key);
  }
  const removeTimer = removeTimers.get(key);
  if (removeTimer !== void 0) {
    window.clearTimeout(removeTimer);
    removeTimers.delete(key);
  }
};
var normalizeMessageInput = (input) => {
  if (React4.isValidElement(input)) {
    return { content: input };
  }
  if (typeof input === "object" && input !== null && "content" in input) {
    return input;
  }
  return { content: input };
};
var ensureHostRoot = () => {
  if (!canUseDOM()) {
    return null;
  }
  if (!hostElement) {
    hostElement = document.getElementById(MESSAGE_HOST_ID);
    if (!hostElement) {
      hostElement = document.createElement("div");
      hostElement.id = MESSAGE_HOST_ID;
      document.body.appendChild(hostElement);
    }
  }
  if (!hostRoot && hostElement) {
    hostRoot = createRoot(hostElement);
  }
  return hostRoot;
};
var removeMessage = (key, invokeCloseCallback = true) => {
  var _a;
  const nextMessage = messages.find((message2) => message2.key === key);
  clearMessageTimers(key);
  messages = messages.filter((message2) => message2.key !== key);
  renderMessageViewport();
  if (invokeCloseCallback) {
    (_a = nextMessage == null ? void 0 : nextMessage.onClose) == null ? void 0 : _a.call(nextMessage);
  }
};
var closeMessage = (key) => {
  const target = messages.find((message2) => message2.key === key);
  if (!target || !target.visible) {
    return;
  }
  clearMessageTimers(key);
  messages = messages.map(
    (message2) => message2.key === key ? { ...message2, visible: false } : message2
  );
  renderMessageViewport();
  removeTimers.set(
    key,
    window.setTimeout(() => {
      removeMessage(key);
    }, MESSAGE_EXIT_DURATION)
  );
};
var scheduleAutoClose = (key, duration) => {
  const resolvedDuration = duration != null ? duration : MESSAGE_DEFAULT_DURATION;
  if (resolvedDuration <= 0) {
    return;
  }
  closeTimers.set(
    key,
    window.setTimeout(() => {
      closeMessage(key);
    }, resolvedDuration)
  );
};
var showMessage = (key) => {
  messages = messages.map(
    (message2) => message2.key === key ? { ...message2, visible: true } : message2
  );
  renderMessageViewport();
};
var renderMessageViewport = () => {
  const root = ensureHostRoot();
  if (!root) {
    return;
  }
  root.render(/* @__PURE__ */ jsx4(MessageViewport, { messages, onClose: closeMessage }));
};
var enqueueMessage = (input, forcedVariant) => {
  var _a, _b, _c, _d, _e;
  if (!canUseDOM()) {
    return () => void 0;
  }
  const options = normalizeMessageInput(input);
  const key = (_a = options.key) != null ? _a : `message-${++messageSeed}`;
  const nextMessage = {
    ...options,
    key,
    variant: (_b = forcedVariant != null ? forcedVariant : options.variant) != null ? _b : "info",
    duration: (_c = options.duration) != null ? _c : MESSAGE_DEFAULT_DURATION,
    closeLabel: (_d = options.closeLabel) != null ? _d : "\u5173\u95ED\u63D0\u793A",
    visible: false
  };
  clearMessageTimers(key);
  const existingIndex = messages.findIndex((message2) => message2.key === key);
  if (existingIndex >= 0) {
    messages = messages.map((message2) => message2.key === key ? nextMessage : message2);
  } else {
    messages = [...messages, nextMessage];
  }
  renderMessageViewport();
  const raf = (_e = window.requestAnimationFrame) != null ? _e : ((callback) => window.setTimeout(callback, 16));
  raf(() => {
    showMessage(key);
    scheduleAutoClose(key, nextMessage.duration);
  });
  return () => closeMessage(key);
};
var Message = React4.forwardRef(
  ({
    className,
    content,
    variant = "info",
    icon,
    closable = false,
    closeLabel = "\u5173\u95ED\u63D0\u793A",
    visible = true,
    onClose,
    role = "status",
    ...props
  }, ref) => {
    const resolvedIcon = icon != null ? icon : /* @__PURE__ */ jsx4(Icon, { name: MESSAGE_ICON_MAP[variant], "aria-hidden": "true" });
    return /* @__PURE__ */ jsxs3(
      "div",
      {
        ref,
        className: clsx4("lds-message", `lds-message--${variant}`, visible && "is-visible", className),
        role,
        "aria-live": "polite",
        ...props,
        children: [
          /* @__PURE__ */ jsx4("div", { className: "lds-message__icon", "aria-hidden": "true", children: resolvedIcon }),
          /* @__PURE__ */ jsx4("div", { className: "lds-message__content", children: content }),
          closable ? /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              className: "lds-message__close",
              "aria-label": closeLabel,
              onClick: onClose,
              children: /* @__PURE__ */ jsx4(Icon, { name: "ic-error-line", "aria-hidden": "true" })
            }
          ) : null
        ]
      }
    );
  }
);
Message.displayName = "Message";
var MessageViewport = ({ messages: messages2, onClose }) => {
  if (!messages2.length) {
    return null;
  }
  return /* @__PURE__ */ jsx4("div", { className: "lds-message-viewport", role: "presentation", children: messages2.map((message2) => /* @__PURE__ */ jsx4(
    "div",
    {
      className: clsx4("lds-message-viewport__item", message2.visible && "is-visible"),
      children: /* @__PURE__ */ jsx4("div", { className: "lds-message-viewport__item-inner", children: /* @__PURE__ */ jsx4(
        Message,
        {
          className: message2.className,
          content: message2.content,
          variant: message2.variant,
          icon: message2.icon,
          style: message2.style,
          closable: message2.closable,
          closeLabel: message2.closeLabel,
          visible: message2.visible,
          onClose: () => onClose(message2.key)
        }
      ) })
    },
    message2.key
  )) });
};
var message = {
  open: (input) => enqueueMessage(input),
  info: (input) => enqueueMessage(input, "info"),
  success: (input) => enqueueMessage(input, "success"),
  warning: (input) => enqueueMessage(input, "warning"),
  error: (input) => enqueueMessage(input, "error"),
  destroy: (key) => {
    if (!canUseDOM()) {
      return;
    }
    if (key === void 0) {
      const currentMessages = [...messages];
      currentMessages.forEach((messageItem) => clearMessageTimers(messageItem.key));
      messages = [];
      renderMessageViewport();
      currentMessages.forEach((messageItem) => {
        var _a;
        return (_a = messageItem.onClose) == null ? void 0 : _a.call(messageItem);
      });
      return;
    }
    removeMessage(key);
  }
};

// src/components/Radio/Radio.tsx
import React5 from "react";
import { clsx as clsx5 } from "clsx";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var Radio = React5.forwardRef(
  ({
    className,
    variant = "default",
    size = "default-size",
    label,
    description,
    disabled = false,
    ...props
  }, ref) => {
    const hasLabel = label !== void 0 && label !== null;
    const hasDescription = description !== void 0 && description !== null;
    const isCapsule = variant === "capsule";
    const isCard = variant === "card";
    const isDefault = variant === "default";
    return /* @__PURE__ */ jsxs4(
      "label",
      {
        className: clsx5(
          "lds-radio",
          `lds-radio--${variant}`,
          `lds-radio--${size}`,
          disabled && "lds-radio--disabled",
          isCapsule && "lds-capsule-wrapper",
          className
        ),
        children: [
          /* @__PURE__ */ jsx5(
            "input",
            {
              type: "radio",
              className: "lds-radio__input",
              disabled,
              ref,
              ...props
            }
          ),
          /* @__PURE__ */ jsxs4(
            "span",
            {
              className: clsx5(
                "lds-radio__visual",
                isCapsule && "lds-capsule",
                isCapsule && `lds-capsule--${size}`,
                isCard && "lds-radio__visual--card"
              ),
              children: [
                isDefault ? /* @__PURE__ */ jsx5("span", { className: "lds-radio__control", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("span", { className: "lds-radio__dot" }) }) : null,
                hasLabel || hasDescription ? /* @__PURE__ */ jsxs4("span", { className: "lds-radio__content", children: [
                  hasLabel ? /* @__PURE__ */ jsx5("span", { className: clsx5(isCard ? "lds-radio__title" : "lds-radio__label"), children: label }) : null,
                  hasDescription ? /* @__PURE__ */ jsx5("span", { className: "lds-radio__description", children: description }) : null
                ] }) : null
              ]
            }
          )
        ]
      }
    );
  }
);
Radio.displayName = "Radio";

// src/components/Input/Input.tsx
import React7 from "react";
import { clsx as clsx7 } from "clsx";

// src/components/Form/Form.tsx
import React6 from "react";
import { clsx as clsx6 } from "clsx";
import { Fragment, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var DEFAULT_LABEL_WIDTH = "90px";
var DEFAULT_LAYOUT = "horizontal";
var FormLayoutContext = React6.createContext(DEFAULT_LAYOUT);
var FormItemStatusContext = React6.createContext({ hasError: false });
function toCssSize(value) {
  if (value === void 0) {
    return void 0;
  }
  return typeof value === "number" ? `${value}px` : value;
}
function useFormItemStatus() {
  return React6.useContext(FormItemStatusContext);
}
var Form = React6.forwardRef(
  ({ className, style, labelWidth = 90, layout = DEFAULT_LAYOUT, ...props }, ref) => {
    var _a;
    const mergedStyle = {
      ...style,
      ["--lds-form-label-width"]: (_a = toCssSize(labelWidth)) != null ? _a : DEFAULT_LABEL_WIDTH
    };
    return /* @__PURE__ */ jsx6(FormLayoutContext.Provider, { value: layout, children: /* @__PURE__ */ jsx6(
      "div",
      {
        ref,
        className: clsx6("lds-form", `lds-form--${layout}`, className),
        style: mergedStyle,
        ...props
      }
    ) });
  }
);
Form.displayName = "Form";
var FormItem = React6.forwardRef(
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
    const inheritedLayout = React6.useContext(FormLayoutContext);
    const resolvedLayout = layout != null ? layout : inheritedLayout;
    const message2 = error != null ? error : description;
    const hasError = error !== void 0 && error !== null && error !== false;
    const shouldRenderTooltip = Boolean(tooltip) || Boolean(onTooltipClick);
    const mergedStyle = {
      ...style,
      ...labelWidth !== void 0 ? {
        ["--lds-form-label-width"]: toCssSize(labelWidth)
      } : null
    };
    const labelContent = /* @__PURE__ */ jsxs5(Fragment, { children: [
      /* @__PURE__ */ jsx6("span", { className: "lds-form-item__label-text", children: label }),
      shouldRenderTooltip ? /* @__PURE__ */ jsx6(
        "button",
        {
          type: "button",
          className: "lds-form-item__tooltip",
          title: tooltip,
          "aria-label": tooltipAriaLabel,
          onClick: onTooltipClick,
          children: /* @__PURE__ */ jsx6(Icon, { name: "ic-help-line", "aria-hidden": "true" })
        }
      ) : null,
      required ? /* @__PURE__ */ jsx6("span", { className: "lds-form-item__required", "aria-hidden": "true", children: /* @__PURE__ */ jsx6(Icon, { name: "ic-required-line" }) }) : null
    ] });
    return /* @__PURE__ */ jsxs5(
      "div",
      {
        ref,
        className: clsx6("lds-form-item", `lds-form-item--${resolvedLayout}`, className),
        style: mergedStyle,
        ...props,
        children: [
          /* @__PURE__ */ jsx6("div", { className: "lds-form-item__label", children: htmlFor ? /* @__PURE__ */ jsx6("label", { className: "lds-form-item__label-inner", htmlFor, children: labelContent }) : /* @__PURE__ */ jsx6("div", { className: "lds-form-item__label-inner", children: labelContent }) }),
          /* @__PURE__ */ jsxs5("div", { className: "lds-form-item__main", children: [
            /* @__PURE__ */ jsx6(FormItemStatusContext.Provider, { value: { hasError }, children: /* @__PURE__ */ jsx6("div", { className: "lds-form-item__control", children }) }),
            message2 ? /* @__PURE__ */ jsx6(
              "div",
              {
                className: clsx6("lds-form-item__message", hasError && "is-error"),
                role: hasError ? "alert" : void 0,
                children: message2
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
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var Input = React7.forwardRef(
  ({ className, wrapperClassName, size = "default-size", prefixIcon, suffixIcon, clearable, onClear, disabled, isFocused, error, showCount = false, value, defaultValue, maxLength, ...props }, ref) => {
    var _a;
    const { hasError } = useFormItemStatus();
    const mergedError = error != null ? error : hasError;
    const countValue = (_a = value != null ? value : defaultValue) != null ? _a : "";
    const currentLength = typeof countValue === "number" ? String(countValue).length : String(countValue).length;
    const countText = maxLength !== void 0 ? `${currentLength}/${maxLength}` : `${currentLength}`;
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        className: clsx7(
          "lds-input-wrapper",
          `lds-input-wrapper--${size}`,
          disabled && "is-disabled",
          isFocused && "is-focused",
          mergedError && "is-error",
          wrapperClassName
        ),
        children: [
          prefixIcon && /* @__PURE__ */ jsx7("span", { className: "lds-input__prefix", children: prefixIcon }),
          /* @__PURE__ */ jsx7(
            "input",
            {
              ref,
              className: clsx7("lds-input", className),
              disabled,
              value,
              defaultValue,
              maxLength,
              ...props
            }
          ),
          showCount ? /* @__PURE__ */ jsx7("span", { className: "lds-input__count", children: countText }) : null,
          clearable && /* @__PURE__ */ jsx7("span", { className: "lds-input__clear", onClick: onClear, children: /* @__PURE__ */ jsx7(Icon, { name: "ic-error-round-fill" }) }),
          suffixIcon && /* @__PURE__ */ jsx7("span", { className: "lds-input__suffix", children: suffixIcon })
        ]
      }
    );
  }
);
Input.displayName = "Input";

// src/components/Search/Search.tsx
import React8 from "react";
import { clsx as clsx8 } from "clsx";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function getTextLength(value) {
  if (typeof value === "string") return value.length;
  if (typeof value === "number") return String(value).length;
  return 0;
}
var Search = React8.forwardRef(
  ({
    className,
    wrapperClassName,
    size = "default-size",
    isFocused = false,
    clearable = true,
    disabled = false,
    value,
    defaultValue,
    onClear,
    onChange,
    ...props
  }, ref) => {
    const inputRef = React8.useRef(null);
    const isControlled = value !== void 0;
    const [innerValueLength, setInnerValueLength] = React8.useState(() => getTextLength(defaultValue));
    const hasValue = (isControlled ? getTextLength(value) : innerValueLength) > 0;
    const setRefs = React8.useCallback(
      (node) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
          return;
        }
        if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );
    const handleChange = React8.useCallback(
      (event) => {
        if (!isControlled) {
          setInnerValueLength(event.target.value.length);
        }
        onChange == null ? void 0 : onChange(event);
      },
      [isControlled, onChange]
    );
    return /* @__PURE__ */ jsxs7(
      "div",
      {
        className: clsx8(
          "lds-search",
          `lds-search--${size}`,
          {
            "is-focused": isFocused,
            "is-disabled": disabled,
            "is-filled": hasValue
          },
          wrapperClassName
        ),
        children: [
          /* @__PURE__ */ jsx8("span", { className: "lds-search__prefix", "aria-hidden": "true", children: /* @__PURE__ */ jsx8(Icon, { name: "ic-search-line" }) }),
          /* @__PURE__ */ jsx8(
            "input",
            {
              ...props,
              ref: setRefs,
              type: "search",
              className: clsx8("lds-search__input", className),
              disabled,
              value,
              defaultValue,
              onChange: handleChange
            }
          ),
          clearable && hasValue ? /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              className: "lds-search__clear",
              "aria-label": "\u6E05\u7A7A\u641C\u7D22",
              onMouseDown: (event) => event.preventDefault(),
              onClick: () => {
                if (disabled) return;
                if (!isControlled) {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                  setInnerValueLength(0);
                }
                onClear == null ? void 0 : onClear();
              },
              children: /* @__PURE__ */ jsx8(Icon, { name: "ic-error-round-fill" })
            }
          ) : null
        ]
      }
    );
  }
);
Search.displayName = "Search";

// src/components/Textarea/Textarea.tsx
import React9 from "react";
import { clsx as clsx9 } from "clsx";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function getTextLength2(value) {
  if (typeof value === "string") {
    return value.length;
  }
  if (typeof value === "number") {
    return String(value).length;
  }
  return 0;
}
var Textarea = React9.forwardRef(
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
    const [innerValueLength, setInnerValueLength] = React9.useState(() => getTextLength2(defaultValue));
    const mergedError = error != null ? error : hasError;
    const currentLength = isControlled ? getTextLength2(value) : innerValueLength;
    const handleChange = React9.useCallback(
      (event) => {
        if (!isControlled) {
          setInnerValueLength(event.target.value.length);
        }
        onChange == null ? void 0 : onChange(event);
      },
      [isControlled, onChange]
    );
    const countText = maxLength !== void 0 ? `${currentLength}/${maxLength}` : `${currentLength}`;
    return /* @__PURE__ */ jsxs8(
      "div",
      {
        className: clsx9(
          "lds-textarea-wrapper",
          `lds-textarea-wrapper--${size}`,
          isFocused && "is-focused",
          mergedError && "is-error",
          disabled && "is-disabled",
          wrapperClassName
        ),
        children: [
          /* @__PURE__ */ jsx9(
            "textarea",
            {
              ref,
              className: clsx9("lds-textarea", className),
              disabled,
              value,
              defaultValue,
              maxLength,
              onChange: handleChange,
              ...props
            }
          ),
          showCount ? /* @__PURE__ */ jsx9("div", { className: "lds-textarea__footer", children: /* @__PURE__ */ jsx9("span", { className: "lds-textarea__count", children: countText }) }) : null,
          showResizeHandle ? /* @__PURE__ */ jsx9("span", { className: "lds-textarea__resize-handle", "aria-hidden": "true" }) : null
        ]
      }
    );
  }
);
Textarea.displayName = "Textarea";

// src/components/Select/Select.tsx
import React11, { useMemo as useMemo2, useState as useState2 } from "react";
import { clsx as clsx11 } from "clsx";

// src/components/Popover/Popover.tsx
import React10, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { clsx as clsx10 } from "clsx";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
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
var Popover = React10.forwardRef(
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
    const contentId = useId();
    const triggerRef = useRef(null);
    const triggerWrapperRef = useRef(null);
    const contentRef = useRef(null);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [shouldRender, setShouldRender] = useState(defaultOpen);
    const [visible, setVisible] = useState(false);
    const [resolvedPlacement, setResolvedPlacement] = useState(placement);
    const [positionStyle, setPositionStyle] = useState({
      top: 0,
      left: 0
    });
    const isControlled = open !== void 0;
    const isOpen = isControlled ? open : uncontrolledOpen;
    const wasOpenRef = useRef(isOpen);
    const setOpen = useCallback(
      (nextOpen) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange == null ? void 0 : onOpenChange(nextOpen);
      },
      [isControlled, onOpenChange]
    );
    const container = useMemo(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    const updatePosition = useCallback(() => {
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
    useEffect(() => {
      const wasOpen = wasOpenRef.current;
      wasOpenRef.current = isOpen;
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
      if (!wasOpen) {
        setShouldRender(false);
        return void 0;
      }
      const timer = window.setTimeout(() => {
        var _a, _b;
        setShouldRender(false);
        const focusTarget = (_b = (_a = triggerRef.current) != null ? _a : getFocusableTarget(triggerWrapperRef.current)) != null ? _b : triggerWrapperRef.current;
        focusTarget == null ? void 0 : focusTarget.focus();
      }, POPOVER_ANIMATION_MS);
      return () => window.clearTimeout(timer);
    }, [isOpen, updatePosition]);
    useLayoutEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    const triggerElement = React10.cloneElement(trigger, {
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
    return /* @__PURE__ */ jsxs9(
      "span",
      {
        ref: triggerWrapperRef,
        className: clsx10("lds-popover-anchor", className),
        style,
        ...props,
        children: [
          triggerElement,
          shouldRender && container ? createPortal(
            /* @__PURE__ */ jsx10(
              "div",
              {
                ref: mergeRefs(ref, contentRef),
                id: contentId,
                role: contentRole,
                className: clsx10("lds-popover", visible && "is-open", contentClassName),
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

// src/components/Select/Select.tsx
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var toCssSize2 = (value) => {
  if (value === void 0) return void 0;
  return typeof value === "number" ? `${value}px` : value;
};
var useControllableState = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState2(defaultValue);
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
var Select = React11.forwardRef(
  ({
    className,
    style,
    size = "default-size",
    placeholder = "\u8BF7\u9009\u62E9",
    prefix,
    prefixIcon,
    width = 360,
    value,
    defaultValue,
    options,
    open,
    defaultOpen = false,
    onOpenChange,
    onChange,
    matchTriggerWidth = true,
    panelWidth,
    isFocused = false,
    error,
    disabled = false,
    type,
    ...props
  }, ref) => {
    const { hasError } = useFormItemStatus();
    const mergedError = error != null ? error : hasError;
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
    const selectedOption = useMemo2(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue]
    );
    const hasPrefix = prefix !== void 0 || prefixIcon !== void 0;
    const resolvedWidth = toCssSize2(width);
    const mergedStyle = {
      width: "100%",
      ...style
    };
    const anchorStyle = {
      width: resolvedWidth,
      maxWidth: "100%",
      display: "flex"
    };
    const trigger = /* @__PURE__ */ jsxs10(
      "button",
      {
        ...props,
        ref,
        type: type != null ? type : "button",
        disabled,
        "aria-invalid": mergedError || void 0,
        className: clsx11(
          "lds-select",
          `lds-select--${size}`,
          {
            "has-prefix": hasPrefix,
            "is-active": isFocused || isOpen,
            "is-disabled": disabled,
            "is-error": mergedError,
            "is-filled": selectedOption !== void 0
          },
          className
        ),
        style: mergedStyle,
        children: [
          hasPrefix ? /* @__PURE__ */ jsxs10(Fragment2, { children: [
            /* @__PURE__ */ jsx11("span", { className: "lds-select__prefix-group", children: /* @__PURE__ */ jsxs10("span", { className: "lds-select__prefix", children: [
              prefixIcon ? /* @__PURE__ */ jsx11("span", { className: "lds-select__prefix-icon", "aria-hidden": "true", children: prefixIcon }) : null,
              prefix
            ] }) }),
            /* @__PURE__ */ jsx11("span", { className: "lds-select__divider", "aria-hidden": "true" })
          ] }) : null,
          /* @__PURE__ */ jsx11("span", { className: "lds-select__value", children: selectedOption ? selectedOption.label : placeholder }),
          /* @__PURE__ */ jsx11("span", { className: "lds-select__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx11(
            Icon,
            {
              name: isOpen ? "ic-arrow-up-line" : "ic-arrow-down-line",
              className: "lds-select__icon-svg"
            }
          ) })
        ]
      }
    );
    return /* @__PURE__ */ jsx11(
      Popover,
      {
        trigger,
        open: isOpen,
        onOpenChange: setIsOpen,
        style: anchorStyle,
        matchTriggerWidth,
        closeOnClickOutside: true,
        closeOnEsc: true,
        contentRole: "listbox",
        contentClassName: "lds-filter-select__popover lds-select__popover",
        contentStyle: panelWidth !== void 0 ? { width: toCssSize2(panelWidth) } : void 0,
        children: /* @__PURE__ */ jsx11("div", { className: "lds-filter-select__list", children: options.map((option) => {
          const selected = option.value === selectedValue;
          return /* @__PURE__ */ jsxs10(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": selected,
              disabled: option.disabled,
              className: clsx11("lds-filter-select__option", {
                "is-selected": selected
              }),
              onClick: () => {
                if (option.disabled) return;
                setSelectedValue(option.value);
                onChange == null ? void 0 : onChange(option.value, option);
                setIsOpen(false);
              },
              children: [
                option.iconName ? /* @__PURE__ */ jsx11("span", { className: "lds-filter-select__option-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx11(Icon, { name: option.iconName }) }) : null,
                /* @__PURE__ */ jsx11("span", { className: "lds-filter-select__option-label", children: option.label }),
                selected ? /* @__PURE__ */ jsx11("span", { className: "lds-filter-select__option-check", "aria-hidden": "true", children: /* @__PURE__ */ jsx11(Icon, { name: "ic-finish-line" }) }) : null
              ]
            },
            option.value
          );
        }) })
      }
    );
  }
);
Select.displayName = "Select";

// src/components/DatePicker/DatePicker.tsx
import React12, { useMemo as useMemo3, useState as useState3 } from "react";
import { clsx as clsx12 } from "clsx";
import { jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
var DAY_MS = 24 * 60 * 60 * 1e3;
var WEEK_DAYS = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
var toCssSize3 = (value) => {
  if (value === void 0) return void 0;
  return typeof value === "number" ? `${value}px` : value;
};
var useControllableState2 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState3(defaultValue);
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
var normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
var startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
var addMonths = (date, offset) => new Date(date.getFullYear(), date.getMonth() + offset, 1);
var formatDateValue = (date) => {
  if (!date) return void 0;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
var isSameDate = (a, b) => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
var compareDate = (a, b) => normalizeDate(a).getTime() - normalizeDate(b).getTime();
var diffInDays = (a, b) => Math.round(Math.abs(compareDate(a, b)) / DAY_MS);
var buildCalendarCells = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const totalVisibleDays = startOffset + lastDate;
  const rowCount = Math.ceil(totalVisibleDays / 7);
  const cellCount = rowCount * 7;
  const startDate = new Date(year, month, 1 - startOffset);
  return Array.from({ length: cellCount }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month
    };
  });
};
var normalizeRangeValue = (value) => {
  var _a, _b;
  if (!Array.isArray(value)) return [null, null];
  return [(_a = value[0]) != null ? _a : null, (_b = value[1]) != null ? _b : null];
};
var chunkCalendarRows = (cells) => {
  const rows = [];
  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7));
  }
  return rows;
};
var isDateWithinRange = (date, start, end) => {
  const current = normalizeDate(date).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  return current > startTime && current < endTime;
};
var isWithinMaxRange = (candidate, anchor, maxRangeDays) => {
  if (!maxRangeDays || maxRangeDays < 1) return true;
  return diffInDays(candidate, anchor) + 1 <= maxRangeDays;
};
var DatePicker = React12.forwardRef(
  ({
    className,
    style,
    picker = "date",
    size = "default-size",
    placeholder = "\u8BF7\u9009\u62E9",
    rangePlaceholder = ["\u5F00\u59CB\u65E5\u671F", "\u7ED3\u675F\u65E5\u671F"],
    width = 360,
    value,
    defaultValue,
    open,
    defaultOpen = false,
    onOpenChange,
    onChange,
    panelWidth,
    isFocused = false,
    error,
    disabled = false,
    disabledDate,
    maxRangeDays,
    type,
    ...props
  }, ref) => {
    var _a, _b;
    const { hasError } = useFormItemStatus();
    const mergedError = error != null ? error : hasError;
    const fallbackValue = picker === "range" ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState2({
      value,
      defaultValue: defaultValue != null ? defaultValue : fallbackValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState2({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const selectedDate = picker === "date" && selectedValue instanceof Date ? selectedValue : null;
    const [rangeStart, rangeEnd] = picker === "range" ? normalizeRangeValue(selectedValue) : [null, null];
    const [visibleMonth, setVisibleMonth] = useState3(() => {
      var _a2;
      const anchorDate = (_a2 = selectedDate != null ? selectedDate : rangeStart) != null ? _a2 : /* @__PURE__ */ new Date();
      return startOfMonth(anchorDate);
    });
    const resolvedWidth = toCssSize3(width);
    const resolvedPanelWidth = toCssSize3(panelWidth != null ? panelWidth : picker === "range" ? 740 : 380);
    const mergedStyle = {
      width: "100%",
      ...style
    };
    const anchorStyle = {
      width: resolvedWidth,
      maxWidth: "100%",
      display: "flex"
    };
    const singleCalendarCells = useMemo3(() => buildCalendarCells(visibleMonth), [visibleMonth]);
    const leftVisibleMonth = visibleMonth;
    const rightVisibleMonth = useMemo3(() => addMonths(visibleMonth, 1), [visibleMonth]);
    const leftCalendarCells = useMemo3(() => buildCalendarCells(leftVisibleMonth), [leftVisibleMonth]);
    const rightCalendarCells = useMemo3(
      () => buildCalendarCells(rightVisibleMonth),
      [rightVisibleMonth]
    );
    const leftCalendarRows = useMemo3(() => chunkCalendarRows(leftCalendarCells), [leftCalendarCells]);
    const rightCalendarRows = useMemo3(
      () => chunkCalendarRows(rightCalendarCells),
      [rightCalendarCells]
    );
    const trigger = /* @__PURE__ */ jsxs11(
      "button",
      {
        ...props,
        ref,
        type: type != null ? type : "button",
        disabled,
        "aria-invalid": mergedError || void 0,
        className: clsx12(
          "lds-select",
          "lds-date-picker",
          `lds-select--${size}`,
          `lds-date-picker--${picker}`,
          {
            "is-active": isFocused || isOpen,
            "is-disabled": disabled,
            "is-error": mergedError,
            "is-filled": picker === "date" ? selectedDate !== null : Boolean(rangeStart || rangeEnd)
          },
          className
        ),
        style: mergedStyle,
        children: [
          picker === "range" ? /* @__PURE__ */ jsxs11("span", { className: "lds-select__value lds-date-picker__range", children: [
            /* @__PURE__ */ jsx12(
              "span",
              {
                className: clsx12("lds-date-picker__range-value", {
                  "is-selected": rangeStart,
                  "is-placeholder": !rangeStart
                }),
                children: (_a = formatDateValue(rangeStart)) != null ? _a : rangePlaceholder[0]
              }
            ),
            /* @__PURE__ */ jsx12("span", { className: "lds-date-picker__range-separator", "aria-hidden": "true", children: "~" }),
            /* @__PURE__ */ jsx12(
              "span",
              {
                className: clsx12("lds-date-picker__range-value", {
                  "is-selected": rangeEnd,
                  "is-placeholder": !rangeEnd
                }),
                children: (_b = formatDateValue(rangeEnd)) != null ? _b : rangePlaceholder[1]
              }
            )
          ] }) : /* @__PURE__ */ jsx12("span", { className: "lds-select__value", children: selectedDate ? formatDateValue(selectedDate) : placeholder }),
          /* @__PURE__ */ jsx12("span", { className: "lds-select__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx12(Icon, { name: "ic-calendar-line", className: "lds-select__icon-svg lds-date-picker__icon-svg" }) })
        ]
      }
    );
    const handleSingleDateSelect = (date) => {
      const nextDate = normalizeDate(date);
      setSelectedValue(nextDate);
      onChange == null ? void 0 : onChange(nextDate);
      setIsOpen(false);
    };
    const handleRangeDateSelect = (date) => {
      const nextDate = normalizeDate(date);
      if (!rangeStart || rangeEnd) {
        const nextRange2 = [nextDate, null];
        setSelectedValue(nextRange2);
        onChange == null ? void 0 : onChange(nextRange2);
        return;
      }
      const nextRange = compareDate(nextDate, rangeStart) < 0 ? [nextDate, rangeStart] : [rangeStart, nextDate];
      setSelectedValue(nextRange);
      onChange == null ? void 0 : onChange(nextRange);
      setIsOpen(false);
    };
    const renderCalendar = ({
      month,
      cells,
      rows,
      isRange
    }) => /* @__PURE__ */ jsxs11(
      "div",
      {
        className: clsx12("lds-date-picker__calendar", {
          "lds-date-picker__calendar--range": isRange
        }),
        "data-month": `${month.getFullYear()}-${month.getMonth() + 1}`,
        children: [
          /* @__PURE__ */ jsx12("div", { className: "lds-filter-date-picker__weekdays", children: WEEK_DAYS.map((weekDay) => /* @__PURE__ */ jsx12("span", { className: "lds-filter-date-picker__weekday", children: weekDay }, weekDay)) }),
          isRange && rows ? /* @__PURE__ */ jsx12("div", { className: "lds-date-picker__range-grid", children: rows.map((row, rowIndex) => {
            const activeIndexes = [];
            let backgroundStyle;
            if (rangeStart && rangeEnd) {
              row.forEach((cell, cellIndex) => {
                if (!cell.isCurrentMonth) {
                  return;
                }
                const isRangeStart = isSameDate(cell.date, rangeStart);
                const isRangeEnd = isSameDate(cell.date, rangeEnd);
                const isInRange = isDateWithinRange(cell.date, rangeStart, rangeEnd);
                if (isRangeStart || isRangeEnd || isInRange) {
                  activeIndexes.push(cellIndex);
                }
              });
              if (activeIndexes.length > 0) {
                const firstIndex = activeIndexes[0];
                const lastIndex = activeIndexes[activeIndexes.length - 1];
                const rowHasStart = row.some(
                  (cell) => cell.isCurrentMonth && isSameDate(cell.date, rangeStart)
                );
                const rowHasEnd = row.some(
                  (cell) => cell.isCurrentMonth && isSameDate(cell.date, rangeEnd)
                );
                const slotWidth = 48;
                const cellRadius = 12;
                const startX = rowHasStart ? firstIndex * slotWidth + 22 : firstIndex * slotWidth;
                const endX = rowHasEnd ? lastIndex * slotWidth + 22 : lastIndex * slotWidth + 44;
                backgroundStyle = {
                  left: `${startX}px`,
                  width: `${Math.max(endX - startX, 0)}px`,
                  borderTopLeftRadius: rowHasStart ? 0 : `${cellRadius}px`,
                  borderBottomLeftRadius: rowHasStart ? 0 : `${cellRadius}px`,
                  borderTopRightRadius: rowHasEnd ? 0 : `${cellRadius}px`,
                  borderBottomRightRadius: rowHasEnd ? 0 : `${cellRadius}px`
                };
              }
            }
            const activeIndexSet = new Set(activeIndexes);
            return /* @__PURE__ */ jsxs11("div", { className: "lds-date-picker__range-row", children: [
              backgroundStyle ? /* @__PURE__ */ jsx12("div", { className: "lds-date-picker__range-row-bg", style: backgroundStyle }) : null,
              row.map((cell, cellIndex) => {
                var _a2;
                const isOverlapPlaceholder = !cell.isCurrentMonth;
                const externalDisabled = (_a2 = disabledDate == null ? void 0 : disabledDate(cell.date)) != null ? _a2 : false;
                const maxRangeDisabled = rangeStart && !rangeEnd && !isWithinMaxRange(cell.date, rangeStart, maxRangeDays);
                const isDisabled = isOverlapPlaceholder || externalDisabled || Boolean(maxRangeDisabled);
                const isRangeStart = !isOverlapPlaceholder && rangeStart ? isSameDate(cell.date, rangeStart) : false;
                const isRangeEnd = !isOverlapPlaceholder && rangeEnd ? isSameDate(cell.date, rangeEnd) : false;
                const isRangeSingle = Boolean(isRangeStart && (!rangeEnd || isRangeEnd));
                const isRangeStartConnected = Boolean(
                  isRangeStart && !isRangeSingle && activeIndexSet.has(cellIndex + 1)
                );
                const isRangeEndConnected = Boolean(
                  isRangeEnd && !isRangeSingle && activeIndexSet.has(cellIndex - 1)
                );
                return /* @__PURE__ */ jsx12("div", { className: "lds-date-picker__range-cell-shell", children: /* @__PURE__ */ jsx12(
                  "button",
                  {
                    type: "button",
                    disabled: isDisabled,
                    className: clsx12("lds-filter-date-picker__cell", "lds-date-picker__range-cell", {
                      "is-outside": !cell.isCurrentMonth,
                      "is-range-start": isRangeStart,
                      "is-range-end": isRangeEnd,
                      "is-range-single": isRangeSingle,
                      "is-range-start-connected": isRangeStartConnected,
                      "is-range-end-connected": isRangeEndConnected
                    }),
                    onClick: () => {
                      if (isDisabled) return;
                      handleRangeDateSelect(cell.date);
                    },
                    children: cell.day
                  }
                ) }, cell.date.toISOString());
              })
            ] }, `${month.toISOString()}-row-${rowIndex}`);
          }) }) : /* @__PURE__ */ jsx12("div", { className: "lds-filter-date-picker__grid", children: cells.map((cell) => {
            var _a2;
            const isDisabled = (_a2 = disabledDate == null ? void 0 : disabledDate(cell.date)) != null ? _a2 : false;
            const isSelected = isSameDate(cell.date, selectedDate);
            return /* @__PURE__ */ jsx12(
              "button",
              {
                type: "button",
                disabled: isDisabled,
                className: clsx12("lds-filter-date-picker__cell", {
                  "is-outside": !cell.isCurrentMonth,
                  "is-selected": isSelected
                }),
                onClick: () => {
                  if (isDisabled) return;
                  handleSingleDateSelect(cell.date);
                },
                children: cell.day
              },
              cell.date.toISOString()
            );
          }) })
        ]
      }
    );
    const content = picker === "range" ? /* @__PURE__ */ jsxs11("div", { className: "lds-date-picker__range-panel", children: [
      /* @__PURE__ */ jsxs11("div", { className: "lds-date-picker__range-header", children: [
        /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear() - 1, leftVisibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-\bdouble-left-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear(), leftVisibleMonth.getMonth() - 1, 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-arrow-left-line", "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs11("div", { className: "lds-date-picker__range-titles", children: [
          /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__title", children: [
            /* @__PURE__ */ jsxs11("span", { children: [
              leftVisibleMonth.getFullYear(),
              "\u5E74"
            ] }),
            /* @__PURE__ */ jsxs11("span", { children: [
              leftVisibleMonth.getMonth() + 1,
              "\u6708"
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__title", children: [
            /* @__PURE__ */ jsxs11("span", { children: [
              rightVisibleMonth.getFullYear(),
              "\u5E74"
            ] }),
            /* @__PURE__ */ jsxs11("span", { children: [
              rightVisibleMonth.getMonth() + 1,
              "\u6708"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear(), leftVisibleMonth.getMonth() + 1, 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-arrow-right-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear() + 1, leftVisibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-\b\bdouble-right-line", "aria-hidden": "true" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "lds-date-picker__range-body", children: [
        renderCalendar({
          month: leftVisibleMonth,
          cells: leftCalendarCells,
          rows: leftCalendarRows,
          isRange: true
        }),
        renderCalendar({
          month: rightVisibleMonth,
          cells: rightCalendarCells,
          rows: rightCalendarRows,
          isRange: true
        })
      ] })
    ] }) : /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker", children: [
      /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__header", children: [
        /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-\bdouble-left-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-arrow-left-line", "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__title", children: [
          /* @__PURE__ */ jsxs11("span", { children: [
            visibleMonth.getFullYear(),
            "\u5E74"
          ] }),
          /* @__PURE__ */ jsxs11("span", { children: [
            visibleMonth.getMonth() + 1,
            "\u6708"
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-arrow-right-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx12(Icon, { name: "ic-\b\bdouble-right-line", "aria-hidden": "true" })
            }
          )
        ] })
      ] }),
      renderCalendar({
        month: visibleMonth,
        cells: singleCalendarCells,
        rows: void 0,
        isRange: false
      })
    ] });
    return /* @__PURE__ */ jsx12(
      Popover,
      {
        trigger,
        open: isOpen,
        onOpenChange: (nextOpen) => {
          var _a2;
          if (nextOpen) {
            const anchorDate = (_a2 = selectedDate != null ? selectedDate : rangeStart) != null ? _a2 : /* @__PURE__ */ new Date();
            setVisibleMonth(startOfMonth(anchorDate));
          }
          setIsOpen(nextOpen);
        },
        style: anchorStyle,
        closeOnClickOutside: true,
        closeOnEsc: true,
        contentClassName: clsx12("lds-filter-date-picker__popover", {
          "lds-date-picker__range-popover": picker === "range",
          "lds-date-picker__popover": picker === "date"
        }),
        contentStyle: { width: resolvedPanelWidth },
        children: content
      }
    );
  }
);
DatePicker.displayName = "DatePicker";

// src/components/TimePicker/TimePicker.tsx
import React13, { useEffect as useEffect2, useMemo as useMemo4, useRef as useRef2, useState as useState4 } from "react";
import { clsx as clsx13 } from "clsx";
import { jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var toCssSize4 = (value) => {
  if (value === void 0) return void 0;
  return typeof value === "number" ? `${value}px` : value;
};
var useControllableState3 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState4(defaultValue);
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
var normalizeTimeValue = (value) => {
  if (!value) return null;
  const [rawHour = "00", rawMinute = "00"] = value.split(":");
  const hour = rawHour.padStart(2, "0").slice(0, 2);
  const minute = rawMinute.padStart(2, "0").slice(0, 2);
  return `${hour}:${minute}`;
};
var splitTimeValue = (value, fallbackHour, fallbackMinute) => {
  const normalized = normalizeTimeValue(value);
  if (!normalized) {
    return {
      hour: fallbackHour,
      minute: fallbackMinute
    };
  }
  const [hour, minute] = normalized.split(":");
  return {
    hour,
    minute
  };
};
var normalizeRangeValue2 = (value) => {
  if (!Array.isArray(value)) return [null, null];
  return [normalizeTimeValue(value[0]), normalizeTimeValue(value[1])];
};
var compareTimeValue = (left, right) => {
  if (!left || !right) return 0;
  return left.localeCompare(right);
};
var scrollSelectedCellIntoView = (column, selectedValue) => {
  if (!column || !selectedValue) return;
  const selectedCell = column.querySelector(`[data-time-value="${selectedValue}"]`);
  if (!selectedCell) return;
  const centeredTop = selectedCell.offsetTop - (column.clientHeight - selectedCell.offsetHeight) / 2;
  const maxScrollTop = Math.max(column.scrollHeight - column.clientHeight, 0);
  const nextScrollTop = Math.min(Math.max(centeredTop, 0), maxScrollTop);
  column.scrollTo({
    top: nextScrollTop,
    behavior: "auto"
  });
};
var TimePicker = React13.forwardRef(
  ({
    className,
    style,
    picker = "time",
    size = "default-size",
    placeholder = "\u8BF7\u9009\u62E9",
    rangePlaceholder = ["\u5F00\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"],
    width = 360,
    value,
    defaultValue,
    open,
    defaultOpen = false,
    onOpenChange,
    onChange,
    panelWidth,
    isFocused = false,
    error,
    disabled = false,
    hourStep = 1,
    minuteStep = 1,
    type,
    ...props
  }, ref) => {
    var _a, _b;
    const { hasError } = useFormItemStatus();
    const mergedError = error != null ? error : hasError;
    const hourColumnRef = useRef2(null);
    const minuteColumnRef = useRef2(null);
    const rangeStartHourColumnRef = useRef2(null);
    const rangeStartMinuteColumnRef = useRef2(null);
    const rangeEndHourColumnRef = useRef2(null);
    const rangeEndMinuteColumnRef = useRef2(null);
    const fallbackValue = picker === "range" ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState3({
      value,
      defaultValue: defaultValue != null ? defaultValue : fallbackValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState3({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const hours = useMemo4(() => buildTimeRange(24, hourStep), [hourStep]);
    const minutes = useMemo4(() => buildTimeRange(60, minuteStep), [minuteStep]);
    const fallbackHour = (_a = hours[0]) != null ? _a : "00";
    const fallbackMinute = (_b = minutes[0]) != null ? _b : "00";
    const selectedTime = picker === "time" && typeof selectedValue === "string" ? normalizeTimeValue(selectedValue) : null;
    const [rangeStart, rangeEnd] = picker === "range" ? normalizeRangeValue2(selectedValue) : [null, null];
    const initialSingle = splitTimeValue(selectedTime, fallbackHour, fallbackMinute);
    const [draftHour, setDraftHour] = useState4(initialSingle.hour);
    const [draftMinute, setDraftMinute] = useState4(initialSingle.minute);
    const initialRangeStart = splitTimeValue(rangeStart, fallbackHour, fallbackMinute);
    const initialRangeEnd = splitTimeValue(rangeEnd, fallbackHour, fallbackMinute);
    const [rangeDraft, setRangeDraft] = useState4({
      startHour: initialRangeStart.hour,
      startMinute: initialRangeStart.minute,
      endHour: initialRangeEnd.hour,
      endMinute: initialRangeEnd.minute
    });
    const resolvedWidth = toCssSize4(width);
    const resolvedPanelWidth = toCssSize4(panelWidth);
    const mergedStyle = {
      width: "100%",
      ...style
    };
    const anchorStyle = {
      width: resolvedWidth,
      maxWidth: "100%",
      display: "flex"
    };
    useEffect2(() => {
      if (!isOpen) return;
      let frameId2 = 0;
      const frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          if (picker === "range") {
            scrollSelectedCellIntoView(rangeStartHourColumnRef.current, rangeDraft.startHour);
            scrollSelectedCellIntoView(rangeStartMinuteColumnRef.current, rangeDraft.startMinute);
            scrollSelectedCellIntoView(rangeEndHourColumnRef.current, rangeDraft.endHour);
            scrollSelectedCellIntoView(rangeEndMinuteColumnRef.current, rangeDraft.endMinute);
            return;
          }
          scrollSelectedCellIntoView(hourColumnRef.current, draftHour);
          scrollSelectedCellIntoView(minuteColumnRef.current, draftMinute);
        });
      });
      return () => {
        cancelAnimationFrame(frameId1);
        cancelAnimationFrame(frameId2);
      };
    }, [draftHour, draftMinute, isOpen, picker, rangeDraft]);
    const commitSingleValue = (nextHour, nextMinute, close = false) => {
      const nextValue = `${nextHour}:${nextMinute}`;
      setSelectedValue(nextValue);
      onChange == null ? void 0 : onChange(nextValue);
      if (close) {
        setIsOpen(false);
      }
    };
    const commitRangeValue = (nextRangeDraft, changedPart, close = false) => {
      let nextStart = rangeStart;
      let nextEnd = rangeEnd;
      if (changedPart === "start") {
        nextStart = `${nextRangeDraft.startHour}:${nextRangeDraft.startMinute}`;
      } else {
        nextEnd = `${nextRangeDraft.endHour}:${nextRangeDraft.endMinute}`;
      }
      if (nextStart && nextEnd && compareTimeValue(nextStart, nextEnd) > 0) {
        if (changedPart === "start") {
          nextEnd = nextStart;
        } else {
          nextStart = nextEnd;
        }
      }
      const normalizedStart = splitTimeValue(nextStart, nextRangeDraft.startHour, nextRangeDraft.startMinute);
      const normalizedEnd = splitTimeValue(nextEnd, nextRangeDraft.endHour, nextRangeDraft.endMinute);
      const normalizedDraft = {
        startHour: normalizedStart.hour,
        startMinute: normalizedStart.minute,
        endHour: normalizedEnd.hour,
        endMinute: normalizedEnd.minute
      };
      const nextValue = [nextStart, nextEnd];
      setRangeDraft(normalizedDraft);
      setSelectedValue(nextValue);
      onChange == null ? void 0 : onChange(nextValue);
      if (close) {
        setIsOpen(false);
      }
    };
    const trigger = /* @__PURE__ */ jsxs12(
      "button",
      {
        ...props,
        ref,
        type: type != null ? type : "button",
        disabled,
        "aria-invalid": mergedError || void 0,
        className: clsx13(
          "lds-select",
          "lds-time-picker",
          `lds-select--${size}`,
          `lds-time-picker--${picker}`,
          {
            "is-active": isFocused || isOpen,
            "is-disabled": disabled,
            "is-error": mergedError,
            "is-filled": picker === "range" ? Boolean(rangeStart || rangeEnd) : Boolean(selectedTime)
          },
          className
        ),
        style: mergedStyle,
        children: [
          picker === "range" ? /* @__PURE__ */ jsxs12("span", { className: "lds-select__value lds-time-picker__range", children: [
            /* @__PURE__ */ jsx13(
              "span",
              {
                className: clsx13("lds-time-picker__range-value", {
                  "is-selected": rangeStart,
                  "is-placeholder": !rangeStart
                }),
                children: rangeStart != null ? rangeStart : rangePlaceholder[0]
              }
            ),
            /* @__PURE__ */ jsx13("span", { className: "lds-time-picker__range-separator", "aria-hidden": "true", children: "~" }),
            /* @__PURE__ */ jsx13(
              "span",
              {
                className: clsx13("lds-time-picker__range-value", {
                  "is-selected": rangeEnd,
                  "is-placeholder": !rangeEnd
                }),
                children: rangeEnd != null ? rangeEnd : rangePlaceholder[1]
              }
            )
          ] }) : /* @__PURE__ */ jsx13("span", { className: "lds-select__value", children: selectedTime != null ? selectedTime : placeholder }),
          /* @__PURE__ */ jsx13("span", { className: "lds-select__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx13(Icon, { name: "ic-time-round-line", className: "lds-select__icon-svg lds-time-picker__icon-svg" }) })
        ]
      }
    );
    return /* @__PURE__ */ jsx13(
      Popover,
      {
        trigger,
        open: isOpen,
        onOpenChange: (nextOpen) => {
          if (nextOpen) {
            if (picker === "range") {
              const nextRange = normalizeRangeValue2(selectedValue);
              const nextStart = splitTimeValue(nextRange[0], fallbackHour, fallbackMinute);
              const nextEnd = splitTimeValue(nextRange[1], fallbackHour, fallbackMinute);
              setRangeDraft({
                startHour: nextStart.hour,
                startMinute: nextStart.minute,
                endHour: nextEnd.hour,
                endMinute: nextEnd.minute
              });
            } else {
              const nextSingle = splitTimeValue(selectedTime, fallbackHour, fallbackMinute);
              setDraftHour(nextSingle.hour);
              setDraftMinute(nextSingle.minute);
            }
          }
          setIsOpen(nextOpen);
        },
        style: anchorStyle,
        closeOnClickOutside: true,
        closeOnEsc: true,
        contentClassName: clsx13("lds-time-picker__popover", {
          "lds-filter-time-picker__popover": picker === "time",
          "lds-time-picker__range-popover": picker === "range"
        }),
        contentStyle: resolvedPanelWidth ? { width: resolvedPanelWidth } : void 0,
        children: picker === "range" ? /* @__PURE__ */ jsxs12("div", { className: "lds-time-picker__range-panel", children: [
          /* @__PURE__ */ jsxs12("div", { className: "lds-time-picker__range-section", children: [
            /* @__PURE__ */ jsx13("div", { className: "lds-time-picker__range-section-header", children: "\u5F00\u59CB\u65F6\u95F4" }),
            /* @__PURE__ */ jsxs12("div", { className: "lds-time-picker__range-section-body", children: [
              /* @__PURE__ */ jsx13("div", { ref: rangeStartHourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ jsx13(
                "button",
                {
                  type: "button",
                  "data-time-value": hour,
                  className: clsx13("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.startHour === hour
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      startHour: hour
                    };
                    commitRangeValue(nextDraft, "start");
                  },
                  children: hour
                },
                `start-hour-${hour}`
              )) }),
              /* @__PURE__ */ jsx13("div", { ref: rangeStartMinuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ jsx13(
                "button",
                {
                  type: "button",
                  "data-time-value": minute,
                  className: clsx13("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.startMinute === minute
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      startMinute: minute
                    };
                    commitRangeValue(nextDraft, "start");
                  },
                  children: minute
                },
                `start-minute-${minute}`
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs12("div", { className: "lds-time-picker__range-section is-end", children: [
            /* @__PURE__ */ jsx13("div", { className: "lds-time-picker__range-section-header", children: "\u7ED3\u675F\u65F6\u95F4" }),
            /* @__PURE__ */ jsxs12("div", { className: "lds-time-picker__range-section-body", children: [
              /* @__PURE__ */ jsx13("div", { ref: rangeEndHourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ jsx13(
                "button",
                {
                  type: "button",
                  "data-time-value": hour,
                  className: clsx13("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.endHour === hour
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      endHour: hour
                    };
                    commitRangeValue(nextDraft, "end");
                  },
                  children: hour
                },
                `end-hour-${hour}`
              )) }),
              /* @__PURE__ */ jsx13("div", { ref: rangeEndMinuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ jsx13(
                "button",
                {
                  type: "button",
                  "data-time-value": minute,
                  className: clsx13("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.endMinute === minute
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      endMinute: minute
                    };
                    commitRangeValue(nextDraft, "end", true);
                  },
                  children: minute
                },
                `end-minute-${minute}`
              )) })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs12("div", { className: "lds-filter-time-picker", children: [
          /* @__PURE__ */ jsx13("div", { ref: hourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              "data-time-value": hour,
              className: clsx13("lds-filter-time-picker__cell", {
                "is-selected": draftHour === hour
              }),
              onClick: () => {
                setDraftHour(hour);
                commitSingleValue(hour, draftMinute);
              },
              children: hour
            },
            hour
          )) }),
          /* @__PURE__ */ jsx13("div", { ref: minuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              "data-time-value": minute,
              className: clsx13("lds-filter-time-picker__cell", {
                "is-selected": draftMinute === minute
              }),
              onClick: () => {
                setDraftMinute(minute);
                commitSingleValue(draftHour, minute, true);
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
TimePicker.displayName = "TimePicker";

// src/components/Filter/Filter.tsx
import React14 from "react";
import { clsx as clsx14 } from "clsx";
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
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
var Filter = React14.forwardRef((props, ref) => {
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
    return /* @__PURE__ */ jsxs13(
      "div",
      {
        ref,
        className: clsx14(
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
          /* @__PURE__ */ jsx14("span", { className: "lds-filter__label", children: label }),
          /* @__PURE__ */ jsx14("span", { className: "lds-filter__divider", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx14("span", { className: "lds-filter__control", children: /* @__PURE__ */ jsx14(
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
  const iconNode = rightIcon != null ? rightIcon : defaultIconName ? /* @__PURE__ */ jsx14(Icon, { name: defaultIconName, className: "lds-filter__icon-svg", "aria-hidden": "true" }) : null;
  return /* @__PURE__ */ jsxs13(
    "button",
    {
      ref,
      type: "button",
      className: clsx14(
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
        /* @__PURE__ */ jsx14("span", { className: "lds-filter__label", children: label }),
        /* @__PURE__ */ jsx14("span", { className: "lds-filter__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx14("span", { className: "lds-filter__control", children: /* @__PURE__ */ jsx14("span", { className: "lds-filter__value", children: filled ? value : placeholder != null ? placeholder : value }) }),
        iconNode ? /* @__PURE__ */ jsx14("span", { className: "lds-filter__icon", children: iconNode }) : null
      ]
    }
  );
});
Filter.displayName = "Filter";

// src/components/FilterSelect/FilterSelect.tsx
import React15, { useMemo as useMemo5, useState as useState5 } from "react";
import { clsx as clsx15 } from "clsx";
import { jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
var useControllableState4 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState5(defaultValue);
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
var FilterSelect = React15.forwardRef(
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
    const [selectedValue, setSelectedValue] = useControllableState4({
      value,
      defaultValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState4({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const selectedOption = useMemo5(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue]
    );
    const trigger = /* @__PURE__ */ jsx15(
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
    return /* @__PURE__ */ jsx15(
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
        children: /* @__PURE__ */ jsx15("div", { className: "lds-filter-select__list", children: options.map((option) => {
          const selected = option.value === selectedValue;
          return /* @__PURE__ */ jsxs14(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": selected,
              disabled: option.disabled,
              className: clsx15("lds-filter-select__option", {
                "is-selected": selected
              }),
              onClick: () => {
                if (option.disabled) return;
                setSelectedValue(option.value);
                onChange == null ? void 0 : onChange(option.value, option);
                setIsOpen(false);
              },
              children: [
                option.iconName ? /* @__PURE__ */ jsx15("span", { className: "lds-filter-select__option-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx15(Icon, { name: option.iconName }) }) : null,
                /* @__PURE__ */ jsx15("span", { className: "lds-filter-select__option-label", children: option.label }),
                selected ? /* @__PURE__ */ jsx15("span", { className: "lds-filter-select__option-check", "aria-hidden": "true", children: /* @__PURE__ */ jsx15(Icon, { name: "ic-finish-line" }) }) : null
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
import React16, { useMemo as useMemo6, useState as useState6 } from "react";
import { clsx as clsx16 } from "clsx";
import { jsx as jsx16, jsxs as jsxs15 } from "react/jsx-runtime";
var DAY_MS2 = 24 * 60 * 60 * 1e3;
var WEEK_DAYS2 = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
var useControllableState5 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState6(defaultValue);
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
var formatDateValue2 = (date) => {
  if (!date) return void 0;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};
var formatRangeDateValue = (date) => {
  if (!date) return void 0;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
var isSameDate2 = (a, b) => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
var normalizeDate2 = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
var startOfMonth2 = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
var addMonths2 = (date, offset) => new Date(date.getFullYear(), date.getMonth() + offset, 1);
var compareDate2 = (a, b) => normalizeDate2(a).getTime() - normalizeDate2(b).getTime();
var diffInDays2 = (a, b) => Math.round(Math.abs(compareDate2(a, b)) / DAY_MS2);
var buildCalendarCells2 = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const totalVisibleDays = startOffset + lastDate;
  const rowCount = Math.ceil(totalVisibleDays / 7);
  const cellCount = rowCount * 7;
  const startDate = new Date(year, month, 1 - startOffset);
  return Array.from({ length: cellCount }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month
    };
  });
};
var normalizeRangeValue3 = (value) => {
  var _a, _b;
  if (!Array.isArray(value)) return [null, null];
  return [(_a = value[0]) != null ? _a : null, (_b = value[1]) != null ? _b : null];
};
var chunkCalendarRows2 = (cells) => {
  const rows = [];
  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7));
  }
  return rows;
};
var isDateWithinRange2 = (date, start, end) => {
  const current = normalizeDate2(date).getTime();
  const startTime = normalizeDate2(start).getTime();
  const endTime = normalizeDate2(end).getTime();
  return current > startTime && current < endTime;
};
var isWithinMaxRange2 = (candidate, anchor, maxRangeDays) => {
  if (!maxRangeDays || maxRangeDays < 1) return true;
  return diffInDays2(candidate, anchor) + 1 <= maxRangeDays;
};
var FilterDatePicker = React16.forwardRef(
  ({
    className,
    label,
    picker = "date",
    placeholder = "\u8BF7\u9009\u62E9",
    rangePlaceholder = ["\u5F00\u59CB\u65E5\u671F", "\u7ED3\u675F\u65E5\u671F"],
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
    disabledDate,
    maxRangeDays,
    ...props
  }, ref) => {
    const fallbackValue = picker === "range" ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState5({
      value,
      defaultValue: defaultValue != null ? defaultValue : fallbackValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState5({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const selectedDate = picker === "date" && selectedValue instanceof Date ? selectedValue : null;
    const [rangeStart, rangeEnd] = picker === "range" ? normalizeRangeValue3(selectedValue) : [null, null];
    const [visibleMonth, setVisibleMonth] = useState6(
      () => {
        var _a;
        return startOfMonth2((_a = selectedDate != null ? selectedDate : rangeStart) != null ? _a : /* @__PURE__ */ new Date());
      }
    );
    const singleCalendarCells = useMemo6(() => buildCalendarCells2(visibleMonth), [visibleMonth]);
    const leftVisibleMonth = visibleMonth;
    const rightVisibleMonth = useMemo6(() => addMonths2(visibleMonth, 1), [visibleMonth]);
    const leftCalendarCells = useMemo6(() => buildCalendarCells2(leftVisibleMonth), [leftVisibleMonth]);
    const rightCalendarCells = useMemo6(
      () => buildCalendarCells2(rightVisibleMonth),
      [rightVisibleMonth]
    );
    const leftCalendarRows = useMemo6(() => chunkCalendarRows2(leftCalendarCells), [leftCalendarCells]);
    const rightCalendarRows = useMemo6(
      () => chunkCalendarRows2(rightCalendarCells),
      [rightCalendarCells]
    );
    const rangeDisplay = (() => {
      var _a, _b;
      if (!rangeStart && !rangeEnd) return void 0;
      return /* @__PURE__ */ jsxs15("span", { className: "lds-filter__range-display", children: [
        /* @__PURE__ */ jsx16(
          "span",
          {
            className: clsx16("lds-filter__range-part", {
              "is-placeholder": !rangeStart
            }),
            children: (_a = formatRangeDateValue(rangeStart)) != null ? _a : rangePlaceholder[0]
          }
        ),
        /* @__PURE__ */ jsxs15("span", { className: "lds-filter__range-separator", "aria-hidden": "true", children: [
          " ",
          "\uFF5E",
          " "
        ] }),
        /* @__PURE__ */ jsx16(
          "span",
          {
            className: clsx16("lds-filter__range-part", {
              "is-placeholder": !rangeEnd
            }),
            children: (_b = formatRangeDateValue(rangeEnd)) != null ? _b : rangePlaceholder[1]
          }
        )
      ] });
    })();
    const trigger = /* @__PURE__ */ jsx16(
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
        value: picker === "range" ? rangeDisplay : formatDateValue2(selectedDate)
      }
    );
    const handleSingleDateSelect = (date) => {
      const nextDate = normalizeDate2(date);
      setSelectedValue(nextDate);
      onChange == null ? void 0 : onChange(nextDate);
      setIsOpen(false);
    };
    const handleRangeDateSelect = (date) => {
      const nextDate = normalizeDate2(date);
      if (!rangeStart || rangeEnd) {
        const nextRange2 = [nextDate, null];
        setSelectedValue(nextRange2);
        onChange == null ? void 0 : onChange(nextRange2);
        return;
      }
      const nextRange = compareDate2(nextDate, rangeStart) < 0 ? [nextDate, rangeStart] : [rangeStart, nextDate];
      setSelectedValue(nextRange);
      onChange == null ? void 0 : onChange(nextRange);
      setIsOpen(false);
    };
    const renderCalendar = ({
      month,
      cells,
      rows,
      isRange
    }) => /* @__PURE__ */ jsxs15(
      "div",
      {
        className: clsx16("lds-date-picker__calendar", {
          "lds-date-picker__calendar--range": isRange
        }),
        "data-month": `${month.getFullYear()}-${month.getMonth() + 1}`,
        children: [
          /* @__PURE__ */ jsx16("div", { className: "lds-filter-date-picker__weekdays", children: WEEK_DAYS2.map((weekDay) => /* @__PURE__ */ jsx16("span", { className: "lds-filter-date-picker__weekday", children: weekDay }, weekDay)) }),
          isRange && rows ? /* @__PURE__ */ jsx16("div", { className: "lds-date-picker__range-grid", children: rows.map((row, rowIndex) => {
            const activeIndexes = [];
            let backgroundStyle;
            if (rangeStart && rangeEnd) {
              row.forEach((cell, cellIndex) => {
                if (!cell.isCurrentMonth) return;
                const isRangeStart = isSameDate2(cell.date, rangeStart);
                const isRangeEnd = isSameDate2(cell.date, rangeEnd);
                const isInRange = isDateWithinRange2(cell.date, rangeStart, rangeEnd);
                if (isRangeStart || isRangeEnd || isInRange) {
                  activeIndexes.push(cellIndex);
                }
              });
              if (activeIndexes.length > 0) {
                const firstIndex = activeIndexes[0];
                const lastIndex = activeIndexes[activeIndexes.length - 1];
                const rowHasStart = row.some(
                  (cell) => cell.isCurrentMonth && isSameDate2(cell.date, rangeStart)
                );
                const rowHasEnd = row.some(
                  (cell) => cell.isCurrentMonth && isSameDate2(cell.date, rangeEnd)
                );
                const slotWidth = 48;
                const cellRadius = 12;
                const startX = rowHasStart ? firstIndex * slotWidth + 22 : firstIndex * slotWidth;
                const endX = rowHasEnd ? lastIndex * slotWidth + 22 : lastIndex * slotWidth + 44;
                backgroundStyle = {
                  left: `${startX}px`,
                  width: `${Math.max(endX - startX, 0)}px`,
                  borderTopLeftRadius: rowHasStart ? 0 : `${cellRadius}px`,
                  borderBottomLeftRadius: rowHasStart ? 0 : `${cellRadius}px`,
                  borderTopRightRadius: rowHasEnd ? 0 : `${cellRadius}px`,
                  borderBottomRightRadius: rowHasEnd ? 0 : `${cellRadius}px`
                };
              }
            }
            const activeIndexSet = new Set(activeIndexes);
            return /* @__PURE__ */ jsxs15("div", { className: "lds-date-picker__range-row", children: [
              backgroundStyle ? /* @__PURE__ */ jsx16("div", { className: "lds-date-picker__range-row-bg", style: backgroundStyle }) : null,
              row.map((cell, cellIndex) => {
                var _a;
                const isOverlapPlaceholder = !cell.isCurrentMonth;
                const externalDisabled = (_a = disabledDate == null ? void 0 : disabledDate(cell.date)) != null ? _a : false;
                const maxRangeDisabled = rangeStart && !rangeEnd && !isWithinMaxRange2(cell.date, rangeStart, maxRangeDays);
                const isDisabled = isOverlapPlaceholder || externalDisabled || Boolean(maxRangeDisabled);
                const isRangeStart = !isOverlapPlaceholder && rangeStart ? isSameDate2(cell.date, rangeStart) : false;
                const isRangeEnd = !isOverlapPlaceholder && rangeEnd ? isSameDate2(cell.date, rangeEnd) : false;
                const isRangeSingle = Boolean(isRangeStart && (!rangeEnd || isRangeEnd));
                const isRangeStartConnected = Boolean(
                  isRangeStart && !isRangeSingle && activeIndexSet.has(cellIndex + 1)
                );
                const isRangeEndConnected = Boolean(
                  isRangeEnd && !isRangeSingle && activeIndexSet.has(cellIndex - 1)
                );
                return /* @__PURE__ */ jsx16("div", { className: "lds-date-picker__range-cell-shell", children: /* @__PURE__ */ jsx16(
                  "button",
                  {
                    type: "button",
                    disabled: isDisabled,
                    className: clsx16("lds-filter-date-picker__cell", "lds-date-picker__range-cell", {
                      "is-outside": !cell.isCurrentMonth,
                      "is-range-start": isRangeStart,
                      "is-range-end": isRangeEnd,
                      "is-range-single": isRangeSingle,
                      "is-range-start-connected": isRangeStartConnected,
                      "is-range-end-connected": isRangeEndConnected
                    }),
                    onClick: () => {
                      if (isDisabled) return;
                      handleRangeDateSelect(cell.date);
                    },
                    children: cell.day
                  }
                ) }, cell.date.toISOString());
              })
            ] }, `${month.toISOString()}-row-${rowIndex}`);
          }) }) : /* @__PURE__ */ jsx16("div", { className: "lds-filter-date-picker__grid", children: cells.map((cell) => {
            var _a;
            const isDisabled = (_a = disabledDate == null ? void 0 : disabledDate(cell.date)) != null ? _a : false;
            const isSelected = isSameDate2(cell.date, selectedDate);
            return /* @__PURE__ */ jsx16(
              "button",
              {
                type: "button",
                disabled: isDisabled,
                className: clsx16("lds-filter-date-picker__cell", {
                  "is-outside": !cell.isCurrentMonth,
                  "is-selected": isSelected
                }),
                onClick: () => {
                  if (isDisabled) return;
                  handleSingleDateSelect(cell.date);
                },
                children: cell.day
              },
              cell.date.toISOString()
            );
          }) })
        ]
      }
    );
    const content = picker === "range" ? /* @__PURE__ */ jsxs15("div", { className: "lds-date-picker__range-panel", children: [
      /* @__PURE__ */ jsxs15("div", { className: "lds-date-picker__range-header", children: [
        /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear() - 1, leftVisibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-\bdouble-left-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear(), leftVisibleMonth.getMonth() - 1, 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-arrow-left-line", "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs15("div", { className: "lds-date-picker__range-titles", children: [
          /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__title", children: [
            /* @__PURE__ */ jsxs15("span", { children: [
              leftVisibleMonth.getFullYear(),
              "\u5E74"
            ] }),
            /* @__PURE__ */ jsxs15("span", { children: [
              leftVisibleMonth.getMonth() + 1,
              "\u6708"
            ] })
          ] }),
          /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__title", children: [
            /* @__PURE__ */ jsxs15("span", { children: [
              rightVisibleMonth.getFullYear(),
              "\u5E74"
            ] }),
            /* @__PURE__ */ jsxs15("span", { children: [
              rightVisibleMonth.getMonth() + 1,
              "\u6708"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear(), leftVisibleMonth.getMonth() + 1, 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-arrow-right-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(leftVisibleMonth.getFullYear() + 1, leftVisibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-\b\bdouble-right-line", "aria-hidden": "true" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs15("div", { className: "lds-date-picker__range-body", children: [
        renderCalendar({
          month: leftVisibleMonth,
          cells: leftCalendarCells,
          rows: leftCalendarRows,
          isRange: true
        }),
        renderCalendar({
          month: rightVisibleMonth,
          cells: rightCalendarCells,
          rows: rightCalendarRows,
          isRange: true
        })
      ] })
    ] }) : /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker", children: [
      /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__header", children: [
        /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-\bdouble-left-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-arrow-left-line", "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__title", children: [
          /* @__PURE__ */ jsxs15("span", { children: [
            visibleMonth.getFullYear(),
            "\u5E74"
          ] }),
          /* @__PURE__ */ jsxs15("span", { children: [
            visibleMonth.getMonth() + 1,
            "\u6708"
          ] })
        ] }),
        /* @__PURE__ */ jsxs15("div", { className: "lds-filter-date-picker__nav-group", children: [
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-arrow-right-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx16(
            "button",
            {
              type: "button",
              className: "lds-filter-date-picker__nav",
              onClick: () => setVisibleMonth(
                new Date(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1)
              ),
              children: /* @__PURE__ */ jsx16(Icon, { name: "ic-\b\bdouble-right-line", "aria-hidden": "true" })
            }
          )
        ] })
      ] }),
      renderCalendar({
        month: visibleMonth,
        cells: singleCalendarCells,
        rows: void 0,
        isRange: false
      })
    ] });
    return /* @__PURE__ */ jsx16(
      Popover,
      {
        ref,
        trigger,
        open: isOpen,
        onOpenChange: (nextOpen) => {
          var _a;
          if (nextOpen) {
            const anchorDate = (_a = selectedDate != null ? selectedDate : rangeStart) != null ? _a : /* @__PURE__ */ new Date();
            setVisibleMonth(startOfMonth2(anchorDate));
          }
          setIsOpen(nextOpen);
        },
        className,
        contentClassName: clsx16("lds-filter-date-picker__popover", {
          "lds-date-picker__range-popover": picker === "range"
        }),
        contentStyle: { width: picker === "range" ? 740 : 380 },
        closeOnClickOutside: true,
        closeOnEsc: true,
        ...props,
        children: content
      }
    );
  }
);
FilterDatePicker.displayName = "FilterDatePicker";

// src/components/FilterTimePicker/FilterTimePicker.tsx
import React17, { useEffect as useEffect3, useMemo as useMemo7, useRef as useRef3, useState as useState7 } from "react";
import { clsx as clsx17 } from "clsx";
import { jsx as jsx17, jsxs as jsxs16 } from "react/jsx-runtime";
var useControllableState6 = ({
  value,
  defaultValue,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState7(defaultValue);
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
var buildTimeRange2 = (count, step) => Array.from({ length: Math.ceil(count / step) }).map(
  (_, index) => String(index * step).padStart(2, "0")
);
var normalizeTimeValue2 = (value) => {
  if (!value) return null;
  const [rawHour = "00", rawMinute = "00"] = value.split(":");
  const hour = rawHour.padStart(2, "0").slice(0, 2);
  const minute = rawMinute.padStart(2, "0").slice(0, 2);
  return `${hour}:${minute}`;
};
var splitTimeValue2 = (value, fallbackHour, fallbackMinute) => {
  const normalized = normalizeTimeValue2(value);
  if (!normalized) {
    return {
      hour: fallbackHour,
      minute: fallbackMinute
    };
  }
  const [hour, minute] = normalized.split(":");
  return { hour, minute };
};
var normalizeRangeValue4 = (value) => {
  if (!Array.isArray(value)) return [null, null];
  return [normalizeTimeValue2(value[0]), normalizeTimeValue2(value[1])];
};
var compareTimeValue2 = (left, right) => {
  if (!left || !right) return 0;
  return left.localeCompare(right);
};
var scrollSelectedCellIntoView2 = (column, selectedValue) => {
  if (!column || !selectedValue) return;
  const selectedCell = column.querySelector(`[data-time-value="${selectedValue}"]`);
  if (!selectedCell) return;
  const centeredTop = selectedCell.offsetTop - (column.clientHeight - selectedCell.offsetHeight) / 2;
  const maxScrollTop = Math.max(column.scrollHeight - column.clientHeight, 0);
  const nextScrollTop = Math.min(Math.max(centeredTop, 0), maxScrollTop);
  column.scrollTo({
    top: nextScrollTop,
    behavior: "auto"
  });
};
var FilterTimePicker = React17.forwardRef(
  ({
    className,
    label,
    picker = "time",
    placeholder = "\u8BF7\u9009\u62E9",
    rangePlaceholder = ["\u5F00\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"],
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
    const hourColumnRef = useRef3(null);
    const minuteColumnRef = useRef3(null);
    const rangeStartHourColumnRef = useRef3(null);
    const rangeStartMinuteColumnRef = useRef3(null);
    const rangeEndHourColumnRef = useRef3(null);
    const rangeEndMinuteColumnRef = useRef3(null);
    const fallbackValue = picker === "range" ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState6({
      value,
      defaultValue: defaultValue != null ? defaultValue : fallbackValue,
      onChange: void 0
    });
    const [isOpen, setIsOpen] = useControllableState6({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange
    });
    const hours = useMemo7(() => buildTimeRange2(24, hourStep), [hourStep]);
    const minutes = useMemo7(() => buildTimeRange2(60, minuteStep), [minuteStep]);
    const fallbackHour = (_a = hours[0]) != null ? _a : "00";
    const fallbackMinute = (_b = minutes[0]) != null ? _b : "00";
    const selectedTime = picker === "time" && typeof selectedValue === "string" ? normalizeTimeValue2(selectedValue) : null;
    const [rangeStart, rangeEnd] = picker === "range" ? normalizeRangeValue4(selectedValue) : [null, null];
    const initialSingle = splitTimeValue2(selectedTime, fallbackHour, fallbackMinute);
    const [draftHour, setDraftHour] = useState7(initialSingle.hour);
    const [draftMinute, setDraftMinute] = useState7(initialSingle.minute);
    const initialRangeStart = splitTimeValue2(rangeStart, fallbackHour, fallbackMinute);
    const initialRangeEnd = splitTimeValue2(rangeEnd, fallbackHour, fallbackMinute);
    const [rangeDraft, setRangeDraft] = useState7({
      startHour: initialRangeStart.hour,
      startMinute: initialRangeStart.minute,
      endHour: initialRangeEnd.hour,
      endMinute: initialRangeEnd.minute
    });
    useEffect3(() => {
      if (!isOpen) return;
      let frameId2 = 0;
      const frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          if (picker === "range") {
            scrollSelectedCellIntoView2(rangeStartHourColumnRef.current, rangeDraft.startHour);
            scrollSelectedCellIntoView2(rangeStartMinuteColumnRef.current, rangeDraft.startMinute);
            scrollSelectedCellIntoView2(rangeEndHourColumnRef.current, rangeDraft.endHour);
            scrollSelectedCellIntoView2(rangeEndMinuteColumnRef.current, rangeDraft.endMinute);
            return;
          }
          scrollSelectedCellIntoView2(hourColumnRef.current, draftHour);
          scrollSelectedCellIntoView2(minuteColumnRef.current, draftMinute);
        });
      });
      return () => {
        cancelAnimationFrame(frameId1);
        cancelAnimationFrame(frameId2);
      };
    }, [draftHour, draftMinute, isOpen, picker, rangeDraft]);
    const rangeDisplay = (() => {
      if (!rangeStart && !rangeEnd) return void 0;
      return /* @__PURE__ */ jsxs16("span", { className: "lds-filter__range-display", children: [
        /* @__PURE__ */ jsx17(
          "span",
          {
            className: clsx17("lds-filter__range-part", {
              "is-placeholder": !rangeStart
            }),
            children: rangeStart != null ? rangeStart : rangePlaceholder[0]
          }
        ),
        /* @__PURE__ */ jsxs16("span", { className: "lds-filter__range-separator", "aria-hidden": "true", children: [
          " ",
          "\uFF5E",
          " "
        ] }),
        /* @__PURE__ */ jsx17(
          "span",
          {
            className: clsx17("lds-filter__range-part", {
              "is-placeholder": !rangeEnd
            }),
            children: rangeEnd != null ? rangeEnd : rangePlaceholder[1]
          }
        )
      ] });
    })();
    const commitSingleValue = (nextHour, nextMinute, close = false) => {
      const nextValue = `${nextHour}:${nextMinute}`;
      setSelectedValue(nextValue);
      onChange == null ? void 0 : onChange(nextValue);
      if (close) {
        setIsOpen(false);
      }
    };
    const commitRangeValue = (nextRangeDraft, changedPart, close = false) => {
      let nextStart = rangeStart;
      let nextEnd = rangeEnd;
      if (changedPart === "start") {
        nextStart = `${nextRangeDraft.startHour}:${nextRangeDraft.startMinute}`;
      } else {
        nextEnd = `${nextRangeDraft.endHour}:${nextRangeDraft.endMinute}`;
      }
      if (nextStart && nextEnd && compareTimeValue2(nextStart, nextEnd) > 0) {
        if (changedPart === "start") {
          nextEnd = nextStart;
        } else {
          nextStart = nextEnd;
        }
      }
      const normalizedStart = splitTimeValue2(nextStart, nextRangeDraft.startHour, nextRangeDraft.startMinute);
      const normalizedEnd = splitTimeValue2(nextEnd, nextRangeDraft.endHour, nextRangeDraft.endMinute);
      const normalizedDraft = {
        startHour: normalizedStart.hour,
        startMinute: normalizedStart.minute,
        endHour: normalizedEnd.hour,
        endMinute: normalizedEnd.minute
      };
      const nextValue = [nextStart, nextEnd];
      setRangeDraft(normalizedDraft);
      setSelectedValue(nextValue);
      onChange == null ? void 0 : onChange(nextValue);
      if (close) {
        setIsOpen(false);
      }
    };
    const trigger = /* @__PURE__ */ jsx17(
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
        value: picker === "range" ? rangeDisplay : selectedTime
      }
    );
    return /* @__PURE__ */ jsx17(
      Popover,
      {
        ref,
        trigger,
        open: isOpen,
        onOpenChange: (nextOpen) => {
          if (nextOpen) {
            if (picker === "range") {
              const nextRange = normalizeRangeValue4(selectedValue);
              const nextStart = splitTimeValue2(nextRange[0], fallbackHour, fallbackMinute);
              const nextEnd = splitTimeValue2(nextRange[1], fallbackHour, fallbackMinute);
              setRangeDraft({
                startHour: nextStart.hour,
                startMinute: nextStart.minute,
                endHour: nextEnd.hour,
                endMinute: nextEnd.minute
              });
            } else {
              const nextSingle = splitTimeValue2(selectedTime, fallbackHour, fallbackMinute);
              setDraftHour(nextSingle.hour);
              setDraftMinute(nextSingle.minute);
            }
          }
          setIsOpen(nextOpen);
        },
        className,
        contentClassName: clsx17("lds-filter-time-picker__popover", {
          "lds-time-picker__range-popover": picker === "range"
        }),
        closeOnClickOutside: true,
        closeOnEsc: true,
        ...props,
        children: picker === "range" ? /* @__PURE__ */ jsxs16("div", { className: "lds-time-picker__range-panel", children: [
          /* @__PURE__ */ jsxs16("div", { className: "lds-time-picker__range-section", children: [
            /* @__PURE__ */ jsx17("div", { className: "lds-time-picker__range-section-header", children: "\u5F00\u59CB\u65F6\u95F4" }),
            /* @__PURE__ */ jsxs16("div", { className: "lds-time-picker__range-section-body", children: [
              /* @__PURE__ */ jsx17("div", { ref: rangeStartHourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ jsx17(
                "button",
                {
                  type: "button",
                  "data-time-value": hour,
                  className: clsx17("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.startHour === hour
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      startHour: hour
                    };
                    commitRangeValue(nextDraft, "start");
                  },
                  children: hour
                },
                `start-hour-${hour}`
              )) }),
              /* @__PURE__ */ jsx17("div", { ref: rangeStartMinuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ jsx17(
                "button",
                {
                  type: "button",
                  "data-time-value": minute,
                  className: clsx17("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.startMinute === minute
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      startMinute: minute
                    };
                    commitRangeValue(nextDraft, "start");
                  },
                  children: minute
                },
                `start-minute-${minute}`
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs16("div", { className: "lds-time-picker__range-section is-end", children: [
            /* @__PURE__ */ jsx17("div", { className: "lds-time-picker__range-section-header", children: "\u7ED3\u675F\u65F6\u95F4" }),
            /* @__PURE__ */ jsxs16("div", { className: "lds-time-picker__range-section-body", children: [
              /* @__PURE__ */ jsx17("div", { ref: rangeEndHourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ jsx17(
                "button",
                {
                  type: "button",
                  "data-time-value": hour,
                  className: clsx17("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.endHour === hour
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      endHour: hour
                    };
                    commitRangeValue(nextDraft, "end");
                  },
                  children: hour
                },
                `end-hour-${hour}`
              )) }),
              /* @__PURE__ */ jsx17("div", { ref: rangeEndMinuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ jsx17(
                "button",
                {
                  type: "button",
                  "data-time-value": minute,
                  className: clsx17("lds-filter-time-picker__cell", {
                    "is-selected": rangeDraft.endMinute === minute
                  }),
                  onClick: () => {
                    const nextDraft = {
                      ...rangeDraft,
                      endMinute: minute
                    };
                    commitRangeValue(nextDraft, "end", true);
                  },
                  children: minute
                },
                `end-minute-${minute}`
              )) })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs16("div", { className: "lds-filter-time-picker", children: [
          /* @__PURE__ */ jsx17("div", { ref: hourColumnRef, className: "lds-filter-time-picker__column", children: hours.map((hour) => /* @__PURE__ */ jsx17(
            "button",
            {
              type: "button",
              "data-time-value": hour,
              className: clsx17("lds-filter-time-picker__cell", {
                "is-selected": draftHour === hour
              }),
              onClick: () => {
                setDraftHour(hour);
                commitSingleValue(hour, draftMinute);
              },
              children: hour
            },
            hour
          )) }),
          /* @__PURE__ */ jsx17("div", { ref: minuteColumnRef, className: "lds-filter-time-picker__column", children: minutes.map((minute) => /* @__PURE__ */ jsx17(
            "button",
            {
              type: "button",
              "data-time-value": minute,
              className: clsx17("lds-filter-time-picker__cell", {
                "is-selected": draftMinute === minute
              }),
              onClick: () => {
                setDraftMinute(minute);
                commitSingleValue(draftHour, minute, true);
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
import React18 from "react";
import { clsx as clsx18 } from "clsx";
import { Fragment as Fragment3, jsx as jsx18, jsxs as jsxs17 } from "react/jsx-runtime";
var FilterGroup = React18.forwardRef(
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
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        ref,
        className: clsx18("lds-filter-group", className),
        style: {
          ...style,
          // CSS vars for responsive grid behaviour.
          ["--lds-filter-group-min-item-width"]: `${minItemWidth}px`,
          ["--lds-filter-group-gap"]: `${gap}px`
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx18("div", { className: "lds-filter-group__grid", children }),
          shouldRenderActionsRow ? /* @__PURE__ */ jsx18("div", { className: "lds-filter-group__actions-row", children: actions ? actions : /* @__PURE__ */ jsxs17(Fragment3, { children: [
            onQuery ? /* @__PURE__ */ jsx18(Button, { variant: "secondary", size, onClick: onQuery, children: queryText }) : null,
            onReset ? /* @__PURE__ */ jsx18(Button, { variant: "default", size, onClick: onReset, children: resetText }) : null
          ] }) }) : null
        ]
      }
    );
  }
);
FilterGroup.displayName = "FilterGroup";

// src/components/Tabs/Tabs.tsx
import React19, { createContext, useContext, useState as useState8 } from "react";
import { clsx as clsx19 } from "clsx";
import { jsx as jsx19 } from "react/jsx-runtime";
var TabsContext = createContext({});
var Tabs = React19.forwardRef(
  ({ className, variant = "primary", size = "small", defaultValue, value, onChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState8(defaultValue);
    const activeValue = value !== void 0 ? value : internalValue;
    const handleChange = (newValue) => {
      if (value === void 0) {
        setInternalValue(newValue);
      }
      onChange == null ? void 0 : onChange(newValue);
    };
    return /* @__PURE__ */ jsx19(TabsContext.Provider, { value: { activeValue, onChange: handleChange }, children: /* @__PURE__ */ jsx19(
      "div",
      {
        ref,
        className: clsx19("lds-tabs", `lds-tabs--${variant}`, `lds-tabs--${size}`, className),
        ...props,
        children
      }
    ) });
  }
);
Tabs.displayName = "Tabs";
var Tab = React19.forwardRef(
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
    return /* @__PURE__ */ jsx19(
      "a",
      {
        ref,
        className: clsx19("lds-tab", isActive && "is-active", disabled && "is-disabled", className),
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
Tab.displayName = "Tab";

// src/components/Navbar/Navbar.tsx
import React20 from "react";
import { clsx as clsx20 } from "clsx";
import { jsx as jsx20, jsxs as jsxs18 } from "react/jsx-runtime";
var Navbar = React20.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs18("div", { ref, className: clsx20("lds-navbar", className), ...props, children: [
    /* @__PURE__ */ jsx20("div", { className: "lds-navbar__left", children: /* @__PURE__ */ jsx20("div", { className: "lds-navbar__logo", "aria-label": "\u6765\u5BA2 Logo", children: /* @__PURE__ */ jsx20("span", { className: "lds-navbar__logo-image", "aria-hidden": "true" }) }) }),
    /* @__PURE__ */ jsxs18("div", { className: "lds-navbar__middle", children: [
      /* @__PURE__ */ jsx20("div", { className: "lds-navbar__search", children: /* @__PURE__ */ jsx20(
        Input,
        {
          size: "default-size",
          prefixIcon: /* @__PURE__ */ jsx20(Icon, { name: "ic-search-line" }),
          placeholder: "\u4F60\u53EF\u4EE5\u95EE\uFF1A\u5728\u54EA\u91CC\u4FEE\u6539\u5B98\u65B9\u6296\u97F3\u53F7",
          readOnly: true
        }
      ) }),
      /* @__PURE__ */ jsxs18("nav", { className: "lds-navbar__nav", children: [
        /* @__PURE__ */ jsx20("a", { href: "#", className: "lds-navbar__nav-item is-active", children: "\u9996\u9875" }),
        /* @__PURE__ */ jsx20("a", { href: "#", className: "lds-navbar__nav-item", children: "\u751F\u610F\u7ECF" }),
        /* @__PURE__ */ jsx20("a", { href: "#", className: "lds-navbar__nav-item", children: "\u672C\u5730\u63A8" }),
        /* @__PURE__ */ jsx20("a", { href: "#", className: "lds-navbar__nav-item", children: "\u5B66\u4E60\u4E2D\u5FC3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs18("div", { className: "lds-navbar__right", children: [
      /* @__PURE__ */ jsxs18("div", { className: "lds-navbar__action", children: [
        /* @__PURE__ */ jsx20(Icon, { name: "ic-reset-line" }),
        /* @__PURE__ */ jsx20("span", { children: "\u8FD4\u56DE\u65E7\u7248" })
      ] }),
      /* @__PURE__ */ jsx20("div", { className: "lds-navbar__divider" }),
      /* @__PURE__ */ jsxs18("div", { className: "lds-navbar__action", children: [
        /* @__PURE__ */ jsx20(Icon, { name: "ic-mobile-line" }),
        /* @__PURE__ */ jsx20("span", { children: "App\u4E0B\u8F7D" })
      ] }),
      /* @__PURE__ */ jsx20("div", { className: "lds-navbar__divider" }),
      /* @__PURE__ */ jsxs18("div", { className: "lds-navbar__user", children: [
        /* @__PURE__ */ jsx20("div", { className: "lds-navbar__avatar lds-navbar__avatar--preset", "aria-hidden": "true", children: "85" }),
        /* @__PURE__ */ jsxs18("div", { className: "lds-navbar__user-info", children: [
          /* @__PURE__ */ jsx20("span", { className: "lds-navbar__username", children: "\u5317\u4EAC\u516B\u5341\u4E94\u5EA6..." }),
          /* @__PURE__ */ jsx20(Icon, { name: "ic-arrow-down-line" })
        ] })
      ] })
    ] })
  ] })
);
Navbar.displayName = "Navbar";

// src/components/Menu/Menu.tsx
import React21, { useState as useState9 } from "react";
import { clsx as clsx21 } from "clsx";
import { jsx as jsx21, jsxs as jsxs19 } from "react/jsx-runtime";
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
var Menu = React21.forwardRef(
  ({
    className,
    activeItemKey,
    defaultActiveItemKey = "store-store-management",
    onItemChange,
    ...props
  }, ref) => {
    const [innerActiveItemKey, setInnerActiveItemKey] = useState9(defaultActiveItemKey);
    const [collapsedMap, setCollapsedMap] = useState9(
      () => Object.fromEntries(DEFAULT_MENU_GROUPS.map((group) => [group.key, Boolean(group.defaultCollapsed)]))
    );
    const effectiveActiveItemKey = activeItemKey != null ? activeItemKey : innerActiveItemKey;
    return /* @__PURE__ */ jsx21("div", { ref, className: clsx21("lds-menu", className), ...props, children: DEFAULT_MENU_GROUPS.map((group) => {
      var _a;
      const collapsed = (_a = collapsedMap[group.key]) != null ? _a : false;
      return /* @__PURE__ */ jsxs19("div", { className: clsx21("lds-menu-group", collapsed && "is-collapsed"), children: [
        /* @__PURE__ */ jsxs19(
          "div",
          {
            className: "lds-menu-group__header",
            onClick: () => setCollapsedMap((prev) => ({
              ...prev,
              [group.key]: !collapsed
            })),
            children: [
              /* @__PURE__ */ jsx21(Icon, { name: group.icon }),
              /* @__PURE__ */ jsx21("span", { className: "lds-menu-group__title", children: group.title }),
              /* @__PURE__ */ jsx21(Icon, { className: "lds-menu-group__action", name: collapsed ? "ic-arrow-down-line" : "ic-arrow-up-line" })
            ]
          }
        ),
        /* @__PURE__ */ jsx21("div", { className: "lds-menu-group__content", children: group.items.map((item) => /* @__PURE__ */ jsx21(
          "div",
          {
            className: clsx21(
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
import React22 from "react";
import { clsx as clsx22 } from "clsx";
import { Fragment as Fragment4, jsx as jsx22, jsxs as jsxs20 } from "react/jsx-runtime";
var PageHeader = React22.forwardRef(
  ({
    className,
    title,
    tabs,
    variant = "primary",
    onBackClick,
    backButtonAriaLabel = "\u8FD4\u56DE\u4E0A\u4E00\u9875",
    ...props
  }, ref) => {
    const isSecondary = variant === "secondary";
    return /* @__PURE__ */ jsx22(
      "div",
      {
        ref,
        className: clsx22("lds-page-header", `lds-page-header--${variant}`, className),
        ...props,
        children: isSecondary ? /* @__PURE__ */ jsxs20("div", { className: "lds-page-header__secondary-layout", children: [
          /* @__PURE__ */ jsx22(
            "button",
            {
              type: "button",
              className: "lds-page-header__back-button",
              onClick: onBackClick,
              "aria-label": backButtonAriaLabel,
              children: /* @__PURE__ */ jsx22(Icon, { name: "ic-arrow-left-l-line", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsxs20("div", { className: "lds-page-header__content", children: [
            /* @__PURE__ */ jsx22("h1", { className: "lds-page-header__title", children: title }),
            tabs && /* @__PURE__ */ jsx22("div", { className: "lds-page-header__tabs", children: tabs })
          ] })
        ] }) : /* @__PURE__ */ jsxs20(Fragment4, { children: [
          /* @__PURE__ */ jsx22("h1", { className: "lds-page-header__title", children: title }),
          tabs && /* @__PURE__ */ jsx22("div", { className: "lds-page-header__tabs", children: tabs })
        ] })
      }
    );
  }
);
PageHeader.displayName = "PageHeader";

// src/components/Steps/Steps.tsx
import React23 from "react";
import { clsx as clsx23 } from "clsx";
import { Fragment as Fragment5, jsx as jsx23, jsxs as jsxs21 } from "react/jsx-runtime";
var clampIndex = (value, max) => {
  if (max < 0) {
    return 0;
  }
  return Math.min(Math.max(value, 0), max);
};
var Steps = React23.forwardRef(
  ({ className, items, current, defaultCurrent = 0, onChange, ...props }, ref) => {
    const maxIndex = items.length - 1;
    const [internalCurrent, setInternalCurrent] = React23.useState(
      () => clampIndex(defaultCurrent, maxIndex)
    );
    React23.useEffect(() => {
      setInternalCurrent((prev) => clampIndex(prev, items.length - 1));
    }, [items.length]);
    const activeIndex = current === void 0 ? internalCurrent : clampIndex(current, items.length - 1);
    const handleStepClick = (index, item) => {
      if (item.disabled) {
        return;
      }
      if (current === void 0) {
        setInternalCurrent(index);
      }
      onChange == null ? void 0 : onChange(index);
    };
    const getStatus = (index) => {
      if (index < activeIndex) {
        return "finish";
      }
      if (index === activeIndex) {
        return "process";
      }
      return "wait";
    };
    return /* @__PURE__ */ jsx23("div", { ref, className: clsx23("lds-steps", className), ...props, children: items.map((item, index) => {
      const status = getStatus(index);
      const isLast = index === items.length - 1;
      const isClickable = typeof onChange === "function";
      const indicatorContent = status === "finish" ? /* @__PURE__ */ jsx23(Icon, { name: "ic-finish-line", className: "lds-step__check", "aria-hidden": "true" }) : /* @__PURE__ */ jsx23("span", { children: index + 1 });
      const content = /* @__PURE__ */ jsxs21(Fragment5, { children: [
        /* @__PURE__ */ jsxs21("div", { className: "lds-step__main", children: [
          /* @__PURE__ */ jsx23("span", { className: "lds-step__indicator", "aria-hidden": "true", children: indicatorContent }),
          /* @__PURE__ */ jsx23("span", { className: "lds-step__title", children: item.title }),
          !isLast ? /* @__PURE__ */ jsx23("span", { className: "lds-step__connector", "aria-hidden": "true" }) : null
        ] }),
        item.description ? /* @__PURE__ */ jsx23("div", { className: "lds-step__description", children: item.description }) : null
      ] });
      if (isClickable) {
        return /* @__PURE__ */ jsx23(
          "button",
          {
            type: "button",
            className: clsx23(
              "lds-step",
              `is-${status}`,
              {
                "is-last": isLast,
                "is-clickable": isClickable,
                "is-disabled": item.disabled
              }
            ),
            onClick: () => handleStepClick(index, item),
            disabled: item.disabled,
            children: content
          },
          `${item.title}-${index}`
        );
      }
      return /* @__PURE__ */ jsx23(
        "div",
        {
          className: clsx23(
            "lds-step",
            `is-${status}`,
            {
              "is-last": isLast,
              "is-disabled": item.disabled
            }
          ),
          children: content
        },
        `${item.title}-${index}`
      );
    }) });
  }
);
Steps.displayName = "Steps";

// src/components/Table/Table.tsx
import React25 from "react";
import { clsx as clsx25 } from "clsx";

// src/components/Tag/Tag.tsx
import React24 from "react";
import { clsx as clsx24 } from "clsx";
import { jsx as jsx24, jsxs as jsxs22 } from "react/jsx-runtime";
var Tag = React24.forwardRef(
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
    return /* @__PURE__ */ jsxs22(
      "span",
      {
        ref,
        className: clsx24(
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
          leftIcon ? /* @__PURE__ */ jsx24("span", { className: "lds-tag__icon lds-tag__icon--left", children: leftIcon }) : null,
          children ? /* @__PURE__ */ jsx24("span", { className: "lds-tag__content", children }) : null,
          rightIcon ? /* @__PURE__ */ jsx24("span", { className: "lds-tag__icon lds-tag__icon--right", children: rightIcon }) : null
        ]
      }
    );
  }
);
Tag.displayName = "Tag";

// src/components/Table/Table.tsx
import { jsx as jsx25, jsxs as jsxs23 } from "react/jsx-runtime";
var TableWrapper = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("div", { ref, className: clsx25("lds-table-wrapper", className), ...props })
);
TableWrapper.displayName = "TableWrapper";
var Table = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("table", { ref, className: clsx25("lds-table", className), ...props })
);
Table.displayName = "Table";
var Thead = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("thead", { ref, className: clsx25("lds-table__thead", className), ...props })
);
Thead.displayName = "Thead";
var Tbody = React25.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx25("tbody", { ref, ...props })
);
Tbody.displayName = "Tbody";
var Tr = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("tr", { ref, className: clsx25("lds-table__row", className), ...props })
);
Tr.displayName = "Tr";
var Th = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("th", { ref, className: clsx25("lds-table__th", className), ...props })
);
Th.displayName = "Th";
var Td = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("td", { ref, className: clsx25("lds-table__td", className), ...props })
);
Td.displayName = "Td";
var TableCellProduct = ({ img, title, tag, tagVariant = "default", id }) => /* @__PURE__ */ jsxs23("div", { className: "lds-table-cell--product", children: [
  /* @__PURE__ */ jsx25("img", { src: img, alt: "\u5546\u54C1\u56FE", className: "lds-table-cell__product-img" }),
  /* @__PURE__ */ jsxs23("div", { className: "lds-table-cell__product-info", children: [
    /* @__PURE__ */ jsxs23("div", { className: "lds-table-cell__product-title-wrap", children: [
      /* @__PURE__ */ jsx25("h4", { className: "lds-table-cell__product-title", children: title }),
      tag && /* @__PURE__ */ jsx25(
        Tag,
        {
          size: "small",
          variant: tagVariant === "default" ? "outline" : "light",
          color: tagVariant === "orange" ? "orange" : tagVariant === "red" ? "red" : "gray",
          children: tag
        }
      )
    ] }),
    /* @__PURE__ */ jsx25("div", { className: "lds-table-cell__product-meta", children: /* @__PURE__ */ jsxs23("span", { className: "lds-table-cell__product-id", children: [
      "\u5546\u54C1ID\uFF1A",
      id
    ] }) })
  ] })
] });
var TableCellAmount = ({ children }) => /* @__PURE__ */ jsx25("div", { className: "lds-table-cell--amount", children });
var TableCellOperation = ({ children }) => /* @__PURE__ */ jsx25("div", { className: "lds-table-cell--operation", children });
var TableCellAction = React25.forwardRef(
  ({ className, danger, ...props }, ref) => /* @__PURE__ */ jsx25("a", { ref, className: clsx25("lds-table-cell__action", danger && "is-danger", className), ...props })
);
TableCellAction.displayName = "TableCellAction";

// src/components/Checkbox/Checkbox.tsx
import { forwardRef, useState as useState10 } from "react";
import { clsx as clsx26 } from "clsx";
import { jsx as jsx26, jsxs as jsxs24 } from "react/jsx-runtime";
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
    const [internalChecked, setInternalChecked] = useState10(() => {
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
    return /* @__PURE__ */ jsxs24(
      "label",
      {
        className: clsx26(
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
          /* @__PURE__ */ jsxs24("span", { className: "lds-checkbox__input-wrapper", children: [
            /* @__PURE__ */ jsx26(
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
            /* @__PURE__ */ jsx26("span", { className: "lds-checkbox__inner", children: /* @__PURE__ */ jsx26("span", { className: "lds-checkbox__icon", children: /* @__PURE__ */ jsx26("svg", { viewBox: iconConfig.viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ jsx26("path", { d: iconConfig.path, fill: "currentColor" }) }) }) })
          ] }),
          showLabel && label ? /* @__PURE__ */ jsx26("span", { className: "lds-checkbox__label", children: label }) : null
        ]
      }
    );
  }
);
Checkbox.displayName = "Checkbox";

// src/components/Switch/Switch.tsx
import { forwardRef as forwardRef2, useState as useState11 } from "react";
import { clsx as clsx27 } from "clsx";
import { jsx as jsx27, jsxs as jsxs25 } from "react/jsx-runtime";
var Switch = forwardRef2(
  ({
    className,
    size = "default-size",
    checked,
    defaultChecked,
    disabled = false,
    readOnly = false,
    onChange,
    onCheckedChange,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState11(() => Boolean(defaultChecked));
    const isControlled = checked !== void 0;
    const currentChecked = isControlled ? checked : internalChecked;
    const handleChange = (event) => {
      if (disabled || readOnly) return;
      if (!isControlled) {
        setInternalChecked(event.target.checked);
      }
      onCheckedChange == null ? void 0 : onCheckedChange(event.target.checked);
      onChange == null ? void 0 : onChange(event);
    };
    return /* @__PURE__ */ jsxs25(
      "label",
      {
        className: clsx27(
          "lds-switch",
          `lds-switch--${size}`,
          {
            "lds-switch--checked": currentChecked,
            "lds-switch--disabled": disabled,
            "lds-switch--readonly": readOnly
          },
          className
        ),
        children: [
          /* @__PURE__ */ jsx27(
            "input",
            {
              ...props,
              ref,
              type: "checkbox",
              role: "switch",
              className: "lds-switch__input",
              checked: currentChecked,
              disabled,
              readOnly,
              "aria-checked": currentChecked,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx27("span", { className: "lds-switch__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx27("span", { className: "lds-switch__thumb" }) })
        ]
      }
    );
  }
);
Switch.displayName = "Switch";

// src/components/Pagination/Pagination.tsx
import React28, { useEffect as useEffect4, useMemo as useMemo8, useState as useState12 } from "react";
import { clsx as clsx28 } from "clsx";
import { jsx as jsx28, jsxs as jsxs26 } from "react/jsx-runtime";
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
var Pagination = React28.forwardRef(
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
    const [innerCurrent, setInnerCurrent] = useState12(() => defaultCurrent);
    const [innerPageSize, setInnerPageSize] = useState12(() => {
      var _a;
      return (_a = defaultPageSize != null ? defaultPageSize : pageSizeOptions[0]) != null ? _a : 10;
    });
    const [jumpValue, setJumpValue] = useState12("");
    const [sizeChangerOpen, setSizeChangerOpen] = useState12(false);
    const effectivePageSize = isPageSizeControlled ? pageSize : innerPageSize;
    const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, effectivePageSize)));
    const effectiveCurrent = clampInt(isPageControlled ? current : innerCurrent, 1, totalPages);
    useEffect4(() => {
      if (!isPageControlled && innerCurrent !== effectiveCurrent) {
        setInnerCurrent(effectiveCurrent);
      }
    }, [effectiveCurrent, isPageControlled, totalPages]);
    useEffect4(() => {
      if (disabled && sizeChangerOpen) {
        setSizeChangerOpen(false);
      }
    }, [disabled, sizeChangerOpen]);
    const items = useMemo8(() => {
      return getPageItems(effectiveCurrent, totalPages, siblingCount);
    }, [effectiveCurrent, totalPages, siblingCount]);
    const pageRange = useMemo8(() => {
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
    return /* @__PURE__ */ jsxs26(
      "nav",
      {
        ref,
        className: clsx28("lds-pagination", `lds-pagination--${size}`, className),
        "aria-label": "Pagination",
        ...props,
        children: [
          showTotal ? /* @__PURE__ */ jsx28("span", { className: "lds-pagination__total", children: showTotal(total, pageRange) }) : null,
          /* @__PURE__ */ jsxs26("div", { className: "lds-pagination__pages", children: [
            /* @__PURE__ */ jsx28(
              "button",
              {
                type: "button",
                className: "lds-pagination__arrow lds-pagination__arrow--prev",
                onClick: () => setPage(effectiveCurrent - 1),
                disabled: disabled || !canPrev,
                "aria-label": "Previous Page",
                children: /* @__PURE__ */ jsx28(Icon, { className: "lds-pagination__icon", name: "ic-arrow-left-line", "aria-hidden": "true" })
              }
            ),
            items.map((it, idx) => {
              if (it === "ellipsis") {
                return /* @__PURE__ */ jsx28("span", { className: "lds-pagination__ellipsis", "aria-hidden": "true", children: "..." }, `ellipsis-${idx}`);
              }
              const page = it;
              const isActive = page === effectiveCurrent;
              return /* @__PURE__ */ jsx28(
                "button",
                {
                  type: "button",
                  className: clsx28("lds-pagination__item", isActive && "is-active"),
                  onClick: () => setPage(page),
                  disabled,
                  "aria-current": isActive ? "page" : void 0,
                  "aria-label": `Page ${page}`,
                  children: page
                },
                page
              );
            }),
            /* @__PURE__ */ jsx28(
              "button",
              {
                type: "button",
                className: "lds-pagination__arrow lds-pagination__arrow--next",
                onClick: () => setPage(effectiveCurrent + 1),
                disabled: disabled || !canNext,
                "aria-label": "Next Page",
                children: /* @__PURE__ */ jsx28(Icon, { className: "lds-pagination__icon", name: "ic-arrow-right-line", "aria-hidden": "true" })
              }
            )
          ] }),
          showSizeChanger ? /* @__PURE__ */ jsx28(
            Popover,
            {
              open: sizeChangerOpen,
              onOpenChange: (nextOpen) => {
                if (disabled) return;
                setSizeChangerOpen(nextOpen);
              },
              matchTriggerWidth: true,
              closeOnClickOutside: true,
              closeOnEsc: true,
              contentRole: "listbox",
              contentClassName: clsx28(
                "lds-pagination__size-popover",
                `lds-pagination__size-popover--${size}`
              ),
              trigger: /* @__PURE__ */ jsxs26(
                "button",
                {
                  type: "button",
                  className: clsx28("lds-pagination__size-changer", sizeChangerOpen && "is-open"),
                  disabled,
                  "aria-label": "Page Size",
                  children: [
                    /* @__PURE__ */ jsxs26("span", { className: "lds-pagination__size-label", children: [
                      effectivePageSize,
                      "\u6761/\u9875"
                    ] }),
                    /* @__PURE__ */ jsx28(
                      Icon,
                      {
                        className: "lds-pagination__size-icon",
                        name: sizeChangerOpen ? "ic-arrow-up-line" : "ic-arrow-down-line",
                        "aria-hidden": "true"
                      }
                    )
                  ]
                }
              ),
              children: /* @__PURE__ */ jsx28("div", { className: "lds-pagination__size-options", children: pageSizeOptions.map((n) => {
                const selected = n === effectivePageSize;
                return /* @__PURE__ */ jsxs26(
                  "button",
                  {
                    type: "button",
                    role: "option",
                    "aria-selected": selected,
                    className: clsx28("lds-pagination__size-option", selected && "is-selected"),
                    onClick: () => {
                      setSize(n);
                      setSizeChangerOpen(false);
                    },
                    children: [
                      /* @__PURE__ */ jsxs26("span", { className: "lds-pagination__size-option-label", children: [
                        n,
                        "\u6761/\u9875"
                      ] }),
                      selected ? /* @__PURE__ */ jsx28("span", { className: "lds-pagination__size-option-check", "aria-hidden": "true", children: /* @__PURE__ */ jsx28(Icon, { name: "ic-finish-line" }) }) : null
                    ]
                  },
                  n
                );
              }) })
            }
          ) : null,
          showQuickJumper ? /* @__PURE__ */ jsxs26("div", { className: "lds-pagination__quick-jumper", children: [
            /* @__PURE__ */ jsx28("span", { className: "lds-pagination__quick-text", children: "\u8DF3\u81F3" }),
            /* @__PURE__ */ jsx28("span", { className: "lds-pagination__quick-input", children: /* @__PURE__ */ jsx28(
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
            /* @__PURE__ */ jsx28("span", { className: "lds-pagination__quick-text", children: "\u9875" })
          ] }) : null
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";

// src/components/Drawer/Drawer.tsx
import React29, { useEffect as useEffect5, useId as useId2, useMemo as useMemo9, useState as useState13 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { clsx as clsx29 } from "clsx";
import { jsx as jsx29, jsxs as jsxs27 } from "react/jsx-runtime";
var DRAWER_ANIMATION_MS = 280;
var Drawer = React29.forwardRef(
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
    const titleId = useId2();
    const [shouldRender, setShouldRender] = useState13(open);
    const [visible, setVisible] = useState13(false);
    const container = useMemo9(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    useEffect5(() => {
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
    useEffect5(() => {
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
    useEffect5(() => {
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
    return createPortal2(
      /* @__PURE__ */ jsxs27(
        "div",
        {
          className: clsx29("lds-drawer-root", visible && "is-open"),
          onClick: (event) => {
            if (event.target === event.currentTarget && maskClosable) {
              onClose == null ? void 0 : onClose();
            }
          },
          children: [
            /* @__PURE__ */ jsx29("div", { className: "lds-drawer-root__mask", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs27(
              "div",
              {
                ref,
                className: clsx29("lds-drawer", `lds-drawer--${size}`, className),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? titleId : void 0,
                style: mergedStyle,
                ...props,
                children: [
                  /* @__PURE__ */ jsxs27("div", { className: "lds-drawer__header", children: [
                    /* @__PURE__ */ jsxs27("div", { className: "lds-drawer__header-main", children: [
                      title ? /* @__PURE__ */ jsx29("h2", { id: titleId, className: "lds-drawer__title", children: title }) : null,
                      extra ? /* @__PURE__ */ jsx29("div", { className: "lds-drawer__extra", children: extra }) : null
                    ] }),
                    showCloseButton ? /* @__PURE__ */ jsx29(
                      "button",
                      {
                        type: "button",
                        className: "lds-drawer__close",
                        onClick: () => onClose == null ? void 0 : onClose(),
                        "aria-label": closeLabel,
                        children: /* @__PURE__ */ jsx29(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ jsx29("div", { className: clsx29("lds-drawer__body", bodyClassName), children }),
                  shouldShowFooter ? /* @__PURE__ */ jsx29("div", { className: "lds-drawer__footer", children: footer }) : null
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
import React30, { useEffect as useEffect6, useId as useId3, useMemo as useMemo10, useState as useState14 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { clsx as clsx30 } from "clsx";
import { jsx as jsx30, jsxs as jsxs28 } from "react/jsx-runtime";
var DIALOG_ANIMATION_MS = 300;
var DIALOG_ICON_MAP = {
  neutral: "ic-info-round-fill",
  warning: "ic-warning-round-fill",
  danger: "ic-error-round-fill",
  success: "ic-finish-round-fill"
};
var Dialog = React30.forwardRef(
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
    const titleId = useId3();
    const descriptionId = useId3();
    const [shouldRender, setShouldRender] = useState14(open);
    const [visible, setVisible] = useState14(false);
    const container = useMemo10(() => {
      var _a;
      if (typeof document === "undefined") return null;
      return (_a = getContainer == null ? void 0 : getContainer()) != null ? _a : document.body;
    }, [getContainer]);
    useEffect6(() => {
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
    useEffect6(() => {
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
    useEffect6(() => {
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
    const resolvedIcon = icon != null ? icon : type !== "custom" ? /* @__PURE__ */ jsx30(Icon, { name: DIALOG_ICON_MAP[type], "aria-hidden": "true" }) : null;
    return createPortal3(
      /* @__PURE__ */ jsxs28(
        "div",
        {
          className: clsx30("lds-dialog-root", visible && "is-open"),
          onClick: (event) => {
            if (event.target === event.currentTarget && maskClosable) {
              onClose == null ? void 0 : onClose();
            }
          },
          children: [
            /* @__PURE__ */ jsx30("div", { className: "lds-dialog-root__mask", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs28(
              "div",
              {
                ref,
                className: clsx30("lds-dialog", `lds-dialog--${type}`, className),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? titleId : void 0,
                "aria-describedby": description ? descriptionId : void 0,
                style: mergedStyle,
                ...props,
                children: [
                  /* @__PURE__ */ jsxs28("div", { className: clsx30("lds-dialog__body", bodyClassName), children: [
                    /* @__PURE__ */ jsxs28("div", { className: "lds-dialog__main", children: [
                      showIcon && resolvedIcon ? /* @__PURE__ */ jsx30("div", { className: "lds-dialog__icon", "aria-hidden": "true", children: resolvedIcon }) : null,
                      /* @__PURE__ */ jsxs28("div", { className: "lds-dialog__content", children: [
                        title ? /* @__PURE__ */ jsx30("h2", { id: titleId, className: "lds-dialog__title", children: title }) : null,
                        description ? /* @__PURE__ */ jsx30("div", { id: descriptionId, className: "lds-dialog__description", children: description }) : null,
                        children ? /* @__PURE__ */ jsx30("div", { className: "lds-dialog__extra", children }) : null
                      ] })
                    ] }),
                    showCloseButton ? /* @__PURE__ */ jsx30(
                      "button",
                      {
                        type: "button",
                        className: "lds-dialog__close",
                        onClick: () => onClose == null ? void 0 : onClose(),
                        "aria-label": closeLabel,
                        children: /* @__PURE__ */ jsx30(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ] }),
                  shouldShowFooter ? /* @__PURE__ */ jsx30("div", { className: "lds-dialog__footer", children: footer }) : null
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
import React31 from "react";
import { clsx as clsx31 } from "clsx";
import { jsx as jsx31, jsxs as jsxs29 } from "react/jsx-runtime";
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
var Upload = React31.forwardRef(
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
    const inputRef = React31.useRef(null);
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = React31.useState(defaultValue);
    const mergedValue = (_a = isControlled ? value : innerValue) != null ? _a : [];
    const visibleItems = mergedValue.slice(0, maxCount);
    const shouldRenderTrigger = visibleItems.length < maxCount;
    const mergedError = error != null ? error : hasError;
    const mergedVisualState = mergedError ? "error" : visualState;
    const updateValue = React31.useCallback(
      (nextValue) => {
        const normalized = nextValue.slice(0, maxCount);
        if (!isControlled) {
          setInnerValue(normalized);
        }
        onChange == null ? void 0 : onChange(normalized);
      },
      [isControlled, maxCount, onChange]
    );
    const handleSelectFiles = React31.useCallback(
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
    const handleRemove = React31.useCallback(
      (index) => {
        const nextItems = visibleItems.filter((_, currentIndex) => currentIndex !== index);
        updateValue(nextItems);
      },
      [updateValue, visibleItems]
    );
    return /* @__PURE__ */ jsxs29(
      "div",
      {
        ref,
        className: clsx31("lds-upload", disabled && "is-disabled", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx31(
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
          /* @__PURE__ */ jsxs29("div", { className: "lds-upload__list", children: [
            visibleItems.map((item, index) => {
              var _a2, _b, _c;
              return /* @__PURE__ */ jsxs29(
                "div",
                {
                  className: "lds-upload__item",
                  children: [
                    /* @__PURE__ */ jsx31(
                      "img",
                      {
                        className: "lds-upload__image",
                        src: item.url,
                        alt: (_c = item.name) != null ? _c : `\u5DF2\u4E0A\u4F20\u56FE\u7247 ${index + 1}`
                      }
                    ),
                    !disabled ? /* @__PURE__ */ jsx31(
                      "button",
                      {
                        type: "button",
                        className: "lds-upload__remove",
                        "aria-label": removeAriaLabel,
                        onClick: () => handleRemove(index),
                        children: /* @__PURE__ */ jsx31(Icon, { name: "ic-error-line", "aria-hidden": "true" })
                      }
                    ) : null
                  ]
                },
                (_b = (_a2 = item.id) != null ? _a2 : item.url) != null ? _b : `${index}`
              );
            }),
            shouldRenderTrigger ? /* @__PURE__ */ jsxs29(
              "button",
              {
                type: "button",
                className: clsx31(
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
                  /* @__PURE__ */ jsx31(Icon, { name: "ic-add-line", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx31("span", { className: "lds-upload__text", children: triggerText })
                ]
              }
            ) : null
          ] }),
          children ? /* @__PURE__ */ jsx31("div", { className: "lds-upload__extra", children }) : null
        ]
      }
    );
  }
);
Upload.displayName = "Upload";
export {
  Alert,
  Button,
  Checkbox,
  DatePicker,
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
  Message,
  Navbar,
  PageHeader,
  Pagination,
  Popover,
  Radio,
  Search,
  Select,
  Steps,
  Switch,
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
  TimePicker,
  Tr,
  Upload,
  message,
  useFormItemStatus
};
