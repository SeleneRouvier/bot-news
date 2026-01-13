import fetch from "node-fetch";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TOKEN || !CHAT_ID) {
  console.error("❌ Faltan variables de entorno");
  process.exit(1);
}

const text = "📰 Daily News Bot funcionando correctamente 🚀";

const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text,
  }),
});

console.log("✅ Mensaje enviado a Telegram");
