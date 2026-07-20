(() => {
  const STORAGE_KEY = "webovice-lang";
  const SUPPORTED = ["cs", "en"];

  const dict = {
    cs: {
      "a11y.nav.main": "Hlavní menu",
      "a11y.nav.openMenu": "Otevřít menu",
      "a11y.nav.mobile": "Mobilní menu",
      "a11y.lang": "Jazyk",
      "a11y.footer.nav": "Navigace",
      "a11y.footer.brandHome": "WebOvice — zpět na úvod",
      "a11y.stack.deck": "Tech stack — najeďte myší pro rozbalení",
      "a11y.refs": "Co říkají klienti",
      "a11y.refs.nav": "Procházení referencí",
      "a11y.refs.prev": "Předchozí reference",
      "a11y.refs.next": "Další reference",
      "a11y.why.flow": "Tok hodnoty",

      "nav.home": "Domů",
      "nav.services": "Služby",
      "nav.work": "Moje práce",
      "nav.pricing": "Ceník",
      "nav.contact": "Kontakt",
      "nav.about": "O nás",
      "nav.faq": "FAQ",
      "nav.cta": "Spolupracujme",

      "footer.nav.label": "[ NAVIGACE ]",
      "footer.call.label": "[ ZAVOLEJTE ]",
      "footer.write.label": "[ NAPIŠTE ]",

      "meta.index.title": "WebOvice — weby, appky, AI & marketing",
      "meta.index.description":
        "WebOvice — weby, interní nástroje, automatizace procesů, e-learning a online marketing na míru. Stavím digitální řešení a postarám se, aby fungovala.",
      "meta.contact.title": "Kontakt — WebOvice",
      "meta.contact.description":
        "Kontakt WebOvice — napište, co potřebujete. Ozvu se s návrhem řešení webu, appky, AI nebo marketingu.",
      "meta.work.title": "Moje práce — WebOvice",
      "meta.work.description":
        "Moje práce WebOvice — Snap Meter, weby onlineskolení.eu a Prokat Invest, e-learningová aplikace BOZP.",
      "meta.about.title": "O nás — WebOvice",
      "meta.about.description":
        "O nás — WebOvice. Za projektem stojí Mirek: weby, appky, AI automatizace a technické řemeslo.",
      "meta.404.title": "404 — stránka nenalezena | WebOvice",
      "meta.404.description": "Stránka nenalezena — WebOvice. Vraťte se na úvod nebo do kontaktů.",

      "hero.title.line1": "Proměním váš byznys",
      "hero.title.line2": "v digitálně poháněný stroj.",
      "hero.subtitle":
        "Partner zaměřený na výsledky — pomůžu vám <strong>automatizovat procesy</strong>, <strong>optimalizovat provoz</strong> a rychleji škálovat díky <strong>webům, appkám a AI řešením</strong>.",
      "hero.cta": "Nezávazná konzultace zdarma",
      "hero.quotes.0.text": "90 % úspora času na přepisu měřidel.",
      "hero.quotes.0.author": "Prokat Invest — projekt Snap Meter",
      "hero.quotes.1.text": "Web online za pár dnů, správa obsahu bez kódu.",
      "hero.quotes.1.author": "Klient — firemní web ve Frameru",
      "hero.quotes.2.text": "0 % halucinací AI — data rovnou v Excelu.",
      "hero.quotes.2.author": "Prokat Invest — AI automatizace",
      "hero.quotes.3.text": "Měsíční retainer = web běží bez starostí.",
      "hero.quotes.3.author": "Klient — správa & údržba",

      "pain.title.before": "Jste tohle ",
      "pain.title.accent": "vy",
      "pain.title.after": "?",
      "pain.card1.line1": "Nevíte, kde začít",
      "pain.card1.line2": "s webem?",
      "pain.card2.line1": "Bez automatizace",
      "pain.card2.line2": "rostete pomalu.",
      "pain.card3.line1": "Ruční procesy",
      "pain.card3.line2": "berou zisk.",
      "pain.card4.line1": "Opakující úkoly",
      "pain.card4.line2": "vás brzdí.",

      "services.kicker": "[ NAŠE ŘEŠENÍ ]",
      "services.title": "Digitální služby na míru",
      "services.intro":
        "Od návrhu webu přes AI automatizaci až po online marketing — vše pod jednou střechou, bez zbytečného předávání mezi dodavateli.",
      "services.web.title": "Weby na míru",
      "services.web.body":
        "Moderní weby ve Frameru i WordPressu. Rychlé, responzivní, připravené růst s vaším byznysem.",
      "services.web.tag.responsive": "Responzivní design",
      "services.web.tag.seo": "SEO základ",
      "services.web.tag.speed": "Rychlost",
      "services.apps.title": "Interní nástroje & aplikace",
      "services.apps.body":
        "Python, SQL a napojení na databáze. Skripty a aplikace, které šetří čas vašemu týmu.",
      "services.apps.tag.api": "API napojení",
      "services.apps.tag.dashboards": "Dashboardy",
      "services.apps.tag.reports": "Automatické reporty",
      "services.apps.tag.apps": "Interní appky",
      "services.ops.title": "Provoz & údržba",
      "services.ops.body":
        "Aktualizace, monitoring a drobné úpravy — včetně ověření před nasazením. Web i nástroje běží bez vašich starostí.",
      "services.ops.tag.updates": "Aktualizace",
      "services.ops.tag.backups": "Zálohy",
      "services.ops.tag.security": "Bezpečnost",
      "services.ops.tag.tweaks": "Drobné úpravy",
      "services.ops.tag.support": "Podpora",
      "services.ai.title": "Automatizace procesů (AI)",
      "services.ai.body":
        "OCR, propojení systémů a AI workflow. Eliminace ručního přepisování — měřitelná úspora času.",
      "services.ai.tag.integrations": "Integrace systémů",
      "services.ai.tag.validation": "Validace",
      "services.elearning.title": "E-learning na míru",
      "services.elearning.body":
        "Online školení, testy a certifikace. Hotový LMS systém — od obsahu po automatické vydávání osvědčení.",
      "services.elearning.tag.courses": "Kurzy",
      "services.elearning.tag.tests": "Testy",
      "services.elearning.tag.certs": "Certifikáty",
      "services.elearning.tag.records": "Evidence",
      "services.marketing.kicker": "Růst & akvizice",
      "services.marketing.title": "Online marketing",
      "services.marketing.body":
        "Kompletní marketingová péče — od kampaní po obsah a měření. Nachystáno na vaše podklady a cíle.",
      "services.marketing.tag.social": "Sociální sítě",
      "services.marketing.tag.email": "E-mail marketing",
      "services.marketing.tag.analytics": "Analytika",
      "services.marketing.tag.content": "Obsahový marketing",
      "services.energy.kicker": "Technický diferenciátor",
      "services.energy.title": "Energetika & technické systémy",
      "services.energy.body":
        "Kotelny, tepelná čerpadla, FVE a chlazení. Technické know-how, které ostatní vývojáři nemají — a které promítám i do digitálních řešení.",
      "services.energy.tag.boilers": "Kotelny",
      "services.energy.tag.heatPumps": "Tepelná čerpadla",
      "services.energy.tag.cooling": "Chlazení",

      "why.kicker": "[ DŮVODY ]",
      "why.title": "Proč spolupracovat se mnou",
      "why.fairPrice.title": "[ FÉR CENA ]",
      "why.fairPrice.body": "Jasný rozsah, žádné skryté příplatky.",
      "why.fastDelivery.title": "[ RYCHLÉ DODÁNÍ ]",
      "why.fastDelivery.body": "Od nápadu k fungujícímu řešení bez zbytečných kol.",
      "why.directComm.title": "[ PŘÍMÁ KOMUNIKACE ]",
      "why.directComm.body": "Mluvíte se mnou, ne s call centrem.",
      "why.onePartner.title": "[ JEDEN PARTNER ]",
      "why.onePartner.body": "Web, appka, AI automatizace i online marketing pod jednou střechou.",
      "why.cleanCode.title": "[ ČISTÝ KÓD ]",
      "why.cleanCode.body": "Přehledné řešení, které se dá dál rozvíjet.",
      "why.flexible.title": "[ FLEXIBILNÍ SPOLUPRÁCE ]",
      "why.flexible.body": "Jednorázový projekt i dlouhodobý retainer.",

      "works.kicker": "[ EXPERTÍZA ]",
      "works.title": "Ukázky z praxe",
      "works.intro": "Cesta měřitelných výsledků — od automatizace po weby a e-learning.",
      "works.item1.stat": "úspora času",
      "works.item1.title": "Snap Meter — automatizace čtení měřidel",
      "works.item1.body":
        "Hybridní systém pro Prokat Invest: méně ruční práce, <strong>0&nbsp;% halucinací AI</strong> a data rovnou v Excelu.",
      "works.item2.statValue": "Kurzový",
      "works.item2.stat": "prodejní web",
      "works.item2.title": "Web onlineskolení.eu",
      "works.item2.body":
        "Prezentační web, který prodává školení — <strong>přehledná nabídka</strong> a správa obsahu bez kódu.",
      "works.item2.linkLabel": "Otevřít web onlineskolení.eu",
      "works.item3.statValue": "Jasná",
      "works.item3.stat": "cesta k poptávce",
      "works.item3.title": "Web Prokat Invest",
      "works.item3.body":
        "Firemní web pro energetiku — <strong>profesionální prezentace služeb</strong> a rychlý kontakt.",
      "works.item4.statValue": "Evidence",
      "works.item4.stat": "a certifikace",
      "works.item4.title": "E-learningová aplikace BOZP",
      "works.item4.body":
        "Školení BOZP a zákonných kurzů — <strong>testy, evidence i certifikáty</strong> na jednom místě.",
      "works.item5.statValue": "Revize",
      "works.item5.stat": "pod kontrolou",
      "works.item5.title": "Sofisticator — správa a generování revizí",
      "works.item5.body":
        "Aplikace na <strong>správu a generování revizí zařízení</strong> — evidence, dokumenty a výstupy na jednom místě.",
      "works.tag.websites": "Weby",
      "works.tag.energy": "Energetika",
      "works.cta": "Všechny moje práce",

      "stack.title": "Můj TECH STACK",
      "stack.more": "+ další",

      "refs.kicker": "[ REFERENCE ]",
      "refs.title": "Co říkají klienti",
      "refs.1.quote":
        "„Dřív jsme přepisovali stavy měřidel ručně a zabralo to spoustu času. Snap Meter to zvládne rychle a spolehlivě — <strong>ušetřilo nám to desítky hodin týdně</strong> a data máme rovnou v Excelu bez chyb.\"",
      "refs.1.name": "Florian Crha",
      "refs.1.role": "technik, Farm Therm",
      "refs.1.author": "Florian Crha (technik) — Farm Therm",
      "refs.2.quote":
        "„Web vypadá profesionálně a návštěvníci se v nabídce kurzů snadno zorientují. <strong>Správa obsahu je jednoduchá</strong> — texty i školení aktualizujeme sami, bez čekání na vývojáře.\"",
      "refs.2.name": "Karel Hrbek",
      "refs.2.role": "majitel, Onlineškolení.eu",
      "refs.2.author": "Karel Hrbek (majitel) — Onlineškolení.eu",
      "refs.3.quote":
        "„Web Prokat Invest nám dal důvěryhodnou online prezentaci služeb. Aktualizace, drobné opravy i běžný provoz — <strong>vše řeší WebOvice</strong>, takže se můžeme soustředit na klienty.\"",
      "refs.3.name": "Vladimír Škrlant",
      "refs.3.role": "majitel, Web Prokat Invest",
      "refs.3.author": "Vladimír Škrlant (majitel) — Web Prokat Invest",
      "refs.4.quote":
        "„Školení BOZP i zákonné kurzy máme na jednom místě — včetně testů a certifikátů. <strong>Compliance bez papírování</strong> a evidence, která se dá snadno dohledat, když ji potřebujeme.\"",
      "refs.4.name": "Karel Hrbek",
      "refs.4.role": "majitel, e-learning BOZP",
      "refs.4.author": "Karel Hrbek (majitel) — e-learning BOZP",
      "refs.5.quote":
        "„Sofisticator nám <strong>zpřehlednil revize zařízení</strong> od evidence až po generování dokumentů. Ušetřil spoustu papírování a máme jistotu, že nic důležitého neunikne.\"",
      "refs.5.name": "Karel Hrbek",
      "refs.5.role": "majitel, Sofisticator",
      "refs.5.author": "Karel Hrbek (majitel) — Sofisticator",
      "refs.tag.websites": "Weby",

      "pricing.title": "Ceník",
      "pricing.intro":
        "Většina projektů je na míru. Pevně naceněná je správa webu — u zbytku dostanete konkrétní nabídku po krátkém probrání.",
      "pricing.maint.badge": "Pevná cena",
      "pricing.maint.title": "Správa webu",
      "pricing.maint.for": "Pravidelná péče o váš web — aktualizace, monitoring a drobné úpravy",
      "pricing.maint.month": "od 1&nbsp;000&nbsp;Kč",
      "pricing.per.month": "/ měsíc",
      "pricing.maint.year": "nebo od 10&nbsp;000&nbsp;Kč",
      "pricing.per.year": "/ rok",
      "pricing.maint.f1": "Aktualizace a monitoring",
      "pricing.maint.f2": "Drobné úpravy a opravy",
      "pricing.maint.f3": "Prioritní podpora",
      "pricing.maint.f4": "Měsíční přehled o stavu",
      "pricing.maint.cta": "Chci správu webu",
      "pricing.custom.title": "Projekt na míru",
      "pricing.custom.for":
        "Web, appka, AI automatizace nebo online marketing — podle rozsahu a cíle",
      "pricing.custom.price": "individuální nabídka",
      "pricing.custom.f1": "Návrh a realizace dle zadání",
      "pricing.custom.f2": "Testování před spuštěním",
      "pricing.custom.f3": "Zdrojové soubory a dokumentace",
      "pricing.custom.f4": "Krátká podpora po spuštění",
      "pricing.custom.cta": "Chci nabídku",

      "about.kicker": "[ O MNĚ ]",
      "aboutPage.kicker": "[ O NÁS ]",
      "about.title": "Za WebOvice stojí Mirek",
      "about.body":
        "Absolvent elektro-průmyslovky, který zamířil do energetiky — realizace kotelen, tepelných čerpadel a FVE. Cestou jsem si zamiloval i druhou stranu mince: <strong>kód</strong>. Dnes stavím weby, appky a AI automatizace a technické řemeslo spojuju se softwarem tam, kde to dává smysl.",
      "about.label.email": "Email:",
      "about.label.phone": "Telefon:",
      "about.cta": "Domluvit konzultaci",
      "about.photo.alt": "Mirek — WebOvice by Mircek",

      "faq.title": "Časté dotazy",
      "faq.q1": "Jaké služby nabízíte?",
      "faq.a1":
        "Weby na míru, interní nástroje a aplikace, provoz a údržbu, automatizaci procesů (AI), e-learning a online marketing (Google Ads, SEO, sociální sítě, e-mail, analytika, obsah). Díky zázemí v energetice nabízím i technické systémy — kotelny, TČ, FVE a chlazení.",
      "faq.q2": "Jak dlouho trvá projekt?",
      "faq.a2":
        "Záleží na rozsahu — jednoduchý web nebo automatizaci zvládneme během pár dnů až týdnů, větší projekty po domluvě.",
      "faq.q3": "Nabízíte i pravidelnou správu webu?",
      "faq.a3":
        "Ano — od 1&nbsp;000&nbsp;Kč měsíčně nebo od 10&nbsp;000&nbsp;Kč ročně. Starám se o aktualizace, monitoring a drobné úpravy.",
      "faq.q4": "Umíte AI automatizaci na míru mé firmě?",
      "faq.a4":
        "Ano — viz projekt Snap Meter výše. Analyzuji váš proces, navrhnu automatizaci a nasadím ji s minimem chyb.",
      "faq.q5": "Pracujete i na dálku?",
      "faq.a5": "Ano — většinu projektů řeším remote, odkudkoli. Osobní setkání po domluvě.",

      "contact.kicker": "[ KONTAKT ]",
      "contact.title": "Připraveni na digitální změnu?",
      "contact.intro": "Napište mi, co potřebujete — ozvu se s návrhem řešení.",
      "contact.form.name": "Jméno a příjmení",
      "contact.form.email": "Email",
      "contact.form.service": "Co potřebujete?",
      "contact.form.service.placeholder": "Vyberte…",
      "contact.form.opt.web": "Weby na míru",
      "contact.form.opt.apps": "Interní nástroje & aplikace",
      "contact.form.opt.ops": "Provoz & údržba",
      "contact.form.opt.ai": "Automatizace procesů (AI)",
      "contact.form.opt.elearning": "E-learning na míru",
      "contact.form.opt.marketing": "Online marketing",
      "contact.form.opt.energy": "Energetika & technické systémy",
      "contact.form.opt.other": "Jiné",
      "contact.form.note": "Poznámka (volitelná)",
      "contact.form.note.placeholder": "Stručně popište projekt…",
      "contact.form.submit": "Odeslat poptávku",
      "contact.form.submitting": "Odesílám...",
      "contact.form.success": "Díky za poptávku, brzy se ozvu!",
      "contact.form.error":
        "Odeslání se nezdařilo. Zkuste to prosím znovu, nebo napište na email.",

      "workPage.kicker": "[ MOJE PRÁCE ]",
      "workPage.title": "Moje práce",
      "workPage.cta.kicker": "[ DALŠÍ KROK ]",
      "workPage.cta.title": "Chcete podobný výsledek?",
      "workPage.cta.body":
        "Napište mi, co řešíte — ozvu se s návrhem, jak to zautomatizovat nebo postavit.",
      "workPage.cta.button": "Domluvit konzultaci",

      "error404.kicker": "[ PAGE NOT FOUND ]",
      "error404.title.before": "Tahle stránka ",
      "error404.title.accent": "neexistuje",
      "error404.body":
        "Odkaz je neplatný, stránka se přesunula, nebo jste se sem dostali omylem. Vraťte se na úvod — nebo se ozvěte, rád pomůžu.",
      "error404.cta.home": "Zpět na úvod",
      "error404.cta.contact": "Kontakt",
    },

    en: {
      "a11y.nav.main": "Main menu",
      "a11y.nav.openMenu": "Open menu",
      "a11y.nav.mobile": "Mobile menu",
      "a11y.lang": "Language",
      "a11y.footer.nav": "Navigation",
      "a11y.footer.brandHome": "WebOvice — back to home",
      "a11y.stack.deck": "Tech stack — hover to expand",
      "a11y.refs": "What clients say",
      "a11y.refs.nav": "Browse testimonials",
      "a11y.refs.prev": "Previous testimonial",
      "a11y.refs.next": "Next testimonial",
      "a11y.why.flow": "Value flow",

      "nav.home": "Home",
      "nav.services": "Services",
      "nav.work": "My work",
      "nav.pricing": "Pricing",
      "nav.contact": "Contact",
      "nav.about": "About",
      "nav.faq": "FAQ",
      "nav.cta": "Let’s work together",

      "footer.nav.label": "[ NAVIGATION ]",
      "footer.call.label": "[ CALL ]",
      "footer.write.label": "[ WRITE ]",

      "meta.index.title": "WebOvice — websites, apps, AI & marketing",
      "meta.index.description":
        "WebOvice — custom websites, internal tools, process automation, e-learning and online marketing. I build digital solutions and make sure they work.",
      "meta.contact.title": "Contact — WebOvice",
      "meta.contact.description":
        "Contact WebOvice — tell me what you need. I’ll reply with a proposed solution for a website, app, AI, or marketing.",
      "meta.work.title": "My work — WebOvice",
      "meta.work.description":
        "WebOvice work — Snap Meter, onlineskolení.eu and Prokat Invest websites, OHS e-learning app.",
      "meta.about.title": "About — WebOvice",
      "meta.about.description":
        "About WebOvice. Behind the project is Mirek: websites, apps, AI automation, and technical craft.",
      "meta.404.title": "404 — page not found | WebOvice",
      "meta.404.description": "Page not found — WebOvice. Go back home or to contact.",

      "hero.title.line1": "Turning Business into",
      "hero.title.line2": "AI-Powered Machine.",
      "hero.subtitle":
        "A results-focused partner — I’ll help you <strong>automate processes</strong>, <strong>optimize operations</strong>, and scale faster with <strong>websites, apps, and AI solutions</strong>.",
      "hero.cta": "Free, no-obligation consultation",
      "hero.quotes.0.text": "90% time saved on meter transcription.",
      "hero.quotes.0.author": "Prokat Invest — Snap Meter project",
      "hero.quotes.1.text": "Website online in a few days, content management without code.",
      "hero.quotes.1.author": "Client — company website in Framer",
      "hero.quotes.2.text": "0% AI hallucinations — data straight into Excel.",
      "hero.quotes.2.author": "Prokat Invest — AI automation",
      "hero.quotes.3.text": "Monthly retainer = site runs without worries.",
      "hero.quotes.3.author": "Client — maintenance & support",

      "pain.title.before": "Is this ",
      "pain.title.accent": "you",
      "pain.title.after": "?",
      "pain.card1.line1": "Don’t know where to start",
      "pain.card1.line2": "with a website?",
      "pain.card2.line1": "Without automation",
      "pain.card2.line2": "you grow slowly.",
      "pain.card3.line1": "Manual processes",
      "pain.card3.line2": "eat into profit.",
      "pain.card4.line1": "Repetitive tasks",
      "pain.card4.line2": "hold you back.",

      "services.kicker": "[ OUR SOLUTIONS ]",
      "services.title": "Custom digital services",
      "services.intro":
        "From website design through AI automation to online marketing — all under one roof, without pointless handoffs between vendors.",
      "services.web.title": "Custom websites",
      "services.web.body":
        "Modern websites in Framer and WordPress. Fast, responsive, ready to grow with your business.",
      "services.web.tag.responsive": "Responsive design",
      "services.web.tag.seo": "SEO foundations",
      "services.web.tag.speed": "Speed",
      "services.apps.title": "Internal tools & apps",
      "services.apps.body":
        "Python, SQL, and database integrations. Scripts and apps that save your team time.",
      "services.apps.tag.api": "API integrations",
      "services.apps.tag.dashboards": "Dashboards",
      "services.apps.tag.reports": "Automated reports",
      "services.apps.tag.apps": "Internal apps",
      "services.ops.title": "Operations & maintenance",
      "services.ops.body":
        "Updates, monitoring, and small tweaks — including checks before deploy. Your site and tools run without you worrying.",
      "services.ops.tag.updates": "Updates",
      "services.ops.tag.backups": "Backups",
      "services.ops.tag.security": "Security",
      "services.ops.tag.tweaks": "Small tweaks",
      "services.ops.tag.support": "Support",
      "services.ai.title": "Process automation (AI)",
      "services.ai.body":
        "OCR, system integrations, and AI workflows. Eliminate manual retyping — measurable time savings.",
      "services.ai.tag.integrations": "System integrations",
      "services.ai.tag.validation": "Validation",
      "services.elearning.title": "Custom e-learning",
      "services.elearning.body":
        "Online training, tests, and certification. A ready LMS — from content to automatic certificate issuance.",
      "services.elearning.tag.courses": "Courses",
      "services.elearning.tag.tests": "Tests",
      "services.elearning.tag.certs": "Certificates",
      "services.elearning.tag.records": "Records",
      "services.marketing.kicker": "Growth & acquisition",
      "services.marketing.title": "Online marketing",
      "services.marketing.body":
        "Full marketing care — from campaigns to content and measurement. Tuned to your materials and goals.",
      "services.marketing.tag.social": "Social media",
      "services.marketing.tag.email": "Email marketing",
      "services.marketing.tag.analytics": "Analytics",
      "services.marketing.tag.content": "Content marketing",
      "services.energy.kicker": "Technical differentiator",
      "services.energy.title": "Energy & technical systems",
      "services.energy.body":
        "Boiler rooms, heat pumps, PV, and cooling. Technical know-how other developers lack — and that I bring into digital solutions too.",
      "services.energy.tag.boilers": "Boiler rooms",
      "services.energy.tag.heatPumps": "Heat pumps",
      "services.energy.tag.cooling": "Cooling",

      "why.kicker": "[ REASONS ]",
      "why.title": "Why work with me",
      "why.fairPrice.title": "[ FAIR PRICE ]",
      "why.fairPrice.body": "Clear scope, no hidden add-ons.",
      "why.fastDelivery.title": "[ FAST DELIVERY ]",
      "why.fastDelivery.body": "From idea to a working solution without unnecessary rounds.",
      "why.directComm.title": "[ DIRECT COMMUNICATION ]",
      "why.directComm.body": "You talk to me, not a call center.",
      "why.onePartner.title": "[ ONE PARTNER ]",
      "why.onePartner.body": "Website, app, AI automation, and online marketing under one roof.",
      "why.cleanCode.title": "[ CLEAN CODE ]",
      "why.cleanCode.body": "Clear solutions you can keep building on.",
      "why.flexible.title": "[ FLEXIBLE COLLABORATION ]",
      "why.flexible.body": "One-off projects or a long-term retainer.",

      "works.kicker": "[ EXPERTISE ]",
      "works.title": "Work samples",
      "works.intro": "A path of measurable results — from automation to websites and e-learning.",
      "works.item1.stat": "time saved",
      "works.item1.title": "Snap Meter — meter-reading automation",
      "works.item1.body":
        "Hybrid system for Prokat Invest: less manual work, <strong>0&nbsp;% AI hallucinations</strong> and data straight into Excel.",
      "works.item2.statValue": "Course",
      "works.item2.stat": "sales website",
      "works.item2.title": "onlineskolení.eu website",
      "works.item2.body":
        "A presentation site that sells training — <strong>clear offer</strong> and code-free content management.",
      "works.item2.linkLabel": "Open onlineskolení.eu website",
      "works.item3.statValue": "Clear",
      "works.item3.stat": "path to inquiry",
      "works.item3.title": "Prokat Invest website",
      "works.item3.body":
        "Corporate site for energy — <strong>professional service presentation</strong> and fast contact.",
      "works.item4.statValue": "Records",
      "works.item4.stat": "and certification",
      "works.item4.title": "OHS e-learning app",
      "works.item4.body":
        "OHS and mandatory course training — <strong>tests, records, and certificates</strong> in one place.",
      "works.item5.statValue": "Revisions",
      "works.item5.stat": "under control",
      "works.item5.title": "Sofisticator — revision management & generation",
      "works.item5.body":
        "An app for <strong>managing and generating equipment revisions</strong> — records, documents, and outputs in one place.",
      "works.tag.websites": "Websites",
      "works.tag.energy": "Energy",
      "works.cta": "All my work",

      "stack.title": "My TECH STACK",
      "stack.more": "+ more",

      "refs.kicker": "[ TESTIMONIALS ]",
      "refs.title": "What clients say",
      "refs.1.quote":
        "“We used to copy meter readings by hand and it took forever. Snap Meter does it fast and reliably — it <strong>saved us dozens of hours a week</strong>, with data straight into Excel and far fewer mistakes.”",
      "refs.1.name": "Florian Crha",
      "refs.1.role": "technician, Farm Therm",
      "refs.1.author": "Florian Crha (technician) — Farm Therm",
      "refs.2.quote":
        "“The site looks professional and visitors find the course offer easily. <strong>Content management is simple</strong> — we update texts and trainings ourselves, without waiting on a developer.”",
      "refs.2.name": "Karel Hrbek",
      "refs.2.role": "owner, Onlineškolení.eu",
      "refs.2.author": "Karel Hrbek (owner) — Onlineškolení.eu",
      "refs.3.quote":
        "“The Prokat Invest website gave us a credible online presentation of our services. Updates, small fixes, and day-to-day upkeep — <strong>WebOvice handles it all</strong>, so we can focus on clients.”",
      "refs.3.name": "Vladimír Škrlant",
      "refs.3.role": "owner, Prokat Invest website",
      "refs.3.author": "Vladimír Škrlant (owner) — Prokat Invest website",
      "refs.4.quote":
        "“OHS and mandatory courses live in one place — including tests and certificates. <strong>Compliance without paperwork</strong>, plus records we can find quickly whenever we need them.”",
      "refs.4.name": "Karel Hrbek",
      "refs.4.role": "owner, OHS e-learning",
      "refs.4.author": "Karel Hrbek (owner) — OHS e-learning",
      "refs.5.quote":
        "“Sofisticator <strong>clarified our equipment revisions</strong> from records through generated documents. It cut a lot of paperwork and we know nothing important slips through.”",
      "refs.5.name": "Karel Hrbek",
      "refs.5.role": "owner, Sofisticator",
      "refs.5.author": "Karel Hrbek (owner) — Sofisticator",
      "refs.tag.websites": "Websites",

      "pricing.title": "Pricing",
      "pricing.intro":
        "Most projects are custom. Website maintenance has a fixed price — for everything else you get a concrete quote after a short discussion.",
      "pricing.maint.badge": "Fixed price",
      "pricing.maint.title": "Website maintenance",
      "pricing.maint.for": "Ongoing care for your site — updates, monitoring, and small tweaks",
      "pricing.maint.month": "from CZK&nbsp;1,000",
      "pricing.per.month": "/ month",
      "pricing.maint.year": "or from CZK&nbsp;10,000",
      "pricing.per.year": "/ year",
      "pricing.maint.f1": "Updates and monitoring",
      "pricing.maint.f2": "Small tweaks and fixes",
      "pricing.maint.f3": "Priority support",
      "pricing.maint.f4": "Monthly status overview",
      "pricing.maint.cta": "I want website maintenance",
      "pricing.custom.title": "Custom project",
      "pricing.custom.for":
        "Website, app, AI automation, or online marketing — based on scope and goal",
      "pricing.custom.price": "custom quote",
      "pricing.custom.f1": "Design and delivery per brief",
      "pricing.custom.f2": "Testing before launch",
      "pricing.custom.f3": "Source files and documentation",
      "pricing.custom.f4": "Short support after launch",
      "pricing.custom.cta": "I want a quote",

      "about.kicker": "[ ABOUT ME ]",
      "aboutPage.kicker": "[ ABOUT US ]",
      "about.title": "Behind WebOvice is Mirek",
      "about.body":
        "An electrical trade-school graduate who moved into energy — boiler rooms, heat pumps, and PV. Along the way I fell for the other side of the coin: <strong>code</strong>. Today I build websites, apps, and AI automation, and I connect technical craft with software where it makes sense.",
      "about.label.email": "Email:",
      "about.label.phone": "Phone:",
      "about.cta": "Book a consultation",
      "about.photo.alt": "Mirek — WebOvice by Mircek",

      "faq.title": "FAQ",
      "faq.q1": "What services do you offer?",
      "faq.a1":
        "Custom websites, internal tools and apps, operations and maintenance, process automation (AI), e-learning, and online marketing (Google Ads, SEO, social, email, analytics, content). With an energy background I also offer technical systems — boiler rooms, heat pumps, PV, and cooling.",
      "faq.q2": "How long does a project take?",
      "faq.a2":
        "It depends on scope — a simple site or automation can take a few days to weeks; larger projects by agreement.",
      "faq.q3": "Do you offer ongoing website maintenance?",
      "faq.a3":
        "Yes — from CZK&nbsp;1,000/month or CZK&nbsp;10,000/year. I handle updates, monitoring, and small tweaks.",
      "faq.q4": "Can you build custom AI automation for my company?",
      "faq.a4":
        "Yes — see the Snap Meter project above. I analyze your process, design the automation, and deploy it with minimal errors.",
      "faq.q5": "Do you work remotely?",
      "faq.a5": "Yes — most projects are remote, from anywhere. In-person meetings by arrangement.",

      "contact.kicker": "[ CONTACT ]",
      "contact.title": "Ready for a digital change?",
      "contact.intro": "Tell me what you need — I’ll get back with a proposed solution.",
      "contact.form.name": "Full name",
      "contact.form.email": "Email",
      "contact.form.service": "What do you need?",
      "contact.form.service.placeholder": "Select…",
      "contact.form.opt.web": "Custom websites",
      "contact.form.opt.apps": "Internal tools & apps",
      "contact.form.opt.ops": "Operations & maintenance",
      "contact.form.opt.ai": "Process automation (AI)",
      "contact.form.opt.elearning": "Custom e-learning",
      "contact.form.opt.marketing": "Online marketing",
      "contact.form.opt.energy": "Energy & technical systems",
      "contact.form.opt.other": "Other",
      "contact.form.note": "Note (optional)",
      "contact.form.note.placeholder": "Briefly describe your project…",
      "contact.form.submit": "Send inquiry",
      "contact.form.submitting": "Sending…",
      "contact.form.success": "Thanks for your inquiry — I’ll get back soon!",
      "contact.form.error": "Sending failed. Please try again, or email me.",

      "workPage.kicker": "[ MY WORK ]",
      "workPage.title": "My work",
      "workPage.cta.kicker": "[ NEXT STEP ]",
      "workPage.cta.title": "Want a similar result?",
      "workPage.cta.body":
        "Tell me what you’re solving — I’ll reply with a plan to automate or build it.",
      "workPage.cta.button": "Book a consultation",

      "error404.kicker": "[ PAGE NOT FOUND ]",
      "error404.title.before": "This page ",
      "error404.title.accent": "doesn’t exist",
      "error404.body":
        "The link is invalid, the page moved, or you landed here by mistake. Go back home — or get in touch, I’m happy to help.",
      "error404.cta.home": "Back to home",
      "error404.cta.contact": "Contact",
    },
  };

  const getStoredLang = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) {
        return saved;
      }
    } catch (_) {
      // ignore
    }
    return "cs";
  };

  let currentLang = getStoredLang();

  const t = (key) => dict[currentLang]?.[key] ?? dict.cs[key] ?? key;

  const applyI18n = (lang = currentLang) => {
    if (!SUPPORTED.includes(lang)) {
      lang = "cs";
    }
    currentLang = lang;
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      // ignore
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || !(key in dict.cs)) {
        return;
      }
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key || !(key in dict.cs)) {
        return;
      }
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key || !(key in dict.cs)) {
        return;
      }
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (!key || !(key in dict.cs)) {
        return;
      }
      el.setAttribute("aria-label", t(key));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (!key || !(key in dict.cs)) {
        return;
      }
      el.setAttribute("alt", t(key));
    });

    document.querySelectorAll("option[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || !(key in dict.cs)) {
        return;
      }
      el.textContent = t(key);
    });

    const titleKey = document.body?.dataset?.i18nTitle;
    if (titleKey && titleKey in dict.cs) {
      document.title = t(titleKey);
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    const descKey = document.body?.dataset?.i18nDescription;
    if (metaDesc && descKey && descKey in dict.cs) {
      metaDesc.setAttribute("content", t(descKey));
    }

    document.querySelectorAll("[data-lang-set]").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang-set") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    window.dispatchEvent(
      new CustomEvent("webovice:langchange", {
        detail: { lang },
      })
    );
  };

  const initLangSwitch = () => {
    document.querySelectorAll("[data-lang-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.getAttribute("data-lang-set");
        if (SUPPORTED.includes(next) && next !== currentLang) {
          applyI18n(next);
        }
      });
    });
  };

  window.WebOviceI18n = {
    t,
    applyI18n,
    getLang: () => currentLang,
    dict,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initLangSwitch();
      applyI18n(currentLang);
    });
  } else {
    initLangSwitch();
    applyI18n(currentLang);
  }
})();
