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
    author: "Prokat Invest — projekt Snap Meter",
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

/* ── Service cards — video hraje jen při hoveru ── */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showServiceVideoFrame(video) {
  video.pause();

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return;
  }

  try {
    if (video.currentTime < 0.001) {
      video.currentTime = 0.001;
    }
  } catch (_) {
    // Ignore seek errors while the browser is still buffering.
  }
}

function resetServiceVideoState(video) {
  const visual = video.closest(".service-visual");

  visual?.classList.remove("is-playing");
  showServiceVideoFrame(video);
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
    return;
  }

  if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
    video.load();
  }
}

document.querySelectorAll(".service-visual").forEach((visual) => {
  const video = visual.querySelector(".service-video");
  if (!video?.querySelector("source")) {
    return;
  }

  primeServiceVideoPreview(video);

  visual.addEventListener("mouseenter", () => {
    if (prefersReducedMotion.matches) {
      return;
    }

    video.currentTime = 0;
    visual.classList.add("is-playing");
    video.play().catch(() => {});
  });

  visual.addEventListener("mouseleave", () => {
    resetServiceVideoState(video);
  });
});

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

/* ── Refs showcase — manual carousel + magnetic CTA ── */
(() => {
  const section = document.getElementById("reference");
  const track = document.getElementById("refsShowcaseTrack");
  if (!section?.classList.contains("refs-showcase") || !track) {
    return;
  }

  const panels = Array.from(track.querySelectorAll("[data-refs-panel]"));
  const dots = Array.from(document.querySelectorAll("#refsShowcaseDots span"));
  const nextBtns = Array.from(section.querySelectorAll("[data-refs-next]"));
  const magneticBtns = Array.from(section.querySelectorAll("[data-magnetic]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileQuery = window.matchMedia("(max-width: 899px)");

  let activeIndex = -1;

  const setActive = (index) => {
    activeIndex = index;
    track.style.transform = `translate3d(-${index * (100 / panels.length)}%, 0, 0)`;

    panels.forEach((panel, i) => {
      panel.classList.toggle("is-active", i === index);
      panel.inert = i !== index;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  };

  setActive(0);
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive((activeIndex + 1) % panels.length);
    });
  });

  if (reduceMotion || !magneticBtns.length) {
    return;
  }

  magneticBtns.forEach((btn) => {
    const label = btn.querySelector("span");
    const strength = 28;
    const labelStrength = 12;

    const onMove = (event) => {
      if (mobileQuery.matches) {
        return;
      }
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
      if (label) {
        label.style.transform = `translate(${(x / rect.width) * labelStrength}px, ${(y / rect.height) * labelStrength}px)`;
      }
    };

    const onLeave = () => {
      btn.style.transform = "";
      if (label) {
        label.style.transform = "";
      }
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
  });
})();

/* ── Hero logo — soft crossfade loop (bez viditelného restartu) ── */
(() => {
  const stack = document.getElementById("heroLogoLoop");
  if (!stack) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const videos = Array.from(stack.querySelectorAll("video.tocici-logo--video"));
  if (videos.length < 2) {
    return;
  }

  const FADE_LEAD = 0.55;
  let activeIndex = 0;
  let swapping = false;

  const playSafe = (video) => {
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  const swap = () => {
    if (swapping) {
      return;
    }
    swapping = true;

    const current = videos[activeIndex];
    const next = videos[(activeIndex + 1) % videos.length];

    next.currentTime = 0;
    playSafe(next);
    next.classList.add("is-active");
    current.classList.remove("is-active");

    window.setTimeout(() => {
      current.pause();
      activeIndex = (activeIndex + 1) % videos.length;
      swapping = false;
    }, 480);
  };

  videos.forEach((video, index) => {
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 1.5;

    video.addEventListener("timeupdate", () => {
      if (index !== activeIndex || swapping) {
        return;
      }
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }
      if (video.currentTime >= video.duration - FADE_LEAD) {
        swap();
      }
    });

    video.addEventListener("ended", () => {
      if (index === activeIndex) {
        swap();
      }
    });
  });

  playSafe(videos[0]);
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
