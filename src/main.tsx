import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ATTESTATION_STORAGE_KEY, ATTESTATION_VERSION } from "./lib/attestation-rules";

// Preview-only bypass: unlock the full pitch inside the Lovable editor preview.
// Live investor domains stay gated.
const host = window.location.hostname;
const isPreview =
  host === "localhost" ||
  host.startsWith("id-preview--") ||
  host.endsWith(".lovableproject.com");
if (isPreview) {
  localStorage.setItem("susumi_access", "granted");
  localStorage.setItem(
    ATTESTATION_STORAGE_KEY,
    JSON.stringify({
      id: "00000000-0000-4000-8000-000000000000",
      version: ATTESTATION_VERSION,
      passedAt: new Date(Date.now() - 60_000).toISOString(),
    }),
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
