import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Auto-grant access on Lovable preview hosts so gated pages are viewable without a code.
if (
  typeof window !== "undefined" &&
  ["lovable.app", "lovableproject.com"].some((host) => window.location.hostname.includes(host))
) {
  localStorage.setItem("susumi_access", "granted");
}

createRoot(document.getElementById("root")!).render(<App />);

