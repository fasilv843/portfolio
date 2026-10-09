"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { ChatIcon, CloseIcon, SendIcon } from "@/components/ui/icons";
import {
  CONTACT_TOKEN,
  MAX_HISTORY,
  MAX_MESSAGE_LENGTH,
  type ChatMessage as Message,
} from "@/lib/chat/types";

const STORAGE_KEY = "portfolio-chat";

const SUGGESTIONS = [
  "What projects has Fasil built?",
  "Is he a fit for a MERN stack role?",
  "What has he done with AWS and DevOps?",
  "How can I contact him?",
];

const GREETING =
  "Hi! I can answer questions about Fasil — his experience, projects, skills, or whether he fits a role you're hiring for.";

/**
 * Memory lives here, not on the server: Gemini is stateless, so every request
 * carries the recent conversation. sessionStorage keeps it across reloads and
 * page changes in this tab, and drops it when the tab closes.
 */
function loadHistory(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Message[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  try {
    if (messages.length === 0) sessionStorage.removeItem(STORAGE_KEY);
    else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Private mode or blocked storage: the chat still works, it just won't
    // survive a reload.
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  function openPanel() {
    // Read storage on first open rather than on mount: no hydration mismatch,
    // and visitors who never open the chat never touch storage.
    if (!loaded) {
      setMessages(loadHistory());
      setLoaded(true);
    }
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function newChat() {
    abortRef.current?.abort();
    setMessages([]);
    setPending(false);
    saveHistory([]);
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (loaded && !pending) saveHistory(messages);
  }, [messages, loaded, pending]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(raw: string) {
    const text = raw.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || pending) return;

    const history: Message[] = [...messages, { role: "user", text }];
    setMessages([...history, { role: "model", text: "" }]);
    setInput("");
    setPending(true);

    const setReply = (reply: string) =>
      setMessages((current) => [
        ...current.slice(0, -1),
        { role: "model", text: reply },
      ]);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-MAX_HISTORY) }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const message = (await res.text().catch(() => "")).trim();
        setReply(
          `${message || "Something went wrong. Please try again."}\n\n${CONTACT_TOKEN}`,
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
      if (!reply.trim()) {
        setReply("Sorry, I couldn't come up with an answer. Try rephrasing?");
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setReply(
        reply ||
          "I couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setPending(false);
      }
    }
  }

  const last = messages.at(-1);
  const thinking = pending && last?.role === "model" && last.text === "";

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={openPanel}
        aria-label="Ask AI about Fasil"
        aria-expanded={open}
        aria-controls="chat-panel"
        className={`bg-primary text-primary-contrast hover:bg-primary-strong focus-visible:outline-ring ground-halo-none fixed right-4 bottom-4 z-60 inline-flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 sm:right-6 sm:bottom-6 ${open ? "pointer-events-none scale-90 opacity-0" : "opacity-100"}`}
      >
        <ChatIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Ask AI</span>
      </button>

      {open && (
        <section
          id="chat-panel"
          role="dialog"
          aria-label="Chat with Fasil's AI assistant"
          className="border-border bg-surface text-foreground fixed inset-x-3 bottom-3 z-60 flex h-[min(640px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-xl border shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
        >
          <header className="border-border flex items-center justify-between gap-2 border-b px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Ask about Fasil</h2>
              <p className="text-foreground-faint text-xs">
                AI assistant · answers may be imperfect
              </p>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={newChat}
                  className="text-foreground-muted hover:bg-surface-raised hover:text-foreground focus-visible:outline-ring rounded-md px-2 py-1 text-xs transition duration-200 focus-visible:outline-2"
                >
                  New chat
                </button>
              )}
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close chat"
                className="text-foreground-muted hover:bg-surface-raised hover:text-foreground focus-visible:outline-ring rounded-md p-1.5 transition duration-200 focus-visible:outline-2"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 text-sm leading-relaxed"
            aria-live="polite"
            aria-busy={pending}
          >
            <div className="bg-surface-raised text-foreground-muted mr-8 rounded-lg px-3 py-2">
              {GREETING}
            </div>

            {messages.length === 0 && (
              <ul
                className="flex flex-wrap gap-2 pt-1"
                aria-label="Suggested questions"
              >
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => send(s)}
                      className="border-border-interactive text-foreground hover:bg-surface-raised focus-visible:outline-ring rounded-full border px-3 py-1.5 text-left text-xs transition duration-200 focus-visible:outline-2"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="bg-primary text-primary-contrast ml-8 rounded-lg px-3 py-2 break-words whitespace-pre-wrap"
                >
                  {m.text}
                </div>
              ) : m.text ? (
                <div
                  key={i}
                  className="bg-surface-raised text-foreground-muted mr-8 rounded-lg px-3 py-2 break-words"
                >
                  {/* Hide a half-streamed contact token until it is complete. */}
                  <ChatMessage
                    text={
                      pending && i === messages.length - 1
                        ? m.text.replace(/\[\[[A-Z]*\]?$/, "")
                        : m.text
                    }
                  />
                </div>
              ) : null,
            )}

            {thinking && (
              <div
                className="bg-surface-raised mr-8 inline-flex gap-1 rounded-lg px-3 py-3"
                aria-label="Assistant is typing"
              >
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="bg-foreground-faint h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-border flex items-end gap-2 border-t p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Ask about projects, skills, fit…"
              className="border-border bg-background placeholder:text-foreground-faint focus-visible:outline-ring max-h-32 min-h-10 flex-1 resize-none rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send"
              className="bg-primary text-primary-contrast hover:bg-primary-strong focus-visible:outline-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
