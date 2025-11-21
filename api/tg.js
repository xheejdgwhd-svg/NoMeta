export default async function handler(req, res) {
  const ua = req.headers["user-agent"] || "unknown";

  // фильтр ботов (чтобы не спамили в тг)
  const botKeywords = [
    "vercel",
    "headless",
    "bot",
    "crawl",
    "spider",
    "curl",
    "python",
    "node",
    "fetch",
    "wget",
  ];

  const isBot = botKeywords.some(word =>
    ua.toLowerCase().includes(word)
  );

  if (isBot) {
    return res.status(200).json({ ok: true, bot: true });
  }

  const token = "8375053313:AAH8hnlzseOfn9cdiQIh1AqIbVdzy52484w";
  const chatId = "6411412302";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress;

  const info = {
    ip,
    userAgent: ua,
    country: req.headers["x-vercel-ip-country"] || "unknown",
    region: req.headers["x-vercel-ip-country-region"] || "unknown",
    city: req.headers["x-vercel-ip-city"] || "unknown",
    time: new Date().toLocaleString("ru-RU"),
  };

  const text =
    `🌐 *Новый заход на сайт*\n\n` +
    `📍 *IP:* ${info.ip}\n` +
    `🗺 *Страна:* ${info.country}\n` +
    `🏙 *Город:* ${info.city}\n` +
    `💻 *Устройство:* ${info.userAgent}\n` +
    `⏰ *Время:* ${info.time}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown"
    }),
  });

  res.status(200).json({ ok: true });
}
