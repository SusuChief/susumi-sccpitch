
-- Access codes table
CREATE TABLE public.access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  assigned_email text,
  assigned_name text,
  is_used boolean NOT NULL DEFAULT false,
  used_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Access requests table (form submissions)
CREATE TABLE public.access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can validate a code (select by code)
CREATE POLICY "anyone_can_validate_code" ON public.access_codes FOR SELECT TO anon, authenticated USING (true);

-- Anyone can insert access requests
CREATE POLICY "anyone_can_request_access" ON public.access_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admin can manage access codes
CREATE POLICY "admin_manage_codes" ON public.access_codes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin can view access requests
CREATE POLICY "admin_view_requests" ON public.access_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Generate 30 access codes
INSERT INTO public.access_codes (code) VALUES
  ('SUSU-A1B2C3'), ('SUSU-D4E5F6'), ('SUSU-G7H8J9'),
  ('SUSU-K1L2M3'), ('SUSU-N4P5Q6'), ('SUSU-R7S8T9'),
  ('SUSU-U1V2W3'), ('SUSU-X4Y5Z6'), ('SUSU-A7B8C9'),
  ('SUSU-D1E2F3'), ('SUSU-G4H5J6'), ('SUSU-K7L8M9'),
  ('SUSU-N1P2Q3'), ('SUSU-R4S5T6'), ('SUSU-U7V8W9'),
  ('SUSU-X1Y2Z3'), ('SUSU-A4B5C6'), ('SUSU-D7E8F9'),
  ('SUSU-G1H2J3'), ('SUSU-K4L5M6'), ('SUSU-N7P8Q9'),
  ('SUSU-R1S2T3'), ('SUSU-U4V5W6'), ('SUSU-X7Y8Z9'),
  ('SUSU-B1C2D3'), ('SUSU-E4F5G6'), ('SUSU-H7J8K9'),
  ('SUSU-L1M2N3'), ('SUSU-P4Q5R6'), ('SUSU-S7T8U9');
