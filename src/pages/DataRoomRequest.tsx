import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Shield } from "lucide-react";
import { z } from "zod";

const dataRoomRequestSchema = z.object({
  company: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  role: z.string().trim().min(1, "Role is required").max(100, "Role must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const DataRoomRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ndaAccepted) {
      toast({
        title: "NDA Required",
        description: "Please accept the NDA terms to proceed.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Validate input
      const validatedData = dataRoomRequestSchema.parse(formData);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to request data room access");
      }
      
      const { error } = await supabase.from("data_room_requests").insert({
        company: validatedData.company,
        role: validatedData.role,
        email: validatedData.email,
        message: validatedData.message || null,
        nda_accepted: ndaAccepted,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We'll review your request and send access credentials within 24-48 hours.",
      });

      navigate("/");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 px-4 py-12">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pitch
        </Button>

        <div className="bg-card p-8 rounded-lg shadow-xl border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold"><span className="gradient-text font-goldman">Susumi</span> Data Room Access</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Request access to comprehensive due diligence materials
          </p>

          <div className="bg-secondary/50 p-4 rounded-lg mb-6 border border-border/50">
            <h3 className="font-semibold mb-2 text-sm">Data Room Includes:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Detailed financial models and projections</li>
              <li>• Product roadmap and technical documentation</li>
              <li>• Market research and competitive analysis</li>
              <li>• Legal documents and cap table</li>
              <li>• Team profiles and organizational structure</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Fund Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role *</Label>
              <Input
                id="role"
                placeholder="e.g., Managing Partner, Investment Analyst"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Purpose of Review</Label>
              <Textarea
                id="message"
                placeholder="Briefly describe your due diligence process and timeline"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-secondary min-h-[100px]"
              />
            </div>

            <div className="bg-secondary/30 p-4 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="nda"
                  checked={ndaAccepted}
                  onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                />
                <div className="space-y-1">
                  <label
                    htmlFor="nda"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the NDA terms *
                  </label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to keep all information confidential and use it solely for 
                    the purpose of evaluating an investment in Susumi. Full NDA terms will be provided with data room access.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full hover-glow" disabled={loading || !ndaAccepted}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Request Data Room Access
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataRoomRequest;
