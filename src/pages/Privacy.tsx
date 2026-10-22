import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return <main className="container mx-auto max-w-3xl px-6 py-16 space-y-8">
    <Button variant="outline" asChild><Link to="/"><ArrowLeft className="h-4 w-4" />Back to presentation</Link></Button>
    <header className="space-y-3"><h1 className="text-3xl font-bold">Investor privacy notice</h1><p className="text-muted-foreground">Draft · 22 October 2026 · Subject to legal review</p></header>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Who handles your data</h2><p>Susumi Capital Corp, incorporated in St Kitts and Nevis, handles personal data submitted for access to its private investor presentation.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Information and purposes</h2><p>We collect your identity and contact details, residence or incorporation, nationality where applicable, investor qualification, referral, indicative investment and signed declarations. Completed forms are saved privately with IP address, timestamps and form version for eligibility checks, fraud prevention and an audit trail. Email verification is not required and we do not email a copy of your form. An indicative investment is not a commitment.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Access and sharing</h2><p>Access is personal and lasts up to 12 months or until the terms change. Authorised personnel and service providers supporting hosting and record storage may process this information. Processing may occur outside your country. We may disclose information where required by law. This is not consent to marketing.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Retention and your choices</h2><p>We keep records as necessary for access administration, compliance and resolving disputes, then delete or anonymise them when no longer required. The detailed retention schedule is subject to review. Depending on applicable law, you may request access, correction or deletion, object to processing or withdraw consent; legal record-keeping obligations may limit deletion. Withdrawing consent may end presentation access.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Contact</h2><p>Contact Sam Igwe at Susumi Capital Corp through <a className="text-primary underline" href="https://wa.me/447501785599" target="_blank" rel="noreferrer">WhatsApp +44 7501 785599</a> for privacy requests.</p></section>
  </main>;
}