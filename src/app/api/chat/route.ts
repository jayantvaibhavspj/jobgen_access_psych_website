import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const requestWindows = new Map<string, { startedAt: number; count: number }>();

const urgentPattern =
  /\b(self[-\s]?harm|suicid(?:e|al)|kill myself|end my life|crisis|in danger|danger|unsafe|emergency)\b/i;

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? forwarded ?? "unknown";
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const key = getClientKey(request);
  const window = requestWindows.get(key);

  if (!window || now - window.startedAt >= WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
    if (requestWindows.size > 2_000) {
      for (const [client, entry] of requestWindows) {
        if (now - entry.startedAt >= WINDOW_MS) requestWindows.delete(client);
      }
    }
    return false;
  }

  window.count += 1;
  return window.count > MAX_REQUESTS_PER_WINDOW;
}

function getKnowledgeSection(knowledge: string, requestedHeading: string) {
  const lines = knowledge.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${requestedHeading}`);
  if (start < 0) return null;
  const content = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("## ")) break;
    content.push(lines[index]);
  }
  return content.join("\n").trim();
}

function getRelevantFaq(question: string, knowledge: string) {
  const section = getKnowledgeSection(knowledge, "Frequently Asked Questions");
  if (!section) return null;

  const faqRows = section.match(/^Q: .+\r?\nA: .+$/gm) ?? [];
  const stopWords = new Set([
    "about", "after", "does", "have", "help", "how", "is", "the", "what",
    "when", "where", "which", "with", "you", "your",
  ]);
  const questionWords = new Set(
    question.toLowerCase().match(/[a-z]{3,}/g)?.filter((word) => !stopWords.has(word)) ?? [],
  );
  let best: { score: number; answer: string } | null = null;

  for (const row of faqRows) {
    const [faqQuestion, faqAnswer] = row.split(/\r?\n/);
    const faqWords = faqQuestion.toLowerCase().match(/[a-z]{3,}/g) ?? [];
    const score = faqWords.reduce(
      (total, word) => total + (questionWords.has(word) && !stopWords.has(word) ? 1 : 0),
      0,
    );
    if (score > (best?.score ?? 0)) {
      best = { score, answer: faqAnswer.slice(3) };
    }
  }

  return best && best.score > 0 ? best.answer : null;
}

function getApprovedAnswer(question: string, knowledge: string) {
  if (urgentPattern.test(question)) {
    return "If you or someone else is in danger, call 000. For 24/7 support call Lifeline 13 11 14.";
  }

  const lower = question.toLowerCase();
  const topic =
    /\b(fee|fees|cost|costs|price|pricing|medicare|rebate|bulk bill)\b/.test(lower)
      ? "Fees and Medicare"
      : /\b(eap|employee|workplace|employer)\b/.test(lower)
        ? "Employee Assistance Program"
        : /\b(location|clinic|near me|where|address|face.to.face)\b/.test(lower)
          ? "Locations"
          : /\b(clinician|psychologist|therapist|counsellor|team)\b/.test(lower)
            ? "Clinicians"
            : /\b(book|booking|appointment|referral)\b/.test(lower)
              ? "Booking"
              : /\b(contact|phone|call|email|talk|person)\b/.test(lower)
                ? "Contact"
                : /\b(relationship|couples?|waitlist|waiting|trauma|care plan|doctor|anxiety|depression|FAQ|frequently asked)\b/.test(lower)
                  ? "Frequently Asked Questions"
                : null;

  if (topic === "Frequently Asked Questions") {
    return (
      getRelevantFaq(question, knowledge) ??
      "I’m not sure based on the information I can verify. Please visit /frequently-asked-questions or call 1800 APSYCH (1800 277 924)."
    );
  }

  if (!topic) {
    return "I’m not sure based on the information I can verify. Please call 1800 APSYCH (1800 277 924) or use /online-booking-request to speak with the Access Psych team.";
  }

  return (
    getKnowledgeSection(knowledge, topic) ??
    "I’m not sure based on the information I can verify. Please call 1800 APSYCH (1800 277 924) or use /online-booking-request to speak with the Access Psych team."
  );
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const chunks: string[] = [];
  for (let offset = 0; offset < text.length; offset += 36) {
    chunks.push(text.slice(offset, offset + 36));
  }
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 14));
      }
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return Response.json(
      { error: "Too many messages. Please wait a moment or call 1800 APSYCH (1800 277 924)." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "A valid JSON request is required." }, { status: 400 });
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("message" in payload) ||
    typeof payload.message !== "string"
  ) {
    return Response.json({ error: "Message must be a string." }, { status: 400 });
  }

  const question = payload.message.trim();
  if (!question || question.length > 800) {
    return Response.json(
      { error: "Message must be between 1 and 800 characters." },
      { status: 400 },
    );
  }

  let approvedKnowledge: string;
  try {
    approvedKnowledge = await readFile(
      join(process.cwd(), "data", "knowledge.md"),
      "utf8",
    );
  } catch {
    return Response.json(
      { error: "Approved assistant information is temporarily unavailable." },
      { status: 503 },
    );
  }

  return new Response(streamText(getApprovedAnswer(question, approvedKnowledge)), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
