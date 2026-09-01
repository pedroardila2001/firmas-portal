import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { showUpgradeProgress, hideUpgradeProgress } from "./utils";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Parse from "parse";
import "./polyfills";
import { serverUrl_fn } from "./constant/appinfo";
import "./i18n";
import { ScrollProvider } from "./context/ScrollPdfContext";

const appId =
  import.meta.env.VITE_APPID || process.env.REACT_APP_APPID || "opensign";
const serverUrl = serverUrl_fn();
Parse.initialize(appId);
Parse.serverURL = serverUrl;

if (localStorage.getItem("showUpgradeProgress")) {
  showUpgradeProgress();
}

// El portal de firmas tiene UN tema, el claro de ALI: el "modo oscuro (BETA)"
// de OpenSign nunca se termino de pintar (tablas y visor de PDF se quedaban en
// claro) y ALI no ofrece esa eleccion aqui. Se limpia la clave heredada para
// que a quien lo dejo encendido no le siga saliendo oscuro.
localStorage.removeItem("theme");
document.documentElement.setAttribute("data-theme", "opensigncss");


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ScrollProvider>
      <App />
    </ScrollProvider>
  </Provider>
);

hideUpgradeProgress();
localStorage.removeItem("showUpgradeProgress");
