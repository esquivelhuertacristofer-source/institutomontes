"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const magnetBtnRef = useRef<HTMLAnchorElement>(null);

  const handleMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = magnetBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMagnetLeave = () => {
    const btn = magnetBtnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Dynamic text color classes
  const linkColorClass = scrolled
    ? "text-primary-dark/80 hover:text-primary-blue"
    : "text-white/90 hover:text-accent-gold";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav py-3 shadow-[0px_8px_24px_rgba(9,27,62,0.06)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => handleLinkClick(e, "inicio")}
              className="flex items-center cursor-pointer group"
            >
              <div className="relative w-64 h-16 md:w-72 md:h-20 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-[1.02] duration-300">
                <Image
                  src="/images/logo_raw.png"
                  alt="Instituto Educativo Montes"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className={`object-contain scale-[3.2] translate-y-[-4%] transition-all duration-300 ${
                    scrolled ? "" : "brightness-0 invert"
                  }`}
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <a
                href="#inicio"
                onClick={(e) => handleLinkClick(e, "inicio")}
                className={`text-sm font-bold transition-colors duration-300 ${linkColorClass}`}
              >
                Inicio
              </a>
              <a
                href="#logros"
                onClick={(e) => handleLinkClick(e, "logros")}
                className={`text-sm font-bold transition-colors duration-300 ${linkColorClass}`}
              >
                Logros
              </a>
              <a
                href="#diferenciadores"
                onClick={(e) => handleLinkClick(e, "diferenciadores")}
                className={`text-sm font-bold transition-colors duration-300 ${linkColorClass}`}
              >
                Diferenciadores
              </a>
              <a
                href="#programas"
                onClick={(e) => handleLinkClick(e, "programas")}
                className={`text-sm font-bold transition-colors duration-300 ${linkColorClass}`}
              >
                Programas
              </a>
              <a
                href="#actividades"
                onClick={(e) => handleLinkClick(e, "actividades")}
                className={`text-sm font-bold transition-colors duration-300 ${linkColorClass}`}
              >
                Actividades
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "contacto")}
                className={`text-sm font-bold transition-colors duration-300 ${linkColorClass}`}
              >
                Contacto
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <a
                href="tel:7222389292"
                className={`flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                  scrolled ? "text-primary-blue hover:text-primary-dark" : "text-white hover:text-accent-gold"
                }`}
              >
                <Phone className="h-4 w-4" />
                722 238 9292
              </a>
              <a
                ref={magnetBtnRef}
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                href="https://wa.me/527205599190?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20visita%20para%20conocer%20el%20Instituto%20Educativo%20Montes."
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-button px-6 py-3 rounded-xl font-display font-extrabold text-sm text-primary-dark shadow-ambient transition-all"
              >
                Agendar Visita
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href="tel:7222389292"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  scrolled ? "bg-primary-blue/5 text-primary-blue" : "bg-white/10 text-white"
                }`}
                title="Llamar"
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={toggleMobileMenu}
                className={`w-10 h-10 rounded-xl flex items-center justify-center focus:outline-none transition-colors ${
                  scrolled ? "bg-primary-dark/5 text-primary-dark" : "bg-white/10 text-white"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-45 bg-primary-dark/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-gradient-to-b from-[#091b3e] to-[#06122c] border-l border-white/10 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-8 mt-16">
            <div className="flex flex-col gap-6">
              <a
                href="#inicio"
                onClick={(e) => handleLinkClick(e, "inicio")}
                className="text-lg font-extrabold text-white hover:text-accent-gold transition-colors border-b border-white/5 pb-2 flex justify-between items-center group"
              >
                Inicio
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold text-sm">→</span>
              </a>
              <a
                href="#logros"
                onClick={(e) => handleLinkClick(e, "logros")}
                className="text-lg font-extrabold text-white hover:text-accent-gold transition-colors border-b border-white/5 pb-2 flex justify-between items-center group"
              >
                Logros
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold text-sm">→</span>
              </a>
              <a
                href="#diferenciadores"
                onClick={(e) => handleLinkClick(e, "diferenciadores")}
                className="text-lg font-extrabold text-white hover:text-accent-gold transition-colors border-b border-white/5 pb-2 flex justify-between items-center group"
              >
                Diferenciadores
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold text-sm">→</span>
              </a>
              <a
                href="#programas"
                onClick={(e) => handleLinkClick(e, "programas")}
                className="text-lg font-extrabold text-white hover:text-accent-gold transition-colors border-b border-white/5 pb-2 flex justify-between items-center group"
              >
                Programas
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold text-sm">→</span>
              </a>
              <a
                href="#actividades"
                onClick={(e) => handleLinkClick(e, "actividades")}
                className="text-lg font-extrabold text-white hover:text-accent-gold transition-colors border-b border-white/5 pb-2 flex justify-between items-center group"
              >
                Actividades
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold text-sm">→</span>
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "contacto")}
                className="text-lg font-extrabold text-white hover:text-accent-gold transition-colors border-b border-white/5 pb-2 flex justify-between items-center group"
              >
                Contacto
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold text-sm">→</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="tel:7222389292"
              className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl py-3.5 text-base font-bold text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5 text-accent-gold" />
              Llamar por Informes
            </a>
            <a
              href="https://wa.me/527205599190?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20visita%20para%20conocer%20el%20Instituto%20Educativo%20Montes."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-gold w-full text-center py-4 rounded-xl font-display font-extrabold text-base text-primary-dark block shadow-ambient"
            >
              Agendar Visita
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
