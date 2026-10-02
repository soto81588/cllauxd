import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 font-body text-[13px] tracking-wide text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
        aria-label="Select language"
      >
        <Globe size={16} />
        <span>{current?.label}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-[#F5F2ED] border border-[#E4E0D8] rounded-xl shadow-lg py-1 z-50 max-h-72 overflow-auto">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-left font-body text-sm text-[#1A1A1A]/80 hover:bg-[#E4E0D8]/60 transition-colors"
            >
              <span>{l.label}</span>
              {l.code === lang && <Check size={14} className="text-[#A3895D]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
