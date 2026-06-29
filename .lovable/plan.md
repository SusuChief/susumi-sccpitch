## Why Financials is still gated

The current bypass only auto-grants access when the hostname contains `lovable.app`:

```ts
window.location.hostname.includes("lovable.app")
```

But the live preview shown in the editor can also run on a `lovableproject.com` host. On that host, the bypass does not run, so `Financials.tsx` still sees no `susumi_access = "granted"` value and redirects back to `/`.

## Plan

1. Update the preview-only bypass in `src/main.tsx` so it applies to both Lovable preview hostnames:
   - `lovable.app`
   - `lovableproject.com`

2. Keep the gate active everywhere else, including the custom domains:
   - `pitch.susumicapital.com`
   - `susumicapital.com`

3. Leave the production/custom-domain access-code logic unchanged.

## Technical detail

Change the host check to something like:

```ts
const isLovablePreview = ["lovable.app", "lovableproject.com"].some((host) =>
  window.location.hostname.includes(host)
);
```

Then set `localStorage.susumi_access = "granted"` only when `isLovablePreview` is true.