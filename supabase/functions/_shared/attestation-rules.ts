export const ATTESTATION_VERSION = "scc-attestation-2026-10-22-v2";
export const ATTESTATION_STORAGE_KEY = "susumi_attestation";
export const ACCESS_DURATION_MS = 365 * 24 * 60 * 60 * 1000;
// User-defined restrictions, not an independently verified legal sanctions list.
export const RESTRICTED_COUNTRIES = ["Iran", "North Korea", "China", "Russia", "Sudan", "Afghanistan", "Israel"] as const;
export type DenialReason = "uk" | "us" | "restricted" | "none";
export function jurisdictionDenial(country: string, isUsPerson: string): DenialReason | null {
  if (country === "United Kingdom") return "uk";
  if (country === "United States" || isUsPerson === "yes") return "us";
  if (RESTRICTED_COUNTRIES.some((restricted) => restricted === country)) return "restricted";
  return null;
}
export function validAttestation(record: unknown, now = Date.now()): boolean {
  if (!record || typeof record !== "object") return false;
  const value = record as Record<string, unknown>;
  if (value.version !== ATTESTATION_VERSION || typeof value.id !== "string" || !/^[0-9a-f-]{36}$/i.test(value.id) || typeof value.passedAt !== "string") return false;
  const passedAt = Date.parse(value.passedAt);
  return Number.isFinite(passedAt) && passedAt <= now && now - passedAt < ACCESS_DURATION_MS;
}