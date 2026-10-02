import { createContext, useContext, useState, useEffect } from "react";
import { translations, LANGUAGES, DEFAULT_LANG } from "@/lib/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("vantier_lang") || DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir || "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("vantier_lang", lang);
    } catch {}
  }, [lang, dir]);

  const t = translations[lang] || translations[DEFAULT_LANG];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
