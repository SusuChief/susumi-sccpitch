import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
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
      const { error } = await supabase.functions.invoke('send-magic-link', {
        body: { email },
      });

      if (error) throw error;

      toast({
        title: "Verification code sent!",
        description: "Check your email for the 6-digit code.",
      });
      setStep("code");
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

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      toast({ 
        title: "Invalid code", 
        description: "Please enter the 6-digit code from your email.", 
        variant: "destructive" 
      });
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ 
        type: 'email' as any, 
        email, 
        token: code 
      });
      
      if (error) {
        toast({ 
          title: 'Verification failed', 
          description: error.message, 
          variant: 'destructive' 
        });
      }
    } catch (err: any) {
      toast({ 
        title: 'Error', 
        description: err.message, 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-4 text-center">
        <img 
          src="/src/assets/susumi-corporate-logo.png" 
          alt="Susumi Logo" 
          className="h-20 mx-auto"
        />
        <div className="space-y-1">
          <h1 className="text-3xl font-bold gradient-text">
            Decentralized Crowdfunding
          </h1>
          <p className="text-muted-foreground">
            Private Investor Panel  •  Invite-only Access
          </p>
        </div>
      </div>

      {step === "email" ? (
        <form onSubmit={handleSendCode} className="space-y-4">
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
            Send Verification Code
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            You'll receive a 6-digit code via email. No password required.
            <br />
            Please check your junk mail if you don't find it in your inbox.
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              required
              className="bg-secondary text-center text-xl tracking-widest"
              autoFocus
            />
          </div>

          <Button type="submit" className="w-full hover-glow" disabled={loading || code.length !== 6}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify & Sign In
          </Button>

          <Button 
            type="button" 
            variant="ghost" 
            className="w-full" 
            onClick={() => {
              setStep("email");
              setCode("");
            }}
            disabled={loading}
          >
            Use a different email
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Enter the code sent to {email}
          </p>
        </form>
      )}
    </div>
  );
};
