import logo from "../assets/images/logo.png";
import { getEnv } from "./Utils";

export function serverUrl_fn() {
  const env = getEnv();
  const serverurl = env?.REACT_APP_SERVERURL
    ? env.REACT_APP_SERVERURL // env.REACT_APP_SERVERURL is used for prod
    : process.env.REACT_APP_SERVERURL; //  process.env.REACT_APP_SERVERURL is used for dev (locally)
  let baseUrl = serverurl ? serverurl : window.location.origin + "/api/app";
  return baseUrl;
}
export const appInfo = {
  applogo: logo,
  appId: process.env.REACT_APP_APPID ? process.env.REACT_APP_APPID : "opensign",
  baseUrl: serverUrl_fn(),
  defaultRole: "contracts_User",
  fev_Icon:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADQElEQVR42u2YPUszWRSAnzszki8cv0AbiYJgYuFHQFFQEGwMElCISCBgYWEhWFr6M8QfYGGpYCFqY0BtopUIaWwkCikUEzMmQ3LnvpUBl92F1Xl3DTsXphkOM+eZc54zd0YEg0FFEy+NJl8egAfgAXgAHoAH4AF4AB7Ab1pCCIQQzQkghEBKSb1eb04AKSXBYJC2tjaUUs0DIISgVqvR09PD1dUVt7e3xONxKpUKuq7/fABd16nVaqysrBCJROju7mZ9fR3gt1RCuP1J+ZHkzc0N0WgU27YBmJyc5O7ujkAggOM4P7MCuq5TrVaJx+OEw2FKpRJCCPx+P+l0Giklmqb93Arous7b2xuZTIaTkxNisRjLy8tIKcnn88RisYYLbrWTa49D0zTe398ZHh5mdHSU3d1dDg8PAahWq/T19bGwsEC1WnVVZlcBpJRsbGyQzWYpFotkMhkKhQI+nw+A1dVVNE37eQ4IIbBtm46ODhKJBNvb2ziOQz6fZ2dnp+HG7OwsIyMjVCoV11ww3Op9y7JIpVL09vaytLTE4uIitVqNwcHBxls5FAqRTqfZ2tpyrRKuSKxpGpZlcXFxgWVZ5HI5AoEAQgjK5TJzc3MMDQ0hhODx8ZGxsTHXZDbcSL5SqTA1NcX4+DgDAwPk8/lPMalUiv39fSzLIhwOk0gk2NvbwzTNb++VtO/2vmEYSCnZ3Nzk8vKSp6cnurq6ME0T0zRpbW3l7OyM+/t7/H4/SinW1tY+XeM/Afjo69fXV6anp0kmk1xfX+M4DsViESklUkps2+b5+ZmDg4PGqJ2ZmSGZTFIqlZBSfg8iGAyqf3qEQiFlGIaKRqPq6OhI2batlFKqXC6r8/NzlUqllGEYyjAMNT8/r05PT1WhUFBKKeU4jlJKKSmlOj4+VpFIRLW0tKhQKKS+ksuXJBZCUK/X6ezsZGJigmKxiOM4aJqGaZo8PDyQy+UA6O/vJxKJUC6XG/2ulEIIQXt7O9lslpeXFwzD+JLQX55CHxAfm7U/ih0IBACwbftvRfX5fF9O/ttjVAiBpmmfbi6EwHGcxrk/i/mr2H99jCqlkFJ+O8b7K+EBeAAegAfgAXgAHoAH8D8F+AXujaoKYQ901QAAAABJRU5ErkJggg==",
  googleClientId: process.env.REACT_APP_GOOGLECLIENTID
    ? `${process.env.REACT_APP_GOOGLECLIENTID}`
    : "",
  metaDescription:
    "Portal de firma electrónica de ALI: firme documentos y solicite firmas en minutos.",
  settings: [
    {
      role: "contracts_Admin",
      menuId: "VPh91h0ZHk",
      pageType: "dashboard",
      pageId: "35KBoSgoAK",
      extended_class: "contracts_Users"
    },
    {
      role: "contracts_OrgAdmin",
      menuId: "VPh91h0ZHk",
      pageType: "dashboard",
      pageId: "35KBoSgoAK",
      extended_class: "contracts_Users"
    },
    {
      role: "contracts_Editor",
      menuId: "H9vRfEYKhT",
      pageType: "dashboard",
      pageId: "35KBoSgoAK",
      extended_class: "contracts_Users"
    },
    {
      role: "contracts_User",
      menuId: "H9vRfEYKhT",
      pageType: "dashboard",
      pageId: "35KBoSgoAK",
      extended_class: "contracts_Users"
    }
  ]
};
