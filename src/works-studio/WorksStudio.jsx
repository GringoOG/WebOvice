import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projects } from "./projects.js";

const ease = [0.22, 1, 0.36, 1];

function ProjectPanel({ project, onOpen }) {
  return (
    <motion.article
      className="ws-panel"
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`${project.title} — otevřít case study`}
    >
      <motion.div
        className="ws-panel-bg"
        variants={{
          rest: { opacity: 0.55 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.45, ease }}
      />

      <motion.div
        className="ws-panel-neon"
        variants={{
          rest: { opacity: 0, scale: 0.94 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.5, ease }}
      />

      <div className="ws-panel-frame">
        <div className="ws-panel-media">
          <motion.img
            src={project.cover}
            alt=""
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.12 },
            }}
            transition={{ duration: 0.75, ease }}
          />
          <motion.div
            className="ws-panel-media-veil"
            variants={{
              rest: { opacity: 0.35 },
              hover: { opacity: 0.12 },
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <span className="ws-panel-number" aria-hidden="true">
          {project.number}
        </span>

        <motion.div
          className="ws-panel-copy"
          variants={{
            rest: { x: 28, opacity: 0.82 },
            hover: { x: 0, opacity: 1 },
          }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="ws-panel-badge">{project.badge}</p>
          <h3>{project.title}</h3>
          <p className="ws-panel-summary">{project.summary}</p>

          <dl className="ws-panel-results">
            {project.results.map((result) => (
              <div key={result.label}>
                <dt>{result.value}</dt>
                <dd>{result.label}</dd>
              </div>
            ))}
          </dl>

          <div className="ws-panel-tech">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <span className="ws-panel-cta">Otevřít case study →</span>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="ws-modal-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button className="ws-modal-backdrop" type="button" aria-label="Zavřít" onClick={onClose} />

      <motion.div
        className="ws-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ws-modal-title"
        initial={{ y: 56, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease }}
      >
        <button className="ws-modal-close" type="button" onClick={onClose}>
          Zavřít
        </button>

        <div className="ws-modal-hero">
          <img src={project.cover} alt="" />
          <div className="ws-modal-hero-copy">
            <p className="ws-panel-badge">{project.badge}</p>
            <h2 id="ws-modal-title">{project.title}</h2>
            <p>{project.summary}</p>
          </div>
        </div>

        <div className="ws-modal-grid">
          <section>
            <h3>Výzva</h3>
            <p>{project.challenge}</p>
          </section>
          <section>
            <h3>Řešení</h3>
            <p>{project.solution}</p>
          </section>
        </div>

        <dl className="ws-modal-results">
          {project.results.map((result) => (
            <div key={result.label}>
              <dt>{result.value}</dt>
              <dd>{result.label}</dd>
            </div>
          ))}
        </dl>

        <div className="ws-modal-tech">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="ws-modal-gallery">
          {project.gallery.map((src, index) => (
            <motion.img
              key={`${project.id}-${src}-${index}`}
              src={src}
              alt=""
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 * index, duration: 0.38, ease }}
            />
          ))}
        </div>

        <a className="ws-modal-link" href="moje-prace">
          Celé portfolio na stránce Moje práce →
        </a>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export function WorksStudio() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(projects.length - 1) * 100}vw`]);
  const xSmooth = useSpring(x, { stiffness: 110, damping: 30, mass: 0.28 });

  const openProject = useCallback((project) => setActive(project), []);
  const closeProject = useCallback(() => setActive(null), []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    trackRef.current?.style.setProperty("--ws-progress", String(value));
  });

  return (
    <section
      ref={sectionRef}
      className={`ws-section${isMobile ? " is-mobile" : ""}`}
      style={{ "--ws-count": projects.length }}
      aria-label="Ukázky z praxe"
    >
      <div className="ws-pin">
        <div className="ws-head">
          <p className="section-kicker">[ STUDIO SHOWROOM ]</p>
          <h2 className="section-title">Ukázky z praxe</h2>
          <p className="ws-head-text">
            Horizontální showroom — scrolluj projekty, hover odhalí detaily, klik otevře case study.
          </p>
        </div>

        <div className="ws-viewport">
          <motion.div
            ref={trackRef}
            className="ws-track"
            style={isMobile ? undefined : { x: xSmooth }}
          >
            {projects.map((project) => (
              <div className="ws-slide" key={project.id}>
                <ProjectPanel project={project} onOpen={openProject} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="ws-progress" aria-hidden="true">
          <motion.span style={{ scaleX: isMobile ? 1 : scrollYProgress }} />
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <ProjectModal key={active.id} project={active} onClose={closeProject} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
