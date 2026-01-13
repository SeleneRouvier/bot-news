import fetch from 'node-fetch';
import { loadUsers, saveUsers, ensureUser } from './userStore.js';
import { sendMessage } from './send.js';

export async function handleTelegramUpdates() {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`
  );

  const data = await res.json();
  if (!data.result.length) return;

  const users = loadUsers();

  for (const update of data.result) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    ensureUser(users, chatId);

    if (text === '/start') {
      sendMessage(chatId, `
🤖 *Daily News Bot*

Comandos disponibles:

/topics technology,business
/hour 9
/priority ar,world
`);
    }

    if (text.startsWith('/topics')) {
      const topics = text.replace('/topics', '').trim().split(',');
      users[chatId].topics = topics;
      sendMessage(chatId, `✅ Temas guardados: ${topics.join(', ')}`);
    }

    if (text.startsWith('/hour')) {
      const hour = Number(text.replace('/hour', '').trim());
      if (hour < 0 || hour > 23) {
        sendMessage(chatId, '❌ Hora inválida (0–23)');
      } else {
        users[chatId].hour = hour;
        sendMessage(chatId, `⏰ Hora configurada: ${hour}:00`);
      }
    }

    if (text.startsWith('/priority')) {
      const priority = text.replace('/priority', '').trim().split(',');
      users[chatId].priority = priority;
      sendMessage(chatId, `🌍 Prioridad: ${priority.join(' → ')}`);
    }
  }

  saveUsers(users);
}
