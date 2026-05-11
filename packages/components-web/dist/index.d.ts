import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ButtonSize = 'large' | 'default-size' | 'small';
type ButtonVariant = 'primary' | 'default' | 'secondary' | 'text' | 'icon';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The size of the button
     * @default 'default-size'
     */
    size?: ButtonSize;
    /**
     * The variant of the button
     * @default 'default'
     */
    variant?: ButtonVariant;
    /**
     * Optional icon to render inside the button. For 'icon' variant, this is the only content.
     */
    icon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    /**
     * The ID of the icon in the SVG sprite (e.g., 'ic-add-round-line')
     */
    name: string;
}
declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

interface CapsuleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'large' | 'default-size' | 'small';
    label: React.ReactNode;
}
declare const Capsule: React.ForwardRefExoticComponent<CapsuleProps & React.RefAttributes<HTMLInputElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    size?: 'large' | 'default-size' | 'small';
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    wrapperClassName?: string;
    isFocused?: boolean;
    error?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    size?: 'large' | 'default-size';
    wrapperClassName?: string;
    isFocused?: boolean;
    error?: boolean;
    showCount?: boolean;
    showResizeHandle?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

type FilterType = 'input' | 'select' | 'date' | 'time';
type FilterSize = 'default-size' | 'small';
type CommonProps = {
    /**
     * 筛选器类型
     */
    type: FilterType;
    /**
     * 尺寸
     * @default 'default-size'
     */
    size?: FilterSize;
    /**
     * 左侧字段标题
     */
    label: React.ReactNode;
    /**
     * 占位文案（未填充时展示）
     */
    placeholder?: React.ReactNode;
    /**
     * 禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 强制激活态（用于文档页/受控外观）
     * @default false
     */
    isActive?: boolean;
    /**
     * 覆盖右侧图标（默认按 type 选择）
     */
    rightIcon?: React.ReactNode;
    /**
     * 组件宽度（默认 294px，符合 Figma 规格）
     */
    width?: number | string;
};
type FilterInputProps = CommonProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    type: 'input';
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'disabled' | 'onChange' | 'placeholder' | 'className'>;
};
type FilterButtonProps = CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'defaultValue'> & {
    type: Exclude<FilterType, 'input'>;
    value?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
type FilterProps = FilterInputProps | FilterButtonProps;
declare const Filter: React.ForwardRefExoticComponent<FilterProps & React.RefAttributes<HTMLElement>>;

interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 过滤项尺寸（用于按钮尺寸对齐；筛选项本身由使用方传入）
     * @default 'small'
     */
    size?: FilterSize;
    /**
     * Grid 单元最小宽度。默认按 Figma 的 294px 让容器自适应 3/4/更多列。
     * @default 294
     */
    minItemWidth?: number;
    /**
     * 间距（px）
     * @default 12
     */
    gap?: number;
    /**
     * 点击查询
     */
    onQuery?: () => void;
    /**
     * 点击重置
     */
    onReset?: () => void;
    /**
     * 是否显示默认 Query/Reset 操作区
     * 当传入 onQuery 或 onReset 时，默认展示对应按钮
     */
    showActions?: boolean;
    /**
     * 覆盖操作区（若传入则完全自定义）
     */
    actions?: React.ReactNode;
    /**
     * 查询按钮文案
     * @default '查询'
     */
    queryText?: string;
    /**
     * 重置按钮文案
     * @default '重置'
     */
    resetText?: string;
}
declare const FilterGroup: React.ForwardRefExoticComponent<FilterGroupProps & React.RefAttributes<HTMLDivElement>>;

interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    variant?: 'primary' | 'capsule' | 'filter';
    size?: 'large' | 'small';
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
interface TabProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'value'> {
    value?: string;
    disabled?: boolean;
    active?: boolean;
}
declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLAnchorElement>>;

declare const Navbar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * 受控：当前激活的默认菜单项 key
     */
    activeItemKey?: string;
    /**
     * 非受控：默认激活的默认菜单项 key
     * @default 'store-store-management'
     */
    defaultActiveItemKey?: string;
    /**
     * 菜单项点击回调
     */
    onItemChange?: (itemKey: string) => void;
}
declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>>;

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    tabs?: React.ReactNode;
}
declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;

declare const TableWrapper: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const Table: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const Thead: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const Tbody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const Tr: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const Th: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const Td: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCellProduct: ({ img, title, tag, tagVariant, id }: any) => react_jsx_runtime.JSX.Element;
declare const TableCellAmount: ({ children }: any) => react_jsx_runtime.JSX.Element;
declare const TableCellOperation: ({ children }: any) => react_jsx_runtime.JSX.Element;
interface TableCellActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    danger?: boolean;
}
declare const TableCellAction: React.ForwardRefExoticComponent<TableCellActionProps & React.RefAttributes<HTMLAnchorElement>>;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 尺寸大小
     * @default 'default-size'
     */
    size?: 'large' | 'default-size' | 'small';
    /**
     * 是否半选
     * @default false
     */
    indeterminate?: boolean;
    /**
     * 是否显示右侧文案
     * @default false
     */
    showLabel?: boolean;
    /**
     * 右侧文案内容
     */
    label?: React.ReactNode;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

type TagSize = 'large' | 'default-size' | 'small';
type TagVariant = 'fill' | 'light' | 'outline';
type TagColor = 'blue' | 'green' | 'orange' | 'red' | 'gray';
interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * 标签尺寸
     * @default 'default-size'
     */
    size?: TagSize;
    /**
     * 标签样式类型
     * @default 'light'
     */
    variant?: TagVariant;
    /**
     * 标签语义色
     * @default 'gray'
     */
    color?: TagColor;
    /**
     * 左侧图标，可选
     */
    leftIcon?: React.ReactNode;
    /**
     * 右侧图标，可选
     */
    rightIcon?: React.ReactNode;
}
declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;

type PaginationSize = 'default-size' | 'small';
interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    /**
     * 尺寸
     * @default 'default-size'
     */
    size?: PaginationSize;
    /**
     * 总条数
     */
    total: number;
    /**
     * 受控：当前页（从 1 开始）
     */
    current?: number;
    /**
     * 非受控：默认当前页（从 1 开始）
     * @default 1
     */
    defaultCurrent?: number;
    /**
     * 受控：每页条数
     */
    pageSize?: number;
    /**
     * 非受控：默认每页条数
     */
    defaultPageSize?: number;
    /**
     * 每页条数候选
     * @default [10, 20, 50]
     */
    pageSizeOptions?: number[];
    /**
     * 是否显示每页条数切换（Figma: 数量）
     * @default true
     */
    showSizeChanger?: boolean;
    /**
     * 是否显示快速跳页（Figma: 跳页）
     * @default true
     */
    showQuickJumper?: boolean;
    /**
     * 单页时隐藏
     * @default true
     */
    hideOnSinglePage?: boolean;
    /**
     * 是否禁用整组交互
     * @default false
     */
    disabled?: boolean;
    /**
     * 折叠显示时，当前页两侧保留的页码数量
     * @default 1
     */
    siblingCount?: number;
    /**
     * 页码/条数变化回调
     */
    onChange?: (page: number, pageSize: number) => void;
    /**
     * 仅每页条数变化回调
     */
    onPageSizeChange?: (pageSize: number) => void;
    /**
     * 自定义总数展示
     */
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;

type DrawerSize = 'large' | 'default-size' | 'small';
interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 使用约束：
     * 为了保留打开 / 关闭动效，父组件应保持 Drawer 挂载，通过 open 控制显隐，
     * 不要在关闭时立刻通过条件渲染将组件从 React 树中移除。
     */
    /**
     * 是否打开抽屉
     * 建议始终保持组件挂载，仅切换 open，以确保退场动画能够完整执行。
     * @default false
     */
    open?: boolean;
    /**
     * 标题区域
     */
    title?: React.ReactNode;
    /**
     * 抽屉尺寸
     * @default 'default-size'
     */
    size?: DrawerSize;
    /**
     * 自定义底部区域
     */
    footer?: React.ReactNode;
    /**
     * 是否显示底部区域
     * 默认跟随 footer 是否传入
     */
    showFooter?: boolean;
    /**
     * 标题区域右侧附加内容
     */
    extra?: React.ReactNode;
    /**
     * 点击蒙层是否关闭
     * @default true
     */
    maskClosable?: boolean;
    /**
     * 按下 Esc 是否关闭
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * 是否显示右上角关闭按钮
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * 关闭回调
     */
    onClose?: () => void;
    /**
     * 获取挂载容器，默认挂载到 document.body
     */
    getContainer?: () => HTMLElement | null;
    /**
     * 自定义抽屉宽度，会覆盖 size 对应的默认宽度
     */
    width?: number | string;
    /**
     * 自定义内容区域类名
     */
    bodyClassName?: string;
    /**
     * 关闭按钮可访问名称
     * @default '关闭抽屉'
     */
    closeLabel?: string;
}
declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>>;

type DialogType = 'neutral' | 'warning' | 'danger' | 'success' | 'custom';
interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 使用约束：
     * 为了保留打开 / 关闭动效，父组件应保持 Dialog 挂载，通过 open 控制显隐，
     * 不要在关闭时立刻通过条件渲染将组件从 React 树中移除。
     */
    /**
     * 是否打开对话框
     * 建议始终保持组件挂载，仅切换 open，以确保退场动画能够完整执行。
     * @default false
     */
    open?: boolean;
    /**
     * 标题区域
     */
    title?: React.ReactNode;
    /**
     * 描述文案
     */
    description?: React.ReactNode;
    /**
     * 语义类型，会影响默认图标与颜色
     * @default 'neutral'
     */
    type?: DialogType;
    /**
     * 自定义图标内容
     */
    icon?: React.ReactNode;
    /**
     * 是否显示左侧图标
     * @default true
     */
    showIcon?: boolean;
    /**
     * 自定义底部区域
     */
    footer?: React.ReactNode;
    /**
     * 是否显示底部区域，默认跟随 footer 是否传入
     */
    showFooter?: boolean;
    /**
     * 点击蒙层是否关闭
     * @default true
     */
    maskClosable?: boolean;
    /**
     * 按下 Esc 是否关闭
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * 是否显示右上角关闭按钮
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * 关闭回调
     */
    onClose?: () => void;
    /**
     * 获取挂载容器，默认挂载到 document.body
     */
    getContainer?: () => HTMLElement | null;
    /**
     * 自定义对话框宽度，默认 402px
     */
    width?: number | string;
    /**
     * 自定义内容区域类名
     */
    bodyClassName?: string;
    /**
     * 关闭按钮可访问名称
     * @default '关闭对话框'
     */
    closeLabel?: string;
}
declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;

declare function useFormItemStatus(): {
    hasError: boolean;
};
interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 统一设置表单项左侧标题宽度
     * @default 90
     */
    labelWidth?: number | string;
}
interface FormItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 左侧标题内容
     */
    label?: React.ReactNode;
    /**
     * 当前项对应的控件 id，用于 label 关联
     */
    htmlFor?: string;
    /**
     * 是否展示必填标识
     * @default false
     */
    required?: boolean;
    /**
     * 帮助提示文案，会以浏览器原生 title 的形式挂在问号图标上
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
     * 底部常规说明文案
     */
    description?: React.ReactNode;
    /**
     * 底部报错文案，存在时会覆盖 description 并切换为错误态
     */
    error?: React.ReactNode;
    /**
     * 单独覆盖当前项的标题宽度
     */
    labelWidth?: number | string;
}
declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLDivElement>>;
declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<HTMLDivElement>>;

interface UploadFileItem {
    id?: string;
    name?: string;
    url: string;
    file?: File;
}
type UploadVisualState = 'normal' | 'hover' | 'active' | 'error';
interface UploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /**
     * 当前文件列表，受控模式
     */
    value?: UploadFileItem[];
    /**
     * 默认文件列表，非受控模式
     */
    defaultValue?: UploadFileItem[];
    /**
     * 文件列表变化回调
     */
    onChange?: (files: UploadFileItem[]) => void;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 原生 input accept
     * @default 'image/*'
     */
    accept?: string;
    /**
     * 是否允许多选
     * @default false
     */
    multiple?: boolean;
    /**
     * 最大文件数量
     * @default 1
     */
    maxCount?: number;
    /**
     * 上传按钮文案
     * @default '上传'
     */
    triggerText?: React.ReactNode;
    /**
     * 强制视觉状态，用于文档演示
     * @default 'normal'
     */
    visualState?: UploadVisualState;
    /**
     * 是否展示错误态，未显式传入时会自动继承所在 FormItem 的错误状态
     */
    error?: boolean;
    /**
     * 输入框 id，方便与表单 label 关联
     */
    inputId?: string;
    /**
     * 输入框 name
     */
    name?: string;
    /**
     * 删除按钮无障碍名称
     * @default '删除图片'
     */
    removeAriaLabel?: string;
    /**
     * 上传按钮无障碍名称
     * @default '上传图片'
     */
    triggerAriaLabel?: string;
}
declare const Upload: React.ForwardRefExoticComponent<UploadProps & React.RefAttributes<HTMLDivElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant, Capsule, type CapsuleProps, Checkbox, type CheckboxProps, Dialog, type DialogProps, type DialogType, Drawer, type DrawerProps, type DrawerSize, Filter, type FilterButtonProps, FilterGroup, type FilterGroupProps, type FilterInputProps, type FilterProps, type FilterSize, type FilterType, Form, FormItem, type FormItemProps, type FormProps, Icon, type IconProps, Input, type InputProps, Menu, type MenuProps, Navbar, PageHeader, type PageHeaderProps, Pagination, type PaginationProps, type PaginationSize, Tab, type TabProps, Table, TableCellAction, type TableCellActionProps, TableCellAmount, TableCellOperation, TableCellProduct, TableWrapper, Tabs, type TabsProps, Tag, type TagColor, type TagProps, type TagSize, type TagVariant, Tbody, Td, Textarea, type TextareaProps, Th, Thead, Tr, Upload, type UploadFileItem, type UploadProps, type UploadVisualState, useFormItemStatus };
