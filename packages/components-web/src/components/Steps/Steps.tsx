import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export interface StepItem {
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: StepItem[];
  current?: number;
  defaultCurrent?: number;
  onChange?: (current: number) => void;
}

type StepStatus = 'finish' | 'process' | 'wait';

const clampIndex = (value: number, max: number) => {
  if (max < 0) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
};

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, items, current, defaultCurrent = 0, onChange, ...props }, ref) => {
    const maxIndex = items.length - 1;
    const [internalCurrent, setInternalCurrent] = React.useState(() =>
      clampIndex(defaultCurrent, maxIndex)
    );

    React.useEffect(() => {
      setInternalCurrent((prev) => clampIndex(prev, items.length - 1));
    }, [items.length]);

    const activeIndex =
      current === undefined ? internalCurrent : clampIndex(current, items.length - 1);

    const handleStepClick = (index: number, item: StepItem) => {
      if (item.disabled) {
        return;
      }

      if (current === undefined) {
        setInternalCurrent(index);
      }

      onChange?.(index);
    };

    const getStatus = (index: number): StepStatus => {
      if (index < activeIndex) {
        return 'finish';
      }

      if (index === activeIndex) {
        return 'process';
      }

      return 'wait';
    };

    return (
      <div ref={ref} className={clsx('lds-steps', className)} {...props}>
        {items.map((item, index) => {
          const status = getStatus(index);
          const isLast = index === items.length - 1;
          const isClickable = typeof onChange === 'function';
          const indicatorContent =
            status === 'finish' ? (
              <Icon name="ic-finish-line" className="lds-step__check" aria-hidden="true" />
            ) : (
              <span>{index + 1}</span>
            );

          const content = (
            <>
              <div className="lds-step__main">
                <span className="lds-step__indicator" aria-hidden="true">
                  {indicatorContent}
                </span>
                <span className="lds-step__title">{item.title}</span>
                {!isLast ? <span className="lds-step__connector" aria-hidden="true" /> : null}
              </div>
              {item.description ? (
                <div className="lds-step__description">{item.description}</div>
              ) : null}
            </>
          );

          if (isClickable) {
            return (
              <button
                key={`${item.title}-${index}`}
                type="button"
                className={clsx(
                  'lds-step',
                  `is-${status}`,
                  {
                    'is-last': isLast,
                    'is-clickable': isClickable,
                    'is-disabled': item.disabled,
                  }
                )}
                onClick={() => handleStepClick(index, item)}
                disabled={item.disabled}
              >
                {content}
              </button>
            );
          }

          return (
            <div
              key={`${item.title}-${index}`}
              className={clsx(
                'lds-step',
                `is-${status}`,
                {
                  'is-last': isLast,
                  'is-disabled': item.disabled,
                }
              )}
            >
              {content}
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
