import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/auth/AuthForm";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token_hash = params.get('token_hash');
    const typeParam = params.get('type') || 'magiclink';
    const emailParam = params.get('email');

    console.log('Auth page loaded with hash params:', { token_hash, typeParam, emailParam });

    if (token_hash && emailParam) {
      setLoading(true);
      console.log('Verifying OTP with:', { type: typeParam, token_hash, email: emailParam });
      
      supabase.auth.verifyOtp({
        type: typeParam as any,
        token_hash,
        email: emailParam,
      }).then(({ data, error }) => {
        console.log('verifyOtp result:', { data, error });
        if (error) {
          toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
        }
      }).finally(() => {
        window.location.hash = '';
        setLoading(false);
      });
    }
  }, [toast]);

  useEffect(() => {
    // Handle auth state changes (including magic link callbacks)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate("/");
        } else if (event === 'TOKEN_REFRESHED') {
          navigate("/");
        } else if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Password recovery",
            description: "Please set a new password.",
          });
        } else if (event === 'USER_UPDATED') {
          navigate("/");
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
      }
      if (session) {
        navigate("/");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-secondary/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-secondary/30">
      <AuthForm />
    </div>
  );
};

export default Auth;
