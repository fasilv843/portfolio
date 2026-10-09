import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/chat/context";
import {
  MAX_HISTORY,
  MAX_MESSAGE_LENGTH,
  type ChatMessage,
} from "@/lib/chat/types";

// fs (about.md) and the GenAI SDK both want Node, not the edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// "-latest" aliases so the free models keep working as Google retires versions.
// GEMINI_MODEL picks the first choice; the rest are fallbacks for when it is
// overloaded (503), out of free quota (429) or misnamed (404). Lite models sit
// on separate capacity and quota, so they usually answer when Flash will not.
const MODELS = [
  ...new Set([
    process.env.GEMINI_MODEL || "gemini-flash-latest",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
  ]),
];

/** Errors where another attempt or another model can still succeed. */
const RETRYABLE = new Set([404, 429, 500, 503, 504]);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

/**
 * Best-effort per-IP limit. It lives in one serverless instance's memory, so it
 * is not global — but it stops one tab hammering the endpoint, which is the
 * realistic way the free Gemini quota gets drained. Google's own quota is the
 * hard ceiling behind it.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return false;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "model") ||
      typeof m.text !== "string" ||
      m.text.trim() === ""
    ) {
      return null;
    }
    // Visitor input is capped hard; earlier model replies get more room so the
    // follow-up context ("tell me more about the second one") survives.
    const limit =
      m.role === "user" ? MAX_MESSAGE_LENGTH : MAX_MESSAGE_LENGTH * 6;
    messages.push({ role: m.role, text: m.text.slice(0, limit) });
  }
  // Gemini requires the conversation to end on the visitor's turn.
  if (messages.at(-1)?.role !== "user") return null;
  // Trimming the window can leave a model turn first; Gemini wants user first.
  while (messages[0]?.role === "model") messages.shift();
  return messages;
}

function text(body: string, status: number) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return text("The assistant is not configured yet.", 503);
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return text(
      "You're sending messages a little fast — please wait a minute and try again.",
      429,
    );
  }

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    // fall through to the 400 below
  }
  if (!messages) return text("Invalid request.", 400);

  const ai = new GoogleGenAI({ apiKey });

  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));
  const config = {
    systemInstruction: buildSystemPrompt(),
    temperature: 0.4,
    maxOutputTokens: 1024,
  };

  // Overload errors surface before the first chunk, so falling back here never
  // mixes two models' output in one reply. The first model gets one quick retry
  // because 503 spikes are often momentary.
  const attempts = [MODELS[0], ...MODELS];
  let stream:
    Awaited<ReturnType<typeof ai.models.generateContentStream>> | undefined;
  let lastStatus: number | undefined;
  for (const [i, model] of attempts.entries()) {
    try {
      stream = await ai.models.generateContentStream({
        model,
        contents,
        config,
      });
      break;
    } catch (error) {
      lastStatus = (error as { status?: number }).status;
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[chat] ${model} failed (${lastStatus ?? "no status"}):`,
        message.slice(0, 300),
      );
      if (!lastStatus || !RETRYABLE.has(lastStatus)) break;
      if (i === 0) await sleep(800);
    }
  }

  if (!stream) {
    const busy = lastStatus === 429 || lastStatus === 503;
    return text(
      busy
        ? "The assistant is getting a lot of questions right now. Please try again in a minute."
        : "The assistant is unavailable right now. Please try again shortly.",
      busy ? 503 : 502,
    );
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (error) {
        console.error("[chat] stream interrupted", error);
        controller.enqueue(
          encoder.encode(
            "\n\n_(The response was cut off — please try again.)_",
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
