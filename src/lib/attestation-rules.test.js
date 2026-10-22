import { describe, expect, test } from "bun:test";
import { jurisdictionDenial, validAttestation, ATTESTATION_VERSION, ACCESS_DURATION_MS } from "./attestation-rules.ts";

describe("revised attestation access rules", () => {
  test("Nigeria is eligible", () => expect(jurisdictionDenial("Nigeria", "no")).toBeNull());
  test("UK residents are denied", () => expect(jurisdictionDenial("United Kingdom", "no")).toBe("uk"));
  test("US residents are denied", () => expect(jurisdictionDenial("United States", "no")).toBe("us"));
  test("US Persons are denied outside the US including entities", () => expect(jurisdictionDenial("Nigeria", "yes")).toBe("us"));
  for (const country of ["Iran", "North Korea", "China", "Russia", "Sudan", "Afghanistan", "Israel"]) {
    test(`${country} is restricted`, () => expect(jurisdictionDenial(country, "no")).toBe("restricted"));
  }
  test("EU residents remain eligible", () => expect(jurisdictionDenial("France", "no")).toBeNull());
  const now = Date.parse("2026-10-22T13:55:00Z");
  const record = { version: ATTESTATION_VERSION, emailVerified: true, passedAt: new Date(now).toISOString() };
  test("verified current attestation is valid", () => expect(validAttestation(record, now)).toBe(true));
  test("access expires after 365 days", () => expect(validAttestation(record, now + ACCESS_DURATION_MS)).toBe(false));
  test("changed terms require new attestation", () => expect(validAttestation({ ...record, version: "scc-attestation-v1" }, now)).toBe(false));
  test("unverified email does not unlock access", () => expect(validAttestation({ ...record, emailVerified: false }, now)).toBe(false));
  test("future dates do not unlock access", () => expect(validAttestation(record, now - 1)).toBe(false));
});