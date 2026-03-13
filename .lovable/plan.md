

## Fix Valuation Math in Investment Section

**File:** `src/components/sections/Investment.tsx`

Update line 7 in the `benefits` array:

Change:
```
"5% equity in Susumi Capital Corp (pre-money valuation $4M)"
```
To:
```
"5% equity in Susumi Capital Corp (pre-money valuation $3.8M)"
```

This makes the math consistent: $3.8M pre-money + $200K investment = $4.0M post-money valuation, with the investor holding exactly 5%.

Single line change in one file.

