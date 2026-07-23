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
  Button: () => Button
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/Button.tsx
var import_react = __toESM(require("react"));
var import_clsx = require("clsx");
var import_jsx_runtime = require("react/jsx-runtime");
var Button = import_react.default.forwardRef(
  ({ className, size = "default-size", variant = "default", icon, children, ...props }, ref) => {
    const isTextIconOnly = variant === "text" && icon && import_react.default.Children.count(children) === 0;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref,
        className: (0, import_clsx.clsx)(
          "lds-mobile-btn",
          `lds-mobile-btn--${size}`,
          `lds-mobile-btn--${variant}`,
          isTextIconOnly && "lds-mobile-btn--text-icon-only",
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lds-mobile-btn__icon", children: icon }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button
});
