/** Dated USD→GBP reference used for market figures quoted from USD sources (October 2026 edition). */
export const FX_REFERENCE = {
  usdToGbp: 0.7462,
  date: "21 October 2026",
  source: "Financial Times (delayed market quote)",
  url: "https://markets.ft.com/data/currencies/tearsheet/summary?s=gbpusd",
} as const;

export const toGbp = (usd: number) => Math.round(usd * FX_REFERENCE.usdToGbp * 1e8) / 1e8;

/** October 2026 seed round: set natively in GBP, equity only (no token allocation). */
export const seedRound = {
  raise: 200_000,
  preMoney: 1_400_000,
  postMoney: 1_600_000,
  equityPercent: 12.5,
  tokens: 0,
  monthlyBurn: 20_894,
  funds: [
    { label: "Technology completion and security audits", buys: "Independent audit of the Basic Susu Fund, registry and SUSU+ contracts", amount: 44_772 },
    { label: "Regulatory, legal and financial audits", buys: "SEC launch filings, legal opinion, accounts", amount: 33_579 },
    { label: "Marketing and customer acquisition", buys: "Turning the community into first funds", amount: 55_965 },
    { label: "Operations and key personnel", buys: "Infrastructure, sponsored gas, core team", amount: 29_848 },
    { label: "Working capital and administration", buys: "Runway buffer and administration", amount: 22_386 },
    { label: "Legal and raise costs", buys: "Legal fees and costs of the round", amount: 13_450 },
  ],
};

export const formatGbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const currencyNote = `All company figures in GBP. USD-sourced market figures converted at £${FX_REFERENCE.usdToGbp} per US$1 (${FX_REFERENCE.date}); platform transactions settle in stablecoins (USDT, USDC, cNGN). Forecasts are management estimates, not audited.`;
