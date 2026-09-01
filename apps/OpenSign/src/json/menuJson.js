/**
 * Menu lateral del portal de firmas de ALI.
 *
 * Solo queda lo que el portal hace y ALI NO: colocar campos sobre el PDF,
 * firmar, y seguir el estado de las solicitudes. Todo lo que duplicaba una
 * superficie de ALI se retiro (ver `infra/opensign/patches/README.md` §9):
 *
 * - "Drive" duplicaba la Boveda y era la puerta por la que un documento
 *   entraba SIN pasar por ALI (sin fila en `documents`, sin creditos, sin
 *   sincronizacion de estado): el origen de los documentos dobles.
 * - "Solicitar firmas" duplicaba "Enviar a firma" del editor de ALI, con el
 *   mismo problema: la solicitud no existia para ALI.
 * - "Plantillas" duplicaba la redaccion y los kits de marca de ALI.
 * - "Agenda de contactos" duplicaba los contactos de ALI.
 * - "Token API" y "Webhook" son integracion de terceros con OpenSign; ALI
 *   habla con el server por Parse y la CE nunca emitio webhooks.
 * - "Preferencias" y "Usuarios" administran un tenant que aprovisiona ALI:
 *   editarlos a mano descuadra la cuenta con `signature_portal_accounts`.
 *
 * Las RUTAS siguen existiendo en `App.jsx` (un enlace viejo no se rompe);
 * lo que se retira es la invitacion a usarlas.
 */

const sidebarList = [
  {
    icon: "fa-light fa-tachometer-alt",
    title: "Dashboard",
    target: "",
    pageType: "dashboard",
    description: "",
    objectId: "35KBoSgoAK"
  },
  {
    icon: "fa-light fa-pen-nib",
    title: "Sign yourself",
    target: "_self",
    pageType: "form",
    description: "",
    objectId: "sHAnZphf69"
  },
  {
    icon: "fa-light fa-address-card",
    title: "Documents",
    target: "_self",
    pageType: null,
    description: "",
    objectId: null,
    children: [
      {
        icon: "fa-light fa-signature",
        title: "Need your sign",
        target: "_self",
        pageType: "report",
        description: "",
        objectId: "4Hhwbp482K"
      },
      {
        icon: "fa-light fa-tasks",
        title: "In Progress",
        target: "_self",
        pageType: "report",
        description: "",
        objectId: "1MwEuxLEkF"
      },
      {
        icon: "fa-light fa-check-circle",
        title: "Completed",
        target: "_self",
        pageType: "report",
        description: "",
        objectId: "kQUoW4hUXz"
      },
      {
        icon: "fa-light fa-edit",
        title: "Drafts",
        target: "_self",
        pageType: "report",
        description: "",
        objectId: "ByHuevtCFY"
      },
      {
        icon: "fa-light fa-times-circle",
        title: "Declined",
        target: "_self",
        pageType: "report",
        description: "",
        objectId: "UPr2Fm5WY3"
      },
      {
        icon: "fa-light fa-hourglass-end",
        title: "Expired",
        target: "_self",
        pageType: "report",
        description: "",
        objectId: "zNqBHXHsYH"
      }
    ]
  },
  {
    icon: "fa-light fa-cog",
    title: "Settings",
    target: "_self",
    pageType: null,
    description: "",
    objectId: null,
    children: [
      {
        icon: "fa-light fa-pen-fancy",
        title: "My Signature",
        target: "_self",
        pageType: "",
        description: "",
        objectId: "managesign"
      }
    ]
  }
];
export default sidebarList;
