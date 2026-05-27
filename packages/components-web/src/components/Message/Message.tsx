import React from 'react';
import { clsx } from 'clsx';
import { createRoot, Root } from 'react-dom/client';
import { Icon } from '../Icon/Icon';

export type MessageVariant = 'info' | 'success' | 'warning' | 'error';

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
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

export interface MessageOptions
  extends Omit<MessageProps, 'visible' | 'onClose' | 'closeLabel' | 'role'> {
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

interface MessageRecord extends MessageOptions {
  key: React.Key;
  visible: boolean;
}

const MESSAGE_ICON_MAP: Record<MessageVariant, string> = {
  info: 'ic-info-round-fill',
  success: 'ic-finish-round-fill',
  warning: 'ic-warning-round-fill',
  error: 'ic-error-round-fill',
};

const MESSAGE_HOST_ID = 'life-ds-message-host';
const MESSAGE_EXIT_DURATION = 200;
const MESSAGE_DEFAULT_DURATION = 3000;

let messageSeed = 0;
let hostElement: HTMLDivElement | null = null;
let hostRoot: Root | null = null;
let messages: MessageRecord[] = [];

const closeTimers = new Map<React.Key, number>();
const removeTimers = new Map<React.Key, number>();

const canUseDOM = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const clearMessageTimers = (key: React.Key) => {
  const closeTimer = closeTimers.get(key);
  if (closeTimer !== undefined) {
    window.clearTimeout(closeTimer);
    closeTimers.delete(key);
  }

  const removeTimer = removeTimers.get(key);
  if (removeTimer !== undefined) {
    window.clearTimeout(removeTimer);
    removeTimers.delete(key);
  }
};

const normalizeMessageInput = (input: MessageOpenInput): MessageOptions => {
  if (React.isValidElement(input)) {
    return { content: input };
  }

  if (typeof input === 'object' && input !== null && 'content' in input) {
    return input as MessageOptions;
  }

  return { content: input };
};

const ensureHostRoot = () => {
  if (!canUseDOM()) {
    return null;
  }

  if (!hostElement) {
    hostElement = document.getElementById(MESSAGE_HOST_ID) as HTMLDivElement | null;

    if (!hostElement) {
      hostElement = document.createElement('div');
      hostElement.id = MESSAGE_HOST_ID;
      document.body.appendChild(hostElement);
    }
  }

  if (!hostRoot && hostElement) {
    hostRoot = createRoot(hostElement);
  }

  return hostRoot;
};

const removeMessage = (key: React.Key, invokeCloseCallback = true) => {
  const nextMessage = messages.find((message) => message.key === key);
  clearMessageTimers(key);
  messages = messages.filter((message) => message.key !== key);
  renderMessageViewport();
  if (invokeCloseCallback) {
    nextMessage?.onClose?.();
  }
};

const closeMessage = (key: React.Key) => {
  const target = messages.find((message) => message.key === key);

  if (!target || !target.visible) {
    return;
  }

  clearMessageTimers(key);
  messages = messages.map((message) =>
    message.key === key ? { ...message, visible: false } : message
  );
  renderMessageViewport();

  removeTimers.set(
    key,
    window.setTimeout(() => {
      removeMessage(key);
    }, MESSAGE_EXIT_DURATION)
  );
};

const scheduleAutoClose = (key: React.Key, duration?: number) => {
  const resolvedDuration = duration ?? MESSAGE_DEFAULT_DURATION;

  if (resolvedDuration <= 0) {
    return;
  }

  closeTimers.set(
    key,
    window.setTimeout(() => {
      closeMessage(key);
    }, resolvedDuration)
  );
};

const showMessage = (key: React.Key) => {
  messages = messages.map((message) =>
    message.key === key ? { ...message, visible: true } : message
  );
  renderMessageViewport();
};

const renderMessageViewport = () => {
  const root = ensureHostRoot();

  if (!root) {
    return;
  }

  root.render(<MessageViewport messages={messages} onClose={closeMessage} />);
};

const enqueueMessage = (input: MessageOpenInput, forcedVariant?: MessageVariant) => {
  if (!canUseDOM()) {
    return () => undefined;
  }

  const options = normalizeMessageInput(input);
  const key = options.key ?? `message-${++messageSeed}`;
  const nextMessage: MessageRecord = {
    ...options,
    key,
    variant: forcedVariant ?? options.variant ?? 'info',
    duration: options.duration ?? MESSAGE_DEFAULT_DURATION,
    closeLabel: options.closeLabel ?? '关闭提示',
    visible: false,
  };

  clearMessageTimers(key);

  const existingIndex = messages.findIndex((message) => message.key === key);

  if (existingIndex >= 0) {
    messages = messages.map((message) => (message.key === key ? nextMessage : message));
  } else {
    messages = [...messages, nextMessage];
  }

  renderMessageViewport();

  const raf =
    window.requestAnimationFrame ??
    ((callback: FrameRequestCallback) => window.setTimeout(callback, 16));

  raf(() => {
    showMessage(key);
    scheduleAutoClose(key, nextMessage.duration);
  });

  return () => closeMessage(key);
};

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      className,
      content,
      variant = 'info',
      icon,
      closable = false,
      closeLabel = '关闭提示',
      visible = true,
      onClose,
      role = 'status',
      ...props
    },
    ref
  ) => {
    const resolvedIcon = icon ?? <Icon name={MESSAGE_ICON_MAP[variant]} aria-hidden="true" />;

    return (
      <div
        ref={ref}
        className={clsx('lds-message', `lds-message--${variant}`, visible && 'is-visible', className)}
        role={role}
        aria-live="polite"
        {...props}
      >
        <div className="lds-message__icon" aria-hidden="true">
          {resolvedIcon}
        </div>
        <div className="lds-message__content">{content}</div>
        {closable ? (
          <button
            type="button"
            className="lds-message__close"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <Icon name="ic-error-line" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    );
  }
);

Message.displayName = 'Message';

interface MessageViewportProps {
  messages: MessageRecord[];
  onClose: (key: React.Key) => void;
}

const MessageViewport = ({ messages, onClose }: MessageViewportProps) => {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="lds-message-viewport" role="presentation">
      {messages.map((message) => (
        <div
          key={message.key}
          className={clsx('lds-message-viewport__item', message.visible && 'is-visible')}
        >
          <Message
            className={message.className}
            content={message.content}
            variant={message.variant}
            icon={message.icon}
            style={message.style}
            closable={message.closable}
            closeLabel={message.closeLabel}
            visible={message.visible}
            onClose={() => onClose(message.key)}
          />
        </div>
      ))}
    </div>
  );
};

export const message = {
  open: (input: MessageOpenInput) => enqueueMessage(input),
  info: (input: MessageOpenInput) => enqueueMessage(input, 'info'),
  success: (input: MessageOpenInput) => enqueueMessage(input, 'success'),
  warning: (input: MessageOpenInput) => enqueueMessage(input, 'warning'),
  error: (input: MessageOpenInput) => enqueueMessage(input, 'error'),
  destroy: (key?: React.Key) => {
    if (!canUseDOM()) {
      return;
    }

    if (key === undefined) {
      const currentMessages = [...messages];
      currentMessages.forEach((messageItem) => clearMessageTimers(messageItem.key));
      messages = [];
      renderMessageViewport();
      currentMessages.forEach((messageItem) => messageItem.onClose?.());
      return;
    }

    removeMessage(key);
  },
};
