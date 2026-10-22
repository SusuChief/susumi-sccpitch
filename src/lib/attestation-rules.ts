import { ATTESTATION_STORAGE_KEY, validAttestation } from "../../supabase/functions/_shared/attestation-rules";
export * from "../../supabase/functions/_shared/attestation-rules";

export function hasCurrentAttestation(): boolean {
  try {
    return validAttestation(JSON.parse(localStorage.getItem(ATTESTATION_STORAGE_KEY) || "null"));
  } catch {
    return false;
  }
}