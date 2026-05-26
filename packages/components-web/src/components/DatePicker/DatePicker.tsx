import React, { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useFormItemStatus } from '../Form/Form';
import { Icon } from '../Icon/Icon';
import { Popover } from '../Popover/Popover';

export type DatePickerSize = 'large' | 'default-size' | 'small';
export type DatePickerType = 'date' | 'range';
export type DateRangeValue = [Date | null, Date | null];
export type DatePickerValue = Date | DateRangeValue | null;

type CalendarCell = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

export interface DatePickerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'defaultValue' | 'onChange' | 'size' | 'value'
  > {
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

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

const toCssSize = (value?: number | string) => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

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

const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);

const formatDateValue = (date: Date | null | undefined) => {
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

const normalizeRangeValue = (value: DatePickerValue): DateRangeValue => {
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

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      style,
      picker = 'date',
      size = 'default-size',
      placeholder = '请选择',
      rangePlaceholder = ['开始日期', '结束日期'],
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
    },
    ref
  ) => {
    const { hasError } = useFormItemStatus();
    const mergedError = error ?? hasError;
    const fallbackValue: DatePickerValue = picker === 'range' ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState<DatePickerValue>({
      value,
      defaultValue: defaultValue ?? fallbackValue,
      onChange: undefined,
    });
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const selectedDate = picker === 'date' && selectedValue instanceof Date ? selectedValue : null;
    const [rangeStart, rangeEnd] = picker === 'range' ? normalizeRangeValue(selectedValue) : [null, null];

    const [visibleMonth, setVisibleMonth] = useState(() => {
      const anchorDate = selectedDate ?? rangeStart ?? new Date();
      return startOfMonth(anchorDate);
    });

    const resolvedWidth = toCssSize(width);
    const resolvedPanelWidth = toCssSize(panelWidth ?? (picker === 'range' ? 740 : 380));
    const mergedStyle = {
      width: '100%',
      ...style,
    } as React.CSSProperties;
    const anchorStyle = {
      width: resolvedWidth,
      maxWidth: '100%',
      display: 'flex',
    } as React.CSSProperties;

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

    const trigger = (
      <button
        {...props}
        ref={ref}
        type={type ?? 'button'}
        disabled={disabled}
        aria-invalid={mergedError || undefined}
        className={clsx(
          'lds-select',
          'lds-date-picker',
          `lds-select--${size}`,
          `lds-date-picker--${picker}`,
          {
            'is-active': isFocused || isOpen,
            'is-disabled': disabled,
            'is-error': mergedError,
            'is-filled': picker === 'date' ? selectedDate !== null : Boolean(rangeStart || rangeEnd),
          },
          className
        )}
        style={mergedStyle}
      >
        {picker === 'range' ? (
          <span className="lds-select__value lds-date-picker__range">
            <span
              className={clsx('lds-date-picker__range-value', {
                'is-selected': rangeStart,
                'is-placeholder': !rangeStart,
              })}
            >
              {formatDateValue(rangeStart) ?? rangePlaceholder[0]}
            </span>
            <span className="lds-date-picker__range-separator" aria-hidden="true">
              ~
            </span>
            <span
              className={clsx('lds-date-picker__range-value', {
                'is-selected': rangeEnd,
                'is-placeholder': !rangeEnd,
              })}
            >
              {formatDateValue(rangeEnd) ?? rangePlaceholder[1]}
            </span>
          </span>
        ) : (
          <span className="lds-select__value">
            {selectedDate ? formatDateValue(selectedDate) : placeholder}
          </span>
        )}

        <span className="lds-select__icon" aria-hidden="true">
          <Icon name="ic-calendar-line" className="lds-select__icon-svg lds-date-picker__icon-svg" />
        </span>
      </button>
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
        const nextRange: DateRangeValue = [nextDate, null];
        setSelectedValue(nextRange);
        onChange?.(nextRange);
        return;
      }

      const nextRange: DateRangeValue =
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
        trigger={trigger}
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            const anchorDate = selectedDate ?? rangeStart ?? new Date();
            setVisibleMonth(startOfMonth(anchorDate));
          }
          setIsOpen(nextOpen);
        }}
        style={anchorStyle}
        closeOnClickOutside
        closeOnEsc
        contentClassName={clsx('lds-filter-date-picker__popover', {
          'lds-date-picker__range-popover': picker === 'range',
          'lds-date-picker__popover': picker === 'date',
        })}
        contentStyle={{ width: resolvedPanelWidth }}
      >
        {content}
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';
