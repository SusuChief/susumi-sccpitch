-- Add user-scoped SELECT for viewer_sessions (without IF NOT EXISTS)
CREATE POLICY "viewer_sessions_user_select"
ON public.viewer_sessions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);