import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/vantier/LanguageSwitcher";

export default function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Regular nav links (excludes Apply, which gets its own emphasized CTA
  // button below so it only ever appears once in the desktop nav).
  const links = [
    { label: t.nav.whatWeDo, href: "#what-we-do" },
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.trackRecord, href: "#track-record" },
    { label: t.nav.faq || "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#F5F2ED]/80 backdrop-blur-md border-b border-[#E4E0D8]">
      <nav className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}vantier-logo.png`} alt="Vantier logo" className="h-7 w-auto" />
          <span className="font-display text-lg font-semibold tracking-[0.25em] text-[#1A1A1A]">VANTIER</span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-body text-[13px] tracking-wide text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#apply" className="font-body text-[13px] font-medium text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#A3895D] hover:border-[#A3895D] transition-colors">
            {t.nav.apply}
          </a>
          <LanguageSwitcher />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[#1A1A1A] p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[#F5F2ED] border-t border-[#E4E0D8] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-base text-[#1A1A1A]/80"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={() => setOpen(false)}
            className="font-body text-base font-medium text-[#1A1A1A]"
          >
            {t.nav.apply}
          </a>
        </div>
      )}
    </header>
  );
}
