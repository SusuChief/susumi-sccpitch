-- Enable the custom auth email hook
-- This tells Supabase to call our edge function instead of sending default emails

-- First, we need to grant necessary permissions
GRANT USAGE ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_auth_admin;

-- Create a function to handle auth emails through our edge function
CREATE OR REPLACE FUNCTION public.send_custom_auth_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  magic_link_url text;
  supabase_url text;
BEGIN
  -- Get the Supabase URL from settings
  supabase_url := current_setting('app.settings.supabase_url', true);
  
  -- Call the edge function to send the email
  PERFORM
    net.http_post(
      url := supabase_url || '/functions/v1/send-auth-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'email', NEW.email,
        'token', NEW.confirmation_token,
        'token_hash', NEW.confirmation_token,
        'redirect_to', current_setting('app.settings.site_url', true),
        'email_action_type', 'magiclink'
      )
    );
  
  RETURN NEW;
END;
$$;