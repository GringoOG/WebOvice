# Prompt: Předělání portfolia (uloženo pro pozdější použití)

> Poznámka: Tento prompt je zatím pouze uložen k pozdějšímu spuštění. Po jeho spuštění by měl vzniknout soubor `portfolio_update.md` s obsahem popsaným níže.

---

Jsi seniorní tech-copywriter a produktový manažer. Mým cílem je kompletně předělat a vylepšit mé osobní portfolio na Frameru (aktuální koncept je na https://flourished-emoji-533192.framer.app/). Potřebuji, abys mi vygeneroval kompletní textový obsah, strukturu sekcí a argumentační body pro můj nový web.

Můj profil: Jsem odborník v energetickém a HVAC sektoru (realizace a správa tepelných zdrojů, kotelen, FVE, vzduchotechniky a chlazení od projektu po realizaci). Zároveň jsem juniorní webdesignér/vývojář (Framer, WordPress Divi, Python, SQL) a specialista na AI automatizaci interních firemních procesů.

Tvým úkolem v tomto Cursor projektu je vygenerovat Markdown dokument `portfolio_update.md`, který bude obsahovat následující sekce s hotovým, úderným copywritingu v češtině:

## 1. HERO SEKCE (Hlavní nadpis + podnadpis)
- Musí okamžitě prodat můj unikátní mix: Stavím energetické systémy a poháním je moderním kódem a AI automatizací. Žádné obecné fráze. Úderné, profesionální, sebevědomé.

## 2. SEKCE "CO UMÍM" (Hard Skills & Tech Stack)
Rozděl to na 3 pilíře:
- a) **Energetika & HVAC** (Projektování a realizace kotelen, tepelných čerpadel, FVE, chlazení).
- b) **Vývoj & Webdesign** (Framer, WordPress, Python, SQL, čistý kód).
- c) **AI Automatizace** (Integrace Anthropic/OpenAI API, Vision/OCR systémy, optimalizace firemních procesů, LLM prompt engineering).

## 3. SEKCE "PŘÍPADOVÁ STUDIE: PROJEKT AUTO_MAT"
Zde ukážeme reálný hard-core skill:
- Popiš projekt "auto_mat", který jsem vyvinul v Pythonu pro firmu Prokat Invest.
- **Problém**: Technici posílají stovky fotek měřidel (teplo, chlad, plyn, elektřina) z různých středisek, což vedlo k manuálnímu přepisování a chybám.
- **Řešení**: Hybridní "History-First" systém. Python nejdříve ověří historii, lokalitu a technika přes indexy (JSON/Excel). Následně posílá fotku na Anthropic Vision API s přesně vymezeným seznamem očekávaných ID měřidel (striktní systémový prompt, porovnání přes regulární výrazy a normalizaci číslic). Claude dělá pouze neprůstřelné OCR, Python řídí logiku a zapisuje přímo do master Excelu.
- **Výsledek**: 90% úspora času, 0% halucinací AI, minimalizace nákladů na API díky lokálnímu OCR indexování na Macu (Apple Vision).

## 4. SEKCE "O MNĚ" (Profesní příběh)
- Lidský, ale vysoce profesionální tón. Absolvent elektro-průmyslovky, který kombinuje technické řemeslo (kotelny, hardware budov) s moderním softwarem.

---

**Formátování výstupu**: Vygeneruj tento soubor tak, abych mohl texty okamžitě vzít a vložit je do komponent ve Frameru. Texty piš ve scannovatelném formátu (krátké odstavce, tučné zvýraznění klíčových slov, odrážky).
