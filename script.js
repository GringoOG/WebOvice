const menuBtn = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuBtn?.addEventListener("click", () => {
  mobileNav?.classList.toggle("open");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

document.querySelectorAll(".accordion-item").forEach((item) => {
  const trigger = item.querySelector(".accordion-trigger");
  trigger?.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    item.closest(".accordion")?.querySelectorAll(".accordion-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".accordion-trigger")?.setAttribute("aria-expanded", "false");
      }
    });
    item.classList.toggle("open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });
});

document.getElementById("year").textContent = String(new Date().getFullYear());

/* ── Hero badge — rotující citáty ── */
const heroQuoteEl = document.getElementById("hero-quote");
const heroQuoteTextEl = heroQuoteEl?.querySelector(".hero-quote-text");
const heroQuoteAuthorEl = heroQuoteEl?.querySelector(".hero-quote-author");

const heroQuotes = [
  {
    text: "90 % úspora času na přepisu měřidel.",
    author: "Prokat Invest — projekt auto_mat",
  },
  {
    text: "Web online za pár dnů, správa obsahu bez kódu.",
    author: "Klient — firemní web ve Frameru",
  },
  {
    text: "0 % halucinací AI — data rovnou v Excelu.",
    author: "Prokat Invest — AI automatizace",
  },
  {
    text: "Měsíční retainer = web běží bez starostí.",
    author: "Klient — správa & údržba",
  },
];

if (heroQuoteEl && heroQuoteTextEl && heroQuoteAuthorEl && heroQuotes.length) {
  let heroQuoteIndex = 0;
  const quoteIntervalMs = 4500;
  const quoteFadeMs = 450;
  let quoteTimerId = null;

  const setHeroQuoteContent = (index) => {
    const quote = heroQuotes[index];
    heroQuoteTextEl.textContent = `„${quote.text}"`;
    heroQuoteAuthorEl.textContent = quote.author;
  };

  const cycleHeroQuote = () => {
    heroQuoteEl.classList.add("is-leaving");

    window.setTimeout(() => {
      heroQuoteIndex = (heroQuoteIndex + 1) % heroQuotes.length;
      setHeroQuoteContent(heroQuoteIndex);
      heroQuoteEl.classList.remove("is-leaving");
      heroQuoteEl.classList.add("is-entering");

      requestAnimationFrame(() => {
        heroQuoteEl.classList.remove("is-entering");
      });
    }, quoteFadeMs);
  };

  setHeroQuoteContent(heroQuoteIndex);

  const startHeroQuoteRotation = () => {
    if (quoteTimerId) {
      window.clearInterval(quoteTimerId);
    }
    quoteTimerId = window.setInterval(cycleHeroQuote, quoteIntervalMs);
  };

  const stopHeroQuoteRotation = () => {
    if (quoteTimerId) {
      window.clearInterval(quoteTimerId);
      quoteTimerId = null;
    }
  };

  startHeroQuoteRotation();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopHeroQuoteRotation();
    } else {
      startHeroQuoteRotation();
    }
  });
}

/* ── Kontaktní formulář ── */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const defaultBtnText = submitBtn?.textContent ?? "Odeslat poptávku";

  let statusEl = document.getElementById("form-status");
  if (!statusEl) {
    statusEl = document.createElement("p");
    statusEl.id = "form-status";
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");
    statusEl.hidden = true;
    statusEl.className = "form-status";
    contactForm.insertAdjacentElement("afterend", statusEl);
  }

  const showStatus = (message, type = "success") => {
    statusEl.textContent = message;
    statusEl.dataset.type = type;
    statusEl.hidden = false;
  };

  const hideStatus = () => {
    statusEl.hidden = true;
    statusEl.textContent = "";
    delete statusEl.dataset.type;
  };

  const setSubmitting = (isSubmitting) => {
    if (submitBtn) {
      submitBtn.disabled = isSubmitting;
      submitBtn.textContent = isSubmitting ? "Odesílám..." : defaultBtnText;
    }
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideStatus();

    if (!contactForm.reportValidity()) {
      return;
    }

    const payload = {
      jmeno: contactForm.elements.Jmeno?.value.trim() ?? "",
      email: contactForm.elements.Email?.value.trim() ?? "",
      sluzba: contactForm.elements.Sluzba?.value ?? "",
      poznamka: contactForm.elements.Poznamka?.value.trim() ?? "",
    };

    setSubmitting(true);

    try {
      /*
       * PRO PROVOZ NAOSTRO — nahraď simulaci skutečným voláním API:
       *
       * const response = await fetch("https://formspree.io/f/TVUJ_ID", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *     Accept: "application/json",
       *   },
       *   body: JSON.stringify(payload),
       * });
       *
       * // Resend / vlastní backend:
       * const response = await fetch("https://api.webovice.cz/contact", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify(payload),
       * });
       *
       * if (!response.ok) throw new Error("Odeslání se nezdařilo.");
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      contactForm.reset();
      showStatus("Díky za poptávku, brzy se ozvu!");
    } catch (error) {
      console.error("Chyba při odesílání formuláře:", error);
      showStatus("Odeslání se nezdařilo. Zkuste to prosím znovu, nebo napište na email.", "error");
    } finally {
      setSubmitting(false);
    }
  });
}

/* ── Scroll-driven sekce #vyzvy ── */
const vyzvySection = document.getElementById("vyzvy");

if (vyzvySection) {
  const vyzvyCards = [
    { el: vyzvySection.querySelector(".card-1"), start: 0.1, end: 0.4 },
    { el: vyzvySection.querySelector(".card-2"), start: 0.25, end: 0.55 },
    { el: vyzvySection.querySelector(".card-3"), start: 0.4, end: 0.7 },
    { el: vyzvySection.querySelector(".card-4"), start: 0.55, end: 0.85 },
  ].filter((item) => item.el);

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const getSectionProgress = (section) => {
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) {
      return 0;
    }

    const scrolled = -section.getBoundingClientRect().top;
    return clamp(scrolled / scrollableDistance, 0, 1);
  };

  /** Fade-in → peak → fade-out (trojúhelníková křivka v rozmezí start–end) */
  const getRevealProgress = (progress, start, end) => {
    if (progress <= start || progress >= end) {
      return 0;
    }

    const mid = (start + end) / 2;

    if (progress <= mid) {
      return (progress - start) / (mid - start);
    }

    return (end - progress) / (end - mid);
  };

  const updateVyzvyCards = () => {
    const progress = getSectionProgress(vyzvySection);

    vyzvyCards.forEach(({ el, start, end }) => {
      const reveal = getRevealProgress(progress, start, end);
      el.style.setProperty("--reveal", reveal.toFixed(4));
    });
  };

  let vyzvyTicking = false;

  const onVyzvyScroll = () => {
    if (vyzvyTicking) {
      return;
    }

    vyzvyTicking = true;
    requestAnimationFrame(() => {
      updateVyzvyCards();
      vyzvyTicking = false;
    });
  };

  window.addEventListener("scroll", onVyzvyScroll, { passive: true });
  window.addEventListener("resize", onVyzvyScroll, { passive: true });
  updateVyzvyCards();
}
