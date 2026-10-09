/** Shared by the API route and the widget, so client and server agree on limits. */
export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

/** Messages sent per request — the conversation's working memory. */
export const MAX_HISTORY = 20;
export const MAX_MESSAGE_LENGTH = 1000;

/** Marker the model emits for contact questions; the widget swaps it for the contact card. */
export const CONTACT_TOKEN = "[[CONTACT]]";
