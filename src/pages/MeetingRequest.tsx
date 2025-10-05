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
      // Open Calendly page in new tab
      window.open('https://calendly.com/susumi/30min', '_blank');
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
