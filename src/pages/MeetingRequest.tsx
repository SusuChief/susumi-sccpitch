import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";

const meetingRequestSchema = z.object({
  company: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  cheque_size: z.string().min(1, "Please select a cheque size"),
  timing: z.string().optional(),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const MeetingRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    cheque_size: "",
    timing: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const validatedData = meetingRequestSchema.parse(formData);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to submit a meeting request");
      }

      // Save to database
      const { error: dbError } = await supabase
        .from("meeting_requests")
        .insert({
          company: validatedData.company,
          email: validatedData.email,
          cheque_size: validatedData.cheque_size,
          timing: validatedData.timing || null,
          message: validatedData.message || null,
          user_id: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Request submitted",
        description: "Your meeting request has been saved. Opening Calendly to schedule...",
      });

      // Open Calendly page in new tab
      window.open('https://calendly.com/susumi/30min', '_blank');

      // Navigate back to home
      setTimeout(() => navigate("/"), 1500);
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
          <h1 className="text-3xl font-bold mb-2 gradient-text">Schedule a Meeting</h1>
          <p className="text-muted-foreground mb-6">
            Tell us about your fund and investment criteria
          </p>

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
              <Label htmlFor="cheque_size">Typical Cheque Size *</Label>
              <Select value={formData.cheque_size} onValueChange={(value) => setFormData({ ...formData, cheque_size: value })} required>
                <SelectTrigger className="bg-secondary">
                  <SelectValue placeholder="Select cheque size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$100K-$250K">$100K-$250K</SelectItem>
                  <SelectItem value="$250K-$500K">$250K-$500K</SelectItem>
                  <SelectItem value="$500K-$1M">$500K-$1M</SelectItem>
                  <SelectItem value="$1M-$1.5M">$1M-$1.5M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timing">Investment Timeline</Label>
              <Select value={formData.timing} onValueChange={(value) => setFormData({ ...formData, timing: value })}>
                <SelectTrigger className="bg-secondary">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (this quarter)</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="exploratory">Exploratory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your investment thesis and what interests you about Susumi"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-secondary min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full hover-glow" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Meeting Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetingRequest;
