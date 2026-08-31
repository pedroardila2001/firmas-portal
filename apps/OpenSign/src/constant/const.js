// AGPL-3 §13: quien usa el portal por red tiene derecho a recibir el código
// fuente correspondiente (OpenSign + los parches de ALI). Este enlace es esa
// oferta. DEBE apuntar al fork público de ALI antes de desplegar.
export const sourceCodeUrl = "https://github.com/pedroardila2001/firmas-portal";

// ── SSO automatico con ALI ──────────────────────────────────────────────────
// El portal de firmas no tiene poblacion propia: quien entra ya es usuario de
// ALI y su sesion se recicla (ver src/pages/SsoLogin.jsx). Por eso la URL base
// de ALI se declara UNA sola vez y aqui: la usan el redirector del login y
// cualquier vuelta a la aplicacion. Se puede sobreescribir sin recompilar con
// REACT_APP_ALI_APP_URL (entrypoint.sh la publica en window.RUNTIME_ENV) para
// apuntar a un entorno de pruebas.
const aliAppUrlFromEnv =
  (typeof window !== "undefined" &&
    window?.RUNTIME_ENV?.REACT_APP_ALI_APP_URL) ||
  process.env.REACT_APP_ALI_APP_URL ||
  "";
export const aliAppUrl = (aliAppUrlFromEnv || "https://aliado.pro").replace(
  /\/+$/,
  ""
);
// Puerta de entrada del lado de ALI: comprueba la sesion del producto y
// devuelve a `${firma.aliado.pro}/sso#token=...`. El portal no la construye a
// mano en ningun otro sitio.
export const aliSsoStartUrl = `${aliAppUrl}/firma-sso`;
// Marca de "en esta pestana se entra con formulario". Vive en sessionStorage
// (no en localStorage) a proposito: es una excepcion puntual, no una
// preferencia — al abrir una pestana nueva se vuelve al SSO automatico.
// Valores: "manual" (llegaron con ?direct=1) y "sso-failed" (el SSO fallo y
// hay que avisarlo). Sin ella el login volveria a rebotar hacia ALI y el
// rebote seria un bucle.
export const aliDirectLoginKey = "aliLoginDirect";
export const contactCls = "contracts_Contactbook";
export const templateCls = "contracts_Template";
export const documentCls = "contracts_Document";
export const themeColor = "#47a3ad";
export const iconColor = "#686968";
export const SCALE_STEPS = [
  0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0
];
// Dynamic icon color function for better dark mode visibility
export const getThemeIconColor = () => {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "opensigndark" ? "#CCCCCC" : "#686968";
};
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const maxTitleLength = 250; // 250 characters
export const maxNoteLength = 200; // 200 characters
export const maxDescriptionLength = 500; // 500 characters
export const maxFileSize = 80; // for cloud 10MB / 80MB for self-hosted
