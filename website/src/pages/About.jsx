import SubpageShell from "@/pages/SubpageShell";

export default function About() {
  return (
    <SubpageShell>
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5">
          About
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium text-[#1A1A1A] mb-10">
          About Vantier
        </h1>

        <div className="font-display text-lg leading-relaxed text-[#1A1A1A]/85 space-y-6">
          <p>
            Vantier is a specialized growth partner that builds and manages Meta advertising systems for service businesses. We turn ad spend into booked appointments — not clicks, impressions, or vanity metrics. Our work spans full-funnel Meta campaigns, high-converting landing pages, booking and follow-up systems, and server-side tracking that ties every dollar of spend to revenue.
          </p>
          <p>
            We work with a limited number of service businesses each year across the United States, from med spas and aesthetics clinics to dental and health practices, home services, and fitness and wellness brands. Right now we're taking on 5 founding partners at reduced rates, and every engagement starts with a 7-day free trial.
          </p>
          <p>
            Vantier was founded and is led by Juan Soto, a Meta ads specialist based in Miami. Every engagement is handled by a single accountable team rather than a chain of disconnected vendors, so your ad spend and your calendar are treated as our own. We pair creative, campaign management, and conversion systems under one roof — so nothing falls through the cracks between hires or agencies, and you always know who is responsible for your results.
          </p>
        </div>
      </div>
    </SubpageShell>
  );
}
