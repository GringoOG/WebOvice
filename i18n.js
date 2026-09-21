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
        "Moje práce WebOvice — Prokat Invest, onlineskolení.eu, WebOvice, Snap Meter, AndeStay Hostel a Refugio de Mery.",
      "meta.about.title": "O nás — WebOvice",
      "meta.about.description":
        "O nás — WebOvice. Technologie, které dávají smysl: weby, aplikace, automatizace a digitální růst firem.",
      "meta.404.title": "404 — stránka nenalezena | WebOvice",
      "meta.404.description": "Stránka nenalezena — WebOvice. Vraťte se na úvod nebo do kontaktů.",

      "hero.title.line1": "Proměním váš byznys",
      "hero.title.line2": "v digitálně poháněný stroj.",
      "hero.subtitle":
        "Partner zaměřený na výsledky — pomůžu vám <strong>automatizovat procesy</strong>, <strong>optimalizovat provoz</strong> a rychleji škálovat díky <strong>webům, appkám a AI řešením</strong>.",
      "hero.cta": "Nezávazná konzultace zdarma",
      "hero.quotes.0.text": "90 % úspora času na přepisu měřidel.",
      "hero.quotes.0.author": "Energetika — projekt Snap Meter",
      "hero.quotes.1.text": "Web online za pár dnů, správa obsahu bez kódu.",
      "hero.quotes.1.author": "Klient — firemní web ve Frameru",
      "hero.quotes.2.text": "0 % halucinací AI — data rovnou v Excelu.",
      "hero.quotes.2.author": "Snap Meter — AI automatizace",
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
      "works.item1.title": "Snap Meter — z fotek do Excelu",
      "works.item1.body":
        "Pro energetiky i kohokoli, kdo přepisuje hodnoty z fotek: AI je přečte a <strong>zapíše rovnou do Excelu</strong> — méně ruční práce, méně chyb.",
      "works.item2.statValue": "E-learning",
      "works.item2.stat": "s certifikáty",
      "works.item2.title": "Web onlineskolení.eu",
      "works.item2.body":
        "E-learningový systém školení s <strong>automatickým generováním certifikátů</strong> — vše snadno a rychle, od kurzu po osvědčení.",
      "works.item2.linkLabel": "Otevřít web onlineskolení.eu",
      "works.item3.linkLabel": "Otevřít web Prokat Invest",
      "works.item3.statValue": "Jasná",
      "works.item3.stat": "cesta k poptávce",
      "works.item3.title": "Web Prokat Invest",
      "works.item3.body":
        "Firemní web pro energetiku — <strong>profesionální prezentace služeb</strong> a rychlý kontakt.",
      "works.item5.statValue": "Pár kliků",
      "works.item5.stat": "od revize po protokol",
      "works.item5.title": "Sofisticator — správa a generování revizí",
      "works.item5.body":
        "Od revize až po protokol k zákazníkovi — <strong>vše automatizované na pár kliknutí</strong>. Evidence, termíny i výstupy na jednom místě.",
      "works.item6.linkLabel": "Otevřít web AndeStay Hostel",
      "works.item6.statValue": "QloApps",
      "works.item6.stat": "+ systém ve vývoji",
      "works.item6.title": "Web AndeStay Hostel",
      "works.item6.body":
        "Web horského hostelu v Peru s online rezervací přes <strong>QloApps</strong> — vlastní rezervační systém je ve vývoji.",
      "works.item7.linkLabel": "Otevřít web Refugio de Mery",
      "works.item7.statValue": "QloApps",
      "works.item7.stat": "+ systém ve vývoji",
      "works.item7.title": "Web Refugio de Mery",
      "works.item7.body":
        "Coffee farm stay na Salkantay Trek — rezervace přes <strong>QloApps</strong>, vlastní systém ve vývoji. Pokoje, Tour de Café i jídlo z farmy.",
      "works.item8.linkLabel": "Otevřít web WebOvice",
      "works.item8.statValue": "Vlastní",
      "works.item8.stat": "portfolio web",
      "works.item8.title": "Web WebOvice",
      "works.item8.body":
        "Prezentační web agentury — <strong>služby, práce i kontakt</strong> na jednom místě, rychlé načítání a bilingvní obsah.",
      "works.tag.websites": "Weby",
      "works.tag.energy": "Energetika",
      "works.tag.travel": "Turistika",
      "works.cta": "Všechny moje práce",

      "stack.title": "Můj TECH STACK",
      "stack.more": "+ další",

      "refs.kicker": "[ REFERENCE ]",
      "refs.title": "Co říkají klienti",
      "refs.1.quote":
        "„Dřív jsme přepisovali stavy měřidel ručně a zabralo to spoustu času. Snap Meter to zvládne rychle a spolehlivě — <strong>ušetřilo nám to desítky hodin týdně</strong> a data máme rovnou v Excelu bez chyb.\"",
      "refs.1.name": "Miroslav Pěček",
      "refs.1.role": "technik",
      "refs.1.author": "Miroslav Pěček (technik)",
      "refs.2.quote":
        "„Vývoj webu zabral opravdu krátkou dobu. Web funguje lépe, než jsme předpokládali. Proces školení je opravdu jednoduchý a automatizovaný pro rychlé generování certifikátů — <strong>od objednávky k certifikátu během několika chvil</strong>. WebOvice se nám také stará o marketing. Můžeme jen doporučit.\"",
      "refs.2.name": "Karel Hrbek",
      "refs.2.role": "majitel, Onlineškolení.eu",
      "refs.2.author": "Karel Hrbek (majitel) — Onlineškolení.eu",
      "refs.3.quote":
        "„Web Prokat Invest nám dal důvěryhodnou online prezentaci služeb. Aktualizace, drobné opravy i běžný provoz — <strong>vše řeší WebOvice</strong>, takže se můžeme soustředit na klienty.\"",
      "refs.3.name": "Vladimír Škrlant",
      "refs.3.role": "majitel, Web Prokat Invest",
      "refs.3.author": "Vladimír Škrlant (majitel) — Web Prokat Invest",
      "refs.5.quote":
        "„Sofisticator nám velkým způsobem ulehčil celý proces revizí. Nejen, že je eviduje a hlídá termíny, ale automaticky generuje a posílá platné protokoly. <strong>Dvěma kliknutími letí protokol přímo ke klientovi.</strong> Přidání jakékoliv funkce je pro nás otázka jednoho telefonátu :).\"",
      "refs.5.name": "Karel Hrbek",
      "refs.5.role": "majitel, Sofisticator",
      "refs.5.author": "Karel Hrbek (majitel) — Sofisticator",
      "refs.6.quote":
        "„Od naší první schůzky byl web online <strong>asi za 2 týdny</strong>. Spolupráce s vývojářem byla opravdu příjemná a vše splnil dle našich požadavků. Rozhodně budeme udržovat vztah i do časů budoucích.\"",
      "refs.6.name": "AndeStay Hostel",
      "refs.6.role": "majitel, AndeStay Hostel",
      "refs.6.author": "AndeStay Hostel — majitel",
      "refs.7.quote":
        "„Hosté si rezervují přímo u nás a platíme méně na jiných platformách. Webovice nám doručili tento systém. <strong>Spolupráce byla rychlá a bez problémů.</strong> Nejvíce si vážíme přímočarosti a ochoty vývojáře splnit všechny naše požadavky za krátkou dobu.\"",
      "refs.7.name": "Refugio de Mery",
      "refs.7.role": "majitel, Refugio de Mery",
      "refs.7.author": "Refugio de Mery — majitel",
      "refs.tag.websites": "Weby",

      "pricing.title": "Ceník",
      "pricing.intro":
        "Neváhejte se nás zeptat na individuální nabídku.",
      "pricing.per.month": "/ měsíc",
      "pricing.per.year": "/ rok",
      "pricing.maint.kicker": "Bez starostí",
      "pricing.maint.title": "Správa webu",
      "pricing.maint.desc":
        "Postaráme se o to, aby váš web fungoval, byl v bezpečí a vždy aktuální. Vy se můžete věnovat svému byznysu.",
      "pricing.maint.f1": "Aktualizace a bezpečnost",
      "pricing.maint.f2": "Monitoring a zálohy",
      "pricing.maint.f3": "Drobné úpravy a opravy",
      "pricing.maint.f4": "Prioritní podpora",
      "pricing.maint.f5": "Měsíční přehled o stavu",
      "pricing.maint.month": "od 1&nbsp;000&nbsp;Kč",
      "pricing.maint.yearNote": "nebo ",
      "pricing.maint.year": "od 10&nbsp;000&nbsp;Kč",
      "pricing.maint.cta": "Chci správu webu",
      "pricing.web.kicker": "Vaše online vizitka",
      "pricing.web.title": "Web na míru",
      "pricing.web.desc":
        "Moderní a rychlé webové stránky, které skvěle vypadají, přitahují zákazníky a dávají smysl.",
      "pricing.web.f1": "Firemní weby a landing pages",
      "pricing.web.f2": "E-shopy a rezervační systémy",
      "pricing.web.f3": "E-learningové platformy",
      "pricing.web.f4": "Základní SEO a analytika",
      "pricing.web.f5": "Nasazení a zaškolení",
      "pricing.web.price": "od 10&nbsp;000&nbsp;Kč",
      "pricing.web.note": "Cena se odvíjí od rozsahu a požadavků.",
      "pricing.web.cta": "Chci nový web",
      "pricing.mkt.kicker": "Více zákazníků",
      "pricing.mkt.title": "Online marketing",
      "pricing.mkt.desc":
        "Pomáháme firmám růst díky promyšlenému marketingu, který přináší reálné výsledky.",
      "pricing.mkt.f1": "Správa Google Ads a Meta Ads",
      "pricing.mkt.f2": "SEO a obsahový marketing",
      "pricing.mkt.f3": "Sociální sítě a e-mailing",
      "pricing.mkt.f4": "Tvorba reklamních kreativ (AI)",
      "pricing.mkt.f5": "Analytika a pravidelné reporty",
      "pricing.mkt.price": "od 4&nbsp;000&nbsp;Kč",
      "pricing.mkt.cta": "Zobrazit balíčky",
      "pricing.mkt.ctaHide": "Skrýt balíčky",
      "pricing.ai.kicker": "Efektivněji",
      "pricing.ai.title": "AI & automatizace",
      "pricing.ai.desc":
        "Hledáme způsoby, jak pomocí automatizace a AI zjednodušit vaši práci, ušetřit čas a peníze.",
      "pricing.ai.f1": "Automatizace procesů a reportů",
      "pricing.ai.f2": "Propojení systémů a API",
      "pricing.ai.f3": "Zpracování dokumentů (OCR)",
      "pricing.ai.f4": "Interní aplikace a nástroje",
      "pricing.ai.f5": "Datová analýza a AI řešení",
      "pricing.ai.price": "Individuální nabídka",
      "pricing.ai.note": "Nezávazná analýza procesu zdarma.",
      "pricing.ai.cta": "Chci nabídku",
      "pricing.packs.title": "Online marketing — balíčky",
      "pricing.packs.budgetNote": "Reklamní rozpočet není součástí ceny.",
      "pricing.packs.start.name": "START",
      "pricing.packs.start.price": "od 4&nbsp;000&nbsp;Kč",
      "pricing.packs.start.for": "Pro menší firmy, které potřebují začít.",
      "pricing.packs.start.f1": "Google Ads / Meta Ads",
      "pricing.packs.start.f2": "Základní správa kampaní",
      "pricing.packs.start.f3": "Měření konverzí",
      "pricing.packs.start.f4": "Měsíční optimalizace",
      "pricing.packs.start.f5": "Jednoduchý report",
      "pricing.packs.start.cta": "Chci START",
      "pricing.packs.growth.name": "RŮST",
      "pricing.packs.growth.price": "od 8&nbsp;000&nbsp;Kč",
      "pricing.packs.growth.for": "Pro firmy, které chtějí aktivně získávat zákazníky.",
      "pricing.packs.growth.f1": "Google Ads + Meta",
      "pricing.packs.growth.f2": "Správa a optimalizace kampaní",
      "pricing.packs.growth.f3": "SEO základ",
      "pricing.packs.growth.f4": "Analytika a konverze",
      "pricing.packs.growth.f5": "Tvorba reklamních kreativ",
      "pricing.packs.growth.f6": "Pravidelný report",
      "pricing.packs.growth.cta": "Chci RŮST",
      "pricing.packs.full.name": "KOMPLET",
      "pricing.packs.full.price": "od 15&nbsp;000&nbsp;Kč",
      "pricing.packs.full.for": "Externí digitální oddělení pro firmu.",
      "pricing.packs.full.f1": "Google Ads + Meta",
      "pricing.packs.full.f2": "SEO",
      "pricing.packs.full.f3": "Sociální sítě",
      "pricing.packs.full.f4": "E-mail marketing",
      "pricing.packs.full.f5": "Obsah",
      "pricing.packs.full.f6": "AI tvorba reklamních kreativ",
      "pricing.packs.full.f7": "Analytika",
      "pricing.packs.full.f8": "Pravidelné optimalizace",
      "pricing.packs.full.f9": "Konzultace",
      "pricing.packs.full.cta": "Chci KOMPLET",

      "about.kicker": "[ O MNĚ ]",
      "aboutPage.kicker": "[ O NÁS ]",
      "about.title": "Za WebOvice stojí Miroslav Pěček",
      "about.body":
        "Absolvent elektro-průmyslovky, který zamířil do energetiky — správa kotelen, tepelných čerpadel a FVE, dálkové odečty měřidel, vzdálený dohled a ovládání i instalace elektrických prvků v rozvaděčích MaR. Cestou jsem si zamiloval i druhou stranu mince: <strong>kód</strong>. Dnes stavím weby, appky a AI automatizace a technické řemeslo spojuju se softwarem tam, kde to dává smysl.",
      "aboutPage.title": "Technologie nás baví. Ještě víc nás baví, když dávají smysl.",
      "aboutPage.body":
        "<p>WebOvice spojuje lidi se silným technickým základem a dlouholetými zkušenostmi v oblasti IT, online marketingu a energetiky. Díky propojení těchto světů se na firmy nedíváme jen pohledem webu nebo jedné aplikace. Hledáme místa, kde mohou technologie ušetřit práci, zjednodušit procesy a pomoci podnikání růst.</p><p>Stavíme weby a aplikace, automatizujeme rutinní práci, propojujeme systémy a pomáháme firmám s jejich fungováním v digitálním prostředí. Když už něco vytváříme, chceme, aby to mělo skutečný přínos – ne aby to byla technologie jen pro technologii.</p><p><strong>Nejsme továrna na weby.</strong> Ke každému projektu přistupujeme individuálně a nejdříve chceme pochopit, co má technologie skutečně vyřešit.</p>",
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
      "contact.form.service.hint": "Můžete vybrat více služeb.",
      "contact.form.service.required": "Vyberte alespoň jednu službu.",
      "contact.form.service.placeholder": "Vyberte…",
      "contact.form.service.toggle": "Vybrat služby",
      "contact.form.service.toggleEdit": "Upravit výběr",
      "contact.form.service.toggleClose": "Sbalit výběr",
      "contact.form.service.done": "Hotovo",
      "contact.form.pack": "Marketingový balíček",
      "contact.form.pack.hint": "Volitelné — vyberte konkrétní balíček.",
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
        "WebOvice work — Prokat Invest, onlineskolení.eu, WebOvice, Snap Meter, AndeStay Hostel and Refugio de Mery.",
      "meta.about.title": "About — WebOvice",
      "meta.about.description":
        "About WebOvice. Technology that makes sense: websites, apps, automation, and digital growth for businesses.",
      "meta.404.title": "404 — page not found | WebOvice",
      "meta.404.description": "Page not found — WebOvice. Go back home or to contact.",

      "hero.title.line1": "Turning Business into",
      "hero.title.line2": "AI-Powered Machine.",
      "hero.subtitle":
        "A results-focused partner — I’ll help you <strong>automate processes</strong>, <strong>optimize operations</strong>, and scale faster with <strong>websites, apps, and AI solutions</strong>.",
      "hero.cta": "Free, no-obligation consultation",
      "hero.quotes.0.text": "90% time saved on meter transcription.",
      "hero.quotes.0.author": "Energy sector — Snap Meter project",
      "hero.quotes.1.text": "Website online in a few days, content management without code.",
      "hero.quotes.1.author": "Client — company website in Framer",
      "hero.quotes.2.text": "0% AI hallucinations — data straight into Excel.",
      "hero.quotes.2.author": "Snap Meter — AI automation",
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
      "works.item1.title": "Snap Meter — from photos to Excel",
      "works.item1.body":
        "For energy companies and anyone who types values from photos: AI reads them and <strong>writes straight into Excel</strong> — less manual work, fewer mistakes.",
      "works.item2.statValue": "E-learning",
      "works.item2.stat": "with certificates",
      "works.item2.title": "onlineskolení.eu website",
      "works.item2.body":
        "An e-learning training system with <strong>automatic certificate generation</strong> — everything easy and fast, from course to credential.",
      "works.item2.linkLabel": "Open onlineskolení.eu website",
      "works.item3.linkLabel": "Open Prokat Invest website",
      "works.item3.statValue": "Clear",
      "works.item3.stat": "path to inquiry",
      "works.item3.title": "Prokat Invest website",
      "works.item3.body":
        "Corporate site for energy — <strong>professional service presentation</strong> and fast contact.",
      "works.item5.statValue": "A few clicks",
      "works.item5.stat": "revision to protocol",
      "works.item5.title": "Sofisticator — revision management & generation",
      "works.item5.body":
        "From revision to the customer protocol — <strong>fully automated in a few clicks</strong>. Records, deadlines, and outputs in one place.",
      "works.item6.linkLabel": "Open AndeStay Hostel website",
      "works.item6.statValue": "QloApps",
      "works.item6.stat": "+ system in progress",
      "works.item6.title": "AndeStay Hostel website",
      "works.item6.body":
        "A mountain hostel site in Peru with online booking via <strong>QloApps</strong> — a custom reservation system is in development.",
      "works.item7.linkLabel": "Open Refugio de Mery website",
      "works.item7.statValue": "QloApps",
      "works.item7.stat": "+ system in progress",
      "works.item7.title": "Refugio de Mery website",
      "works.item7.body":
        "A coffee farm stay on the Salkantay Trek — booking via <strong>QloApps</strong>, custom system in development. Rooms, Tour de Café, and farm meals.",
      "works.item8.linkLabel": "Open WebOvice website",
      "works.item8.statValue": "Own",
      "works.item8.stat": "portfolio site",
      "works.item8.title": "WebOvice website",
      "works.item8.body":
        "Agency presentation site — <strong>services, work, and contact</strong> in one place, fast loading and bilingual content.",
      "works.tag.websites": "Websites",
      "works.tag.energy": "Energy",
      "works.tag.travel": "Travel",
      "works.cta": "All my work",

      "stack.title": "My TECH STACK",
      "stack.more": "+ more",

      "refs.kicker": "[ TESTIMONIALS ]",
      "refs.title": "What clients say",
      "refs.1.quote":
        "“We used to copy meter readings by hand and it took forever. Snap Meter does it fast and reliably — it <strong>saved us dozens of hours a week</strong>, with data straight into Excel and far fewer mistakes.”",
      "refs.1.name": "Miroslav Pěček",
      "refs.1.role": "technician",
      "refs.1.author": "Miroslav Pěček (technician)",
      "refs.2.quote":
        "“The website was built really quickly. It works better than we expected. Training is simple and automated for fast certificate generation — <strong>from order to certificate in moments</strong>. WebOvice also handles our marketing. We can only recommend them.”",
      "refs.2.name": "Karel Hrbek",
      "refs.2.role": "owner, Onlineškolení.eu",
      "refs.2.author": "Karel Hrbek (owner) — Onlineškolení.eu",
      "refs.3.quote":
        "“The Prokat Invest website gave us a credible online presentation of our services. Updates, small fixes, and day-to-day upkeep — <strong>WebOvice handles it all</strong>, so we can focus on clients.”",
      "refs.3.name": "Vladimír Škrlant",
      "refs.3.role": "owner, Prokat Invest website",
      "refs.3.author": "Vladimír Škrlant (owner) — Prokat Invest website",
      "refs.5.quote":
        "“Sofisticator made our whole revision process much easier. It not only records them and tracks deadlines, but also automatically generates and sends valid protocols. <strong>With two clicks, the protocol goes straight to the client.</strong> Adding any feature is just one phone call for us :).”",
      "refs.5.name": "Karel Hrbek",
      "refs.5.role": "owner, Sofisticator",
      "refs.5.author": "Karel Hrbek (owner) — Sofisticator",
      "refs.6.quote":
        "“From our first meeting, the site was online in <strong>about 2 weeks</strong>. Working with the developer was really pleasant and everything matched our requirements. We’ll definitely keep the relationship going into the future.”",
      "refs.6.name": "AndeStay Hostel",
      "refs.6.role": "owner, AndeStay Hostel",
      "refs.6.author": "AndeStay Hostel — owner",
      "refs.7.quote":
        "“Guests book directly with us and we pay less on other platforms. Webovice delivered this system. <strong>The collaboration was fast and problem-free.</strong> What we value most is the developer’s straightforward approach and willingness to meet all our requirements in a short time.”",
      "refs.7.name": "Refugio de Mery",
      "refs.7.role": "owner, Refugio de Mery",
      "refs.7.author": "Refugio de Mery — owner",
      "refs.tag.websites": "Websites",

      "pricing.title": "Pricing",
      "pricing.intro":
        "Feel free to ask us for a custom quote.",
      "pricing.per.month": "/ month",
      "pricing.per.year": "/ year",
      "pricing.maint.kicker": "Worry-free",
      "pricing.maint.title": "Website maintenance",
      "pricing.maint.desc":
        "We keep your site running, secure, and up to date — so you can focus on your business.",
      "pricing.maint.f1": "Updates and security",
      "pricing.maint.f2": "Monitoring and backups",
      "pricing.maint.f3": "Small tweaks and fixes",
      "pricing.maint.f4": "Priority support",
      "pricing.maint.f5": "Monthly status overview",
      "pricing.maint.month": "from CZK&nbsp;1,000",
      "pricing.maint.yearNote": "or ",
      "pricing.maint.year": "from CZK&nbsp;10,000",
      "pricing.maint.cta": "I want website maintenance",
      "pricing.web.kicker": "Your online presence",
      "pricing.web.title": "Custom website",
      "pricing.web.desc":
        "Modern, fast websites that look great, attract customers, and make sense for your business.",
      "pricing.web.f1": "Business sites and landing pages",
      "pricing.web.f2": "E-shops and booking systems",
      "pricing.web.f3": "E-learning platforms",
      "pricing.web.f4": "Basic SEO and analytics",
      "pricing.web.f5": "Launch and training",
      "pricing.web.price": "from CZK&nbsp;10,000",
      "pricing.web.note": "Price depends on scope and requirements.",
      "pricing.web.cta": "I want a new website",
      "pricing.mkt.kicker": "More customers",
      "pricing.mkt.title": "Online marketing",
      "pricing.mkt.desc":
        "We help businesses grow with thoughtful marketing that delivers real results.",
      "pricing.mkt.f1": "Google Ads and Meta Ads management",
      "pricing.mkt.f2": "SEO and content marketing",
      "pricing.mkt.f3": "Social media and email",
      "pricing.mkt.f4": "Ad creative production (AI)",
      "pricing.mkt.f5": "Analytics and regular reports",
      "pricing.mkt.price": "from CZK&nbsp;4,000",
      "pricing.mkt.cta": "View packages",
      "pricing.mkt.ctaHide": "Hide packages",
      "pricing.ai.kicker": "More efficiently",
      "pricing.ai.title": "AI & automation",
      "pricing.ai.desc":
        "We look for ways to simplify your work with automation and AI — saving time and money.",
      "pricing.ai.f1": "Process and report automation",
      "pricing.ai.f2": "System integrations and APIs",
      "pricing.ai.f3": "Document processing (OCR)",
      "pricing.ai.f4": "Internal apps and tools",
      "pricing.ai.f5": "Data analysis and AI solutions",
      "pricing.ai.price": "Custom quote",
      "pricing.ai.note": "Free, no-obligation process review.",
      "pricing.ai.cta": "I want a quote",
      "pricing.packs.title": "Online marketing — packages",
      "pricing.packs.budgetNote": "Ad spend is not included in the price.",
      "pricing.packs.start.name": "START",
      "pricing.packs.start.price": "from CZK&nbsp;4,000",
      "pricing.packs.start.for": "For smaller businesses that need to get started.",
      "pricing.packs.start.f1": "Google Ads / Meta Ads",
      "pricing.packs.start.f2": "Basic campaign management",
      "pricing.packs.start.f3": "Conversion tracking",
      "pricing.packs.start.f4": "Monthly optimization",
      "pricing.packs.start.f5": "Simple report",
      "pricing.packs.start.cta": "I want START",
      "pricing.packs.growth.name": "GROWTH",
      "pricing.packs.growth.price": "from CZK&nbsp;8,000",
      "pricing.packs.growth.for": "For businesses that want to actively acquire customers.",
      "pricing.packs.growth.f1": "Google Ads + Meta",
      "pricing.packs.growth.f2": "Campaign management and optimization",
      "pricing.packs.growth.f3": "SEO basics",
      "pricing.packs.growth.f4": "Analytics and conversions",
      "pricing.packs.growth.f5": "Ad creative production",
      "pricing.packs.growth.f6": "Regular reporting",
      "pricing.packs.growth.cta": "I want GROWTH",
      "pricing.packs.full.name": "COMPLETE",
      "pricing.packs.full.price": "from CZK&nbsp;15,000",
      "pricing.packs.full.for": "An external digital team for your business.",
      "pricing.packs.full.f1": "Google Ads + Meta",
      "pricing.packs.full.f2": "SEO",
      "pricing.packs.full.f3": "Social media",
      "pricing.packs.full.f4": "Email marketing",
      "pricing.packs.full.f5": "Content",
      "pricing.packs.full.f6": "AI ad creative production",
      "pricing.packs.full.f7": "Analytics",
      "pricing.packs.full.f8": "Ongoing optimization",
      "pricing.packs.full.f9": "Consulting",
      "pricing.packs.full.cta": "I want COMPLETE",

      "about.kicker": "[ ABOUT ME ]",
      "aboutPage.kicker": "[ ABOUT US ]",
      "about.title": "Behind WebOvice is Miroslav Pěček",
      "about.body":
        "An electrical trade-school graduate who moved into energy — operating boiler rooms, heat pumps, and PV, plus remote meter reading, remote monitoring and control, and installing electrical components in MaR switchboards. Along the way I fell for the other side of the coin: <strong>code</strong>. Today I build websites, apps, and AI automation, and I connect technical craft with software where it makes sense.",
      "aboutPage.title": "We love technology. Even more when it makes sense.",
      "aboutPage.body":
        "<p>WebOvice brings together people with a strong technical foundation and years of experience in IT, online marketing, and energy. By connecting these worlds, we don’t look at companies through the lens of a website or a single app alone. We look for places where technology can save work, simplify processes, and help a business grow.</p><p>We build websites and applications, automate routine work, connect systems, and help companies operate in the digital environment. When we create something, we want it to deliver real value — not technology for technology’s sake.</p><p><strong>We’re not a website factory.</strong> We approach every project individually and first want to understand what the technology should actually solve.</p>",
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
      "contact.form.service.hint": "You can select more than one service.",
      "contact.form.service.required": "Please select at least one service.",
      "contact.form.service.placeholder": "Select…",
      "contact.form.service.toggle": "Select services",
      "contact.form.service.toggleEdit": "Edit selection",
      "contact.form.service.toggleClose": "Collapse selection",
      "contact.form.service.done": "Done",
      "contact.form.pack": "Marketing package",
      "contact.form.pack.hint": "Optional — pick a specific package.",
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
