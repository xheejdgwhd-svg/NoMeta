export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "unknown";

  // ❌ Фильтр ботов и системных запросов Vercel
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

  // ✔ Данные реального пользователя
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress;

  const info = {
    ip,
    userAgent: ua,
    country: req.headers["x-vercel-ip-country"] || "unknown",
    region: req.headers["x-vercel-ip-country-region"] || "unknown",
    city: req.headers["x-vercel-ip-city"] || "unknown",
    time: new Date().toISOString(),
  };

  console.log("Visitor:", info);

  res.status(200).json({ ok: true });
}
