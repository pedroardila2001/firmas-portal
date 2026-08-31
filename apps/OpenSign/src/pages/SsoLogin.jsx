import { useEffect, useRef } from "react";
import axios from "axios";
import Parse from "parse";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { appInfo, serverUrl_fn } from "../constant/appinfo";
import { aliDirectLoginKey } from "../constant/const";
import { getAppLogo } from "../constant/Utils";
import { fetchAppInfo } from "../redux/reducers/infoReducer";
import { showTenant } from "../redux/reducers/ShowTenant";
import { AliAuthLoader } from "../components/AliAuthShell";

// ── Receptor de SSO de ALI ──────────────────────────────────────────────────
// Contrato FIJADO con el producto (no cambiar sin cambiar tambien el emisor):
//
//   https://firma.aliado.pro/sso#token=<parseSessionToken>&email=<email>
//
// Va en el fragmento y no en el query string a proposito: el navegador nunca
// manda el `#` al servidor, asi que el token de sesion no queda en los logs de
// acceso del portal ni en la cabecera Referer al saltar de pagina. A cambio,
// esta pagina tiene que limpiarlo del historial ella misma — es lo primero que
// hace, antes incluso de validarlo, para que un F5 o un "compartir esta URL"
// no reenvien la sesion.
//
// Lo que hace despues es exactamente lo que hace Login.jsx tras un `loginuser`
// correcto. No es media replica: si falta cualquiera de estos pasos el portal
// arranca a medias y el sintoma aparece lejos de aqui.
//
//   1. `Parse.User.become(token)` — sin esto `Parse.User.current()` es null y
//      HomeLayout declara la sesion invalida en cuanto monta.
//   2. accesstoken / UserInformation / userEmail / profileImg (setLocalVar).
//   3. appLogo + favicon (getAppLogo) y `fetchAppInfo` en redux.
//   4. `getUserDetails` (la clase extendida contracts_Users) y de ahi:
//      IsDisabled, UserRole → menu, _user_role, Extand_Class, userEmail/username,
//      TenantId + TenantName + `showTenant` — HomeLayout corta la sesion si
//      TenantId no esta —, Language, PageLanding, defaultmenuid y pageType.
//   5. Navegar a `/${menu.pageType}/${menu.pageId}` con el objectId que sale
//      del rol, no a una ruta escrita a mano.
//
// Cualquier fallo (token vencido, revocado, usuario deshabilitado, rol sin
// menu) termina en el formulario clasico — `/?direct=1`, ver goToLogin — sin
// tocar nada de lo que ya hubiera.

function SsoLogin() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // React 18 monta dos veces en desarrollo (StrictMode) y el hash ya no esta
  // en la segunda pasada; el candado evita disparar el flujo dos veces.
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    handleSso();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const landingPath = () => {
    const pageType = localStorage.getItem("pageType");
    const pageId = localStorage.getItem("PageLanding");
    return pageType && pageId ? `/${pageType}/${pageId}` : "/";
  };

  // Caida al formulario clasico. NO se puede navegar a "/" a secas: la raiz
  // rebota a ALI en cuanto no ve sesion, ALI devuelve aqui con otro token que
  // vuelve a fallar por la misma razon (vencido, revocado, rol sin menu) y el
  // par queda dando vueltas. Se deja marcado en sessionStorage que en esta
  // pestana se entra con contrasena — con el motivo, para que el login pueda
  // explicar por que aparecio el formulario — y se va a `/?direct=1`, que es
  // el mismo escape manual del administrador. Al abrir una pestana nueva la
  // marca no existe y se vuelve a intentar el SSO.
  const goToLogin = () => {
    try {
      sessionStorage.setItem(aliDirectLoginKey, "sso-failed");
    } catch {
      // Navegacion privada con almacenamiento bloqueado: el `?direct=1` de la
      // URL basta para no rebotar, aunque no sobreviva a un F5.
    }
    navigate("/?direct=1", { replace: true });
  };

  const setLocalVar = (user, sessionToken) => {
    localStorage.setItem("accesstoken", sessionToken);
    localStorage.setItem("UserInformation", JSON.stringify(user));
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("profileImg", user.ProfilePic || "");
  };

  const handleSso = async () => {
    const rawHash = window.location.hash?.startsWith("#")
      ? window.location.hash.slice(1)
      : "";
    const params = new URLSearchParams(rawHash);
    const token = params.get("token")?.trim();
    const email = params.get("email")?.trim()?.toLowerCase() || "";

    // Limpieza del fragmento ANTES de cualquier await: si la validacion tarda
    // y la persona copia la barra de direcciones, no se lleva la sesion.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if (!token) {
      goToLogin();
      return;
    }

    // Sesion viva del mismo correo: no se pisa. Volver a `become` generaria
    // una sesion nueva y dejaria la anterior colgando en el servidor.
    const activeToken = localStorage.getItem("accesstoken");
    const activeEmail = (localStorage.getItem("userEmail") || "").toLowerCase();
    if (activeToken && email && activeEmail === email) {
      navigate(landingPath(), { replace: true });
      return;
    }

    try {
      const baseUrl = localStorage.getItem("baseUrl") || `${serverUrl_fn()}/`;
      const parseAppId = localStorage.getItem("parseAppId") || appInfo.appId;
      const res = await axios.get(`${baseUrl}users/me`, {
        headers: {
          "X-Parse-Application-Id": parseAppId,
          "X-Parse-Session-Token": token
        }
      });
      const user = res?.data;
      if (!user?.objectId) {
        goToLogin();
        return;
      }

      localStorage.setItem("appLogo", appInfo.applogo);
      await Parse.User.become(token);
      // El token del fragmento manda sobre el que devuelva /users/me: es el
      // que ALI acaba de emitir y el que ya esta activo en Parse.
      setLocalVar(user, token);
      await getAppLogo();
      dispatch(fetchAppInfo());

      const userSettings = appInfo.settings;
      const extUser = await Parse.Cloud.run("getUserDetails");
      if (!extUser) {
        goToLogin();
        return;
      }
      if (extUser?.get("IsDisabled")) {
        goToLogin();
        return;
      }
      const userRole = extUser?.get("UserRole");
      const menu =
        userRole && userSettings?.find((item) => item.role === userRole);
      if (!menu) {
        // Usuario valido sin menu para su rol: lo resuelve el login normal,
        // que ya tiene el modal de "datos adicionales" para este caso.
        goToLogin();
        return;
      }

      const extInfo = JSON.parse(JSON.stringify(extUser));
      localStorage.setItem("_user_role", userRole.replace("contracts_", ""));
      const checkLanguage = extUser?.get("Language");
      if (checkLanguage) {
        i18n.changeLanguage(checkLanguage);
      }
      localStorage.setItem("Extand_Class", JSON.stringify([extUser]));
      localStorage.setItem("userEmail", extInfo.Email);
      localStorage.setItem("username", extInfo.Name);
      if (extInfo?.TenantId) {
        const tenant = {
          Id: extInfo?.TenantId?.objectId || "",
          Name: extInfo?.TenantId?.TenantName || ""
        };
        localStorage.setItem("TenantId", tenant.Id);
        dispatch(showTenant(tenant.Name));
        localStorage.setItem("TenantName", tenant.Name);
      }
      localStorage.setItem("PageLanding", menu.pageId);
      localStorage.setItem("defaultmenuid", menu.menuId);
      localStorage.setItem("pageType", menu.pageType);
      navigate(`/${menu.pageType}/${menu.pageId}`, { replace: true });
    } catch (err) {
      console.log("err in sso login", err?.message || err);
      goToLogin();
    }
  };

  return <AliAuthLoader message={t("ali-sso-entering")} />;
}

export default SsoLogin;
