import fs from 'fs';

const FILE = './data/users.json';

export function loadUsers() {
  if (!fs.existsSync(FILE)) return {};
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}

export function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

export function ensureUser(users, chatId) {
  if (!users[chatId]) {
    users[chatId] = {
      topics: ['general'],
      hour: 9,
      priority: ['world']
    };
  }
}
