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

/* ── Pricing: marketing packages toggle ── */
(() => {
  const toggle = document.getElementById("pricing-packages-toggle");
  const panel = document.getElementById("pricing-packages");
  const label = toggle?.querySelector("[data-pricing-cta-label]");
  if (!toggle || !panel || !label) return;

  const syncLabel = () => {
    const open = !panel.hasAttribute("hidden");
    const key = open
      ? toggle.getAttribute("data-i18n-close")
      : toggle.getAttribute("data-i18n-open");
    const text = key && window.WebOviceI18n?.t ? window.WebOviceI18n.t(key) : null;
    if (text) {
      label.textContent = text;
      label.setAttribute("data-i18n", key);
    }
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    const willOpen = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden", !willOpen);
    syncLabel();
    if (willOpen) {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  window.addEventListener("webovice:langchange", syncLabel);
})();

document.getElementById("year").textContent = String(new Date().getFullYear());

/* ── Hero badge — rotující citáty ── */
const heroQuoteEl = document.getElementById("hero-quote");
const heroQuoteTextEl = heroQuoteEl?.querySelector(".hero-quote-text");
const heroQuoteAuthorEl = heroQuoteEl?.querySelector(".hero-quote-author");

const getHeroQuotes = () => {
  const t = window.WebOviceI18n?.t;
  if (typeof t === "function") {
    return [0, 1, 2, 3].map((i) => ({
      text: t(`hero.quotes.${i}.text`),
      author: t(`hero.quotes.${i}.author`),
    }));
  }
  return [
    {
      text: "90 % úspora času na přepisu měřidel.",
      author: "Energetika — projekt Snap Meter",
    },
    {
      text: "Web online za pár dnů, správa obsahu bez kódu.",
      author: "Klient — firemní web ve Frameru",
    },
    {
      text: "0 % halucinací AI — data rovnou v Excelu.",
      author: "Snap Meter — AI automatizace",
    },
    {
      text: "Měsíční retainer = web běží bez starostí.",
      author: "Klient — správa & údržba",
    },
  ];
};

if (heroQuoteEl && heroQuoteTextEl && heroQuoteAuthorEl) {
  let heroQuoteIndex = 0;
  const quoteIntervalMs = 4500;
  const quoteFadeMs = 450;
  let quoteTimerId = null;

  const setHeroQuoteContent = (index) => {
    const quotes = getHeroQuotes();
    const quote = quotes[index % quotes.length];
    heroQuoteTextEl.textContent = `„${quote.text}"`;
    heroQuoteAuthorEl.textContent = quote.author;
  };

  const cycleHeroQuote = () => {
    heroQuoteEl.classList.add("is-leaving");

    window.setTimeout(() => {
      const quotes = getHeroQuotes();
      heroQuoteIndex = (heroQuoteIndex + 1) % quotes.length;
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

  window.addEventListener("webovice:langchange", () => {
    setHeroQuoteContent(heroQuoteIndex);
  });
}

/* ── Kontaktní formulář ── */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const serviceInputs = Array.from(contactForm.querySelectorAll('input[name="Sluzba"]'));
  const marketingInput = contactForm.querySelector('#service-marketing, input[name="Sluzba"][value="marketing"]');
  const packsField = document.getElementById("marketing-packs");
  const packInputs = Array.from(contactForm.querySelectorAll('input[name="Balicek"]'));
  const servicesField = document.getElementById("form-services");
  const servicesToggle = document.getElementById("services-menu-toggle");
  const servicesDone = document.getElementById("services-menu-done");
  const servicesToggleLabel = servicesToggle?.querySelector("[data-services-toggle-label]");
  const tForm = (key, fallback) => window.WebOviceI18n?.t?.(key) ?? fallback;
  const SERVICE_LABEL_KEYS = {
    ai: "contact.form.opt.ai",
    elearning: "contact.form.opt.elearning",
    energy: "contact.form.opt.energy",
    apps: "contact.form.opt.apps",
    marketing: "contact.form.opt.marketing",
    ops: "contact.form.opt.ops",
    web: "contact.form.opt.web",
    other: "contact.form.opt.other",
  };
  const PACK_LABEL_KEYS = {
    start: "pricing.packs.start.name",
    growth: "pricing.packs.growth.name",
    full: "pricing.packs.full.name",
  };

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
      submitBtn.textContent = isSubmitting
        ? tForm("contact.form.submitting", "Odesílám...")
        : tForm("contact.form.submit", "Odeslat poptávku");
    }
  };

  const getSelectedServices = () =>
    serviceInputs.filter((input) => input.checked).map((input) => input.value);

  const getSelectedPack = () => packInputs.find((input) => input.checked)?.value ?? "";

  const syncPackVisibility = () => {
    const show = Boolean(marketingInput?.checked);
    if (packsField) {
      packsField.hidden = !show;
    }
    if (!show) {
      packInputs.forEach((input) => {
        input.checked = false;
      });
    }
  };

  const isServicesOpen = () => Boolean(servicesField?.classList.contains("is-open"));

  const syncServicesToggleLabel = () => {
    if (!servicesToggleLabel) return;
    const open = isServicesOpen();
    const count = getSelectedServices().length;
    let key = "contact.form.service.toggle";
    let fallback = "Vybrat služby";
    if (open) {
      key = "contact.form.service.toggleClose";
      fallback = "Sbalit výběr";
    } else if (count > 0) {
      key = "contact.form.service.toggleEdit";
      fallback = "Upravit výběr";
    }
    const text = tForm(key, fallback);
    servicesToggleLabel.textContent = text;
    servicesToggleLabel.setAttribute("data-i18n", key);
    servicesToggle?.setAttribute("aria-expanded", String(open));
    if (servicesDone) {
      servicesDone.hidden = !open;
    }
  };

  const setServicesOpen = (open) => {
    servicesField?.classList.toggle("is-open", open);
    syncServicesToggleLabel();
  };

  const syncServiceValidity = () => {
    const message =
      getSelectedServices().length > 0
        ? ""
        : tForm("contact.form.service.required", "Vyberte alespoň jednu službu.");
    serviceInputs.forEach((input, index) => {
      input.setCustomValidity(index === 0 ? message : "");
    });
  };

  const applyServiceQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("service");
    const pack = (params.get("pack") || "").trim().toLowerCase();

    if (raw) {
      const requested = raw
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);

      if (requested.length) {
        serviceInputs.forEach((input) => {
          input.checked = requested.includes(input.value);
        });
      }
    }

    if (pack && PACK_LABEL_KEYS[pack]) {
      if (marketingInput) {
        marketingInput.checked = true;
      }
      packInputs.forEach((input) => {
        input.checked = input.value === pack;
      });
    }

    syncPackVisibility();
    syncServiceValidity();
    setServicesOpen(false);
  };

  servicesToggle?.addEventListener("click", () => {
    setServicesOpen(!isServicesOpen());
  });

  servicesDone?.addEventListener("click", () => {
    setServicesOpen(false);
  });

  serviceInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input === marketingInput || input.value === "marketing") {
        syncPackVisibility();
      }
      syncServiceValidity();
      syncServicesToggleLabel();
    });
  });

  window.addEventListener("webovice:langchange", syncServicesToggleLabel);

  applyServiceQuery();
  syncServiceValidity();
  syncServicesToggleLabel();

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideStatus();
    syncServiceValidity();

    if (!contactForm.reportValidity()) {
      serviceInputs[0]?.focus();
      return;
    }

    const selected = getSelectedServices();
    const labels = selected.map((value) => {
      const key = SERVICE_LABEL_KEYS[value];
      return key ? tForm(key, value) : value;
    });
    const pack = getSelectedPack();
    const packLabel = pack ? tForm(PACK_LABEL_KEYS[pack], pack) : "";

    const payload = {
      jmeno: contactForm.elements.Jmeno?.value.trim() ?? "",
      email: contactForm.elements.Email?.value.trim() ?? "",
      sluzby: labels,
      sluzba: labels.join(", "),
      balicek: packLabel,
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
      syncPackVisibility();
      syncServiceValidity();
      setServicesOpen(false);
      showStatus(tForm("contact.form.success", "Díky za poptávku, brzy se ozvu!"));
    } catch (error) {
      console.error("Chyba při odesílání formuláře:", error);
      showStatus(
        tForm(
          "contact.form.error",
          "Odeslání se nezdařilo. Zkuste to prosím znovu, nebo napište na email."
        ),
        "error"
      );
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

/* ── Tech stack deck — auto-rotace balíčku ── */
const techStackDeck = document.getElementById("techStackDeck");

if (techStackDeck) {
  const stackCards = Array.from(techStackDeck.querySelectorAll(".stack-card"));
  const stackCardCount = stackCards.length;
  const stackReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stackRotationId = null;
  let stackDeckHovered = false;

  const resetStackOrder = () => {
    stackCards.forEach((card, index) => {
      card.style.setProperty("--card-index", String(index));
      card.style.zIndex = String(20 - index);
    });
  };

  const rotateStackOnce = () => {
    if (stackDeckHovered || stackCardCount < 2) {
      return;
    }

    stackCards.forEach((card) => {
      const currentIndex = Number(card.style.getPropertyValue("--card-index") || 0);
      const nextIndex = (currentIndex + 1) % stackCardCount;
      card.style.setProperty("--card-index", String(nextIndex));
      card.style.zIndex = String(20 - nextIndex);
    });
  };

  const startStackRotation = () => {
    if (stackReducedMotion || window.innerWidth <= 1024 || stackRotationId) {
      return;
    }

    stackRotationId = window.setInterval(rotateStackOnce, 1600);
  };

  const stopStackRotation = () => {
    if (stackRotationId) {
      window.clearInterval(stackRotationId);
      stackRotationId = null;
    }
  };

  resetStackOrder();
  startStackRotation();

  techStackDeck.addEventListener("mouseenter", () => {
    stackDeckHovered = true;
    stopStackRotation();
    resetStackOrder();
  });

  techStackDeck.addEventListener("mouseleave", () => {
    stackDeckHovered = false;
    resetStackOrder();
    startStackRotation();
  });

  techStackDeck.addEventListener("focusin", () => {
    stackDeckHovered = true;
    stopStackRotation();
    resetStackOrder();
  });

  techStackDeck.addEventListener("focusout", (event) => {
    if (techStackDeck.contains(event.relatedTarget)) {
      return;
    }

    stackDeckHovered = false;
    resetStackOrder();
    startStackRotation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1024) {
      stopStackRotation();
      resetStackOrder();
      return;
    }

    if (!stackDeckHovered) {
      startStackRotation();
    }
  });
}

/* ── Service cards — video na hover, lazy preload ── */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showServiceVideoFrame(video) {
  video.pause();

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return;
  }

  try {
    video.currentTime = 0;
  } catch (_) {
    // Ignore seek errors while the browser is still buffering.
  }
}

function resetServiceVideoState(video) {
  const visual = video.closest(".service-visual");

  visual?.classList.remove("is-playing");
  showServiceVideoFrame(video);
}

function ensureServiceVideoSource(video) {
  if (video.dataset.srcReady === "1") {
    return;
  }

  const sources = video.querySelectorAll("source[data-src]");
  if (!sources.length) {
    video.dataset.srcReady = "1";
    return;
  }

  sources.forEach((source) => {
    const src = source.getAttribute("data-src");
    if (src && !source.getAttribute("src")) {
      source.setAttribute("src", src);
    }
  });

  video.dataset.srcReady = "1";
  video.load();
}

function warmServiceVideo(video) {
  ensureServiceVideoSource(video);

  if (video.preload !== "auto") {
    video.preload = "auto";
  }

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    video.load();
  }
}

function playServiceVideo(video) {
  ensureServiceVideoSource(video);

  const startFromBeginning = () => {
    try {
      video.currentTime = 0;
    } catch (_) {
      // Ignore seek race while metadata is still loading.
    }
    video.play().catch(() => {});
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    startFromBeginning();
    return;
  }

  const onReady = () => {
    video.removeEventListener("canplay", onReady);
    startFromBeginning();
  };
  video.addEventListener("canplay", onReady, { once: true });
  video.load();
}

function primeServiceVideoPreview(video) {
  const prime = () => {
    if (!video.closest(".service-visual")?.classList.contains("is-playing")) {
      showServiceVideoFrame(video);
    }
  };

  video.addEventListener("loadeddata", prime);
  video.addEventListener("seeked", prime);

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    prime();
  }
}

(() => {
  const visuals = Array.from(document.querySelectorAll(".service-visual")).filter((visual) =>
    visual.querySelector(".service-video source")
  );

  if (!visuals.length) {
    return;
  }

  visuals.forEach((visual) => {
    const video = visual.querySelector(".service-video");
    if (!video) {
      return;
    }

    video.preload = "none";
    primeServiceVideoPreview(video);

    visual.addEventListener("mouseenter", () => {
      if (prefersReducedMotion.matches) {
        return;
      }

      visual.classList.add("is-playing");
      playServiceVideo(video);
    });

    visual.addEventListener("mouseleave", () => {
      resetServiceVideoState(video);
    });

    // Touch: first tap warms + plays; leave on scroll away via observer below.
    visual.addEventListener(
      "pointerenter",
      () => {
        if (prefersReducedMotion.matches) {
          return;
        }
        warmServiceVideo(video);
      },
      { passive: true }
    );
  });

  document.querySelectorAll(".service-card[data-service]").forEach((card) => {
    const goToContact = () => {
      const service = card.getAttribute("data-service");
      if (!service) return;
      window.location.href = `kontakt?service=${encodeURIComponent(service)}`;
    };

    card.addEventListener("click", goToContact);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      goToContact();
    });
  });

  const warmObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const video = entry.target.querySelector(".service-video");
        if (video) {
          warmServiceVideo(video);
        }
        warmObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "220px 0px",
      threshold: 0.05,
    }
  );

  visuals.forEach((visual) => warmObserver.observe(visual));

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) {
      return;
    }

    document.querySelectorAll(".service-video").forEach((video) => {
      resetServiceVideoState(video);
    });
  });

  prefersReducedMotion.addEventListener("change", () => {
    document.querySelectorAll(".service-video").forEach((video) => {
      resetServiceVideoState(video);
    });
  });
})();
/* ── Scroll reveal — sekce se pozvolna objeví ── */
(() => {
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!revealEls.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -18% 0px",
      threshold: 0.18,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ── Scroll timelines — fade-in + progress line (works + refs) ── */
(() => {
  const initScrollTimeline = (timelineId, progressId, itemSelector) => {
    const timeline = document.getElementById(timelineId);
    const progressEl = document.getElementById(progressId);
    const items = timeline ? Array.from(timeline.querySelectorAll(itemSelector)) : [];

    if (!timeline || !items.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-inview"));
      if (progressEl) {
        progressEl.style.height = "100%";
      }
      return;
    }

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-inview");
          itemObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.28,
      }
    );

    items.forEach((item) => itemObserver.observe(item));

    if (!progressEl) {
      return;
    }

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const start = viewH * 0.72;
      const end = viewH * 0.28;
      const raw = (start - rect.top) / (rect.height + (start - end));
      const clamped = Math.max(0, Math.min(1, raw));
      progressEl.style.height = `${(clamped * 100).toFixed(2)}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  };

  initScrollTimeline("worksTimeline", "worksTimelineProgress", "[data-timeline-item]");
})();

/* ── Refs showcase — infinite marquee + drag ── */
(() => {
  const section = document.getElementById("reference");
  const viewport = section?.querySelector("[data-refs-marquee]");
  const track = document.getElementById("refsShowcaseTrack");
  if (!section?.classList.contains("refs-showcase") || !viewport || !track) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const originals = Array.from(track.querySelectorAll("[data-refs-card]"));
  if (originals.length < 2) {
    return;
  }

  // Duplicate once for seamless loop
  originals.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("[data-i18n], [data-i18n-html]").forEach((el) => {
      el.removeAttribute("data-i18n");
      el.removeAttribute("data-i18n-html");
    });
    track.appendChild(clone);
  });

  let offset = 0;
  let loopWidth = 0;
  let paused = false;
  let dragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let lastTs = 0;
  let rafId = 0;
  const speed = 28; // px per second

  const measure = () => {
    const cards = track.querySelectorAll("[data-refs-card]");
    const half = Math.floor(cards.length / 2);
    if (half < 1) {
      return;
    }
    const first = cards[0];
    const mid = cards[half];
    loopWidth = mid.offsetLeft - first.offsetLeft;
    if (loopWidth > 0) {
      offset = ((offset % loopWidth) + loopWidth) % loopWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }
  };

  const wrapOffset = () => {
    if (loopWidth <= 0) {
      return;
    }
    offset = ((offset % loopWidth) + loopWidth) % loopWidth;
  };

  const tick = (ts) => {
    if (!lastTs) {
      lastTs = ts;
    }
    const dt = Math.min(32, ts - lastTs) / 1000;
    lastTs = ts;

    if (!paused && !dragging && !reduceMotion && loopWidth > 0) {
      offset += speed * dt;
      wrapOffset();
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    rafId = requestAnimationFrame(tick);
  };

  const onPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }
    dragging = true;
    paused = true;
    dragStartX = event.clientX;
    dragStartOffset = offset;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragging) {
      return;
    }
    const dx = event.clientX - dragStartX;
    offset = dragStartOffset - dx;
    wrapOffset();
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  };

  const onPointerUp = (event) => {
    if (!dragging) {
      return;
    }
    dragging = false;
    viewport.classList.remove("is-dragging");
    try {
      viewport.releasePointerCapture?.(event.pointerId);
    } catch {
      /* ignore */
    }
    paused = reduceMotion || viewport.matches(":hover");
    viewport.classList.toggle("is-paused", paused && !reduceMotion);
  };

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerUp);

  viewport.addEventListener("mouseenter", () => {
    paused = true;
    viewport.classList.add("is-paused");
  });
  viewport.addEventListener("mouseleave", () => {
    if (!dragging) {
      paused = reduceMotion;
      viewport.classList.remove("is-paused");
    }
  });

  measure();
  window.addEventListener("resize", measure);
  if (!reduceMotion) {
    rafId = requestAnimationFrame(tick);
  }

  // Re-measure after fonts/images settle
  requestAnimationFrame(() => {
    measure();
    setTimeout(measure, 300);
  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        lastTs = 0;
      }
    },
    { passive: true }
  );

  // Keep clone text in sync when language switches
  window.addEventListener("webovice:langchange", () => {
    const cards = Array.from(track.querySelectorAll("[data-refs-card]"));
    const half = Math.floor(cards.length / 2);
    for (let i = 0; i < half; i += 1) {
      cards[half + i].innerHTML = cards[i].innerHTML;
      cards[half + i].setAttribute("aria-hidden", "true");
    }
    measure();
  });
})();

/* ── Hero Ludek — pořád dokola, bez restartu při scrollu nahoru ── */
(() => {
  const video = document.querySelector("video.hero-ludek");
  if (!video) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  let savedTime = 0;
  let pausedByBrowser = false;

  const tryPlayNow = () => {
    if (document.hidden) {
      return;
    }
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  const rememberTime = () => {
    if (Number.isFinite(video.currentTime)) {
      savedTime = video.currentTime;
    }
  };

  const resumeWithoutRestart = () => {
    if (document.hidden) {
      return;
    }

    // Jen když prohlížeč video zastavil a případně seeknul na 0 — ne při přirozeném loopu.
    if (
      pausedByBrowser &&
      savedTime > 0.25 &&
      video.currentTime < 0.15 &&
      Number.isFinite(video.duration) &&
      video.duration > 1
    ) {
      try {
        video.currentTime = savedTime;
      } catch {
        /* ignore seek errors before metadata */
      }
    }

    tryPlayNow();
  };

  video.addEventListener("timeupdate", rememberTime);

  video.addEventListener("pause", () => {
    rememberTime();
    // ended + loop může krátce pausnout — to neber jako browser pause
    if (!video.ended) {
      pausedByBrowser = true;
    }
  });

  video.addEventListener("play", () => {
    pausedByBrowser = false;
  });

  // Spusť hned, jakmile jsou data — ať je pohyb vidět po načtení stránky.
  video.addEventListener("loadeddata", tryPlayNow);
  video.addEventListener("canplay", tryPlayNow);
  video.addEventListener("canplaythrough", tryPlayNow);

  // NEpauzovat při odscrollování. Když prohlížeč video stejně pozastaví,
  // při návratu / keepalive jen play() bez resetu na začátek.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          resumeWithoutRestart();
        }
      }
    },
    { threshold: 0 }
  );
  observer.observe(video);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      resumeWithoutRestart();
    } else {
      rememberTime();
    }
  });

  window.setInterval(() => {
    if (!document.hidden) {
      resumeWithoutRestart();
    }
  }, 2000);

  resumeWithoutRestart();
})();

/* ── Why-flow connectors: 1 svislá nit od loga + vodorovné větve ── */
(() => {
  const flow = document.querySelector(".why-flow");
  const svg = flow?.querySelector(".why-flow-lines");
  const core = flow?.querySelector(".why-flow-core");
  if (!flow || !svg || !core) {
    return;
  }

  const NS = "http://www.w3.org/2000/svg";
  const mobileMq = window.matchMedia("(max-width: 899px)");
  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let looping = false;

  const ensurePaths = (specs) => {
    let paths = Array.from(svg.querySelectorAll(".why-flow-path"));
    if (
      paths.length !== specs.length ||
      specs.some((spec, i) => paths[i]?.getAttribute("data-role") !== spec.role)
    ) {
      svg.replaceChildren(
        ...specs.map((spec) => {
          const path = document.createElementNS(NS, "path");
          path.setAttribute("class", `why-flow-path why-flow-path--${spec.role}`);
          path.setAttribute("data-role", spec.role);
          path.setAttribute("d", spec.d);
          return path;
        })
      );
      return;
    }
    paths.forEach((path, index) => {
      path.setAttribute("d", specs[index].d);
    });
  };

  const collectBranches = (selector, flowRect, fromLeft) =>
    Array.from(flow.querySelectorAll(selector)).map((card) => {
      const r = card.getBoundingClientRect();
      return {
        x: fromLeft ? r.right - flowRect.left : r.left - flowRect.left,
        y: r.top + r.height / 2 - flowRect.top,
      };
    });

  const draw = () => {
    if (mobileMq.matches) {
      svg.replaceChildren();
      return;
    }

    const flowRect = flow.getBoundingClientRect();
    const coreRect = core.getBoundingClientRect();
    const width = Math.max(1, flowRect.width);
    const height = Math.max(1, flowRect.height);
    const coreX = coreRect.left + coreRect.width / 2 - flowRect.left;
    const coreY = coreRect.top + coreRect.height / 2 - flowRect.top;
    const logoSize = Math.min(coreRect.width, coreRect.height);
    // Napojení ke kraji loga (ne dovnitř) + větší odstup svislé niti
    const logoInset = logoSize * 0.5;
    const logoLeftX = coreX - logoInset;
    const logoRightX = coreX + logoInset;
    const spineGap = Math.max(36, logoSize * 0.14);
    const leftSpineX = logoLeftX - spineGap;
    const rightSpineX = logoRightX + spineGap;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));

    const leftBranches = collectBranches(".why-flow-col--left .why-flow-card", flowRect, true);
    const rightBranches = collectBranches(".why-flow-col--right .why-flow-card", flowRect, false);
    const specs = [];

    const addSide = (branches, spineX, logoX) => {
      if (!branches.length) {
        return;
      }
      const ys = branches.map((b) => b.y);
      // Přesně na krajní větve = čisté L-rohy (bez přetahů)
      const topY = Math.min(...ys);
      const bottomY = Math.max(...ys);

      // Jedna svislá nit + krátký vodorovný stonek do loga
      specs.push({
        role: "spine",
        d: `M ${spineX} ${topY} V ${bottomY}`,
      });
      specs.push({
        role: "stem",
        d: `M ${spineX} ${coreY} H ${logoX}`,
      });

      // Větve od kartiček — jen vodorovně, jezdí po svislé niti
      branches.forEach((branch) => {
        specs.push({
          role: "branch",
          d: `M ${branch.x} ${branch.y} H ${spineX}`,
        });
      });
    };

    addSide(leftBranches, leftSpineX, logoLeftX);
    addSide(rightBranches, rightSpineX, logoRightX);
    ensurePaths(specs);
  };

  const tick = () => {
    frame = 0;
    draw();
    if (looping && !mobileMq.matches && !reducedMq.matches) {
      frame = requestAnimationFrame(tick);
    }
  };

  const startLoop = () => {
    looping = true;
    if (!frame) {
      frame = requestAnimationFrame(tick);
    }
  };

  const stopLoop = () => {
    looping = false;
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    draw();
  };

  const syncLoop = () => {
    if (mobileMq.matches || reducedMq.matches) {
      stopLoop();
      return;
    }
    startLoop();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        syncLoop();
      } else {
        stopLoop();
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(flow);
  window.addEventListener("resize", () => draw(), { passive: true });
  mobileMq.addEventListener("change", syncLoop);
  reducedMq.addEventListener("change", syncLoop);

  if (document.fonts?.ready) {
    document.fonts.ready.then(draw);
  }

  window.addEventListener("load", draw, { once: true });
  draw();
})();
