import React, { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { Filter, type FilterSize } from '../Filter/Filter';
import { Icon } from '../Icon/Icon';
import { Popover } from '../Popover/Popover';

type CalendarCell = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

export interface FilterDatePickerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'defaultValue' | 'onChange'> {
  label: React.ReactNode;
  placeholder?: React.ReactNode;
  size?: FilterSize;
  disabled?: boolean;
  isActive?: boolean;
  filterClassName?: string;
  width?: number | string;
  value?: Date | null;
  defaultValue?: Date | null;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: Date) => void;
  disabledDate?: (date: Date) => boolean;
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

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

const formatDateValue = (date: Date | null | undefined) => {
  if (!date) return undefined;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const isSameDate = (a: Date | null | undefined, b: Date | null | undefined) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const buildCalendarCells = (monthDate: Date): CalendarCell[] => {
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
      isCurrentMonth: date.getMonth() === month,
    };
  });
};

export const FilterDatePicker = React.forwardRef<HTMLSpanElement, FilterDatePickerProps>(
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
      defaultValue = null,
      open,
      defaultOpen = false,
      onOpenChange,
      onChange,
      disabledDate,
      ...props
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useControllableState<Date | null>({
      value,
      defaultValue,
      onChange: undefined,
    });
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [visibleMonth, setVisibleMonth] = useState(() =>
      selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date()
    );

    const calendarCells = useMemo(() => buildCalendarCells(visibleMonth), [visibleMonth]);

    const trigger = (
      <Filter
        type="date"
        label={label}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        className={filterClassName}
        width={width}
        isActive={isActive || isOpen}
        value={formatDateValue(selectedDate)}
      />
    );

    return (
      <Popover
        ref={ref as React.Ref<HTMLDivElement>}
        trigger={trigger}
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setVisibleMonth(
              selectedDate
                ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
                : new Date()
            );
          }
          setIsOpen(nextOpen);
        }}
        className={className}
        contentClassName="lds-filter-date-picker__popover"
        contentStyle={{ width: 380 }}
        closeOnClickOutside
        closeOnEsc
        {...props}
      >
        <div className="lds-filter-date-picker">
          <div className="lds-filter-date-picker__header">
            <div className="lds-filter-date-picker__nav-group">
              <button
                type="button"
                className="lds-filter-date-picker__nav"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1)
                  )
                }
              >
                <Icon name="ic-double-left-line" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="lds-filter-date-picker__nav"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
                  )
                }
              >
                <Icon name="ic-arrow-left-line" aria-hidden="true" />
              </button>
            </div>

            <div className="lds-filter-date-picker__title">
              <span>{visibleMonth.getFullYear()}年</span>
              <span>{visibleMonth.getMonth() + 1}月</span>
            </div>

            <div className="lds-filter-date-picker__nav-group">
              <button
                type="button"
                className="lds-filter-date-picker__nav"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
                  )
                }
              >
                <Icon name="ic-arrow-right-line" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="lds-filter-date-picker__nav"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1)
                  )
                }
              >
                <Icon name="ic-double-right-line" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lds-filter-date-picker__weekdays">
            {WEEK_DAYS.map((weekDay) => (
              <span key={weekDay} className="lds-filter-date-picker__weekday">
                {weekDay}
              </span>
            ))}
          </div>

          <div className="lds-filter-date-picker__grid">
            {calendarCells.map((cell) => {
              const isSelected = isSameDate(cell.date, selectedDate);
              const isDisabled = disabledDate?.(cell.date) ?? false;

              return (
                <button
                  key={cell.date.toISOString()}
                  type="button"
                  disabled={isDisabled}
                  className={clsx('lds-filter-date-picker__cell', {
                    'is-outside': !cell.isCurrentMonth,
                    'is-selected': isSelected,
                  })}
                  onClick={() => {
                    if (isDisabled) return;
                    setSelectedDate(cell.date);
                    onChange?.(cell.date);
                    setIsOpen(false);
                  }}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      </Popover>
    );
  }
);

FilterDatePicker.displayName = 'FilterDatePicker';
