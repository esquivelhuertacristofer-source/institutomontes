"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Information */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="relative w-64 h-16 md:w-72 md:h-20 overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo_raw.png"
                alt="Instituto Educativo Montes"
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-contain scale-[3.2] translate-y-[-4%] brightness-0 invert"
              />
            </div>

            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed max-w-sm">
              Formando integralmente a las infancias que transformarán el mañana. Primaria bilingüe, 
              tecnológica y con valores en Toluca.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-white/80 leading-snug">
                  Av. Revolución 4, San Pedro Totoltepec, C.P. 50226, Toluca, Estado de México.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent-gold shrink-0" />
                <div className="flex flex-col text-sm text-white/80">
                  <a href="tel:7222389292" className="hover:text-white transition-colors">722 238 9292</a>
                  <a href="tel:7205599190" className="hover:text-white transition-colors">720 559 9190</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent-gold shrink-0" />
                <a href="mailto:institutoeducativomontes@gmail.com" className="font-sans text-sm text-white/80 hover:text-white transition-colors break-all">
                  institutoeducativomontes@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent-gold shrink-0" />
                <span className="font-sans text-sm text-white/80">
                  Lunes a Viernes: 7:00 a.m. – 6:30 p.m.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-6 text-left">
            <h4 className="font-display font-extrabold text-base uppercase tracking-wider text-accent-gold">
              Navegación
            </h4>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/70">
              <a href="#inicio" onClick={(e) => handleLinkClick(e, "inicio")} className="hover:text-white transition-colors">
                Inicio
              </a>
              <a href="#logros" onClick={(e) => handleLinkClick(e, "logros")} className="hover:text-white transition-colors">
                Logros
              </a>
              <a href="#diferenciadores" onClick={(e) => handleLinkClick(e, "diferenciadores")} className="hover:text-white transition-colors">
                Diferenciadores
              </a>
              <a href="#programas" onClick={(e) => handleLinkClick(e, "programas")} className="hover:text-white transition-colors">
                Programas
              </a>
              <a href="#actividades" onClick={(e) => handleLinkClick(e, "actividades")} className="hover:text-white transition-colors">
                Actividades
              </a>
              <a href="#contacto" onClick={(e) => handleLinkClick(e, "contacto")} className="hover:text-white transition-colors">
                Contacto
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <h4 className="font-display font-extrabold text-base uppercase tracking-wider text-accent-gold">
              Ubicación Primaria
            </h4>
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative bg-white/5">
              <iframe
                title="Mapa de ubicación Instituto Educativo Montes"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.2765741230856!2d-99.57655!3d19.312278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89e8c0000001%3A0x0!2sAv.+Revoluci%C3%B3n+No.+4%2C+San+Pedro+Totoltepec%2C+50226+Toluca+de+Lerdo%2C+M%C3%A9x.!5e0!3m2!1ses!2smx!4v1716000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Scroll to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Instituto Educativo Montes. Todos los derechos reservados.</p>
          
          <a
            href="#inicio"
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl hover:bg-white/10 text-white transition-all hover:scale-105"
          >
            <ArrowUp className="h-4 w-4 text-accent-gold" />
            Volver Arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
