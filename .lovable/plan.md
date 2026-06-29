## Temporarily Bypass Access Gate in Preview

Detect the Lovable preview host and auto-grant access so you can browse `/financials` and all gated sections without entering a code. Published and custom-domain visitors are unaffected.

### Change

Add a small helper that runs at app startup:

**`src/main.tsx`** — before `createRoot(...)`:
```ts
if (typeof window !== "undefined" && window.location.hostname.includes("lovable.app")) {
  localStorage.setItem("susumi_access", "granted");
}
```

This sets the same flag the `AccessGate` and `Financials` page already check.

### Scope

- Only the `*.lovable.app` preview host auto-grants (matches both `id-preview--…lovable.app` and `susumi-sccpitch.lovable.app`).
- Custom domains (`pitch.susumicapital.com`, `susumicapital.com`) keep the gate.
- No DB or RLS changes.

### If you want the published `lovable.app` URL gated too

Tell me and I'll narrow the match to `id-preview--` only, leaving the published `.lovable.app` link gated.
