import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldCheck,
  ShieldX,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Check,
} from "lucide-react";

export const ATTESTATION_VERSION = "scc-attestation-v1";
export const ATTESTATION_STORAGE_KEY = "susumi_attestation";

const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "Morocco", "Rwanda", "Uganda", "Tanzania",
  "Senegal", "Côte d'Ivoire", "Cameroon", "Ethiopia", "Zambia", "Zimbabwe", "Botswana", "Mauritius",
  "United Kingdom", "United States", "Canada", "Ireland", "France", "Germany", "Netherlands",
  "Spain", "Portugal", "Italy", "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Belgium",
  "Austria", "Luxembourg", "Poland", "Czech Republic", "United Arab Emirates", "Saudi Arabia",
  "Qatar", "Bahrain", "Kuwait", "Israel", "Turkey", "India", "Pakistan", "Singapore", "Hong Kong",
  "China", "Japan", "South Korea", "Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam",
  "Australia", "New Zealand", "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru",
  "St Kitts and Nevis", "Cayman Islands", "British Virgin Islands", "Bermuda", "Bahamas",
  "Barbados", "Jersey", "Guernsey", "Isle of Man", "Other",
];

const INDIVIDUAL_CATEGORIES = [
  {
    code: "I-1",
    title: "High net worth",
    description:
      "Your income or net assets meet your country's threshold for private-offer investors. Default: income of at least US$200,000 in each of the last two years (US$300,000 with a spouse or partner), or net worth of at least US$1,000,000 excluding your main home.",
  },
  {
    code: "I-2",
    title: "Experienced investor",
    description:
      "In the last two years you have done at least one of these: invested in two or more unlisted companies; been a member of a business angel network for six months or more; been a director of a company with annual turnover of at least US$1,000,000.",
  },
  {
    code: "I-3",
    title: "Investment professional",
    description:
      "You hold a current investment licence, or in the last two years you have worked in venture capital, private equity, corporate finance or investment management.",
  },
];

const ENTITY_CATEGORIES = [
  {
    code: "E-1",
    title: "Institutional investor",
    description:
      "The entity is a bank, insurer, licensed investment firm, investment fund or family office.",
  },
  {
    code: "E-2",
    title: "Qualifying company or trust",
    description:
      "The entity has net assets of at least US$5,000,000, or every owner meets I-1, I-2 or I-3.",
  },
];

const ACKNOWLEDGEMENTS = [
  {
    title: "Not an offer",
    text: "These materials are for information only and are not an offer of securities. Any investment will be made only on the terms of a final investment agreement with Susumi Capital Corp, a company incorporated in St Kitts and Nevis.",
  },
  {
    title: "Risk",
    text: "I understand the risks above, including dilution in later rounds, and I can afford to lose my whole investment.",
  },
  {
    title: "No regulatory approval",
    text: "No regulator has reviewed or approved these materials, and no investor compensation scheme protects this investment.",
  },
  {
    title: "Forecasts",
    text: "Forecasts and growth scenarios are unaudited management estimates, not promises.",
  },
  {
    title: "Equity only",
    text: "The round offers ordinary shares only. References to SUSU+ describe the business and are not an offer of tokens.",
  },
  {
    title: "Own advice",
    text: "I will take my own legal, tax and financial advice, and I am responsible for complying with the laws of my country.",
  },
  {
    title: "Confidentiality",
    text: "My access is personal. I will not copy, forward or share the materials or my login.",
  },
  {
    title: "Accuracy",
    text: "My answers are true and complete. I will tell Susumi if they change, and I will provide documents to verify them if asked before any investment.",
  },
  {
    title: "Sanctions and anti-money laundering",
    text: "I am not a sanctioned person or acting for one, any funds I invest come from legitimate sources, and I will complete identity checks before investing.",
  },
  {
    title: "Data",
    text: "I consent to Susumi Capital Corp processing my personal data as set out in its privacy notice, including keeping this record.",
  },
];

const STEPS = ["Your details", "Qualification", "Acknowledgements", "Sign"];

type DenialReason = "uk" | "us" | "none";

interface AttestationWizardProps {
  accessCode: string;
  onComplete: () => void;
}

interface FormState {
  investingAs: "individual" | "entity" | "";
  fullName: string;
  entityName: string;
  entityRegistration: string;
  signatoryRole: string;
  email: string;
  phone: string;
  country: string;
  nationality: string;
  isUsPerson: "yes" | "no" | "";
  referral: string;
  indicativeInvestment: string;
  category: string;
  categoryExplanation: string;
  declarationName: string;
}

const initialForm: FormState = {
  investingAs: "",
  fullName: "",
  entityName: "",
  entityRegistration: "",
  signatoryRole: "",
  email: "",
  phone: "",
  country: "",
  nationality: "",
  isUsPerson: "",
  referral: "",
  indicativeInvestment: "",
  category: "",
  categoryExplanation: "",
  declarationName: "",
};

export const AttestationWizard = ({ accessCode, onComplete }: AttestationWizardProps) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [checked, setChecked] = useState<boolean[]>(ACKNOWLEDGEMENTS.map(() => false));
  const [denied, setDenied] = useState<DenialReason | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const categories = form.investingAs === "entity" ? ENTITY_CATEGORIES : INDIVIDUAL_CATEGORIES;

  const detailsValid = useMemo(() => {
    if (!form.investingAs || !form.fullName.trim() || !form.email.trim() || !form.country) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return false;
    if (form.investingAs === "entity") {
      if (!form.entityName.trim() || !form.entityRegistration.trim() || !form.signatoryRole.trim()) return false;
    }
    if (form.investingAs === "individual") {
      if (!form.nationality || !form.isUsPerson) return false;
    }
    if (!form.referral.trim() || !form.indicativeInvestment) return false;
    return true;
  }, [form]);

  const categoryValid = form.category !== "" && form.categoryExplanation.trim().length > 0;
  const allChecked = checked.every(Boolean);
  const signValid = form.declarationName.trim().length > 0;

  const handleDetailsContinue = () => {
    if (form.country === "United Kingdom") {
      setDenied("uk");
      return;
    }
    if (form.country === "United States" || form.isUsPerson === "yes") {
      setDenied("us");
      return;
    }
    setStep(1);
  };

  const handleCategoryContinue = () => {
    if (form.category === "NONE") {
      setDenied("none");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    const { error: insertError } = await supabase.from("investor_attestations").insert({
      access_code: accessCode,
      investing_as: form.investingAs,
      full_name: form.fullName.trim(),
      entity_name: form.investingAs === "entity" ? form.entityName.trim() : null,
      entity_registration: form.investingAs === "entity" ? form.entityRegistration.trim() : null,
      signatory_role: form.investingAs === "entity" ? form.signatoryRole.trim() : null,
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      country: form.country,
      nationality: form.investingAs === "individual" ? form.nationality : null,
      is_us_person: form.isUsPerson === "yes",
      referral: form.referral.trim(),
      indicative_investment: form.indicativeInvestment,
      category: form.category,
      category_explanation: form.categoryExplanation.trim(),
      declaration_name: form.declarationName.trim(),
      form_version: ATTESTATION_VERSION,
    });

    if (insertError) {
      setError("Something went wrong saving your attestation. Please try again.");
      setSubmitting(false);
      return;
    }

    localStorage.setItem(
      ATTESTATION_STORAGE_KEY,
      JSON.stringify({
        version: ATTESTATION_VERSION,
        email: form.email.trim().toLowerCase(),
        passedAt: new Date().toISOString(),
      })
    );
    setSubmitting(false);
    onComplete();
  };

  if (denied) {
    const messages: Record<DenialReason, { title: string; body: string }> = {
      uk: {
        title: "Not available to UK residents",
        body: "UK law requires a signed investor statement in a prescribed form, which this site does not provide. This presentation is not available to UK residents. Please contact Susumi Capital Corp about the HoldCo route for UK investors.",
      },
      us: {
        title: "Not available to US Persons",
        body: "This presentation is not available to US Persons or US residents. US securities law requires document verification of accredited status, which this site does not support for this round.",
      },
      none: {
        title: "Thank you",
        body: "This presentation is available only to qualifying investors.",
      },
    };
    const m = messages[denied];
    return (
      <div className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto max-w-md text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-3xl font-bold">{m.title}</h2>
          <p className="text-muted-foreground">{m.body}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">
            Investor <span className="gradient-text">Attestation</span>
          </h2>
          <p className="text-muted-foreground">
            Before the presentation unlocks, please confirm that you qualify as an investor under
            the law of your country of residence.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold border transition-colors ${
                  i < step
                    ? "bg-primary text-primary-foreground border-primary"
                    : i === step
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`hidden sm:inline text-sm ${
                  i === step ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label>Investing as</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(["individual", "entity"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => set("investingAs", v)}
                      className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                        form.investingAs === v
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {v === "individual" ? "Individual" : "Entity"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full legal name</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className="bg-secondary"
                />
              </div>

              {form.investingAs === "entity" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="entityName">Entity name</Label>
                    <Input
                      id="entityName"
                      value={form.entityName}
                      onChange={(e) => set("entityName", e.target.value)}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entityReg">Entity registration number</Label>
                    <Input
                      id="entityReg"
                      value={form.entityRegistration}
                      onChange={(e) => set("entityRegistration", e.target.value)}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signatoryRole">Signatory's role</Label>
                    <Input
                      id="signatoryRole"
                      value={form.signatoryRole}
                      onChange={(e) => set("signatoryRole", e.target.value)}
                      placeholder="e.g. Director"
                      className="bg-secondary"
                    />
                  </div>
                </>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="bg-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="bg-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Country of residence{form.investingAs === "entity" ? " or incorporation" : ""}</Label>
                <Select value={form.country} onValueChange={(v) => set("country", v)}>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {form.investingAs === "individual" && (
                <>
                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <Select value={form.nationality} onValueChange={(v) => set("nationality", v)}>
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Are you a US Person?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["no", "yes"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => set("isUsPerson", v)}
                          className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                            form.isUsPerson === v
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {v === "no" ? "No" : "Yes"}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="referral">How did you hear about Susumi?</Label>
                <Input
                  id="referral"
                  value={form.referral}
                  onChange={(e) => set("referral", e.target.value)}
                  placeholder="Include the referrer's name if applicable"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label>Indicative investment (planning only; not binding)</Label>
                <Select
                  value={form.indicativeInvestment}
                  onValueChange={(v) => set("indicativeInvestment", v)}
                >
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-10k">Under £10k</SelectItem>
                    <SelectItem value="10k-25k">£10k–£25k</SelectItem>
                    <SelectItem value="25k-50k">£25k–£50k</SelectItem>
                    <SelectItem value="over-50k">Over £50k</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full hover-glow group"
                size="lg"
                disabled={!detailsValid}
                onClick={handleDetailsContinue}
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm text-muted-foreground">
                Select the one category that best describes you. You must meet it under the law of
                your country of residence. Where your country sets no threshold, the default shown
                applies.
              </p>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat.code}
                    type="button"
                    onClick={() => set("category", cat.code)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      form.category === cat.code
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold">
                      {cat.code} — {cat.title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{cat.description}</div>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => set("category", "NONE")}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    form.category === "NONE"
                      ? "border-destructive bg-destructive/10"
                      : "border-border hover:border-destructive/50"
                  }`}
                >
                  <div className="font-semibold">None of the above</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Selecting this ends the process.
                  </div>
                </button>
              </div>

              {form.category && form.category !== "NONE" && (
                <div className="space-y-2">
                  <Label htmlFor="categoryExplanation">
                    In one or two sentences, state how you meet this category
                  </Label>
                  <Textarea
                    id="categoryExplanation"
                    value={form.categoryExplanation}
                    onChange={(e) => set("categoryExplanation", e.target.value)}
                    className="bg-secondary min-h-[100px]"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 hover-glow group"
                  size="lg"
                  disabled={form.category === "NONE" ? false : !categoryValid}
                  onClick={handleCategoryContinue}
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex gap-3 p-4 rounded-lg border border-destructive/40 bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm">
                  <span className="font-semibold">Risk warning.</span> Investing in an early-stage,
                  unlisted company is high risk. You could lose all the money you invest. You may be
                  unable to sell your shares, and you should not expect dividends.
                </p>
              </div>

              <p className="text-sm text-muted-foreground">Each box must be ticked. I confirm that:</p>

              <div className="space-y-4">
                {ACKNOWLEDGEMENTS.map((ack, i) => (
                  <label
                    key={ack.title}
                    className="flex gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <Checkbox
                      checked={checked[i]}
                      onCheckedChange={(v) =>
                        setChecked((c) => c.map((x, j) => (j === i ? v === true : x)))
                      }
                      className="mt-0.5"
                    />
                    <span className="text-sm">
                      <span className="font-semibold">
                        {i + 1}. {ack.title}.
                      </span>{" "}
                      {ack.text}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 hover-glow group"
                  size="lg"
                  disabled={!allChecked}
                  onClick={() => setStep(3)}
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="p-4 rounded-lg border border-border bg-secondary/50">
                <p className="text-sm">
                  <span className="font-semibold">Declaration.</span> I confirm the statements
                  above. Where I act for an entity, I am authorised to bind it.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="declarationName">Signed (type your full name)</Label>
                <Input
                  id="declarationName"
                  value={form.declarationName}
                  onChange={(e) => set("declarationName", e.target.value)}
                  placeholder={form.fullName || "Full legal name"}
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  value={new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  disabled
                  className="bg-secondary"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} disabled={submitting}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 hover-glow"
                  size="lg"
                  disabled={!signValid || submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Submit and sign
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
