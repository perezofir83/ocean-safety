# 🌊 OceanSafe Oaxaca

A free, open-source mobile web app that shows real-time ocean conditions — waves, tides, UV index, and current patterns — for beaches on the Oaxaca coast of Mexico.

Built to help tourists and visitors understand the real risks before entering the water. The Pacific coast of Oaxaca is beautiful but genuinely dangerous, with powerful rip currents and shore break that claim lives every year.

**Live app → [perezofir83.github.io/ocean-safety](https://perezofir83.github.io/ocean-safety/)**

---

## Features

- **Live ocean data** — wave height, swell period, and UV index via [Open-Meteo](https://open-meteo.com/) (free, no API key required), refreshed every 10 minutes
- **Tide chart** — visual sine-wave chart with current position, next tide event countdown, and today's full schedule
- **Current diagrams** — beach-specific rip current and longshore current illustrations
- **Beach selector** — 6 beaches covered: Zipolite, San Agustinillo, Mazunte, Zicatela (Puerto Escondido), La Entrega (Huatulco), La Ventanilla
- **Geolocation** — automatically selects the nearest beach
- **5 languages** — English, Spanish, French, Dutch, German
- **The Danger Cocktail** — permanent infographic explaining why alcohol + sun + currents is life-threatening
- **No login, no tracking, no ads** — pure public safety information

---

## Beaches Covered

| Beach | Danger Level | Lifeguard |
|-------|-------------|-----------|
| Zipolite | 🔴 High | No |
| San Agustinillo | 🟡 Moderate | No |
| Mazunte | 🟡 Moderate | No |
| Puerto Escondido · Zicatela | 🔴 Extreme | Yes |
| La Entrega · Huatulco | 🟢 Low | Yes |
| La Ventanilla | 🟢 Low (lagoon) | No |

---

## Tech Stack

- Vanilla HTML / CSS / JavaScript — no framework, no build step
- [Open-Meteo API](https://open-meteo.com/) — free weather & marine data
- Hosted on GitHub Pages

---

## Contributing

Pull requests welcome — especially for:
- Adding more beaches
- Improving tide data accuracy (currently mock data; needs a tide API integration)
- Translations / language corrections

---

## License

MIT — free to use, adapt, and redistribute. If you build on this for another coastline, a credit or link back is appreciated.

---

*This app provides information only. You are always responsible for your own safety. The ocean does not care about your swimming ability.*
