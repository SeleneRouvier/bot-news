// src/buildMessage.js
import { getNews } from "./news.js";
import { summarizeByTopic } from "./summarize.js";

export async function buildDailyMessage(userPrefs) {
  let message = `☀️ *Tu resumen diario*\n\n`;

  for (const region of userPrefs.priority) {
    message += region === "ar"
      ? "🇦🇷 *Argentina*\n"
      : "🌍 *Mundo*\n";

    for (const topic of userPrefs.topics) {
      const articles = await getNews({
        country: region === "ar" ? "ar" : "world",
        topic
      });

      const block = summarizeByTopic(topic, articles);
      if (block) message += block + "\n";
    }
  }

  return message;
}
