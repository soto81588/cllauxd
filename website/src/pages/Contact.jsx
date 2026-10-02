import { Link } from "react-router-dom";
import SubpageShell from "@/pages/SubpageShell";

export default function Contact() {
  return (
    <SubpageShell>
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5">
          Contact
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium text-[#1A1A1A] mb-8">
          Contact Vantier
        </h1>

        <p className="font-display text-lg leading-relaxed text-[#1A1A1A]/85 mb-10">
          The fastest way to work with us is to apply for a 7-day free trial below. For general questions, partnerships, or press, reach us directly — we respond to every message within 48 hours.
        </p>

        <div className="space-y-6 mb-12">
          <div>
            <p className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2">Email</p>
            <a href="mailto:contact@invantier.com" className="font-display text-xl text-[#1A1A1A] hover:text-[#A3895D] transition-colors">
              contact@invantier.com
            </a>
          </div>
          <div>
            <p className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2">Location</p>
            <p className="font-display text-xl text-[#1A1A1A]">Miami, Florida · Serving service businesses across the USA</p>
          </div>
          <div>
            <p className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2">Social</p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl text-[#1A1A1A] hover:text-[#A3895D] transition-colors"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <Link
          to="/#apply"
          className="inline-block bg-[#1A1A1A] text-[#F5F2ED] font-body text-sm font-medium tracking-wide py-4 px-6 hover:bg-[#A3895D] transition-colors text-center rounded-full"
        >
          Apply for the 7-day free trial →
        </Link>
      </div>
    </SubpageShell>
  );
}
