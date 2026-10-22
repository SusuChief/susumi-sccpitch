ALTER TABLE public.investor_attestations ADD COLUMN IF NOT EXISTS ip_address text;
ALTER TABLE public.investor_attestations ADD COLUMN IF NOT EXISTS acknowledgements jsonb;
REVOKE INSERT ON public.investor_attestations FROM anon, authenticated;
DROP POLICY IF EXISTS "anyone_can_submit_attestation" ON public.investor_attestations;
CREATE OR REPLACE FUNCTION public.save_signed_attestation(p_form jsonb, p_ip text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_code_id uuid; v_id uuid; v_created timestamptz := now();
BEGIN
 SELECT id INTO v_code_id FROM public.access_codes WHERE code = p_form->>'accessCode' AND is_used = false FOR UPDATE;
 IF v_code_id IS NULL THEN RAISE EXCEPTION 'Invalid or already used access code'; END IF;
 INSERT INTO public.investor_attestations (access_code, investing_as, full_name, entity_name, entity_registration, signatory_role, email, phone, country, nationality, is_us_person, referral, indicative_investment, category, category_explanation, declaration_name, form_version, created_at, ip_address, acknowledgements)
 VALUES (p_form->>'accessCode', p_form->>'investingAs', p_form->>'fullName', NULLIF(p_form->>'entityName',''), NULLIF(p_form->>'entityRegistration',''), NULLIF(p_form->>'signatoryRole',''), p_form->>'email', NULLIF(p_form->>'phone',''), p_form->>'country', NULLIF(p_form->>'nationality',''), (p_form->>'isUsPerson') = 'yes', p_form->>'referral', p_form->>'indicativeInvestment', p_form->>'category', p_form->>'categoryExplanation', p_form->>'declarationName', p_form->>'version', v_created, p_ip, p_form->'acknowledgements') RETURNING id INTO v_id;
 UPDATE public.access_codes SET is_used = true, used_at = v_created WHERE id = v_code_id;
 RETURN jsonb_build_object('id', v_id, 'passedAt', v_created);
END;
$$;
REVOKE ALL ON FUNCTION public.save_signed_attestation(jsonb,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.save_signed_attestation(jsonb,text) TO service_role;