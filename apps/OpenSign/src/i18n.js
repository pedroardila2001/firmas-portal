import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector) // Use LanguageDetector directly without creating an instance
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    // ALI opera en Colombia: el portal habla espanol salvo que la persona pida
    // otra cosa a mano. Antes el detector consultaba `navigator` ANTES de caer
    // al respaldo, asi que un navegador en ingles — el caso normal en un Mac o
    // un Windows recien instalado — abria el portal en ingles aunque el
    // destinatario fuera un abogado colombiano. Se quita "navigator" del orden:
    // la unica fuente es la eleccion explicita guardada en localStorage, y a
    // falta de eleccion manda `fallbackLng`.
    fallbackLng: "es",
    supportedLngs: ["es", "en", "fr", "it", "de", "hi", "kr"],
    load: "languageOnly",
    detection: {
      order: ["localStorage"],
      // Defines where the detected language should be cached.
      caches: ["localStorage"]
    },
    ns: ["translation"], // default namespace
    defaultNS: "translation", // default namespace
    //Enables debug mode, which outputs detailed logs to the console about the translation process.
    debug: false,
    interpolation: {
      escapeValue: false // Not needed for react as it escapes by default
    },
    // `whitelist` es la opcion de i18next v19; la vigente es `supportedLngs`,
    // declarada arriba. Se deja fuera para no tener dos listas divergentes.
  });

export default i18n;
