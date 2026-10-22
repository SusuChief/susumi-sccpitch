CREATE TABLE public.investor_attestations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_code text,
  investing_as text NOT NULL,
  full_name text NOT NULL,
  entity_name text,
  entity_registration text,
  signatory_role text,
  email text NOT NULL,
  phone text,
  country text NOT NULL,
  nationality text,
  is_us_person boolean NOT NULL DEFAULT false,
  referral text,
  indicative_investment text,
  category text NOT NULL,
  category_explanation text NOT NULL,
  declaration_name text NOT NULL,
  form_version text NOT NULL DEFAULT 'scc-attestation-v1',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.investor_attestations TO anon, authenticated;
GRANT SELECT ON public.investor_attestations TO authenticated;
GRANT ALL ON public.investor_attestations TO service_role;

ALTER TABLE public.investor_attestations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_submit_attestation"
ON public.investor_attestations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "admin_view_attestations"
ON public.investor_attestations
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));