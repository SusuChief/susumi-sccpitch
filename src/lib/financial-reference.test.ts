import { test, expect } from "bun:test";
import { seedRound, toGbp } from "./financial-reference";

test("Option B converts the existing 250,000 USD raise, not a nominal GBP raise", () => {
  expect(seedRound.raise).toBe(186550);
});
test("converted pre-money plus raise equals post-money and preserves 12.5% equity", () => {
  expect(seedRound.preMoney).toBe(1305850);
  expect(seedRound.postMoney).toBe(1492400);
  expect(seedRound.preMoney + seedRound.raise).toBe(seedRound.postMoney);
  expect(seedRound.raise / seedRound.postMoney * 100).toBe(12.5);
});
test("all five GBP allocations sum to the converted raise", () => {
  expect(seedRound.funds).toEqual([44772, 33579, 55965, 29848, 22386]);
  expect(seedRound.funds.reduce((sum, value) => sum + value, 0)).toBe(seedRound.raise);
});
test("token allocation stays at 200 million", () => {
  expect(seedRound.tokens).toBe(200000000);
});
test("three-year underlying revenue forecasts are converted without reforecasting", () => {
  expect([8900000, 189100000, 280000000, 320000000].map(toGbp)).toEqual([6641180, 141106420, 208936000, 238784000]);
});