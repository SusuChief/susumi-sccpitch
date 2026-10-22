export const ATTESTATION_VERSION = "scc-attestation-2026-10-22-v2";
export const ATTESTATION_STORAGE_KEY = "susumi_attestation";
export const ACCESS_DURATION_MS = 365 * 24 * 60 * 60 * 1000;

// User-defined access restrictions, not a legal sanctions classification.
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
  if (value.version !== ATTESTATION_VERSION || value.emailVerified !== true || typeof value.passedAt !== "string") return false;
  const passedAt = Date.parse(value.passedAt);
  return Number.isFinite(passedAt) && passedAt <= now && now - passedAt < ACCESS_DURATION_MS;
}

export function hasCurrentAttestation(): boolean {
  try {
    return validAttestation(JSON.parse(localStorage.getItem(ATTESTATION_STORAGE_KEY) || "null"));
  } catch {
    return false;
  }
}