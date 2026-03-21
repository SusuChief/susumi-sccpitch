
-- Allow anyone to update access codes (to mark as used)
CREATE POLICY "anyone_can_use_code" ON public.access_codes FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
