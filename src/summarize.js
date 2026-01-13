// src/summarize.js
import { topicEmojis } from "./emojis.js";

export function summarizeByTopic(topic, articles) {
  if (!articles.length) return "";

  const emoji = topicEmojis[topic] || "🗞️";

  const titles = articles
    .map(a => `• ${a.title}`)
    .join("\n");

  return `${emoji} *${topic.toUpperCase()}*\n${titles}\n`;
}
