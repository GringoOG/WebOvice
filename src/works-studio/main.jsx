import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WorksStudio } from "./WorksStudio.jsx";
import "./works-studio.css";

const rootEl = document.getElementById("works-studio-root");

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <WorksStudio />
    </StrictMode>
  );
}
