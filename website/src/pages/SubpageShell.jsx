import { Link } from "react-router-dom";
import Footer from "@/components/vantier/Footer";

export default function SubpageShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2ED]">
      <header className="sticky top-0 z-50 bg-[#F5F2ED]/80 backdrop-blur-md border-b border-[#E4E0D8]">
        <nav className="mx-auto max-w-4xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}vantier-logo.png`} alt="Vantier logo" className="h-7 w-auto" />
            <span className="font-display text-lg font-semibold tracking-[0.25em] text-[#1A1A1A]">VANTIER</span>
          </Link>
          <Link to="/" className="font-body text-[13px] tracking-wide text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors">
            ← Back to home
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-20 lg:py-28 px-6 lg:px-10">{children}</main>
      <Footer />
    </div>
  );
}
