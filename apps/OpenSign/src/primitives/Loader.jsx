import React from "react";

// Anillo neutro de ALI. daisyUI traia `op-loading-infinity`, que dibuja un
// simbolo de infinito animado: es una forma con personalidad propia y es lo
// que se ve mientras carga cada pantalla del portal, incluida la primera que
// abre un firmante invitado. Un anillo en el color del texto no compite con
// nada y es el mismo gesto de espera que usa el producto.
const Loader = () => {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className="ali-auth-spinner text-base-content"
    />
  );
};

export default Loader;
