import React from "react";
import { useTranslation } from "react-i18next";
import { sourceCodeUrl } from "../constant/const";
import SelectLanguage from "./pdf/SelectLanguage";

// ── Superficie de autenticacion de ALI ──────────────────────────────────────
// Calcada de apps/web/src/pages/LoginPage.tsx del producto: columna centrada
// sobre fondo neutro, marca arriba, titulo serif, cero ilustracion. OpenSign
// traia una plantilla partida en dos columnas con un dibujo de un senor de
// espaldas frente a cuatro monitores; ese dibujo era lo primero que delataba
// que el portal no era de ALI, y por eso desaparece de las cuatro puertas de
// entrada (/, /forgetpassword, /login/:base64url y /sso) en vez de solo del
// login.
//
// Reglas heredadas del sistema de diseno (packages/ali-ui):
//  · titulares en serif y en peso normal — nunca bold de sistema;
//  · un solo acento, y es neutro (#171717 claro / #fafafa oscuro): el azul
//    #1d4ed8 esta reservado a enlaces;
//  · nada de sombras duras: borde de 1px y una sombra larga muy tenue.

export function AliWordmark({ tagline = "Portal de firmas", className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="font-serif text-[30px] md:text-[38px] font-semibold leading-none tracking-tight text-base-content">
        ALI
      </span>
      {tagline ? (
        <span className="mt-2.5 text-[10.5px] md:text-[11px] font-normal uppercase leading-none tracking-[0.28em] text-base-content/45">
          {tagline}
        </span>
      ) : null}
    </div>
  );
}

// Pie comun: idioma (discreto, en espanol) y la oferta de codigo fuente que
// exige la AGPL-3 §13 a quien opera el portal por red. En OpenSign el enlace
// solo existia dentro de la sesion iniciada, donde el usuario anonimo — que
// es justamente el destinatario de la obligacion — nunca llegaba.
export function AliAuthFooter({ showLanguage = true }) {
  const { t } = useTranslation();
  return (
    <div className="mt-8 flex w-full max-w-[420px] flex-col items-center gap-3">
      {showLanguage ? <SelectLanguage isBare /> : null}
      <a
        href={sourceCodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] font-light text-base-content/30 transition-colors hover:text-base-content/60"
      >
        {t("source-code")}
      </a>
    </div>
  );
}

export function AliAuthShell({
  title,
  subtitle,
  children,
  tagline,
  showLanguage = true,
  wide = false
}) {
  return (
    <main className="ali-auth-page">
      <div className="mb-9 md:mb-11">
        <AliWordmark tagline={tagline} />
      </div>
      <div className={`ali-auth-card ${wide ? "md:max-w-[520px]" : ""}`}>
        {title ? (
          <h1 className="font-serif text-[25px] md:text-[28px] font-normal leading-tight tracking-tight text-base-content">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="mt-2 text-[13.5px] font-normal leading-relaxed text-base-content/55">
            {subtitle}
          </p>
        ) : null}
        <div className={title || subtitle ? "mt-7" : ""}>{children}</div>
      </div>
      <AliAuthFooter showLanguage={showLanguage} />
    </main>
  );
}

// Pantalla de espera con marca. La usa /sso mientras valida el token que trae
// ALI: sin ella la persona ve un spinner desnudo y no sabe si aterrizo en el
// sitio correcto.
export function AliAuthLoader({ message }) {
  return (
    <main className="ali-auth-page" aria-live="polite" aria-busy="true">
      <AliWordmark />
      <div className="mt-9 flex flex-col items-center gap-4">
        <span className="ali-auth-spinner" aria-hidden="true" />
        <p className="text-[13.5px] text-base-content/55">{message}</p>
      </div>
    </main>
  );
}

export default AliAuthShell;
