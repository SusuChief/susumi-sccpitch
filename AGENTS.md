# Project rules
- Keep the dated USD-to-GBP reference in `src/lib/financial-reference.ts`; round terms live in `seedRound` there and are covered by its test file; update both together.
- Treat the Growth scenarios and Financials forecast as separate management models; do not silently reconcile them or derive monthly break-even from annual totals.
- Standalone investor PDFs are generated into Files, not served by the app, to avoid bypassing the existing access gate.
- Centralise version, jurisdiction restrictions and attestation expiry in the shared attestation-rules module, re-exported by src/lib, with concrete tests so browser and server use the same rules; save completed forms through the server atomically with code consumption before granting access.