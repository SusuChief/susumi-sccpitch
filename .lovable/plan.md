## Site-wide Update — $250K / 6.25% and Nigeria 2026 Market Data

### 1. `src/components/sections/Hero.tsx`
- Tagline (line 35-36): change to
  "Blockchain-powered crowdfunding revolutionizing access to capital. Launching in Nigeria's **$96B** crypto market with SEC approval."
- Stats grid: "$200K" → **"$250K"** and "5%" → **"6.25%"**

### 2. `src/components/sections/MarketMetrics.tsx`
- Nigeria card: value `$56.7B` → **`$96B`**, description → "Cryptocurrency transactions in Nigeria in **2025** (Chainalysis 2026 Geography of Crypto Report)"

### 3. `src/components/sections/GlobalComparison.tsx`
- Reference to "2024 Chainalysis Global Crypto Adoption Index" (lines 64 & 128): update to **"2025 Chainalysis Global Crypto Adoption Index"** (latest available; Nigeria still ranks #2). Source caption updated to match.

### 4. `src/pages/Financials.tsx` — Investment Return Outlook card
- Title: "Equity Return ($200,000 Bridge @ 5%)" → **"Equity Return ($250,000 Bridge @ 6.25%)"**
- "5% equity value potential" → **"6.25% equity value potential"**
- Value `$17.5M–$25M+` (5% of $350M–$500M) → **`$21.9M–$31.3M+`** (6.25% of $350M–$500M)
- Token Return card: unchanged (200M tokens, $3M @ $0.015, 20x ROI)

### Out of scope
- TokenomicsExport.tsx ($750k validator-panel valuation is unrelated)
- Investment.tsx (already updated last turn)
- No copy changes beyond the figures above
