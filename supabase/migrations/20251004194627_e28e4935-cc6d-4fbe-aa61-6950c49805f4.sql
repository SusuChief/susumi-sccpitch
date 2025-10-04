-- Enable auth and create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Viewer analytics table
CREATE TABLE public.viewer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  completion_rate DECIMAL DEFAULT 0,
  total_dwell_time INTEGER DEFAULT 0
);

ALTER TABLE public.viewer_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all sessions"
  ON public.viewer_sessions FOR SELECT
  USING (true);

-- Section views tracking
CREATE TABLE public.section_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.viewer_sessions(id) ON DELETE CASCADE,
  section_slug TEXT NOT NULL,
  dwell_time_ms INTEGER DEFAULT 0,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.section_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all section views"
  ON public.section_views FOR SELECT
  USING (true);

-- CTA clicks tracking
CREATE TABLE public.cta_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.viewer_sessions(id) ON DELETE CASCADE,
  cta_label TEXT NOT NULL,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all CTA clicks"
  ON public.cta_clicks FOR SELECT
  USING (true);

-- Data room requests
CREATE TABLE public.data_room_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  message TEXT,
  nda_accepted BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.data_room_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own requests"
  ON public.data_room_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all requests"
  ON public.data_room_requests FOR SELECT
  USING (true);

-- Meeting requests
CREATE TABLE public.meeting_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  company TEXT,
  aum TEXT,
  mandate_type TEXT,
  cheque_size TEXT,
  timing TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.meeting_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own meeting requests"
  ON public.meeting_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all meeting requests"
  ON public.meeting_requests FOR SELECT
  USING (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();