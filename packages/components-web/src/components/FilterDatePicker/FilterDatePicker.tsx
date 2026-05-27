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

export type FilterDatePickerType = 'date' | 'range';
export type FilterDateRangeValue = [Date | null, Date | null];
export type FilterDatePickerValue = Date | FilterDateRangeValue | null;

export interface FilterDatePickerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'defaultValue' | 'onChange'> {
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

const DAY_MS = 24 * 60 * 60 * 1000;
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

const formatRangeDateValue = (date: Date | null | undefined) => {
  if (!date) return undefined;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const isSameDate = (a: Date | null | undefined, b: Date | null | undefined) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);

const compareDate = (a: Date, b: Date) => normalizeDate(a).getTime() - normalizeDate(b).getTime();

const diffInDays = (a: Date, b: Date) =>
  Math.round(Math.abs(compareDate(a, b)) / DAY_MS);

const buildCalendarCells = (monthDate: Date): CalendarCell[] => {
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
      isCurrentMonth: date.getMonth() === month,
    };
  });
};

const normalizeRangeValue = (value: FilterDatePickerValue): FilterDateRangeValue => {
  if (!Array.isArray(value)) return [null, null];
  return [value[0] ?? null, value[1] ?? null];
};

const chunkCalendarRows = (cells: CalendarCell[]) => {
  const rows: CalendarCell[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7));
  }
  return rows;
};

const isDateWithinRange = (date: Date, start: Date, end: Date) => {
  const current = normalizeDate(date).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  return current > startTime && current < endTime;
};

const isWithinMaxRange = (candidate: Date, anchor: Date, maxRangeDays?: number) => {
  if (!maxRangeDays || maxRangeDays < 1) return true;
  return diffInDays(candidate, anchor) + 1 <= maxRangeDays;
};

export const FilterDatePicker = React.forwardRef<HTMLSpanElement, FilterDatePickerProps>(
  (
    {
      className,
      label,
      picker = 'date',
      placeholder = '请选择',
      rangePlaceholder = ['开始日期', '结束日期'],
      size = 'default-size',
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
    },
    ref
  ) => {
    const fallbackValue: FilterDatePickerValue = picker === 'range' ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState<FilterDatePickerValue>({
      value,
      defaultValue: defaultValue ?? fallbackValue,
      onChange: undefined,
    });
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const selectedDate =
      picker === 'date' && selectedValue instanceof Date ? selectedValue : null;
    const [rangeStart, rangeEnd] = picker === 'range' ? normalizeRangeValue(selectedValue) : [null, null];
    const [visibleMonth, setVisibleMonth] = useState(() =>
      startOfMonth(selectedDate ?? rangeStart ?? new Date())
    );

    const singleCalendarCells = useMemo(() => buildCalendarCells(visibleMonth), [visibleMonth]);
    const leftVisibleMonth = visibleMonth;
    const rightVisibleMonth = useMemo(() => addMonths(visibleMonth, 1), [visibleMonth]);
    const leftCalendarCells = useMemo(() => buildCalendarCells(leftVisibleMonth), [leftVisibleMonth]);
    const rightCalendarCells = useMemo(
      () => buildCalendarCells(rightVisibleMonth),
      [rightVisibleMonth]
    );
    const leftCalendarRows = useMemo(() => chunkCalendarRows(leftCalendarCells), [leftCalendarCells]);
    const rightCalendarRows = useMemo(
      () => chunkCalendarRows(rightCalendarCells),
      [rightCalendarCells]
    );

    const rangeDisplay = (() => {
      if (!rangeStart && !rangeEnd) return undefined;

      return (
        <span className="lds-filter__range-display">
          <span
            className={clsx('lds-filter__range-part', {
              'is-placeholder': !rangeStart,
            })}
          >
            {formatRangeDateValue(rangeStart) ?? rangePlaceholder[0]}
          </span>
          <span className="lds-filter__range-separator" aria-hidden="true">
            {' '}
            ～{' '}
          </span>
          <span
            className={clsx('lds-filter__range-part', {
              'is-placeholder': !rangeEnd,
            })}
          >
            {formatRangeDateValue(rangeEnd) ?? rangePlaceholder[1]}
          </span>
        </span>
      );
    })();

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
        value={picker === 'range' ? rangeDisplay : formatDateValue(selectedDate)}
      />
    );

    const handleSingleDateSelect = (date: Date) => {
      const nextDate = normalizeDate(date);
      setSelectedValue(nextDate);
      onChange?.(nextDate);
      setIsOpen(false);
    };

    const handleRangeDateSelect = (date: Date) => {
      const nextDate = normalizeDate(date);

      if (!rangeStart || rangeEnd) {
        const nextRange: FilterDateRangeValue = [nextDate, null];
        setSelectedValue(nextRange);
        onChange?.(nextRange);
        return;
      }

      const nextRange: FilterDateRangeValue =
        compareDate(nextDate, rangeStart) < 0 ? [nextDate, rangeStart] : [rangeStart, nextDate];

      setSelectedValue(nextRange);
      onChange?.(nextRange);
      setIsOpen(false);
    };

    const renderCalendar = ({
      month,
      cells,
      rows,
      isRange,
    }: {
      month: Date;
      cells: CalendarCell[];
      rows?: CalendarCell[][];
      isRange: boolean;
    }) => (
      <div
        className={clsx('lds-date-picker__calendar', {
          'lds-date-picker__calendar--range': isRange,
        })}
        data-month={`${month.getFullYear()}-${month.getMonth() + 1}`}
      >
        <div className="lds-filter-date-picker__weekdays">
          {WEEK_DAYS.map((weekDay) => (
            <span key={weekDay} className="lds-filter-date-picker__weekday">
              {weekDay}
            </span>
          ))}
        </div>

        {isRange && rows ? (
          <div className="lds-date-picker__range-grid">
            {rows.map((row, rowIndex) => {
              const activeIndexes: number[] = [];
              let backgroundStyle: React.CSSProperties | undefined;

              if (rangeStart && rangeEnd) {
                row.forEach((cell, cellIndex) => {
                  if (!cell.isCurrentMonth) return;

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
                    borderBottomRightRadius: rowHasEnd ? 0 : `${cellRadius}px`,
                  };
                }
              }

              const activeIndexSet = new Set(activeIndexes);

              return (
                <div key={`${month.toISOString()}-row-${rowIndex}`} className="lds-date-picker__range-row">
                  {backgroundStyle ? (
                    <div className="lds-date-picker__range-row-bg" style={backgroundStyle} />
                  ) : null}

                  {row.map((cell, cellIndex) => {
                    const isOverlapPlaceholder = !cell.isCurrentMonth;
                    const externalDisabled = disabledDate?.(cell.date) ?? false;
                    const maxRangeDisabled =
                      rangeStart && !rangeEnd && !isWithinMaxRange(cell.date, rangeStart, maxRangeDays);
                    const isDisabled =
                      isOverlapPlaceholder || externalDisabled || Boolean(maxRangeDisabled);
                    const isRangeStart =
                      !isOverlapPlaceholder && rangeStart ? isSameDate(cell.date, rangeStart) : false;
                    const isRangeEnd =
                      !isOverlapPlaceholder && rangeEnd ? isSameDate(cell.date, rangeEnd) : false;
                    const isRangeSingle = Boolean(isRangeStart && (!rangeEnd || isRangeEnd));
                    const isRangeStartConnected = Boolean(
                      isRangeStart && !isRangeSingle && activeIndexSet.has(cellIndex + 1)
                    );
                    const isRangeEndConnected = Boolean(
                      isRangeEnd && !isRangeSingle && activeIndexSet.has(cellIndex - 1)
                    );

                    return (
                      <div key={cell.date.toISOString()} className="lds-date-picker__range-cell-shell">
                        <button
                          type="button"
                          disabled={isDisabled}
                          className={clsx('lds-filter-date-picker__cell', 'lds-date-picker__range-cell', {
                            'is-outside': !cell.isCurrentMonth,
                            'is-range-start': isRangeStart,
                            'is-range-end': isRangeEnd,
                            'is-range-single': isRangeSingle,
                            'is-range-start-connected': isRangeStartConnected,
                            'is-range-end-connected': isRangeEndConnected,
                          })}
                          onClick={() => {
                            if (isDisabled) return;
                            handleRangeDateSelect(cell.date);
                          }}
                        >
                          {cell.day}
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="lds-filter-date-picker__grid">
            {cells.map((cell) => {
              const isDisabled = disabledDate?.(cell.date) ?? false;
              const isSelected = isSameDate(cell.date, selectedDate);

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
                    handleSingleDateSelect(cell.date);
                  }}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );

    const content =
      picker === 'range' ? (
        <div className="lds-date-picker__range-panel">
          <div className="lds-date-picker__range-header">
            <div className="lds-filter-date-picker__nav-group">
              <button
                type="button"
                className="lds-filter-date-picker__nav"
                onClick={() =>
                  setVisibleMonth(
                    new Date(leftVisibleMonth.getFullYear() - 1, leftVisibleMonth.getMonth(), 1)
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
                    new Date(leftVisibleMonth.getFullYear(), leftVisibleMonth.getMonth() - 1, 1)
                  )
                }
              >
                <Icon name="ic-arrow-left-line" aria-hidden="true" />
              </button>
            </div>

            <div className="lds-date-picker__range-titles">
              <div className="lds-filter-date-picker__title">
                <span>{leftVisibleMonth.getFullYear()}年</span>
                <span>{leftVisibleMonth.getMonth() + 1}月</span>
              </div>
              <div className="lds-filter-date-picker__title">
                <span>{rightVisibleMonth.getFullYear()}年</span>
                <span>{rightVisibleMonth.getMonth() + 1}月</span>
              </div>
            </div>

            <div className="lds-filter-date-picker__nav-group">
              <button
                type="button"
                className="lds-filter-date-picker__nav"
                onClick={() =>
                  setVisibleMonth(
                    new Date(leftVisibleMonth.getFullYear(), leftVisibleMonth.getMonth() + 1, 1)
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
                    new Date(leftVisibleMonth.getFullYear() + 1, leftVisibleMonth.getMonth(), 1)
                  )
                }
              >
                <Icon name="ic-double-right-line" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lds-date-picker__range-body">
            {renderCalendar({
              month: leftVisibleMonth,
              cells: leftCalendarCells,
              rows: leftCalendarRows,
              isRange: true,
            })}
            {renderCalendar({
              month: rightVisibleMonth,
              cells: rightCalendarCells,
              rows: rightCalendarRows,
              isRange: true,
            })}
          </div>
        </div>
      ) : (
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

          {renderCalendar({
            month: visibleMonth,
            cells: singleCalendarCells,
            rows: undefined,
            isRange: false,
          })}
        </div>
      );

    return (
      <Popover
        ref={ref as React.Ref<HTMLDivElement>}
        trigger={trigger}
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            const anchorDate = selectedDate ?? rangeStart ?? new Date();
            setVisibleMonth(startOfMonth(anchorDate));
          }
          setIsOpen(nextOpen);
        }}
        className={className}
        contentClassName={clsx('lds-filter-date-picker__popover', {
          'lds-date-picker__range-popover': picker === 'range',
        })}
        contentStyle={{ width: picker === 'range' ? 740 : 380 }}
        closeOnClickOutside
        closeOnEsc
        {...props}
      >
        {content}
      </Popover>
    );
  }
);

FilterDatePicker.displayName = 'FilterDatePicker';
