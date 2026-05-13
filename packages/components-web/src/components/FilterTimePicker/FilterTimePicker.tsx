import React, { useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Filter, type FilterSize } from '../Filter/Filter';
import { Popover } from '../Popover/Popover';

export interface FilterTimePickerProps
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
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: string) => void;
  hourStep?: number;
  minuteStep?: number;
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

const buildTimeRange = (count: number, step: number) =>
  Array.from({ length: Math.ceil(count / step) }).map((_, index) =>
    String(index * step).padStart(2, '0')
  );

const scrollSelectedCellIntoView = (
  column: HTMLDivElement | null,
  selectedValue: string | undefined
) => {
  if (!column || !selectedValue) return;

  const selectedCell = column.querySelector<HTMLElement>(`[data-time-value="${selectedValue}"]`);
  if (!selectedCell) return;

  selectedCell.scrollIntoView({
    block: 'center',
    inline: 'nearest',
    behavior: 'auto',
  });
};

export const FilterTimePicker = React.forwardRef<HTMLSpanElement, FilterTimePickerProps>(
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
      open,
      defaultOpen = false,
      onOpenChange,
      onChange,
      hourStep = 1,
      minuteStep = 1,
      ...props
    },
    ref
  ) => {
    const hourColumnRef = useRef<HTMLDivElement>(null);
    const minuteColumnRef = useRef<HTMLDivElement>(null);
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

    const initialHour = selectedValue?.split(':')[0] ?? '00';
    const initialMinute = selectedValue?.split(':')[1] ?? '00';
    const [draftHour, setDraftHour] = useState(initialHour);
    const [draftMinute, setDraftMinute] = useState(initialMinute);

    const hours = useMemo(() => buildTimeRange(24, hourStep), [hourStep]);
    const minutes = useMemo(() => buildTimeRange(60, minuteStep), [minuteStep]);

    useEffect(() => {
      if (!isOpen) return;

      let frameId2 = 0;
      const frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          scrollSelectedCellIntoView(hourColumnRef.current, draftHour);
          scrollSelectedCellIntoView(minuteColumnRef.current, draftMinute);
        });
      });

      return () => {
        cancelAnimationFrame(frameId1);
        cancelAnimationFrame(frameId2);
      };
    }, [draftHour, draftMinute, isOpen]);

    const trigger = (
      <Filter
        type="time"
        label={label}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        className={filterClassName}
        width={width}
        isActive={isActive || isOpen}
        value={selectedValue}
      />
    );

    return (
      <Popover
        ref={ref as React.Ref<HTMLDivElement>}
        trigger={trigger}
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            const nextHour = selectedValue?.split(':')[0] ?? '00';
            const nextMinute = selectedValue?.split(':')[1] ?? '00';
            setDraftHour(nextHour);
            setDraftMinute(nextMinute);
          }
          setIsOpen(nextOpen);
        }}
        className={className}
        contentClassName="lds-filter-time-picker__popover"
        closeOnClickOutside
        closeOnEsc
        {...props}
      >
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
                  const nextValue = `${hour}:${draftMinute}`;
                  setDraftHour(hour);
                  setSelectedValue(nextValue);
                  onChange?.(nextValue);
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
                  const nextValue = `${draftHour}:${minute}`;
                  setDraftMinute(minute);
                  setSelectedValue(nextValue);
                  onChange?.(nextValue);
                  setIsOpen(false);
                }}
              >
                {minute}
              </button>
            ))}
          </div>
        </div>
      </Popover>
    );
  }
);

FilterTimePicker.displayName = 'FilterTimePicker';
