import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    // ALI opera en Colombia y el portal habla espanol, punto. Antes habia un
    // detector (localStorage) y un selector de 7 idiomas heredados de
    // OpenSign: bastaba con que alguien lo tocara — o que arrastrara un
    // `i18nextLng` viejo — para que el portal de un abogado colombiano
    // amaneciera en ingles. El idioma es fijo: `lng` gana sobre cualquier
    // valor guardado, y los diccionarios de los otros 6 idiomas siguen en
    // `public/locales` (el server los usa para los correos) pero ya no hay
    // forma de llegar a ellos desde la interfaz.
    lng: "es",
    fallbackLng: "es",
    supportedLngs: ["es"],
    load: "languageOnly",
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
