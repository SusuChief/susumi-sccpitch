-- Add comprehensive RESTRICTIVE policy to block all anonymous access to data_room_requests
-- This prevents competitors from harvesting sensitive investor contact information
CREATE POLICY "data_room_requests_block_all_anon" 
ON public.data_room_requests 
AS RESTRICTIVE 
FOR ALL 
TO anon 
USING (false);