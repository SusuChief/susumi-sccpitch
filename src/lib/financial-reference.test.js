import { test, expect } from "bun:test";
import { seedRound, toGbp } from "./financial-reference";

test("seed round is £200,000 for 12.5% at £1.4m pre / £1.6m post", () => {
  expect(seedRound.raise).toBe(200000);
  expect(seedRound.preMoney).toBe(1400000);
  expect(seedRound.postMoney).toBe(1600000);
  expect(seedRound.preMoney + seedRound.raise).toBe(seedRound.postMoney);
  expect(seedRound.raise / seedRound.postMoney * 100).toBe(12.5);
});
test("six use-of-funds lines sum to £200,000, including £13,450 legal and raise costs", () => {
  expect(seedRound.funds.map((f) => f.amount)).toEqual([44772, 33579, 55965, 29848, 22386, 13450]);
  expect(seedRound.funds.reduce((s, f) => s + f.amount, 0)).toBe(200000);
});
test("round is equity only: no SUSU+ tokens offered", () => {
  expect(seedRound.tokens).toBe(0);
});
test("runway is about 8.9 months of operating spend at £20,894 a month", () => {
  const operating = seedRound.raise - 13450;
  expect(Math.round(operating / seedRound.monthlyBurn * 10) / 10).toBe(8.9);
});
test("USD market references still convert at the dated rate", () => {
  expect(toGbp(92_100_000_000)).toBe(68725020000);
});
