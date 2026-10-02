import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#1A1A1A] text-white/70 py-12 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}vantier-logo.png`} alt="Vantier logo" className="h-7 w-auto" />
          <span className="font-display text-base font-semibold tracking-[0.25em] text-white">VANTIER</span>
        </div>
        <nav className="flex items-center gap-5">
          <Link to="/about" className="font-body text-xs text-white/60 tracking-wide hover:text-[#C5A975] transition-colors">
            About
          </Link>
          <Link to="/contact" className="font-body text-xs text-white/60 tracking-wide hover:text-[#C5A975] transition-colors">
            Contact
          </Link>
          <a
            href="mailto:contact@invantier.com"
            className="font-body text-xs text-[#C5A975] tracking-wide hover:underline"
          >
            contact@invantier.com
          </a>
        </nav>
        <p className="font-body text-xs text-white/40 tracking-wide">
          © {new Date().getFullYear()} Vantier Marketing. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
