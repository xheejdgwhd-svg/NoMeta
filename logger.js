async function logVisit() {
    try {
        // Получаем данные о визите
        const info = await fetch("https://ipapi.co/json/").then(r => r.json());

        const data = {
            ip: info.ip,
            country: info.country_name,
            city: info.city,
            region: info.region,
            isp: info.org,
            ua: navigator.userAgent,
            time: new Date().toLocaleString()
        };

        const text = `
🌐 *Новый визит на сайт*
--------------------------------
🕒 Время: ${data.time}
🌍 IP: ${data.ip}
🇺🇦 Страна: ${data.country}
🏙 Город: ${data.city}
📍 Регион: ${data.region}
📡 Провайдер: ${data.isp}
📱 Устройство:
${data.ua}
--------------------------------
        `;

        // 👇 ВСТАВЬ СВОИ ДАННЫЕ
        const botToken = "8204163101:AAHaBZZd18u9-HqtlY5h4P2NQUC4VpOsHPM";
        const chatId = "8204163101";

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "Markdown"
            })
        });

    } catch (err) {
        console.error("Logger error:", err);
    }
}

logVisit();
