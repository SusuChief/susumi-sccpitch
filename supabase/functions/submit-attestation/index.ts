import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3';
import { ATTESTATION_VERSION, jurisdictionDenial } from '../_shared/attestation-rules.ts';

const required = z.string().trim().min(1).max(500);
const optional = z.string().trim().max(500);
const schema = z.object({
  accessCode: z.string().trim().regex(/^SUSU-[A-Z0-9]{6}$/),
  version: z.literal(ATTESTATION_VERSION),
  investingAs: z.enum(['individual', 'entity']), fullName: required,
  entityName: optional, entityRegistration: optional, signatoryRole: optional,
  email: z.string().trim().email().max(255), phone: optional,
  country: required, nationality: optional, isUsPerson: z.enum(['yes', 'no']),
  referral: required, indicativeInvestment: z.enum(['Under £10k', '£10k–£25k', '£25k–£50k', 'Over £50k']),
  category: z.enum(['I-1', 'I-2', 'I-3', 'E-1', 'E-2']),
  categoryExplanation: z.string().trim().min(1).max(2000), declarationName: required,
  acknowledgements: z.array(z.literal(true)).length(10),
}).superRefine((form, ctx) => {
  if (jurisdictionDenial(form.country, form.isUsPerson)) ctx.addIssue({ code: 'custom', message: 'Your jurisdiction is not eligible for access.' });
  if (form.investingAs === 'entity' ? (!form.entityName || !form.entityRegistration || !form.signatoryRole || !form.category.startsWith('E-')) : (!form.nationality || !form.category.startsWith('I-'))) {
    ctx.addIssue({ code: 'custom', message: 'Please complete the appropriate investor details and qualification.' });
  }
});

Deno.serve(async (req) => {
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return reply({ error: parsed.error.issues[0]?.message || 'Invalid form' }, 400);
    // Public custom-code flow: authorization is the unused code, validated and
    // consumed atomically together with the completed form, not an Auth JWT.
    const client = createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    const { data, error } = await client.rpc('save_signed_attestation', { p_form: parsed.data, p_ip: ip });
    if (error) return reply({ error: 'Unable to save the form. Check that your access code is valid and unused.' }, 400);
    return reply({ ...data, version: ATTESTATION_VERSION });
  } catch {
    return reply({ error: 'Unable to save your form. Please try again.' }, 400);
  }
});