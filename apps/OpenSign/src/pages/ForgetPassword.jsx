import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Parse from "parse";
import Alert from "../primitives/Alert";
import { appInfo } from "../constant/appinfo";
import { useDispatch } from "react-redux";
import { fetchAppInfo } from "../redux/reducers/infoReducer";
import {
  emailRegex,
} from "../constant/const";
import { useTranslation } from "react-i18next";
import { AliAuthShell } from "../components/AliAuthShell";

function ForgotPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "email") {
      value = value?.toLowerCase()?.replace(/\s/g, "");
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailRegex.test(state.email)) {
      alert(t("valid-email-alert"));
    } else {
      setIsLoading(true);
      localStorage.setItem("appLogo", appInfo.applogo);
      localStorage.setItem("userSettings", JSON.stringify(appInfo.settings));
      if (state.email) {
        const username = state.email;
        try {
            await Parse.User.requestPasswordReset(username);
          setToast({ type: "success", message: t("reset-password-alert-1") });
        } catch (err) {
          console.log("err ", err.code);
          setToast({
            type: "danger",
            message: err.message || t("reset-password-alert-2")
          });
        } finally {
          setIsLoading(false);
          setTimeout(() => setToast({ type: "", message: "" }), 1000);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAppInfo());
    closeStaleSession();
    // eslint-disable-next-line
  }, []);
  // Llegar a "olvide mi contrasena" con una sesion a medias abierta deja al
  // portal en un estado raro; se cierra antes de empezar. (Antes esta funcion
  // se llamaba saveLogo porque ademas guardaba el logotipo del tenant, que ya
  // no se pinta.)
  const closeStaleSession = async () => {
    try {
      await Parse.User.logOut();
    } catch (err) {
      console.log("err while logging out ", err);
    }
  };
  return (
    <>
      {isLoading && (
        <div
          aria-live="assertive"
          className="fixed inset-0 z-50 flex items-center justify-center bg-base-200/80 backdrop-blur-[2px]"
        >
          <span className="ali-auth-spinner text-base-content" />
        </div>
      )}
      {toast?.message && <Alert type={toast.type}>{toast.message}</Alert>}
      {/* Sin subtitulo a proposito: las cadenas disponibles en el diccionario
          (`reset-password-alert-1/2`) son los avisos de RESULTADO del envio, y
          puestas aqui le dicen a la persona que ya le llego un correo que
          todavia no ha pedido. El titulo mas el campo bastan. */}
      <AliAuthShell title={t("reset-password-alert-3")}>
        <form onSubmit={handleSubmit}>
          <label
            className="mb-1.5 block text-[12px] font-medium text-base-content/70"
            htmlFor="ali-forgot-email"
          >
            {t("email")}
          </label>
          <input
            id="ali-forgot-email"
            type="email"
            name="email"
            autoFocus
            placeholder="nombre@despacho.com"
            className="ali-auth-input"
            value={state.email}
            onChange={handleChange}
            onInvalid={(e) => e.target.setCustomValidity(t("input-required"))}
            onInput={(e) => e.target.setCustomValidity("")}
            required
          />
          <button type="submit" className="ali-auth-btn mt-6">
            {t("submit")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="mt-4 w-full text-[12.5px] text-base-content/50 transition-colors hover:text-base-content"
          >
            {t("login")}
          </button>
        </form>
      </AliAuthShell>
    </>
  );
}

export default ForgotPassword;
