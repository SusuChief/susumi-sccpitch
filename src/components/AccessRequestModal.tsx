import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface AccessRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccessRequestModal = ({ open, onOpenChange }: AccessRequestModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);

    // Save to database
    const { error: dbError } = await supabase
      .from("access_requests")
      .insert({ name: name.trim(), email: email.trim() });

    if (dbError) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Send notification email
    try {
      await supabase.functions.invoke("send-access-request", {
        body: { name: name.trim(), email: email.trim() },
      });
    } catch {
      // Non-blocking — request is saved even if email fails
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <DialogHeader>
              <DialogTitle className="text-center">Request Received!</DialogTitle>
              <DialogDescription className="text-center">
                We'll review your request and send an access code to <strong>{email}</strong> shortly.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Access Code</DialogTitle>
              <DialogDescription>
                Enter your details and we'll send you an access code to view the full investor presentation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  maxLength={255}
                />
              </div>
              <Button
                type="submit"
                className="w-full hover-glow"
                disabled={loading || !name.trim() || !email.trim()}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Request"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
