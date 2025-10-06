-- Fix viewer_sessions security vulnerability and add missing policies

-- 1. Drop the overly permissive viewer_sessions INSERT policy
DROP POLICY IF EXISTS "viewer_sessions_insert" ON public.viewer_sessions;

-- 2. Create a secure INSERT policy that validates user ownership
-- Users can only insert sessions for themselves (matching user_id)
CREATE POLICY "viewer_sessions_user_insert"
ON public.viewer_sessions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Add UPDATE and DELETE policies to prevent unauthorized modifications
CREATE POLICY "viewer_sessions_admin_update"
ON public.viewer_sessions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "viewer_sessions_admin_delete"
ON public.viewer_sessions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Add explicit INSERT policy for profiles
-- Only allow users to create their own profile (prevents profile hijacking)
CREATE POLICY "profiles_user_insert"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);