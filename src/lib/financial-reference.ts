/** Dated presentation conversion; USDT settlement and underlying USD forecasts are unchanged. */
export const FX_REFERENCE = {
  usdToGbp: 0.7462,
  date: "21 October 2026",
  source: "Financial Times (delayed market quote)",
  url: "https://markets.ft.com/data/currencies/tearsheet/summary?s=gbpusd",
} as const;

export const toGbp = (usd: number) => Math.round(usd * FX_REFERENCE.usdToGbp * 1e8) / 1e8;
export const seedRound = {
  raise: toGbp(250_000),
  preMoney: toGbp(1_750_000),
  postMoney: toGbp(2_000_000),
  equityPercent: 12.5,
  tokens: 200_000_000,
  funds: [60_000, 45_000, 75_000, 40_000, 30_000].map(toGbp),
};
export const currencyNote = `GBP equivalents at £${FX_REFERENCE.usdToGbp} per US$1 • ${FX_REFERENCE.date}. Underlying forecasts unchanged; platform transactions settle in USDT. Rounded for display; exchange rates fluctuate.`;