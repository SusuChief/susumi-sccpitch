import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  token: string;
  token_hash: string;
  redirect_to: string;
  email_action_type: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, token_hash, redirect_to, email_action_type }: AuthEmailRequest = await req.json();
    
    console.log("Sending auth email to:", email, "Type:", email_action_type);

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const magicLink = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;

    const emailResponse = await resend.emails.send({
      from: "Susumi <info@susumicapital.com>",
      to: [email],
      subject: "Sign in to Susumi Investor Access",
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
              .title { color: #1f2937; font-size: 24px; margin: 0 0 20px 0; }
              .text { color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; }
              .button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; }
              .footer { background: #f9fafb; padding: 30px; text-align: center; color: #9ca3af; font-size: 14px; }
              .code-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; text-align: center; margin: 20px 0; }
              .code { font-family: monospace; font-size: 20px; font-weight: bold; color: #10b981; letter-spacing: 2px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">Susumi</h1>
              </div>
              <div class="content">
                <h2 class="title">Sign in to Investor Access</h2>
                <p class="text">Click the button below to securely sign in to your Susumi Investor portal. This link is valid for 24 hours.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${magicLink}" class="button">Sign In to Susumi</a>
                </div>
                <div class="code-box">
                  <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Or use this verification code:</p>
                  <div class="code">${token}</div>
                </div>
                <p class="text" style="font-size: 14px; margin-top: 30px;">If you didn't request this email, you can safely ignore it. This link will expire in 24 hours.</p>
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

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-auth-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
