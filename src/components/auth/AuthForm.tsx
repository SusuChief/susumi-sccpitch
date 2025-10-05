import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const redirectTo = `${window.location.origin}/auth`;
      const { error } = await supabase.functions.invoke('send-magic-link', {
        body: { email, redirectTo },
      });

      if (error) throw error;

      toast({
        title: "Magic link sent!",
        description: "Check your email for the login link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerifyCode = async () => {
    if (!email) {
      toast({ title: "Email required", description: "Enter your email above first.", variant: "destructive" });
      return;
    }
    if (!code || code.length < 6) {
      toast({ title: "Invalid code", description: "Enter the 6-digit code from the email.", variant: "destructive" });
      return;
    }
    setVerifying(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({ type: 'email' as any, email, token: code });
      console.log('Manual code verifyOtp result:', { data, error });
      if (error) {
        toast({ title: 'Verification failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Signed in', description: 'Welcome back.' });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold"><span className="gradient-text font-goldman">Susumi</span> Investor Access</h1>
        <p className="text-muted-foreground">
          Private investor pitch • Invite-only access
        </p>
      </div>

      <form onSubmit={handleMagicLink} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="investor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-secondary"
          />
        </div>

        <Button type="submit" className="w-full hover-glow" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Magic Link
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          You'll receive a secure login link via email. No password required.
        </p>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border"></span>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">Or paste 6-digit code</span>
        </div>
      </div>

      <div className="space-y-4" aria-label="Verify code">
        <div className="space-y-2">
          <Label htmlFor="code">Verification code</Label>
          <Input
            id="code"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-secondary"
          />
        </div>
        <Button type="button" className="w-full hover-glow" onClick={handleVerifyCode} disabled={verifying || !email || code.length < 6}>
          {verifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify & Sign in
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Tip: If the email button opens a Lovable login page, paste the code here instead.
        </p>
      </div>
    </div>
  );
};
