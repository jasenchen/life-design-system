import React from 'react';
import { clsx } from 'clsx';
import type { FilterSize } from '../Filter/Filter';
import { Filter } from '../Filter/Filter';
import { FilterSelect } from '../FilterSelect/FilterSelect';
import { FilterDatePicker } from '../FilterDatePicker/FilterDatePicker';
import { FilterTimePicker } from '../FilterTimePicker/FilterTimePicker';
import { Button } from '../Button/Button';

export type FilterGroupValues = Record<string, unknown>;
export type FilterGroupSubmitMode = 'auto' | 'manual' | 'realtime';

type ManagedFilterKind = 'filter' | 'select' | 'date' | 'time';

interface ManagedFilterConfig {
  name: string;
  kind: ManagedFilterKind;
  isControlled: boolean;
  currentValue: unknown;
  resetValue: unknown;
  element: React.ReactElement<any>;
}

const isManagedFilterElement = (child: React.ReactNode): child is React.ReactElement<any> =>
  React.isValidElement(child) &&
  (child.type === Filter ||
    child.type === FilterSelect ||
    child.type === FilterDatePicker ||
    child.type === FilterTimePicker);

const getManagedFilterConfig = (child: React.ReactNode): ManagedFilterConfig | null => {
  if (!isManagedFilterElement(child)) return null;

  const props = child.props as Record<string, unknown>;
  const name = typeof props.name === 'string' ? props.name : undefined;
  if (!name) return null;

  if (child.type === Filter) {
    const isControlled = props.value !== undefined;
    const currentValue = isControlled ? props.value : props.defaultValue ?? '';

    return {
      name,
      kind: 'filter',
      isControlled,
      currentValue,
      resetValue: props.defaultValue ?? '',
      element: child,
    };
  }

  if (child.type === FilterSelect) {
    const isControlled = props.value !== undefined;
    const currentValue = isControlled ? props.value : props.defaultValue;

    return {
      name,
      kind: 'select',
      isControlled,
      currentValue,
      resetValue: props.defaultValue,
      element: child,
    };
  }

  if (child.type === FilterDatePicker) {
    const picker = props.picker === 'range' ? 'range' : 'date';
    const fallbackValue = picker === 'range' ? [null, null] : null;
    const isControlled = props.value !== undefined;
    const currentValue = isControlled ? props.value : props.defaultValue ?? fallbackValue;

    return {
      name,
      kind: 'date',
      isControlled,
      currentValue,
      resetValue: props.defaultValue ?? fallbackValue,
      element: child,
    };
  }

  const picker = props.picker === 'range' ? 'range' : 'time';
  const fallbackValue = picker === 'range' ? [null, null] : null;
  const isControlled = props.value !== undefined;
  const currentValue = isControlled ? props.value : props.defaultValue ?? fallbackValue;

  return {
    name,
    kind: 'time',
    isControlled,
    currentValue,
    resetValue: props.defaultValue ?? fallbackValue,
    element: child,
  };
};

export interface FilterGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onReset'> {
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
  onValuesChange?: (
    values: FilterGroupValues,
    meta: { name: string; value: unknown; source: 'change' | 'reset' }
  ) => void;
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

export const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  (
    {
      className,
      size = 'small',
      minItemWidth = 294,
      gap = 12,
      onQuery,
      onReset,
      onValuesChange,
      showActions,
      submitMode = 'auto',
      actions,
      queryText = '查询',
      resetText = '重置',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const shouldShowDefaultActions = Boolean(showActions ?? (onQuery || onReset));
    const shouldRenderActionsRow = Boolean(actions || shouldShowDefaultActions);
    const effectiveSubmitMode =
      submitMode === 'auto' ? (shouldRenderActionsRow ? 'manual' : 'realtime') : submitMode;
    const managedFilters = React.useMemo(
      () =>
        React.Children.toArray(children)
          .map((child) => getManagedFilterConfig(child))
          .filter((item): item is ManagedFilterConfig => item !== null),
      [children]
    );
    const valuesRef = React.useRef<FilterGroupValues>({});
    const [resetVersion, setResetVersion] = React.useState(0);

    React.useEffect(() => {
      const nextValues: FilterGroupValues = {};

      managedFilters.forEach((config) => {
        if (config.isControlled || !(config.name in valuesRef.current)) {
          nextValues[config.name] = config.currentValue;
          return;
        }

        nextValues[config.name] = valuesRef.current[config.name];
      });

      valuesRef.current = nextValues;
    }, [managedFilters]);

    const emitValuesChange = React.useCallback(
      (values: FilterGroupValues, meta: { name: string; value: unknown; source: 'change' | 'reset' }) => {
        onValuesChange?.(values, meta);
      },
      [onValuesChange]
    );

    const handleFilterValueChange = React.useCallback(
      (name: string, value: unknown) => {
        const nextValues = { ...valuesRef.current, [name]: value };
        valuesRef.current = nextValues;
        emitValuesChange(nextValues, { name, value, source: 'change' });

        if (effectiveSubmitMode === 'realtime') {
          onQuery?.(nextValues);
        }
      },
      [effectiveSubmitMode, emitValuesChange, onQuery]
    );

    const handleQuery = React.useCallback(() => {
      onQuery?.({ ...valuesRef.current });
    }, [onQuery]);

    const handleReset = React.useCallback(() => {
      const resetValues = managedFilters.reduce<FilterGroupValues>((acc, config) => {
        acc[config.name] = config.resetValue;
        return acc;
      }, {});

      valuesRef.current = resetValues;
      setResetVersion((version) => version + 1);
      onReset?.(resetValues);
      Object.entries(resetValues).forEach(([name, value]) => {
        emitValuesChange(resetValues, { name, value, source: 'reset' });
      });
    }, [emitValuesChange, managedFilters, onReset]);

    const enhancedChildren = React.useMemo(
      () =>
        React.Children.map(children, (child, index) => {
          const config = getManagedFilterConfig(child);
          if (!config || !React.isValidElement(child)) return child;

          const keyPrefix = child.key ?? `${config.name}-${index}`;
          const commonProps = { key: `${String(keyPrefix)}-${resetVersion}` };

          if (config.kind === 'filter') {
            const originalOnChange = child.props.onChange as
              | ((value: string, e: React.ChangeEvent<HTMLInputElement>) => void)
              | undefined;

            return React.cloneElement(child, {
              ...commonProps,
              onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
                originalOnChange?.(value, e);
                handleFilterValueChange(config.name, value);
              },
            });
          }

          const originalOnChange = child.props.onChange as ((value: unknown, ...args: unknown[]) => void) | undefined;

          return React.cloneElement(child, {
            ...commonProps,
            onChange: (value: unknown, ...args: unknown[]) => {
              originalOnChange?.(value, ...args);
              handleFilterValueChange(config.name, value);
            },
          });
        }),
      [children, handleFilterValueChange, resetVersion]
    );

    return (
      <div
        ref={ref}
        className={clsx('lds-filter-group', className)}
        style={
          {
            ...style,
            // CSS vars for responsive grid behaviour.
            ['--lds-filter-group-min-item-width' as any]: `${minItemWidth}px`,
            ['--lds-filter-group-gap' as any]: `${gap}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="lds-filter-group__grid">{enhancedChildren}</div>
        {shouldRenderActionsRow ? (
          <div className="lds-filter-group__actions-row">
            {actions ? (
              actions
            ) : (
              <>
                {onQuery ? (
                  <Button variant="secondary" size={size} onClick={handleQuery}>
                    {queryText}
                  </Button>
                ) : null}
                {onReset ? (
                  <Button variant="default" size={size} onClick={handleReset}>
                    {resetText}
                  </Button>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

FilterGroup.displayName = 'FilterGroup';
