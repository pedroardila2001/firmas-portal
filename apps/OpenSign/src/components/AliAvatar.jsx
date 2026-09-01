import { useState } from "react";

/**
 * Avatar del usuario con el lenguaje visual de la webapp de ALI: cuadro de
 * esquinas suaves con la inicial del nombre, no el circulo con anillo gris y
 * la silueta generica de OpenSign (`assets/images/dp.png`).
 *
 * Es la traduccion a daisyUI del `Avatar` de `AliSidebarUserCard.tsx`
 * (apps/web): borde sutil, superficie elevada, inicial en color atenuado y
 * la foto encima solo cuando existe y carga. Sin foto NO hay silueta: la
 * inicial es el estado normal, no un error.
 */
const AliAvatar = ({ name, imageUrl, size = 36, className = "", rounded = "rounded-md" }) => {
  const [failed, setFailed] = useState(false);
  const initial = (name || "").trim().slice(0, 1).toUpperCase() || "·";
  const showImage = Boolean(imageUrl) && !failed;

  return (
    <div
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
      className={`flex shrink-0 items-center justify-center overflow-hidden border border-base-300 bg-base-200 font-medium text-base-content/70 ${rounded} ${className}`}
    >
      {showImage ? (
        <img
          src={imageUrl}
          alt={name || ""}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </div>
  );
};

export default AliAvatar;
