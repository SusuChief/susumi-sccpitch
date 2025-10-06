-- Block anonymous SELECT access to data_room_requests table
-- This prevents competitors from harvesting sensitive business contact information
CREATE POLICY "data_room_requests_block_anon"
ON public.data_room_requests
FOR SELECT
TO anon
USING (false);