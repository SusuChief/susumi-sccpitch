-- Phase 1: Fix Security Issues - Update Existing Policies

-- 1. Ensure user_roles table exists
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. Create has_role function if not exists
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. Drop all existing problematic policies
DROP POLICY IF EXISTS "Admin can view all meeting requests" ON public.meeting_requests;
DROP POLICY IF EXISTS "Admins can view all meeting requests" ON public.meeting_requests;
DROP POLICY IF EXISTS "Users can view own meeting requests" ON public.meeting_requests;

DROP POLICY IF EXISTS "Admin can view all requests" ON public.data_room_requests;
DROP POLICY IF EXISTS "Admins can view all data room requests" ON public.data_room_requests;
DROP POLICY IF EXISTS "Users can view own data room requests" ON public.data_room_requests;

DROP POLICY IF EXISTS "Admin can view all CTA clicks" ON public.cta_clicks;
DROP POLICY IF EXISTS "Admins can view all CTA clicks" ON public.cta_clicks;
DROP POLICY IF EXISTS "Authenticated users can insert CTA clicks" ON public.cta_clicks;

DROP POLICY IF EXISTS "Admin can view all section views" ON public.section_views;
DROP POLICY IF EXISTS "Admins can view all section views" ON public.section_views;
DROP POLICY IF EXISTS "Authenticated users can insert section views" ON public.section_views;

DROP POLICY IF EXISTS "Admin can view all sessions" ON public.viewer_sessions;
DROP POLICY IF EXISTS "Admins can view all viewer sessions" ON public.viewer_sessions;
DROP POLICY IF EXISTS "Authenticated users can insert viewer sessions" ON public.viewer_sessions;

DROP POLICY IF EXISTS "Block anonymous access to profiles" ON public.profiles;

-- 4. Create new secure policies for meeting_requests
CREATE POLICY "meeting_requests_admin_select"
ON public.meeting_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "meeting_requests_user_select"
ON public.meeting_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 5. Create new secure policies for data_room_requests
CREATE POLICY "data_room_requests_admin_select"
ON public.data_room_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "data_room_requests_user_select"
ON public.data_room_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 6. Create new secure policies for cta_clicks
CREATE POLICY "cta_clicks_admin_select"
ON public.cta_clicks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "cta_clicks_insert"
ON public.cta_clicks
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 7. Create new secure policies for section_views
CREATE POLICY "section_views_admin_select"
ON public.section_views
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "section_views_insert"
ON public.section_views
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 8. Create new secure policies for viewer_sessions
CREATE POLICY "viewer_sessions_admin_select"
ON public.viewer_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "viewer_sessions_insert"
ON public.viewer_sessions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 9. Block anonymous access to profiles
CREATE POLICY "profiles_block_anon"
ON public.profiles
FOR ALL
TO anon
USING (false);

-- 10. Add user_roles policies
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

CREATE POLICY "user_roles_own_select"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "user_roles_admin_select"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));