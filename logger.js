export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress;

  const ua = req.headers["user-agent"] || "unknown";

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
