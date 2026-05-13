import React, { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { Filter, type FilterSize } from '../Filter/Filter';
import { Icon } from '../Icon/Icon';
import { Popover } from '../Popover/Popover';

export interface FilterSelectOption {
  label: React.ReactNode;
  value: string;
  iconName?: string;
  disabled?: boolean;
}

export interface FilterSelectProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'defaultValue' | 'onChange'> {
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

const useControllableState = <T,>({
  value,
  defaultValue,
  onChange,
}: {
  value: T | undefined;
  defaultValue: T;
  onChange?: (nextValue: T) => void;
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const stateValue = isControlled ? value : internalValue;

  const setValue = (nextValue: T) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return [stateValue, setValue] as const;
};

export const FilterSelect = React.forwardRef<HTMLSpanElement, FilterSelectProps>(
  (
    {
      className,
      label,
      placeholder = '请选择',
      size = 'default-size',
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
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useControllableState<string | undefined>({
      value,
      defaultValue,
      onChange: undefined,
    });
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const selectedOption = useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue]
    );

    const trigger = (
      <Filter
        type="select"
        label={label}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        className={filterClassName}
        width={width}
        isActive={isActive || isOpen}
        value={selectedOption?.label}
      />
    );

    return (
      <Popover
        ref={ref as React.Ref<HTMLDivElement>}
        trigger={trigger}
        open={isOpen}
        onOpenChange={setIsOpen}
        matchTriggerWidth={matchTriggerWidth}
        closeOnClickOutside
        closeOnEsc
        contentRole="listbox"
        className={className}
        contentClassName="lds-filter-select__popover"
        contentStyle={panelWidth !== undefined ? { width: panelWidth } : undefined}
        {...props}
      >
        <div className="lds-filter-select__list">
          {options.map((option) => {
            const selected = option.value === selectedValue;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={option.disabled}
                className={clsx('lds-filter-select__option', {
                  'is-selected': selected,
                })}
                onClick={() => {
                  if (option.disabled) return;
                  setSelectedValue(option.value);
                  onChange?.(option.value, option);
                  setIsOpen(false);
                }}
              >
                {option.iconName ? (
                  <span className="lds-filter-select__option-icon" aria-hidden="true">
                    <Icon name={option.iconName} />
                  </span>
                ) : null}
                <span className="lds-filter-select__option-label">{option.label}</span>
                {selected ? (
                  <span className="lds-filter-select__option-check" aria-hidden="true">
                    <Icon name="ic-finish-line" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </Popover>
    );
  }
);

FilterSelect.displayName = 'FilterSelect';
