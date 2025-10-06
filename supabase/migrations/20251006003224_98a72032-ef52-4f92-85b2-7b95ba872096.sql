-- Fix user_roles security - prevent unauthorized role manipulation

-- Only admins can INSERT new roles
CREATE POLICY "user_roles_admin_insert"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can UPDATE roles
CREATE POLICY "user_roles_admin_update"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can DELETE roles
CREATE POLICY "user_roles_admin_delete"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));