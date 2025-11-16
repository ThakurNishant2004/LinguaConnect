// main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Ensure a modal root exists and is appended directly to <body>.
 * This prevents the portal from being constrained by app layout or transforms.
 */
const ensureModalRoot = () => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  } else if (modalRoot.parentElement !== document.body) {
    document.body.appendChild(modalRoot);
  }
};

ensureModalRoot();

createRoot(document.getElementById("root")!).render(<App />);
