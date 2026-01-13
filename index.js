import { handleTelegramUpdates } from './src/bot.js';
import { getNews } from './src/news.js';
import { sendMessage } from './src/send.js';
import { loadUsers } from './src/userStore.js';
import { buildMessage } from './src/utils.js';

const MODE = process.env.MODE || 'cron';
const CURRENT_HOUR = new Date().getHours();

if (MODE === 'bot') {
  await handleTelegramUpdates();
} else {
  const users = loadUsers();

  for (const chatId in users) {
    const user = users[chatId];
    if (user.hour !== CURRENT_HOUR) continue;

    const news = await getNews(user);
    const message = buildMessage(news);
    await sendMessage(chatId, message);
  }
}
