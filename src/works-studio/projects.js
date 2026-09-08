export const projects = [
  {
    id: "snap-meter",
    number: "01",
    title: "Snap Meter",
    badge: "AI · Enterprise",
    summary:
      "Z fotek rovnou do Excelu — pro energetiky i kohokoli, kdo přepisuje hodnoty ručně.",
    challenge:
      "Ruční přepis stavů z fotek brzdí provoz, zanáší chyby a žere čas techniků i administrativy.",
    solution:
      "History-First AI / OCR systém s validací a přímým zápisem do master Excelu — bez mezikroků.",
    cover: "assets/solution-1.png",
    gallery: ["assets/solution-1.png", "assets/solution-5.jpg", "assets/solution-6.png"],
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
      "E-learningový systém školení s automatickým generováním certifikátů — vše snadno a rychle.",
    challenge:
      "Zákonná školení potřebovala být online, s přehlednou nabídkou a bez ruční administrativy certifikátů.",
    solution:
      "Web s e-learningem: kurzy, testy a automatické vydávání certifikátů — od objednávky po osvědčení bez zbytečných kroků.",
    cover: "assets/solution-2.jpg",
    gallery: ["assets/solution-2.jpg", "assets/solution-3.jpg", "assets/solution-5.jpg"],
    results: [
      { value: "100 %", label: "responzivní" },
      { value: "Auto", label: "certifikáty" },
      { value: "1", label: "jasná nabídka" },
    ],
    tech: ["WordPress", "Divi", "E-learning"],
  },
  {
    id: "prokat",
    number: "03",
    title: "Prokat Invest",
    badge: "Web · B2B",
    url: "https://www.prokat.cz",
    summary:
      "Firemní web pro energetiku — důvěra, služby a přímá cesta k poptávce.",
    challenge:
      "Technická B2B firma potřebovala silnější online prezentaci služeb.",
    solution:
      "Přehledný firemní web s důvěryhodným designem a jasnými CTA k poptávce.",
    cover: "assets/solution-3.jpg",
    gallery: ["assets/solution-3.jpg", "assets/solution-1.png", "assets/solution-2.jpg"],
    results: [
      { value: "B2B", label: "prezentace" },
      { value: "1 klik", label: "k poptávce" },
      { value: "24/7", label: "dostupnost" },
    ],
    tech: ["Weby", "B2B", "Energetika"],
  },
  {
    id: "andestay",
    number: "04",
    title: "AndeStay Hostel",
    badge: "Web · Travel",
    url: "https://www.andestay.com",
    summary:
      "Web horského hostelu v Peru s vlastním rezervačním systémem — přímé online booking bez zbytečných poplatků platformám.",
    challenge:
      "Hostel potřeboval vlastní rezervační systém, aby hosté bookovali přímo a ne přes drahé bookingové platformy.",
    solution:
      "Moderní web s vestavěným rezervačním systémem — dostupnost, rezervace a přímý booking na jednom místě.",
    cover: "assets/solution-andestay.jpg",
    gallery: ["assets/solution-andestay.jpg", "assets/solution-2.jpg", "assets/solution-3.jpg"],
    results: [
      { value: "Vlastní", label: "rezervační systém" },
      { value: "Direct", label: "online booking" },
      { value: "−20 %", label: "vs platformy" },
    ],
    tech: ["Weby", "Turistika", "Rezervace"],
  },
  {
    id: "refugio-mery",
    number: "05",
    title: "Refugio de Mery",
    badge: "Web · Travel",
    url: "https://refugio-de-mery.vercel.app",
    summary:
      "Coffee farm stay na Salkantay Trek — web s přímou rezervací, Tour de Café a jídlem z farmy.",
    challenge:
      "Rodinná kávová farma potřebovala vlastní web, aby hosté bookovali přímo místo přes Booking.com.",
    solution:
      "Prezentační web s přímým bookováním — pokoje, Tour de Café, jídlo a jasná cesta k rezervaci.",
    cover: "assets/solution-refugio-mery.jpg",
    gallery: ["assets/solution-refugio-mery.jpg", "assets/solution-andestay.jpg", "assets/solution-2.jpg"],
    results: [
      { value: "Direct", label: "booking" },
      { value: "Café", label: "Tour de Café" },
      { value: "−$", label: "vs Booking.com" },
    ],
    tech: ["Weby", "Turistika", "Rezervace"],
  },
];
