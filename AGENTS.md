# Project rules
- Keep the dated USD-to-GBP reference in `src/lib/financial-reference.ts`; monetary presentation changes must preserve the underlying forecasts, equity mathematics and token quantities.
- Treat the Growth scenarios and Financials forecast as separate management models; do not silently reconcile them or derive monthly break-even from annual totals.
- Standalone investor PDFs are generated into Files, not served by the app, to avoid bypassing the existing access gate.