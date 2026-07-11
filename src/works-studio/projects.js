export const projects = [
  {
    id: "snap-meter",
    number: "01",
    title: "Snap Meter",
    badge: "AI · Enterprise",
    summary:
      "Automatizace čtení měřidel pro Prokat Invest — méně ruční práce, spolehlivá data.",
    challenge:
      "Ruční přepis měřidel brzdil provoz, zanášílo chyby a blokoval tým od vyšší práce.",
    solution:
      "History-First AI / OCR systém s validací a přímým zápisem do master Excelu — bez mezikroků.",
    cover: "assets/solution-1.png",
    gallery: ["assets/solution-1.png", "assets/solution-5.png", "assets/solution-6.png"],
    results: [
      { value: "90 %", label: "úspora času" },
      { value: "0 %", label: "AI halucinací" },
      { value: "100 %", label: "automatizovaný zápis" },
    ],
    tech: ["Python", "OpenAI", "OCR", "Excel"],
  },
  {
    id: "onlineskoleni",
    number: "02",
    title: "onlineskolení.eu",
    badge: "Web · E-learning",
    summary:
      "Prodejní web, který dělá z nabídky kurzů přehledný a spravovatelný produkt.",
    challenge:
      "Školení bylo těžké prezentovat a obsah se spravoval zbytečně složitě.",
    solution:
      "Moderní prezentační web s jasnou strukturou kurzů a správou obsahu bez zásahu do kódu.",
    cover: "assets/solution-2.png",
    gallery: ["assets/solution-2.png", "assets/solution-3.png", "assets/solution-4.png"],
    results: [
      { value: "100 %", label: "responzivní" },
      { value: "CMS", label: "bez kódu" },
      { value: "1", label: "jasná nabídka" },
    ],
    tech: ["WordPress", "Divi", "E-learning"],
  },
  {
    id: "prokat",
    number: "03",
    title: "Prokat Invest",
    badge: "Web · B2B",
    summary:
      "Firemní web pro energetiku — důvěra, služby a přímá cesta k poptávce.",
    challenge:
      "Technická B2B firma potřebovala silnější online prezentaci služeb.",
    solution:
      "Přehledný firemní web s důvěryhodným designem a jasnými CTA k poptávce.",
    cover: "assets/solution-3.png",
    gallery: ["assets/solution-3.png", "assets/solution-1.png", "assets/solution-2.png"],
    results: [
      { value: "B2B", label: "prezentace" },
      { value: "1 klik", label: "k poptávce" },
      { value: "24/7", label: "dostupnost" },
    ],
    tech: ["Weby", "B2B", "Energetika"],
  },
  {
    id: "bozp",
    number: "04",
    title: "BOZP e-learning",
    badge: "Automatizace · LMS",
    summary:
      "Aplikace pro zákonná školení — od testů přes evidenci až po certifikáty.",
    challenge:
      "Školení a evidence byly roztříštěné a administrativně náročné.",
    solution:
      "LMS aplikace s kurzy, testy, evidencí a automatickým vydáváním osvědčení.",
    cover: "assets/solution-4.png",
    gallery: ["assets/solution-4.png", "assets/solution-6.png", "assets/solution-5.png"],
    results: [
      { value: "Testy", label: "online" },
      { value: "1 místo", label: "pro evidenci" },
      { value: "Auto", label: "certifikáty" },
    ],
    tech: ["LMS", "Compliance", "E-learning"],
  },
];
