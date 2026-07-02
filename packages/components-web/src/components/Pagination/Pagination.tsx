import React, { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Popover } from '../Popover/Popover';

type PaginationItem = number | 'ellipsis';

function clampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  const x = Math.trunc(n);
  return Math.min(max, Math.max(min, x));
}

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

/**
 * Build page items with ellipsis collapsing.
 * Example: 1 2 3 ... 99 100
 */
function getPageItems(current: number, totalPages: number, siblingCount: number): PaginationItem[] {
  const totalNumbers = siblingCount * 2 + 5; // first + last + current + siblings + 2 ellipsis

  if (totalPages <= totalNumbers) return range(1, totalPages);

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!showLeftEllipsis && showRightEllipsis) {
    // 1 2 3 4 5 ... 10
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, 'ellipsis', lastPageIndex];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // 1 ... 6 7 8 9 10
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, 'ellipsis', ...rightRange];
  }

  // 1 ... 4 5 6 ... 10
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex];
}

export type PaginationSize = 'default-size' | 'small';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
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

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      size = 'default-size',
      total,
      current,
      defaultCurrent = 1,
      pageSize,
      defaultPageSize,
      pageSizeOptions = [10, 20, 50],
      showSizeChanger = true,
      showQuickJumper = true,
      disabled = false,
      siblingCount = 1,
      onChange,
      onPageSizeChange,
      showTotal,
      ...props
    },
    ref
  ) => {
    const isPageControlled = current !== undefined;
    const isPageSizeControlled = pageSize !== undefined;

    const [innerCurrent, setInnerCurrent] = useState<number>(() => defaultCurrent);
    const [innerPageSize, setInnerPageSize] = useState<number>(() => {
      return defaultPageSize ?? pageSizeOptions[0] ?? 10;
    });
    const [jumpValue, setJumpValue] = useState<string>('');
    const [sizeChangerOpen, setSizeChangerOpen] = useState(false);

    const effectivePageSize = isPageSizeControlled ? (pageSize as number) : innerPageSize;
    const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, effectivePageSize)));
    const effectiveCurrent = clampInt(isPageControlled ? (current as number) : innerCurrent, 1, totalPages);

    // Keep uncontrolled current within range when total/pageSize changes.
    useEffect(() => {
      if (!isPageControlled && innerCurrent !== effectiveCurrent) {
        setInnerCurrent(effectiveCurrent);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectiveCurrent, isPageControlled, totalPages]);

    useEffect(() => {
      if (disabled && sizeChangerOpen) {
        setSizeChangerOpen(false);
      }
    }, [disabled, sizeChangerOpen]);

    const items = useMemo(() => {
      return getPageItems(effectiveCurrent, totalPages, siblingCount);
    }, [effectiveCurrent, totalPages, siblingCount]);

    const pageRange: [number, number] = useMemo(() => {
      if (total <= 0) return [0, 0];
      const start = (effectiveCurrent - 1) * effectivePageSize + 1;
      const end = Math.min(total, effectiveCurrent * effectivePageSize);
      return [start, end];
    }, [effectiveCurrent, effectivePageSize, total]);

    const emitChange = (nextPage: number, nextPageSize: number) => {
      onChange?.(nextPage, nextPageSize);
    };

    const setPage = (nextPage: number) => {
      if (disabled) return;
      const p = clampInt(nextPage, 1, totalPages);
      if (!isPageControlled) setInnerCurrent(p);
      emitChange(p, effectivePageSize);
    };

    const setSize = (nextSize: number) => {
      if (disabled) return;
      const nextPageSize = Math.max(1, Math.trunc(nextSize));
      if (!isPageSizeControlled) setInnerPageSize(nextPageSize);
      onPageSizeChange?.(nextPageSize);
      // As spec: changing page size resets to page 1.
      if (!isPageControlled) setInnerCurrent(1);
      emitChange(1, nextPageSize);
    };

    const handleQuickJumpCommit = () => {
      if (disabled) return;
      const trimmed = jumpValue.trim();
      if (!trimmed) return;
      const parsed = Number(trimmed);
      if (!Number.isFinite(parsed)) return;
      setPage(parsed);
      setJumpValue('');
    };

    const canPrev = effectiveCurrent > 1;
    const canNext = effectiveCurrent < totalPages;

    return (
      <nav
        ref={ref}
        className={clsx('lds-pagination', `lds-pagination--${size}`, className)}
        aria-label="Pagination"
        {...props}
      >
        {showTotal ? <span className="lds-pagination__total">{showTotal(total, pageRange)}</span> : null}

        <div className="lds-pagination__pages">
          <button
            type="button"
            className="lds-pagination__arrow lds-pagination__arrow--prev"
            onClick={() => setPage(effectiveCurrent - 1)}
            disabled={disabled || !canPrev}
            aria-label="Previous Page"
          >
            <Icon className="lds-pagination__icon" name="ic-arrow-left-line" aria-hidden="true" />
          </button>

          {items.map((it, idx) => {
            if (it === 'ellipsis') {
              return (
                <span key={`ellipsis-${idx}`} className="lds-pagination__ellipsis" aria-hidden="true">
                  ...
                </span>
              );
            }

            const page = it;
            const isActive = page === effectiveCurrent;
            return (
              <button
                key={page}
                type="button"
                className={clsx('lds-pagination__item', isActive && 'is-active')}
                onClick={() => setPage(page)}
                disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            className="lds-pagination__arrow lds-pagination__arrow--next"
            onClick={() => setPage(effectiveCurrent + 1)}
            disabled={disabled || !canNext}
            aria-label="Next Page"
          >
            <Icon className="lds-pagination__icon" name="ic-arrow-right-line" aria-hidden="true" />
          </button>
        </div>

        {showSizeChanger ? (
          <Popover
            open={sizeChangerOpen}
            onOpenChange={(nextOpen) => {
              if (disabled) return;
              setSizeChangerOpen(nextOpen);
            }}
            matchTriggerWidth
            closeOnClickOutside
            closeOnEsc
            contentRole="listbox"
            contentClassName={clsx(
              'lds-pagination__size-popover',
              `lds-pagination__size-popover--${size}`
            )}
            trigger={(
              <button
                type="button"
                className={clsx('lds-pagination__size-changer', sizeChangerOpen && 'is-open')}
                disabled={disabled}
                aria-label="Page Size"
              >
                <span className="lds-pagination__size-label">{effectivePageSize}条/页</span>
                <Icon
                  className="lds-pagination__size-icon"
                  name={sizeChangerOpen ? 'ic-arrow-up-line' : 'ic-arrow-down-line'}
                  aria-hidden="true"
                />
              </button>
            )}
          >
            <div className="lds-pagination__size-options">
              {pageSizeOptions.map((n) => {
                const selected = n === effectivePageSize;
                return (
                  <button
                    key={n}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={clsx('lds-pagination__size-option', selected && 'is-selected')}
                    onClick={() => {
                      setSize(n);
                      setSizeChangerOpen(false);
                    }}
                  >
                    <span className="lds-pagination__size-option-label">{n}条/页</span>
                    {selected ? (
                      <span className="lds-pagination__size-option-check" aria-hidden="true">
                        <Icon name="ic-finish-line" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Popover>
        ) : null}

        {showQuickJumper ? (
          <div className="lds-pagination__quick-jumper">
            <span className="lds-pagination__quick-text">跳至</span>
            <span className="lds-pagination__quick-input">
              <Input
                size="small"
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleQuickJumpCommit();
                }}
                onBlur={handleQuickJumpCommit}
                disabled={disabled}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder=""
                aria-label="Jump To Page"
              />
            </span>
            <span className="lds-pagination__quick-text">页</span>
          </div>
        ) : null}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
