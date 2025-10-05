import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MagicLinkRequest {
  email: string;
  redirectTo?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { email, redirectTo }: MagicLinkRequest = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const finalRedirect = redirectTo || ""; // Pass from client to ensure correct site URL

    console.log("Generating magic link for:", email, "redirect:", finalRedirect);

    const { data, error } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo: finalRedirect },
    } as any);

    if (error) {
      console.error("generateLink error:", error);
      throw error;
    }

    console.log("generateLink response data:", JSON.stringify(data, null, 2));

    const action_link = (data as any)?.properties?.action_link || (data as any)?.action_link;
    const hashed_token = (data as any)?.properties?.hashed_token || (data as any)?.hashed_token;
    const email_otp = (data as any)?.properties?.email_otp || (data as any)?.email_otp;
    
    console.log("Extracted - action_link:", action_link, "hashed_token:", hashed_token, "email_otp:", email_otp);

    if (!hashed_token) {
      console.error("No hashed_token returned from generateLink", data);
      throw new Error("Unable to generate magic link - no hashed_token");
    }

    const custom_link = `${finalRedirect}#type=magiclink&token_hash=${encodeURIComponent(hashed_token)}&email=${encodeURIComponent(email)}`;
    
    console.log("Custom link generated:", custom_link);

    const emailResponse = await resend.emails.send({
      from: "Susumi <info@susumicapital.com>",
      to: [email],
      subject: "Your Susumi verification code",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; }
              .logo { color: white; font-size: 32px; font-weight: bold; margin: 0; }
              .content { padding: 40px 30px; }
              .title { color: #1f2937; font-size: 24px; margin: 0 0 20px 0; text-align: center; }
              .text { color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center; }
              .code-box { text-align: center; margin: 30px 0; }
              .code { display: inline-block; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 32px; letter-spacing: 8px; font-weight: 700; background: #f3f4f6; color: #111827; padding: 20px 40px; border-radius: 8px; border: 2px solid #e5e7eb; }
              .footer { background: #f9fafb; padding: 30px; text-align: center; color: #9ca3af; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">Susumi</h1>
              </div>
              <div class="content">
                <h2 class="title">Your Verification Code</h2>
                <p class="text">Enter this code to access your Susumi Investor portal:</p>
                <div class="code-box">
                  <div class="code">${email_otp}</div>
                </div>
                <p class="text">This code is valid for 60 minutes.</p>
                <p class="text" style="font-size: 14px; color: #9ca3af; margin-top: 40px;">If you didn't request this code, you can safely ignore this email.</p>
              </div>
              <div class="footer">
                <p style="margin: 0;">Susumi - African Cryptocurrency Opportunity</p>
                <p style="margin: 8px 0 0 0;">Private investor pitch • Invite-only access</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Magic link email sent:", emailResponse);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-magic-link function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});