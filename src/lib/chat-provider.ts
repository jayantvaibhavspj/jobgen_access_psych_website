export const CHAT_SYSTEM_INSTRUCTIONS = `You are Access Psych Assistant. Answer only from the approved Access Psych knowledge supplied for the current request. Do not provide clinical advice, diagnoses, treatment suggestions, prices, clinician availability, or capabilities not explicitly in the approved knowledge. If the answer is not present, say you are unsure and offer 1800 APSYCH (1800 277 924) or /online-booking-request. For any mention of self-harm, crisis, or danger, do not call a model; immediately direct the person to 000 if in danger and Lifeline 13 11 14 for 24/7 support.`;

export type ChatProviderConfig = {
  apiKey: string;
  endpoint: string;
};

export function getChatProviderConfig(): ChatProviderConfig | null {
  const apiKey = process.env.CHAT_API_KEY;
  const endpoint = process.env.JOBGEN_API_URL;
  if (!apiKey || !endpoint) return null;
  return { apiKey, endpoint };
}

export function createProviderRequest(
  config: ChatProviderConfig,
  question: string,
  approvedKnowledge: string,
) {
  return new Request(config.endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      system: CHAT_SYSTEM_INSTRUCTIONS,
      question,
      approvedKnowledge,
      stream: true,
    }),
  });
}
