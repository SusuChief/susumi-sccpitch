-- Block all anonymous access to meeting_requests table
-- This prevents malicious actors from inserting fake records or probing the system
CREATE POLICY "meeting_requests_block_anon"
ON public.meeting_requests
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);