// Website applications are delivered by FormSubmit (free, no backend). Each
// submission emails the owner and sends the applicant an auto-reply. The first
// submission triggers a one-time activation email to the inbox below.
const INBOX = "contact@invantier.com";

const THANK_YOU = (name, business) =>
  `Hi ${name},\n\nThank you for applying to work with Vantier. We've received your application${business ? " for " + business : ""} and will review it personally.\n\nWe take on a limited number of new service businesses each quarter. If we're a fit, you'll hear from us within 48 hours with next steps for your 7-day free Meta ads trial.\n\n— Juan Soto\nVantier · Meta Ads for Service Businesses`;

export async function submitApplication(form) {
  const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `New Vantier application — ${form.clinic || form.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: form.email,
      _autoresponse: THANK_YOU(form.name, form.clinic),
      Name: form.name,
      Business: form.clinic,
      Email: form.email,
      Phone: form.phone,
      Website: form.website || "Not specified",
      "Submitted from": window.location.href,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) === "false") {
    throw new Error(data.message || "Submission failed");
  }
  return data;
}
