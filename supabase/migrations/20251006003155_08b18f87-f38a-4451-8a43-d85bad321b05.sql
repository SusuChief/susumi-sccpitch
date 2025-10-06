-- Fix remaining security issues - Replace public role with authenticated

-- 1. Fix meeting_requests INSERT policy
DROP POLICY IF EXISTS "Users can insert own meeting requests" ON public.meeting_requests;

CREATE POLICY "meeting_requests_user_insert"
ON public.meeting_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Fix data_room_requests INSERT policy
DROP POLICY IF EXISTS "Users can insert own requests" ON public.data_room_requests;

CREATE POLICY "data_room_requests_user_insert"
ON public.data_room_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Fix profiles policies - replace public role with authenticated
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "profiles_user_select"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "profiles_user_update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);