"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronDown,
  Minus,
  Phone,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { LOGO_URL, SITE_URL } from "@/lib/site-data";

type ChatPosition = {
  right: number;
  bottom: number;
};

type ChatDrag = ChatPosition & {
  pointerId: number;
  startX: number;
  startY: number;
  moved: boolean;
};

type ChatWidgetStyle = CSSProperties & {
  "--chat-panel-max-height"?: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  emergency?: boolean;
  typing?: boolean;
};

const quickReplies = [
  "Find a clinician",
  "Book an appointment",
  "Fees & Medicare",
  "Employee Assistance Program",
  "Locations",
  "Talk to the team",
];

const initialMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "I can help with verified information about Access Psych services and bookings. I can’t provide clinical advice.",
};

const crisisPattern =
  /\b(self[-\s]?harm|suicid(?:e|al)|kill myself|end my life|crisis|in danger|danger|unsafe|emergency)\b/i;

function isCrisisMessage(message: string) {
  return crisisPattern.test(message);
}

function renderLinkedText(text: string) {
  const urlPattern = /(https?:\/\/[^\s]+|\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)/gi;
  const pieces = text.split(urlPattern);
  return pieces.map((piece, index) => {
    if (/^https?:\/\//i.test(piece)) {
      return (
        <a href={piece} key={`${piece}-${index}`} target="_blank" rel="noreferrer">
          {piece}
        </a>
      );
    }
    if (/^\/[a-z0-9-]+/i.test(piece)) {
      return (
        <Link href={piece} key={`${piece}-${index}`}>
          {piece}
        </Link>
      );
    }
    return <span key={index}>{piece}</span>;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<ChatDrag | null>(null);
  const suppressClickRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState<ChatPosition | null>(null);
  const [panelPlacement, setPanelPlacement] = useState<{
    side: "above" | "below";
    maxHeight: number;
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const handleKeys = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        launcherRef.current?.focus();
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const elements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeys);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) launcherRef.current?.focus();
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, handoffOpen]);

  async function sendMessage(rawMessage: string) {
    const question = rawMessage.trim();
    if (!question || busy || question.length > 800) return;
    setInput("");
    setTooltip(false);
    setHandoffOpen(false);
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: question,
    };

    if (isCrisisMessage(question)) {
      setMessages((current) => [
        ...current,
        userMessage,
        {
          id: `${Date.now()}-emergency`,
          role: "assistant",
          content:
            "If you or someone else is in danger, call 000. For 24/7 support call Lifeline 13 11 14.",
          emergency: true,
        },
      ]);
      return;
    }

    const responseId = `${Date.now()}-assistant`;
    setMessages((current) => [
      ...current,
      userMessage,
      { id: responseId, role: "assistant", content: "", typing: true },
    ]);
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      if (!response.ok || !response.body) {
        const errorBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(errorBody?.error ?? "Chat service is unavailable.");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === responseId
              ? { ...message, content, typing: false }
              : message,
          ),
        );
      }
      content += decoder.decode();
      setMessages((current) =>
        current.map((message) =>
          message.id === responseId
            ? { ...message, content, typing: false }
            : message,
        ),
      );
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === responseId
            ? {
                ...message,
                content:
                  "I can’t confirm that from the information available. Please call 1800 APSYCH (1800 277 924) or use /online-booking-request to speak with the Access Psych team.",
                typing: false,
              }
            : message,
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function toggleOpen() {
    setTooltip(false);
    setOpen((value) => !value);
  }

  function getCurrentPosition(): ChatPosition {
    const bounds = widgetRef.current?.getBoundingClientRect();
    return {
      right: bounds ? window.innerWidth - bounds.right : 24,
      bottom: bounds ? window.innerHeight - bounds.bottom : 24,
    };
  }

  function moveWidget(nextPosition: ChatPosition) {
    const bounds = launcherRef.current?.getBoundingClientRect();
    const width = bounds?.width ?? 62;
    const height = bounds?.height ?? 62;
    const right = Math.min(
      Math.max(16, nextPosition.right),
      Math.max(16, window.innerWidth - width - 16),
    );
    const bottom = Math.min(
      Math.max(16, nextPosition.bottom),
      Math.max(16, window.innerHeight - height - 16),
    );
    const aboveSpace = window.innerHeight - bottom - height - 26;
    const belowSpace = bottom - height - 26;
    const side = aboveSpace >= belowSpace ? "above" : "below";
    const availableSpace = side === "above" ? aboveSpace : belowSpace;

    setPosition({ right, bottom });
    setPanelPlacement({
      side,
      maxHeight: Math.max(180, Math.min(560, availableSpace)),
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    const currentPosition = getCurrentPosition();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      ...currentPosition,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;

    drag.moved = true;
    moveWidget({
      right: drag.right - deltaX,
      bottom: drag.bottom - deltaY,
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    suppressClickRef.current = drag.moved;
    dragRef.current = null;
  }

  function handleLauncherKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!event.shiftKey) return;
    const nextPosition = getCurrentPosition();
    const step = 20;

    switch (event.key) {
      case "ArrowLeft":
        nextPosition.right += step;
        break;
      case "ArrowRight":
        nextPosition.right -= step;
        break;
      case "ArrowUp":
        nextPosition.bottom -= step;
        break;
      case "ArrowDown":
        nextPosition.bottom += step;
        break;
      default:
        return;
    }

    event.preventDefault();
    moveWidget(nextPosition);
  }

  function handleLauncherClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    toggleOpen();
  }

  const widgetStyle: ChatWidgetStyle = {
    ...(position ?? {}),
    "--chat-panel-max-height": panelPlacement
      ? `${panelPlacement.maxHeight}px`
      : undefined,
  };

  return (
    <div ref={widgetRef} className="chat-widget" style={widgetStyle}>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="chat-ask-bubble"
            onClick={toggleOpen}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            role="button"
            tabIndex={0}
            aria-label="Ask me"
          >
            <span className="chat-ask-label">Ask me</span>
            <span className="chat-ask-wave" aria-hidden="true">👋</span>
            <div className="chat-ask-tail" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            className={`chat-panel${panelPlacement?.side === "below" ? " chat-panel-below" : ""}`}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <header className="chat-header">
              <div className="chat-header-avatar-wrap">
                <Image
                  src="/images/clinician-listen.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="chat-header-avatar"
                  unoptimized
                />
                <span className="chat-header-online-dot" aria-hidden="true" />
              </div>
              <span className="chat-heading">
                <strong id="chat-title">Access Psych Assistant</strong>
                <small><i aria-hidden="true" /> Online now</small>
              </span>
              <button type="button" aria-label="Minimise chat" onClick={() => setOpen(false)}>
                <Minus size={19} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <div className="chat-messages" ref={listRef} aria-live="polite" aria-relevant="additions text">
              {messages.map((message) => (
                <div className={`chat-message chat-message-${message.role}`} key={message.id}>
                  {message.emergency ? (
                    <div className="chat-emergency-card" role="alert">
                      <ShieldAlert size={21} aria-hidden="true" />
                      <p>{message.content}</p>
                      <a href="tel:000"><Phone size={15} aria-hidden="true" /> Call 000</a>
                      <a href="tel:131114"><Phone size={15} aria-hidden="true" /> Lifeline 13 11 14</a>
                    </div>
                  ) : message.typing ? (
                    <span className="chat-typing" aria-label="Assistant is typing">
                      <i /><i /><i />
                    </span>
                  ) : (
                    <p>{renderLinkedText(message.content)}</p>
                  )}
                </div>
              ))}

              {messages.length === 1 && (
                <div className="chat-quick-replies" aria-label="Suggested questions">
                  {quickReplies.map((reply) => (
                    <button
                      type="button"
                      key={reply}
                      disabled={busy}
                      onClick={() => {
                        if (/talk to the team/i.test(reply)) {
                          setHandoffOpen(true);
                          return;
                        }
                        void sendMessage(reply);
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="chat-handoff-trigger"
                onClick={() => setHandoffOpen((value) => !value)}
              >
                <Phone size={15} aria-hidden="true" /> Speak to a person
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {handoffOpen && (
                  <motion.div
                    className="chat-handoff"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  >
                    <a href="tel:1800277924">1800 APSYCH (1800 277 924)</a>
                    <Link href="/online-booking-request">Booking request form</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form className="chat-composer" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="access-psych-chat-message">Ask a question</label>
              <input
                id="access-psych-chat-message"
                ref={inputRef}
                value={input}
                maxLength={800}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question…"
                disabled={busy}
              />
              <button type="submit" aria-label="Send message" disabled={busy || !input.trim()}>
                <Send size={18} aria-hidden="true" />
              </button>
              <small>AI assistant. Not a substitute for professional or emergency help.</small>
              <Link
                href={`${SITE_URL}/wp-content/uploads/2026/09/Privacy-Policy-Sept-2026.pdf`}
                target="_blank"
                rel="noreferrer"
              >
                Privacy
              </Link>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        className="chat-launcher"
        type="button"
        aria-label={open ? "Close Access Psych Assistant" : "Open Access Psych Assistant"}
        aria-describedby="chat-move-instructions"
        aria-expanded={open}
        onClick={handleLauncherClick}
        onKeyDown={handleLauncherKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
          suppressClickRef.current = false;
        }}
      >
        {open ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <div className="chat-launcher-avatar-wrap">
            <Image
              className="chat-launcher-avatar"
              src="/images/clinician-listen.jpg"
              alt="Access Psych Assistant"
              width={64}
              height={64}
              unoptimized
              priority
            />
            <span className="chat-online-badge" aria-hidden="true" />
          </div>
        )}
      </button>
      <span className="sr-only" id="chat-move-instructions">
        Drag to move the assistant, or hold Shift and use the arrow keys while focused.
      </span>
    </div>
  );
}
