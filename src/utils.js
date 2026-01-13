export function buildMessage(articles) {
  let msg = `📰 *Resumen diario*\n\n`;

  articles.forEach((a, i) => {
    msg += `*${i + 1}. ${a.title}*\n`;
    msg += `${a.source.name}\n`;
    msg += `${a.url}\n\n`;
  });

  return msg;
}
