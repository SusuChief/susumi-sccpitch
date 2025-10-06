-- Add RESTRICTIVE policy to block anonymous INSERT operations on viewer_sessions
-- This prevents malicious actors from creating fake sessions or harvesting email addresses
CREATE POLICY "viewer_sessions_block_anon_insert" 
ON public.viewer_sessions 
AS RESTRICTIVE 
FOR INSERT 
TO anon 
WITH CHECK (false);