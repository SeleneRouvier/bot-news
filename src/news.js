import fetch from 'node-fetch';

const NEWS_API = 'https://newsapi.org/v2/top-headlines';

export async function getNews({ topics, priority }) {
  const articles = [];

  for (const p of priority) {
    const params =
      p === 'ar'
        ? `country=ar`
        : `language=en`;

    const res = await fetch(
      `${NEWS_API}?${params}&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await res.json();
    if (data.articles) articles.push(...data.articles);
  }

  return articles.slice(0, 5);
}
