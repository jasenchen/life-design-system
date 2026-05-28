import React, { useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useFormItemStatus } from '../Form/Form';
import { Icon } from '../Icon/Icon';
import { Popover } from '../Popover/Popover';

export type TimePickerSize = 'large' | 'default-size' | 'small';
export type TimePickerType = 'time' | 'range';
export type TimeRangeValue = [string | null, string | null];
export type TimePickerValue = string | TimeRangeValue | null;

export interface TimePickerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'defaultValue' | 'onChange' | 'size' | 'value'
  > {
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

const buildTimeRange = (count: number, step: number) =>
  Array.from({ length: Math.ceil(count / step) }).map((_, index) =>
    String(index * step).padStart(2, '0')
  );

const normalizeTimeValue = (value: string | null | undefined) => {
  if (!value) return null;

  const [rawHour = '00', rawMinute = '00'] = value.split(':');
  const hour = rawHour.padStart(2, '0').slice(0, 2);
  const minute = rawMinute.padStart(2, '0').slice(0, 2);

  return `${hour}:${minute}`;
};

const splitTimeValue = (value: string | null | undefined, fallbackHour: string, fallbackMinute: string) => {
  const normalized = normalizeTimeValue(value);
  if (!normalized) {
    return {
      hour: fallbackHour,
      minute: fallbackMinute,
    };
  }

  const [hour, minute] = normalized.split(':');

  return {
    hour,
    minute,
  };
};

const normalizeRangeValue = (value: TimePickerValue): TimeRangeValue => {
  if (!Array.isArray(value)) return [null, null];
  return [normalizeTimeValue(value[0]), normalizeTimeValue(value[1])];
};

const compareTimeValue = (left: string | null, right: string | null) => {
  if (!left || !right) return 0;
  return left.localeCompare(right);
};

const scrollSelectedCellIntoView = (
  column: HTMLDivElement | null,
  selectedValue: string | undefined
) => {
  if (!column || !selectedValue) return;

  const selectedCell = column.querySelector<HTMLElement>(`[data-time-value="${selectedValue}"]`);
  if (!selectedCell) return;

  const centeredTop = selectedCell.offsetTop - (column.clientHeight - selectedCell.offsetHeight) / 2;
  const maxScrollTop = Math.max(column.scrollHeight - column.clientHeight, 0);
  const nextScrollTop = Math.min(Math.max(centeredTop, 0), maxScrollTop);

  column.scrollTo({
    top: nextScrollTop,
    behavior: 'auto',
  });
};

export const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    {
      className,
      style,
      picker = 'time',
      size = 'default-size',
      placeholder = '请选择',
      rangePlaceholder = ['开始时间', '结束时间'],
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
    },
    ref
  ) => {
    const { hasError } = useFormItemStatus();
    const mergedError = error ?? hasError;
    const hourColumnRef = useRef<HTMLDivElement>(null);
    const minuteColumnRef = useRef<HTMLDivElement>(null);
    const rangeStartHourColumnRef = useRef<HTMLDivElement>(null);
    const rangeStartMinuteColumnRef = useRef<HTMLDivElement>(null);
    const rangeEndHourColumnRef = useRef<HTMLDivElement>(null);
    const rangeEndMinuteColumnRef = useRef<HTMLDivElement>(null);
    const fallbackValue: TimePickerValue = picker === 'range' ? [null, null] : null;
    const [selectedValue, setSelectedValue] = useControllableState<TimePickerValue>({
      value,
      defaultValue: defaultValue ?? fallbackValue,
      onChange: undefined,
    });
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const hours = useMemo(() => buildTimeRange(24, hourStep), [hourStep]);
    const minutes = useMemo(() => buildTimeRange(60, minuteStep), [minuteStep]);
    const fallbackHour = hours[0] ?? '00';
    const fallbackMinute = minutes[0] ?? '00';
    const selectedTime =
      picker === 'time' && typeof selectedValue === 'string' ? normalizeTimeValue(selectedValue) : null;
    const [rangeStart, rangeEnd] = picker === 'range' ? normalizeRangeValue(selectedValue) : [null, null];
    const initialSingle = splitTimeValue(selectedTime, fallbackHour, fallbackMinute);
    const [draftHour, setDraftHour] = useState(initialSingle.hour);
    const [draftMinute, setDraftMinute] = useState(initialSingle.minute);
    const initialRangeStart = splitTimeValue(rangeStart, fallbackHour, fallbackMinute);
    const initialRangeEnd = splitTimeValue(rangeEnd, fallbackHour, fallbackMinute);
    const [rangeDraft, setRangeDraft] = useState({
      startHour: initialRangeStart.hour,
      startMinute: initialRangeStart.minute,
      endHour: initialRangeEnd.hour,
      endMinute: initialRangeEnd.minute,
    });
    const resolvedWidth = toCssSize(width);
    const resolvedPanelWidth = toCssSize(panelWidth);
    const mergedStyle = {
      width: '100%',
      ...style,
    } as React.CSSProperties;
    const anchorStyle = {
      width: resolvedWidth,
      maxWidth: '100%',
      display: 'flex',
    } as React.CSSProperties;

    useEffect(() => {
      if (!isOpen) return;

      let frameId2 = 0;
      const frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          if (picker === 'range') {
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

    const commitSingleValue = (nextHour: string, nextMinute: string, close = false) => {
      const nextValue = `${nextHour}:${nextMinute}`;
      setSelectedValue(nextValue);
      onChange?.(nextValue);
      if (close) {
        setIsOpen(false);
      }
    };

    const commitRangeValue = (
      nextRangeDraft: {
        startHour: string;
        startMinute: string;
        endHour: string;
        endMinute: string;
      },
      changedPart: 'start' | 'end',
      close = false
    ) => {
      let nextStart = rangeStart;
      let nextEnd = rangeEnd;

      if (changedPart === 'start') {
        nextStart = `${nextRangeDraft.startHour}:${nextRangeDraft.startMinute}`;
      } else {
        nextEnd = `${nextRangeDraft.endHour}:${nextRangeDraft.endMinute}`;
      }

      if (nextStart && nextEnd && compareTimeValue(nextStart, nextEnd) > 0) {
        if (changedPart === 'start') {
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
        endMinute: normalizedEnd.minute,
      };
      const nextValue: TimeRangeValue = [nextStart, nextEnd];

      setRangeDraft(normalizedDraft);
      setSelectedValue(nextValue);
      onChange?.(nextValue);

      if (close) {
        setIsOpen(false);
      }
    };

    const trigger = (
      <button
        {...props}
        ref={ref}
        type={type ?? 'button'}
        disabled={disabled}
        aria-invalid={mergedError || undefined}
        className={clsx(
          'lds-select',
          'lds-time-picker',
          `lds-select--${size}`,
          `lds-time-picker--${picker}`,
          {
            'is-active': isFocused || isOpen,
            'is-disabled': disabled,
            'is-error': mergedError,
            'is-filled': picker === 'range' ? Boolean(rangeStart || rangeEnd) : Boolean(selectedTime),
          },
          className
        )}
        style={mergedStyle}
      >
        {picker === 'range' ? (
          <span className="lds-select__value lds-time-picker__range">
            <span
              className={clsx('lds-time-picker__range-value', {
                'is-selected': rangeStart,
                'is-placeholder': !rangeStart,
              })}
            >
              {rangeStart ?? rangePlaceholder[0]}
            </span>
            <span className="lds-time-picker__range-separator" aria-hidden="true">
              ~
            </span>
            <span
              className={clsx('lds-time-picker__range-value', {
                'is-selected': rangeEnd,
                'is-placeholder': !rangeEnd,
              })}
            >
              {rangeEnd ?? rangePlaceholder[1]}
            </span>
          </span>
        ) : (
          <span className="lds-select__value">
            {selectedTime ?? placeholder}
          </span>
        )}

        <span className="lds-select__icon" aria-hidden="true">
          <Icon name="ic-time-round-line" className="lds-select__icon-svg lds-time-picker__icon-svg" />
        </span>
      </button>
    );

    return (
      <Popover
        trigger={trigger}
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            if (picker === 'range') {
              const nextRange = normalizeRangeValue(selectedValue);
              const nextStart = splitTimeValue(nextRange[0], fallbackHour, fallbackMinute);
              const nextEnd = splitTimeValue(nextRange[1], fallbackHour, fallbackMinute);

              setRangeDraft({
                startHour: nextStart.hour,
                startMinute: nextStart.minute,
                endHour: nextEnd.hour,
                endMinute: nextEnd.minute,
              });
            } else {
              const nextSingle = splitTimeValue(selectedTime, fallbackHour, fallbackMinute);
              setDraftHour(nextSingle.hour);
              setDraftMinute(nextSingle.minute);
            }
          }
          setIsOpen(nextOpen);
        }}
        style={anchorStyle}
        closeOnClickOutside
        closeOnEsc
        contentClassName={clsx('lds-time-picker__popover', {
          'lds-filter-time-picker__popover': picker === 'time',
          'lds-time-picker__range-popover': picker === 'range',
        })}
        contentStyle={resolvedPanelWidth ? { width: resolvedPanelWidth } : undefined}
      >
        {picker === 'range' ? (
          <div className="lds-time-picker__range-panel">
            <div className="lds-time-picker__range-section">
              <div className="lds-time-picker__range-section-header">开始时间</div>
              <div className="lds-time-picker__range-section-body">
                <div ref={rangeStartHourColumnRef} className="lds-filter-time-picker__column">
                  {hours.map((hour) => (
                    <button
                      key={`start-hour-${hour}`}
                      type="button"
                      data-time-value={hour}
                      className={clsx('lds-filter-time-picker__cell', {
                        'is-selected': rangeDraft.startHour === hour,
                      })}
                      onClick={() => {
                        const nextDraft = {
                          ...rangeDraft,
                          startHour: hour,
                        };
                        commitRangeValue(nextDraft, 'start');
                      }}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
                <div ref={rangeStartMinuteColumnRef} className="lds-filter-time-picker__column">
                  {minutes.map((minute) => (
                    <button
                      key={`start-minute-${minute}`}
                      type="button"
                      data-time-value={minute}
                      className={clsx('lds-filter-time-picker__cell', {
                        'is-selected': rangeDraft.startMinute === minute,
                      })}
                      onClick={() => {
                        const nextDraft = {
                          ...rangeDraft,
                          startMinute: minute,
                        };
                        commitRangeValue(nextDraft, 'start');
                      }}
                    >
                      {minute}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lds-time-picker__range-section is-end">
              <div className="lds-time-picker__range-section-header">结束时间</div>
              <div className="lds-time-picker__range-section-body">
                <div ref={rangeEndHourColumnRef} className="lds-filter-time-picker__column">
                  {hours.map((hour) => (
                    <button
                      key={`end-hour-${hour}`}
                      type="button"
                      data-time-value={hour}
                      className={clsx('lds-filter-time-picker__cell', {
                        'is-selected': rangeDraft.endHour === hour,
                      })}
                      onClick={() => {
                        const nextDraft = {
                          ...rangeDraft,
                          endHour: hour,
                        };
                        commitRangeValue(nextDraft, 'end');
                      }}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
                <div ref={rangeEndMinuteColumnRef} className="lds-filter-time-picker__column">
                  {minutes.map((minute) => (
                    <button
                      key={`end-minute-${minute}`}
                      type="button"
                      data-time-value={minute}
                      className={clsx('lds-filter-time-picker__cell', {
                        'is-selected': rangeDraft.endMinute === minute,
                      })}
                      onClick={() => {
                        const nextDraft = {
                          ...rangeDraft,
                          endMinute: minute,
                        };
                        commitRangeValue(nextDraft, 'end', true);
                      }}
                    >
                      {minute}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lds-filter-time-picker">
            <div ref={hourColumnRef} className="lds-filter-time-picker__column">
              {hours.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  data-time-value={hour}
                  className={clsx('lds-filter-time-picker__cell', {
                    'is-selected': draftHour === hour,
                  })}
                  onClick={() => {
                    setDraftHour(hour);
                    commitSingleValue(hour, draftMinute);
                  }}
                >
                  {hour}
                </button>
              ))}
            </div>
            <div ref={minuteColumnRef} className="lds-filter-time-picker__column">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  type="button"
                  data-time-value={minute}
                  className={clsx('lds-filter-time-picker__cell', {
                    'is-selected': draftMinute === minute,
                  })}
                  onClick={() => {
                    setDraftMinute(minute);
                    commitSingleValue(draftHour, minute, true);
                  }}
                >
                  {minute}
                </button>
              ))}
            </div>
          </div>
        )}
      </Popover>
    );
  }
);

TimePicker.displayName = 'TimePicker';
