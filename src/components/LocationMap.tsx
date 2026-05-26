"use client";

import React, { useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Car,
  Bus,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasParticles from "./CanvasParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.2765741230856!2d-99.57655!3d19.312278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89e8c0000001%3A0x0!2sAv.+Revoluci%C3%B3n+No.+4%2C+San+Pedro+Totoltepec%2C+50226+Toluca+de+Lerdo%2C+M%C3%A9x.!5e0!3m2!1ses!2smx!4v1716000000000!5m2!1ses!2smx";

const MAPS_LINK =
  "https://www.google.com/maps/place/Av.+Revolución+No.+4,+San+Pedro+Totoltepec,+50226+Toluca+de+Lerdo,+Méx./@19.312278,-99.576,17z/";

const infoCards = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Dirección",
    value: "Av. Revolución No. 4",
    sub: "San Pedro Totoltepec, C.P. 50226\nToluca, Estado de México",
    color: "text-accent-gold",
    bg: "bg-accent-gold/10 border-accent-gold/20",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Teléfonos",
    value: "722 238 9292",
    sub: "720 559 9190",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-400/20",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Horario de Atención",
    value: "Lun – Vie: 7:00 – 18:30",
    sub: "Sábados con cita previa",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-400/20",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Correo",
    value: "informes@institutoeducativomontes.com",
    sub: "Respuesta en menos de 24 h",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-400/20",
  },
];

const howToGet = [
  {
    icon: <Car className="h-5 w-5 text-accent-gold" />,
    title: "En Automóvil",
    desc: "Desde el centro de Toluca: toma Av. López Mateos rumbo a San Pedro Totoltepec. Estacionamiento disponible frente al plantel.",
  },
  {
    icon: <Bus className="h-5 w-5 text-blue-400" />,
    title: "En Transporte Público",
    desc: "Rutas que pasan por Av. Revolución: Línea Roja, Línea 15 y combis de la ruta Totoltepec-Centro.",
  },
  {
    icon: <Navigation className="h-5 w-5 text-emerald-400" />,
    title: "Con GPS / Waze",
    desc: 'Busca "Instituto Educativo Montes, Toluca" en Google Maps o Waze para obtener navegación en tiempo real.',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useGSAP(
    () => {
      // Entrance animation for info cards
      gsap.fromTo(
        ".loc-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".loc-cards-grid",
            start: "top 85%",
          },
        }
      );

      // Map frame entrance
      gsap.fromTo(
        ".map-frame",
        { opacity: 0, scale: 0.97, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".map-frame",
            start: "top 85%",
          },
        }
      );

      // How-to-get rows
      gsap.fromTo(
        ".how-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-grid",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="ubicacion"
      ref={containerRef}
      className="scroll-mt-32 py-28 lg:py-36 bg-[#f4f7fc] school-grid-light relative overflow-hidden px-6 lg:px-8"
    >
      {/* Decorative glow orbs */}
      <div className="absolute top-1/4 left-[-8%] w-[420px] h-[420px] bg-primary-blue/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-8%] w-[420px] h-[420px] bg-accent-gold/8 rounded-full blur-[130px] pointer-events-none animate-pulse" />

      {/* Floating sparkle */}
      <div className="absolute top-14 right-14 pointer-events-none opacity-25">
        <Sparkles className="h-8 w-8 text-accent-gold-dark" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-extrabold text-primary-blue bg-primary-blue/10 border border-primary-blue/15 px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Cómo Llegarnos
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-[4.3rem] xl:text-[5.2rem] text-primary-dark mt-5 tracking-tight leading-[1.02]">
            Encuéntranos en <span className="text-primary-blue">Toluca</span>
          </h2>
          <p className="font-sans text-primary-dark/70 mt-4 text-lg leading-relaxed font-semibold">
            Estamos ubicados en el corazón de San Pedro Totoltepec, a pocos minutos
            del centro de Toluca, con fácil acceso en automóvil y transporte público.
          </p>
        </div>

        {/* ── Main Layout: Map LEFT + Info RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ── Left Column: Google Maps ── */}
          <div className="lg:col-span-7 map-frame">
            <div className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(9,27,62,0.12)] border border-gray-200/80 group">

              {/* Map placeholder skeleton while loading */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-3 text-primary-dark/40">
                    <div className="w-10 h-10 border-[3px] border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">Cargando mapa…</span>
                  </div>
                </div>
              )}

              <iframe
                title="Ubicación Instituto Educativo Montes"
                src={MAPS_EMBED_URL}
                width="100%"
                height="520"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[380px] sm:h-[460px] lg:h-[520px] block"
                onLoad={() => setMapLoaded(true)}
              />

              {/* Overlay label pin */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-blue rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-display font-black text-xs text-primary-dark leading-none">Instituto Educativo Montes</p>
                  <p className="font-sans text-[10px] text-primary-dark/60 font-semibold mt-0.5">Av. Revolución No. 4, Toluca</p>
                </div>
              </div>

              {/* Open in Google Maps CTA */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-20 bg-primary-blue text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 hover:bg-primary-blue-dark hover:scale-105 transition-all duration-300 border border-white/10"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Abrir en Google Maps
              </a>
            </div>

            {/* ── How to Get Here – below map ── */}
            <div className="mt-8 how-grid space-y-4">
              {howToGet.map((item, i) => (
                <div
                  key={i}
                  className="how-row flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-primary-blue/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-primary-dark/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary-dark/10 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-primary-dark">{item.title}</h4>
                    <p className="font-sans text-xs text-primary-dark/70 mt-1 leading-relaxed font-semibold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Info Cards + CTA ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Info Cards grid */}
            <div className="loc-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className={`loc-card bg-white border rounded-2xl px-5 py-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group hover:scale-[1.015] ${card.bg}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.color} bg-white/60 border border-current/10`}>
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`font-sans text-[10px] font-black uppercase tracking-widest ${card.color}`}>
                      {card.label}
                    </span>
                    <p className="font-display font-black text-sm text-primary-dark mt-1 break-words leading-snug">
                      {card.value}
                    </p>
                    <p className="font-sans text-xs text-primary-dark/60 mt-1 font-semibold leading-relaxed whitespace-pre-line">
                      {card.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="flex-shrink mx-4 text-[10px] font-black text-primary-dark/40 uppercase tracking-widest">
                ¿Cómo llegar?
              </span>
              <div className="flex-grow border-t border-gray-200" />
            </div>

            {/* Get Directions CTA */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl font-display font-black text-base text-white bg-primary-blue flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,86,198,0.3)] hover:shadow-[0_15px_40px_rgba(0,86,198,0.45)] hover:scale-[1.02] transition-all duration-300 border border-primary-blue/50 group"
            >
              <Navigation className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Obtener Indicaciones
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* WhatsApp directions shortcut */}
            <a
              href="https://wa.me/527205599190?text=Hola%2C%20me%20podrían%20indicar%20cómo%20llegar%20al%20Instituto%20Educativo%20Montes%20desde%20mi%20ubicación%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl font-display font-black text-base text-white flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 border border-white/10 shadow-md"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.117-2.884-6.978C16.588 1.902 14.11 .88 11.47 1.88c-5.438 0-9.864 4.42-9.867 9.864-.001 1.8.486 3.568 1.412 5.124l-.97 3.548 3.612-.962zm11.448-5.063c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.195-.35.22-.651.07-3.002-1.498-5.07-3.153-6.242-5.17-.311-.536-.031-.827.244-1.102.247-.247.549-.643.824-.966.275-.322.366-.551.549-.92.182-.368.091-.689-.045-.99-.137-.3-.675-1.629-.925-2.228-.243-.584-.488-.507-.675-.517-.174-.01-.375-.012-.575-.012-.2 0-.526.075-.802.374-.275.3-1.05 1.024-1.05 2.5 0 1.475 1.074 2.9 1.225 3.1.15.2 2.11 3.224 5.116 4.519.715.309 1.273.493 1.707.63.718.228 1.37.196 1.885.12.573-.086 1.78-.727 2.03-1.43.25-.701.25-1.3.175-1.43-.075-.13-.275-.23-.576-.38z" />
              </svg>
              Pedir Indicaciones por WhatsApp
            </a>

            {/* Trust pill */}
            <div className="flex items-center justify-center gap-2.5 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-sans text-xs font-black text-emerald-700 uppercase tracking-wider">
                Plantel con acceso verificado · San Pedro Totoltepec, Toluca
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
