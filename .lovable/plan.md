## Update Investment Section — $250K Raise at 6.25% Equity

**File:** `src/components/sections/Investment.tsx` (only file changed)

### Final numbers

- **Capital raise:** $250,000 (was $200K)
- **Equity offered:** 6.25% (was 5%)
- **Pre-money valuation:** $3.75M (was $3.8M)
- **Post-money valuation:** $4.0M (unchanged)
- **SUSU+ tokens:** 200M (unchanged, confirmed)
- **Token ROI:** 20x (unchanged)

Math check: $250K ÷ 6.25% = $4.0M post-money ✓

### Changes inside `Investment.tsx`

**1. `benefits` array (line 7):**
"5% equity in Susumi Capital Corp (pre-money valuation $3.8M)" → "6.25% equity in Susumi Capital Corp (pre-money valuation $3.75M)"

**2. Capital Raise hero card:**
- "$200K" → **"$250K"**

**3. Three-stat grid:**
- "5%" Equity Stake → **"6.25%"**
- "200M" SUSU+ Tokens → unchanged
- "20x" Token ROI → unchanged

**4. Use of Funds card — replace with new $250K breakdown:**

| Line item | Amount |
|---|---|
| Smart Contract Audit | $30,000 |
| Technical Development (NEW) | $30,000 |
| Marketing and User Acquisition | $30,000 |
| Legal, Compliance, Staffing & Administration | $80,000 |
| Token Listing | $30,000 |
| Mainnet Migration | $50,000 |
| **Total** | **$250,000** |

### Out of scope

No changes to Tokenomics, Financials page, or other sections. Token allocation stays at 200M SUSU+ and ROI projections remain as-is.
