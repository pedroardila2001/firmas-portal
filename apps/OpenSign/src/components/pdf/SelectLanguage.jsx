import i18next from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Nombres en su propio idioma (endonimos), que es como los lee quien los
// busca. "Española" era ademas un error de concordancia: el idioma es
// "Español". El espanol va primero porque es el idioma del portal.
const languages = [
  { value: "es", text: "Español" },
  { value: "en", text: "English" },
  { value: "fr", text: "Français" },
  { value: "it", text: "Italiano" },
  { value: "de", text: "Deutsch" },
  { value: "hi", text: "हिन्दी" },
  { value: "kr", text: "한국어" }
];

function SelectLanguage(props) {
  const { i18n } = useTranslation();
  // Respaldo "es": si i18next todavia no resolvio idioma, el control no puede
  // mostrar "English" mientras la pagina esta en espanol.
  const defaultLanguage = i18next.language?.split("-")?.[0] || "es";
  const [lang, setLang] = useState(defaultLanguage);
  // `isBare` = variante discreta de las pantallas de acceso: sin caja, sin
  // borde y en color secundario, para que el idioma no compita con el boton
  // de entrar. El desplegable de Preferencias (isProfile) no cambia.
  const isBare = props?.isBare;
  // This function put query that helps to change the language
  const handleChangeLang = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
    props?.updateExtUser && props.updateExtUser({ language: e.target.value });
  };

  if (isBare) {
    return (
      <label className="inline-flex items-center gap-1.5 text-[12px] text-base-content/45">
        <i className="fa-light fa-globe" aria-hidden="true" />
        <span className="sr-only">Idioma</span>
        <select
          value={lang}
          onChange={handleChangeLang}
          className="ali-lang-select"
          aria-label="Idioma"
        >
          {languages.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div
      className={`${
        !props.isProfile && " mt-[9px] pb-2 md:pb-0 "
      } flex justify-center items-center text-base-content`}
    >
      <select
        value={lang}
        onChange={handleChangeLang}
        className={`${
          !props.isProfile ? " md:w-[15%] w-[50%]" : "w-[180px]"
        } op-select op-select-bordered op-select-sm `}
      >
        {languages.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectLanguage;
