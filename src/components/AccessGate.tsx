import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AccessGateProps {
  onAccessGranted: () => void;
}

export const AccessGate = ({ onAccessGranted }: AccessGateProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("access_codes")
      .select("id, is_used")
      .eq("code", code.trim().toUpperCase())
      .maybeSingle();

    if (error || !data) {
      toast.error("Invalid access code. Please try again.");
      setLoading(false);
      return;
    }

    if (data.is_used) {
      toast.error("This access code has already been used.");
      setLoading(false);
      return;
    }

    // Mark code as used
    await supabase
      .from("access_codes")
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq("id", data.id);

    localStorage.setItem("susumi_access", "granted");
    toast.success("Access granted! Welcome to the full presentation.");
    onAccessGranted();
    setLoading(false);
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto max-w-md text-center space-y-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold">
          Enter <span className="gradient-text">Access Code</span>
        </h2>
        <p className="text-muted-foreground">
          Please enter your access code to view the full investor presentation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. SUSU-A1B2C3"
            className="text-center text-lg tracking-widest h-14 bg-card border-border"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg py-6 hover-glow group"
            disabled={loading || !code.trim()}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Unlock Presentation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          Don't have an access code? Click "Request Access Code" above to request one.
        </p>
      </div>
    </div>
  );
};
