"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, BookOpen, Clock, Trophy, Heart, Cpu, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CanvasParticles from "./CanvasParticles";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const magnetButtonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bgRef.current) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    gsap.to(bgRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = magnetButtonRef.current;
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
    const btn = magnetButtonRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  useGSAP(
    () => {
      // Set initial hidden states to prevent flash
      gsap.set([titleRef.current, textRef.current, btnsRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.9, y: 40 });
      gsap.set([".floating-badge-1", ".floating-badge-2", ".floating-badge-3"], { opacity: 0, scale: 0.8 });
      gsap.set(tickerRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(btnsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(imageContainerRef.current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.4")
        .to(
          [".floating-badge-1", ".floating-badge-2", ".floating-badge-3"],
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" },
          "-=0.5"
        )
        .to(tickerRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

      // Floating animations for decorations
      gsap.to(".floating-star", {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: "sine.inOut",
      });
      gsap.to(".floating-circle", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
      });

      // Floating animations for creative badges
      gsap.to(".floating-badge-1", {
        y: -10,
        x: -4,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
      gsap.to(".floating-badge-2", {
        y: 12,
        x: 3,
        repeat: -1,
        yoyo: true,
        duration: 3.2,
        ease: "sine.inOut",
      });
      gsap.to(".floating-badge-3", {
        y: -8,
        x: 5,
        repeat: -1,
        yoyo: true,
        duration: 2.9,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="school-grid-blue relative min-h-screen pt-28 lg:pt-36 pb-12 flex flex-col justify-between overflow-hidden w-full max-w-full"
    >
      {/* Canvas particles */}
      <CanvasParticles color="rgba(16, 185, 129, 0.2)" count={45} speed={0.3} />

      {/* Interactive Parallax Background Layer */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/10 w-96 h-96 bg-accent-gold/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full overflow-hidden">
          
          {/* Headline and CTAs */}
          <div className="col-span-full lg:col-span-6 w-full px-4 sm:px-0 flex flex-col items-center lg:items-start gap-6 relative z-10 text-center lg:text-left">
            
            {/* Powerful Commercial Title */}
            <h1
              ref={titleRef}
              className="font-display font-black text-3xl sm:text-5xl lg:text-[4.3rem] xl:text-[5.2rem] text-white tracking-tight leading-[1.02] w-full px-6 lg:px-0 text-center lg:text-left"
            >
              Primaria de excelencia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-emerald-300 drop-shadow-[0_2px_10px_rgba(16,185,129,0.2)]">
                que impulsa su potencial.
              </span>
            </h1>

            {/* High-conversion Subtext */}
            <p
              ref={textRef}
              className="font-sans text-sm sm:text-base lg:text-[1.125rem] xl:text-[1.25rem] text-white/75 leading-relaxed max-w-xl font-medium mx-auto lg:mx-0 w-full px-6 lg:px-0 text-center lg:text-left"
            >
              Formamos mentes brillantes y líderes integrales en nivel primaria con robótica avanzada, educación financiera práctica, inglés intensivo y sólidos valores humanos. Con incorporación oficial de la SEP, asegura un lugar en la primaria premium líder de Toluca.
            </p>

            {/* Pulsing Action Buttons */}
            <div ref={btnsRef} className="flex flex-col sm:flex-row w-full sm:w-auto justify-center lg:justify-start gap-4 mt-2">
              <a
                ref={magnetButtonRef}
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                href="https://wa.me/527205599190?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20visita%20para%20conocer%20el%20Instituto%20Educativo%20Montes."
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-button w-full sm:w-auto justify-center px-8 py-4.5 rounded-2xl font-display font-extrabold text-base text-primary-dark shadow-ambient flex items-center gap-2 group transition-all text-center"
              >
                Agendar Visita
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contacto"
                onClick={handleScrollToContact}
                className="w-full sm:w-auto text-center justify-center px-8 py-4.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm text-white font-display font-extrabold text-base hover:bg-white/15 transition-all hover:scale-102 shadow-lg"
              >
                ¡Inscríbete ahora!
              </a>
            </div>
          </div>

          {/* Mobile/Tablet Inline Student Image Column */}
          <div className="lg:hidden col-span-full flex flex-col justify-center items-center relative min-h-[420px] sm:min-h-[600px] select-none mt-10 overflow-hidden w-full max-w-full">
            {/* Ambient Background Aura */}
            <div className="absolute w-[80vw] max-w-[360px] h-[80vw] max-h-[360px] bg-accent-gold/10 rounded-full blur-[80px] pointer-events-none animate-pulse z-0"></div>
            
            {/* Geometric rings */}
            <div className="absolute w-[95vw] max-w-[440px] sm:w-[560px] h-[95vw] max-h-[440px] sm:h-[560px] border border-white/10 rounded-full pointer-events-none z-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] border border-accent-gold/20 border-dashed rounded-full animate-[spin_80s_linear_infinite]"></div>
            </div>

            {/* Student image cutout */}
            <div
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
              }}
              className="relative w-full max-w-[280px] sm:max-w-[500px] h-[360px] sm:h-[550px] select-none z-10 flex justify-center items-end overflow-visible pointer-events-none"
            >
              <div className="relative w-full h-[120%] max-h-[600px]">
                <Image
                  src="/images/students_2.png"
                  alt="Estudiante Instituto Montes"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* Badges - positioned relative to container */}
            {/* Badge 1: Robótica */}
            <div className="absolute left-[5px] sm:left-[30px] top-[25%] bg-white/95 backdrop-blur-md border border-accent-gold/25 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-all floating-badge-1 pointer-events-auto">
              <span className="flex h-6.5 w-6.5 rounded-lg bg-accent-gold/15 items-center justify-center shrink-0">
                <Cpu className="h-3.5 w-3.5 text-accent-gold-dark" />
              </span>
              <div className="text-left">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider leading-none">Primaria</p>
                <p className="text-[11px] text-primary-dark font-extrabold mt-0.5 whitespace-nowrap">Robótica & TICs</p>
              </div>
            </div>

            {/* Badge 2: Inglés */}
            <div className="absolute right-[5px] sm:right-[30px] top-[45%] bg-primary-blue/95 backdrop-blur-md border border-white/25 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-all floating-badge-2 pointer-events-auto">
              <span className="flex h-6.5 w-6.5 rounded-lg bg-white/20 items-center justify-center shrink-0">
                <BookOpen className="h-3.5 w-3.5 text-white" />
              </span>
              <div className="text-left">
                <p className="text-[8px] text-white/70 font-bold uppercase tracking-wider leading-none">Sistema</p>
                <p className="text-[11px] text-white font-extrabold mt-0.5 whitespace-nowrap">Inglés Avanzado</p>
              </div>
            </div>

            {/* Badge 3: Socioemocional */}
            <div className="absolute bottom-[10%] right-[5px] sm:right-[30px] bg-white/95 backdrop-blur-md border border-red-100/30 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-all floating-badge-3 pointer-events-auto">
              <span className="flex h-6.5 w-6.5 rounded-lg bg-red-100 items-center justify-center shrink-0">
                <Heart className="h-3.5 w-3.5 text-red-500" />
              </span>
              <div className="text-left">
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider leading-none">Educación</p>
                <p className="text-[11px] text-primary-dark font-extrabold mt-0.5 whitespace-nowrap">Socioemocional</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Centered bounding box for absolute elements (preserves height for percentage-based sizing) */}
      <div className="absolute top-[120px] bottom-[180px] xl:bottom-[200px] 2xl:bottom-[220px] left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8 pointer-events-none z-10 hidden lg:block">
        {/* Desktop Absolute Student Image (Large, corner-anchored but shifted up and in) */}
        <div className="absolute lg:right-[-5%] xl:right-[-8%] 2xl:right-[-10%] bottom-0 lg:w-[56%] xl:w-[60%] 2xl:w-[64%] h-full max-h-[640px] xl:max-h-[740px] 2xl:max-h-[820px] pointer-events-none select-none overflow-visible">
          <div className="relative w-full h-full flex justify-end items-end overflow-visible">
            {/* Ambient Background Aura */}
            <div className="absolute w-[520px] h-[520px] bg-accent-gold/10 rounded-full blur-[110px] pointer-events-none animate-pulse z-0 right-10 bottom-10"></div>
            <div className="absolute w-[440px] h-[440px] bg-primary-blue/15 rounded-full blur-[90px] pointer-events-none -right-20 bottom-10 z-0"></div>

            {/* Geometric rings */}
            <div className="absolute w-[700px] xl:w-[820px] h-[700px] xl:h-[820px] border border-white/10 rounded-full pointer-events-none z-0 flex items-center justify-center -right-16 -bottom-16">
              <div className="w-[85%] h-[85%] border border-accent-gold/20 border-dashed rounded-full animate-[spin_80s_linear_infinite]"></div>
            </div>

            {/* Masked Student cutout wrapper */}
            <div 
              ref={imageContainerRef}
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
              }}
              className="relative w-[110%] h-[115%] max-h-[950px] flex justify-end items-end overflow-visible"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/students_2.png"
                  alt="Estudiantes Instituto Montes"
                  fill
                  priority
                  sizes="750px"
                  className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(9,27,62,0.25)]"
                />
              </div>
            </div>

            {/* Floating Badges */}
            {/* Badge 1: Robótica */}
            <div className="absolute lg:left-[-20px] xl:left-[-55px] 2xl:left-[-85px] top-[44%] bg-white/95 backdrop-blur-md border border-accent-gold/25 px-4.5 py-3 rounded-2xl shadow-[0_20px_45px_rgba(16,185,129,0.15)] flex items-center gap-3 z-20 floating-badge-1 hover:scale-105 transition-all duration-300 pointer-events-auto">
              <span className="flex h-8 w-8 rounded-lg bg-accent-gold/15 items-center justify-center shrink-0">
                <Cpu className="h-4.5 w-4.5 text-accent-gold-dark" />
              </span>
              <div className="text-left">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">Primaria</p>
                <p className="text-sm text-primary-dark font-extrabold mt-0.5 whitespace-nowrap">Robótica & TICs</p>
              </div>
            </div>

            {/* Badge 2: Inglés */}
            <div className="absolute lg:right-[-5px] xl:right-[-15px] 2xl:right-[-20px] top-[48%] bg-primary-blue/95 backdrop-blur-md border border-white/25 px-4.5 py-3 rounded-2xl shadow-[0_20px_45px_rgba(29,78,216,0.25)] flex items-center gap-3 z-20 floating-badge-2 hover:scale-105 transition-all duration-300 pointer-events-auto">
              <span className="flex h-8 w-8 rounded-lg bg-white/20 items-center justify-center shrink-0">
                <BookOpen className="h-4.5 w-4.5 text-white" />
              </span>
              <div className="text-left">
                <p className="text-[9px] text-white/70 font-bold uppercase tracking-wider leading-none">Sistema</p>
                <p className="text-sm text-white font-extrabold mt-0.5 whitespace-nowrap">Inglés Avanzado</p>
              </div>
            </div>

            {/* Badge 3: Socioemocional */}
            <div className="absolute bottom-[20%] lg:left-[-15px] xl:left-[-45px] 2xl:left-[-75px] bg-white/95 backdrop-blur-md border border-red-100/30 px-4.5 py-3 rounded-2xl shadow-[0_20px_45px_rgba(239,68,68,0.12)] flex items-center gap-3 z-20 floating-badge-3 hover:scale-105 transition-all duration-300 pointer-events-auto">
              <span className="flex h-8 w-8 rounded-lg bg-red-100 items-center justify-center shrink-0">
                <Heart className="h-4.5 w-4.5 text-red-500" />
              </span>
              <div className="text-left">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">Educación</p>
                <p className="text-sm text-primary-dark font-extrabold mt-0.5 whitespace-nowrap">Socioemocional</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Sub-Hero Value Ticker (Comedor, Horario, Bilingüe, Valores) */}
      <div ref={tickerRef} className="w-full max-w-7xl mx-auto px-6 lg:px-8 mt-12 lg:mt-16">
        <div className="bg-[#0c234c] border border-white/10 rounded-3xl p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left shadow-2xl relative overflow-hidden">
          
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/15 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-white">Horario Extendido</h4>
              <p className="font-sans text-xs text-white/60 mt-0.5">7:00 AM – 6:30 PM</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/15 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-white">Inglés Bilingüe</h4>
              <p className="font-sans text-xs text-white/60 mt-0.5">Clases diarias avanzadas</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/15 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-white">Robótica & TICs</h4>
              <p className="font-sans text-xs text-white/60 mt-0.5">Proyectos tecnológicos reales</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/15 flex items-center justify-center shrink-0">
              <Heart className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-white">Alimentación & Tareas</h4>
              <p className="font-sans text-xs text-white/60 mt-0.5">Comedor balanceado y tutoría</p>
            </div>
          </div>

        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none hidden md:flex">
        <div className="w-[18px] h-7 border-2 border-white rounded-full p-0.5 flex justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
