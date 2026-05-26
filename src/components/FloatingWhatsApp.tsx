"use client";

import React, { useState, useEffect } from "react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Hide tooltip after 9 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip badge */}
      <div
        className={`bg-white text-primary-dark font-sans text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 ease-out transform origin-right ${
          showTooltip
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-4 scale-90 pointer-events-none"
        }`}
      >
        ¿Tienes dudas? ¡Escríbenos! 💬
      </div>

      {/* Pulsing WhatsApp button */}
      <a
        href="https://wa.me/527205599190?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informes%20para%20el%20Instituto%20Educativo%20Montes."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 animate-pulse-glow"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Contactar por WhatsApp"
      >
        <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.117-2.884-6.978C16.588 1.902 14.11 .88 11.47 1.88c-5.438 0-9.864 4.42-9.867 9.864-.001 1.8.486 3.568 1.412 5.124l-.97 3.548 3.612-.962zm11.448-5.063c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.195-.35.22-.651.07-3.002-1.498-5.07-3.153-6.242-5.17-.311-.536-.031-.827.244-1.102.247-.247.549-.643.824-.966.275-.322.366-.551.549-.92.182-.368.091-.689-.045-.99-.137-.3-.675-1.629-.925-2.228-.243-.584-.488-.507-.675-.517-.174-.01-.375-.012-.575-.012-.2 0-.526.075-.802.374-.275.3-1.05 1.024-1.05 2.5 0 1.475 1.074 2.9 1.225 3.1.15.2 2.11 3.224 5.116 4.519.715.309 1.273.493 1.707.63.718.228 1.37.196 1.885.12.573-.086 1.78-.727 2.03-1.43.25-.701.25-1.3.175-1.43-.075-.13-.275-.23-.576-.38z" />
        </svg>
      </a>
    </div>
  );
}
