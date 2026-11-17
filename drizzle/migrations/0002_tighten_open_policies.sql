DROP POLICY IF EXISTS anyone_can_use_code ON public.access_codes;
DROP POLICY IF EXISTS anyone_can_validate_code ON public.access_codes;

CREATE OR REPLACE FUNCTION public.check_access_code(p_code text)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE WHEN c.id IS NULL THEN 'invalid' WHEN c.is_used THEN 'used' ELSE 'valid' END
  FROM (SELECT 1) x LEFT JOIN public.access_codes c ON c.code = upper(trim(p_code));
$$;

CREATE OR REPLACE FUNCTION public.use_access_code(p_code text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n int;
BEGIN
  UPDATE public.access_codes SET is_used = true, used_at = now()
  WHERE code = upper(trim(p_code)) AND is_used = false;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n > 0;
END; $$;

REVOKE ALL ON FUNCTION public.check_access_code(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.use_access_code(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_access_code(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.use_access_code(text) TO anon, authenticated;

DROP POLICY IF EXISTS anyone_can_request_access ON public.access_requests;
CREATE POLICY anyone_can_request_access ON public.access_requests FOR INSERT TO anon, authenticated
WITH CHECK (char_length(trim(name)) BETWEEN 1 AND 100 AND char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

DROP POLICY IF EXISTS section_views_insert ON public.section_views;
CREATE POLICY section_views_insert ON public.section_views FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.viewer_sessions s WHERE s.id = session_id AND s.user_id = auth.uid()));

DROP POLICY IF EXISTS cta_clicks_insert ON public.cta_clicks;
CREATE POLICY cta_clicks_insert ON public.cta_clicks FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.viewer_sessions s WHERE s.id = session_id AND s.user_id = auth.uid()));