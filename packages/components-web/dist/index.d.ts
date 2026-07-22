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

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'gray';
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 标题文案
     */
    title?: React.ReactNode;
    /**
     * 描述文案
     */
    description?: React.ReactNode;
    /**
     * 语义类型
     * @default 'info'
     */
    variant?: AlertVariant;
    /**
     * 自定义左侧图标
     */
    icon?: React.ReactNode;
    /**
     * 是否显示左侧图标
     * @default true
     */
    showIcon?: boolean;
    /**
     * 右侧操作区
     */
    action?: React.ReactNode;
    /**
     * 是否显示关闭按钮
     * @default false
     */
    closable?: boolean;
    /**
     * 非受控模式下的初始显示状态
     * @default true
     */
    defaultVisible?: boolean;
    /**
     * 受控显示状态
     */
    visible?: boolean;
    /**
     * 点击关闭按钮时触发
     */
    onClose?: () => void;
    /**
     * 关闭按钮可访问名称
     * @default '关闭提示'
     */
    closeLabel?: string;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

type CardSize = 'small' | 'large';
type CardDividerVariant = 'solid' | 'dashed';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
interface CardDividerProps extends React.HTMLAttributes<HTMLHRElement> {
    /**
     * 分隔线样式
     * @default 'solid'
     */
    variant?: CardDividerVariant;
}
interface CardMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
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
interface CardMetricProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardDivider: React.ForwardRefExoticComponent<CardDividerProps & React.RefAttributes<HTMLHRElement>>;
declare const CardMetrics: React.ForwardRefExoticComponent<CardMetricsProps & React.RefAttributes<HTMLDivElement>>;
declare const CardMetric: React.ForwardRefExoticComponent<CardMetricProps & React.RefAttributes<HTMLDivElement>>;

type MessageVariant = 'info' | 'success' | 'warning' | 'error';
interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
    /**
     * 提示文案
     */
    content: React.ReactNode;
    /**
     * 语义类型
     * @default 'info'
     */
    variant?: MessageVariant;
    /**
     * 自定义左侧图标
     */
    icon?: React.ReactNode;
    /**
     * 是否显示关闭按钮
     * @default false
     */
    closable?: boolean;
    /**
     * 关闭按钮可访问名称
     * @default '关闭提示'
     */
    closeLabel?: string;
    /**
     * 是否处于显示态，用于承载进出场动画
     * @default true
     */
    visible?: boolean;
    /**
     * 关闭时触发
     */
    onClose?: () => void;
}
interface MessageOptions extends Omit<MessageProps, 'visible' | 'onClose' | 'closeLabel' | 'role'> {
    /**
     * 可选唯一标识；相同 key 会复用并刷新该条消息
     */
    key?: React.Key;
    /**
     * 自动关闭时长（毫秒），0 表示不自动关闭
     * @default 3000
     */
    duration?: number;
    /**
     * 关闭时触发
     */
    onClose?: () => void;
    /**
     * 关闭按钮可访问名称
     * @default '关闭提示'
     */
    closeLabel?: string;
}
type MessageOpenInput = React.ReactNode | MessageOptions;
declare const Message: React.ForwardRefExoticComponent<MessageProps & React.RefAttributes<HTMLDivElement>>;
declare const message: {
    open: (input: MessageOpenInput) => () => void;
    info: (input: MessageOpenInput) => () => void;
    success: (input: MessageOpenInput) => () => void;
    warning: (input: MessageOpenInput) => () => void;
    error: (input: MessageOpenInput) => () => void;
    destroy: (key?: React.Key) => void;
};

type IconVariant = 'default' | '3dl';
interface IconProps extends React.SVGProps<SVGSVGElement> {
    /**
     * The ID of the icon in the SVG sprite (e.g., 'ic-add-round-line')
     */
    name: string;
    /**
     * The icon rendering style. Defaults to the injected SVG sprite.
     */
    variant?: IconVariant;
}
declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement | HTMLImageElement>>;

type RadioVariant = 'default' | 'capsule' | 'card';
type RadioSize = 'large' | 'default-size' | 'small' | 'mini';
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 单选框视觉样式
     * @default 'default'
     */
    variant?: RadioVariant;
    /**
     * 尺寸大小
     * @default 'default-size'
     */
    size?: RadioSize;
    /**
     * 主文案
     */
    label?: React.ReactNode;
    /**
     * 卡片样式下的辅助文案
     */
    description?: React.ReactNode;
    /**
     * 卡片样式下的宽度。
     * - 传数字时按 px 处理
     * - 传字符串时支持任意合法 CSS 宽度值，如 `240px`、`100%`
     * @default 180
     */
    cardWidth?: number | string;
}
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    size?: 'large' | 'default-size' | 'small';
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    wrapperClassName?: string;
    isFocused?: boolean;
    error?: boolean;
    showCount?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
    size?: 'large' | 'default-size' | 'small';
    wrapperClassName?: string;
    isFocused?: boolean;
    clearable?: boolean;
    onClear?: () => void;
}
declare const Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    size?: 'large' | 'default-size';
    wrapperClassName?: string;
    isFocused?: boolean;
    error?: boolean;
    showCount?: boolean;
    showResizeHandle?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

type SelectSize = 'large' | 'default-size' | 'small';
interface SelectOption {
    label: React.ReactNode;
    value: string;
    iconName?: string;
    disabled?: boolean;
}
interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'defaultValue' | 'onChange' | 'prefix' | 'size' | 'value'> {
    size?: SelectSize;
    placeholder?: React.ReactNode;
    prefix?: React.ReactNode;
    prefixIcon?: React.ReactNode;
    width?: number | string;
    value?: string;
    defaultValue?: string;
    options: SelectOption[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (value: string, option: SelectOption) => void;
    matchTriggerWidth?: boolean;
    panelWidth?: number | string;
    isFocused?: boolean;
    error?: boolean;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLButtonElement>>;

type DatePickerSize = 'large' | 'default-size' | 'small';
type DatePickerType = 'date' | 'range';
type DateRangeValue = [Date | null, Date | null];
type DatePickerValue = Date | DateRangeValue | null;
interface DatePickerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'defaultValue' | 'onChange' | 'size' | 'value'> {
    picker?: DatePickerType;
    size?: DatePickerSize;
    placeholder?: React.ReactNode;
    rangePlaceholder?: [React.ReactNode, React.ReactNode];
    width?: number | string;
    value?: DatePickerValue;
    defaultValue?: DatePickerValue;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (value: DatePickerValue) => void;
    panelWidth?: number | string;
    isFocused?: boolean;
    error?: boolean;
    disabledDate?: (date: Date) => boolean;
    maxRangeDays?: number;
}
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLButtonElement>>;

type TimePickerSize = 'large' | 'default-size' | 'small';
type TimePickerType = 'time' | 'range';
type TimeRangeValue = [string | null, string | null];
type TimePickerValue = string | TimeRangeValue | null;
interface TimePickerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'defaultValue' | 'onChange' | 'size' | 'value'> {
    picker?: TimePickerType;
    size?: TimePickerSize;
    placeholder?: React.ReactNode;
    rangePlaceholder?: [React.ReactNode, React.ReactNode];
    width?: number | string;
    value?: TimePickerValue;
    defaultValue?: TimePickerValue;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (value: TimePickerValue) => void;
    panelWidth?: number | string;
    isFocused?: boolean;
    error?: boolean;
    hourStep?: number;
    minuteStep?: number;
}
declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLButtonElement>>;

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
     * 字段名。与 `FilterGroup` 配合时用于收集当前筛选值。
     */
    name?: string;
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

interface FilterSelectOption {
    label: React.ReactNode;
    value: string;
    iconName?: string;
    disabled?: boolean;
}
interface FilterSelectProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'defaultValue' | 'onChange'> {
    name?: string;
    label: React.ReactNode;
    placeholder?: React.ReactNode;
    size?: FilterSize;
    disabled?: boolean;
    isActive?: boolean;
    filterClassName?: string;
    width?: number | string;
    value?: string;
    defaultValue?: string;
    options: FilterSelectOption[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (value: string, option: FilterSelectOption) => void;
    matchTriggerWidth?: boolean;
    panelWidth?: number | string;
}
declare const FilterSelect: React.ForwardRefExoticComponent<FilterSelectProps & React.RefAttributes<HTMLSpanElement>>;

type FilterDatePickerType = 'date' | 'range';
type FilterDateRangeValue = [Date | null, Date | null];
type FilterDatePickerValue = Date | FilterDateRangeValue | null;
interface FilterDatePickerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'defaultValue' | 'onChange'> {
    name?: string;
    label: React.ReactNode;
    picker?: FilterDatePickerType;
    placeholder?: React.ReactNode;
    rangePlaceholder?: [React.ReactNode, React.ReactNode];
    size?: FilterSize;
    disabled?: boolean;
    isActive?: boolean;
    filterClassName?: string;
    width?: number | string;
    value?: FilterDatePickerValue;
    defaultValue?: FilterDatePickerValue;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (value: FilterDatePickerValue) => void;
    disabledDate?: (date: Date) => boolean;
    maxRangeDays?: number;
}
declare const FilterDatePicker: React.ForwardRefExoticComponent<FilterDatePickerProps & React.RefAttributes<HTMLSpanElement>>;

type FilterTimePickerType = 'time' | 'range';
type FilterTimeRangeValue = [string | null, string | null];
type FilterTimePickerValue = string | FilterTimeRangeValue | null;
interface FilterTimePickerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'defaultValue' | 'onChange'> {
    name?: string;
    label: React.ReactNode;
    picker?: FilterTimePickerType;
    placeholder?: React.ReactNode;
    rangePlaceholder?: [React.ReactNode, React.ReactNode];
    size?: FilterSize;
    disabled?: boolean;
    isActive?: boolean;
    filterClassName?: string;
    width?: number | string;
    value?: FilterTimePickerValue;
    defaultValue?: FilterTimePickerValue;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onChange?: (value: FilterTimePickerValue) => void;
    hourStep?: number;
    minuteStep?: number;
}
declare const FilterTimePicker: React.ForwardRefExoticComponent<FilterTimePickerProps & React.RefAttributes<HTMLSpanElement>>;

type FilterGroupValues = Record<string, unknown>;
type FilterGroupSubmitMode = 'auto' | 'manual' | 'realtime';
interface FilterGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onReset'> {
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
     * 提交当前筛选值。
     * - `manual` 模式下由“查询”按钮触发
     * - `realtime` 模式下由筛选值变化自动触发
     */
    onQuery?: (values: FilterGroupValues) => void;
    /**
     * 点击重置。回调参数为重置后的筛选值。
     */
    onReset?: (values: FilterGroupValues) => void;
    /**
     * 值变化回调。仅会收集声明了 `name` 的筛选项。
     */
    onValuesChange?: (values: FilterGroupValues, meta: {
        name: string;
        value: unknown;
        source: 'change' | 'reset';
    }) => void;
    /**
     * 是否显示默认 Query/Reset 操作区
     * 当传入 onQuery 或 onReset 时，默认展示对应按钮
     */
    showActions?: boolean;
    /**
     * 提交模式。
     * - `auto`：有操作区时走 `manual`，无操作区时走 `realtime`
     * - `manual`：仅点击“查询”时提交
     * - `realtime`：筛选值变化时立即提交
     * @default 'auto'
     */
    submitMode?: FilterGroupSubmitMode;
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

type NavbarTheme = 'light' | 'dark';
interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    theme?: NavbarTheme;
}
declare const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLDivElement>>;

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
    variant?: 'primary' | 'secondary';
    onBackClick?: React.MouseEventHandler<HTMLButtonElement>;
    backButtonAriaLabel?: string;
}
declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;

type StatusColor = 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'black';
interface StatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 主状态文案
     */
    title: React.ReactNode;
    /**
     * 副文案，支持两行内的说明或富文本强调
     */
    description?: React.ReactNode;
    /**
     * 状态栏颜色
     * @default 'black'
     */
    color?: StatusColor;
}
declare const Status: React.ForwardRefExoticComponent<StatusProps & React.RefAttributes<HTMLDivElement>>;

interface StepItem {
    title: string;
    description?: string;
    disabled?: boolean;
}
interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: StepItem[];
    current?: number;
    defaultCurrent?: number;
    onChange?: (current: number) => void;
}
declare const Steps: React.ForwardRefExoticComponent<StepsProps & React.RefAttributes<HTMLDivElement>>;

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

type TableCellAlign = 'left' | 'center' | 'right';
type TableFixedColumn = 'left' | 'right';
declare const TableWrapper: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const Table: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const Thead: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const Tbody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const Tr: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    align?: TableCellAlign;
    fixed?: TableFixedColumn;
}
declare const Th: React.ForwardRefExoticComponent<ThProps & React.RefAttributes<HTMLTableCellElement>>;
interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    align?: TableCellAlign;
    fixed?: TableFixedColumn;
}
declare const Td: React.ForwardRefExoticComponent<TdProps & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCellProduct: ({ img, title, tag, tagVariant, id }: any) => react_jsx_runtime.JSX.Element;
declare const TableCellAmount: ({ children }: any) => react_jsx_runtime.JSX.Element;
interface TableCellTagProps extends TagProps {
    containerClassName?: string;
}
declare const TableCellTag: ({ containerClassName, className, size, variant, color, ...props }: TableCellTagProps) => react_jsx_runtime.JSX.Element;
declare const TableCellOperation: ({ children }: any) => react_jsx_runtime.JSX.Element;
interface TableCellActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    danger?: boolean;
    disabled?: boolean;
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

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /**
     * 尺寸大小
     * @default 'default-size'
     */
    size?: 'default-size' | 'small';
    /**
     * 开关状态变更回调
     */
    onCheckedChange?: (checked: boolean) => void;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;

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

type PopoverPlacement = 'bottom-start' | 'bottom-center' | 'bottom-end' | 'top-start' | 'top-center' | 'top-end';
interface PopoverProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /**
     * Trigger element used to toggle the popover.
     */
    trigger: React.ReactElement;
    /**
     * Content rendered inside the popover panel.
     */
    children: React.ReactNode;
    /**
     * Controlled open state.
     */
    open?: boolean;
    /**
     * Uncontrolled initial open state.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Callback fired when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Preferred placement relative to the trigger.
     * @default 'bottom-start'
     */
    placement?: PopoverPlacement;
    /**
     * Gap between trigger and panel.
     * @default 8
     */
    offset?: number;
    /**
     * Force the panel width to match the trigger width.
     * @default false
     */
    matchTriggerWidth?: boolean;
    /**
     * Close when clicking outside of the trigger + panel.
     * @default true
     */
    closeOnClickOutside?: boolean;
    /**
     * Close when pressing Escape.
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Render content in a custom container. Defaults to document.body.
     */
    getContainer?: () => HTMLElement | null;
    /**
     * Additional class for the floating panel.
     */
    contentClassName?: string;
    /**
     * Additional style for the floating panel.
     */
    contentStyle?: React.CSSProperties;
    /**
     * ARIA role for the floating panel.
     * @default 'dialog'
     */
    contentRole?: React.AriaRole;
}
declare const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<HTMLDivElement>>;

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
type FormLayout = 'horizontal' | 'vertical';
interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 统一设置表单项左侧标题宽度
     * @default 90
     */
    labelWidth?: number | string;
    /**
     * 表单项排列方式
     * @default 'horizontal'
     */
    layout?: FormLayout;
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
    /**
     * 单独覆盖当前项的排列方式
     */
    layout?: FormLayout;
}
declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLDivElement>>;
declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<HTMLDivElement>>;

type KeyValueLayout = 'horizontal' | 'vertical';
interface KeyValueProps extends React.HTMLAttributes<HTMLDivElement> {
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
interface KeyValueItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
interface KeyValueTextProps extends React.HTMLAttributes<HTMLDivElement> {
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
interface KeyValueTagsProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface KeyValueImagesProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface KeyValueImageProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const KeyValue: React.ForwardRefExoticComponent<KeyValueProps & React.RefAttributes<HTMLDivElement>>;
declare const KeyValueItem: React.ForwardRefExoticComponent<KeyValueItemProps & React.RefAttributes<HTMLDivElement>>;
declare const KeyValueText: React.ForwardRefExoticComponent<KeyValueTextProps & React.RefAttributes<HTMLDivElement>>;
declare const KeyValueTags: React.ForwardRefExoticComponent<KeyValueTagsProps & React.RefAttributes<HTMLDivElement>>;
declare const KeyValueImages: React.ForwardRefExoticComponent<KeyValueImagesProps & React.RefAttributes<HTMLDivElement>>;
declare const KeyValueImage: React.ForwardRefExoticComponent<KeyValueImageProps & React.RefAttributes<HTMLDivElement>>;

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

export { Alert, type AlertProps, type AlertVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Card, CardBody, CardDescription, CardDivider, type CardDividerProps, type CardDividerVariant, CardFooter, CardHeader, type CardHeaderProps, CardMetric, type CardMetricProps, CardMetrics, type CardMetricsProps, type CardProps, type CardSize, CardTitle, Checkbox, type CheckboxProps, DatePicker, type DatePickerProps, type DatePickerSize, type DatePickerType, type DatePickerValue, type DateRangeValue, Dialog, type DialogProps, type DialogType, Drawer, type DrawerProps, type DrawerSize, Filter, type FilterButtonProps, FilterDatePicker, type FilterDatePickerProps, type FilterDatePickerType, type FilterDatePickerValue, type FilterDateRangeValue, FilterGroup, type FilterGroupProps, type FilterGroupSubmitMode, type FilterGroupValues, type FilterInputProps, type FilterProps, FilterSelect, type FilterSelectOption, type FilterSelectProps, type FilterSize, FilterTimePicker, type FilterTimePickerProps, type FilterTimePickerType, type FilterTimePickerValue, type FilterTimeRangeValue, type FilterType, Form, FormItem, type FormItemProps, type FormLayout, type FormProps, Icon, type IconProps, type IconVariant, Input, type InputProps, KeyValue, KeyValueImage, type KeyValueImageProps, KeyValueImages, type KeyValueImagesProps, KeyValueItem, type KeyValueItemProps, type KeyValueLayout, type KeyValueProps, KeyValueTags, type KeyValueTagsProps, KeyValueText, type KeyValueTextProps, Menu, type MenuProps, Message, type MessageOptions, type MessageProps, type MessageVariant, Navbar, type NavbarProps, type NavbarTheme, PageHeader, type PageHeaderProps, Pagination, type PaginationProps, type PaginationSize, Popover, type PopoverPlacement, type PopoverProps, Radio, type RadioProps, type RadioSize, type RadioVariant, Search, type SearchProps, Select, type SelectOption, type SelectProps, type SelectSize, Status, type StatusColor, type StatusProps, type StepItem, Steps, type StepsProps, Switch, type SwitchProps, Tab, type TabProps, Table, TableCellAction, type TableCellActionProps, type TableCellAlign, TableCellAmount, TableCellOperation, TableCellProduct, TableCellTag, type TableCellTagProps, type TableFixedColumn, TableWrapper, Tabs, type TabsProps, Tag, type TagColor, type TagProps, type TagSize, type TagVariant, Tbody, Td, type TdProps, Textarea, type TextareaProps, Th, type ThProps, Thead, TimePicker, type TimePickerProps, type TimePickerSize, type TimePickerType, type TimePickerValue, type TimeRangeValue, Tr, Upload, type UploadFileItem, type UploadProps, type UploadVisualState, message, useFormItemStatus };
