"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Book, Cpu, Landmark, Palette, Clock, CheckCircle, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import CanvasParticles from "./CanvasParticles";

type Program = {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  fullDesc: string;
  bullets: string[];
  image: string;
  colorClass: string;
};

export default function ProgramDetails() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const programs: Program[] = [
    {
      id: "bilingue",
      icon: <Book className="h-5 w-5" />,
      title: "Educación Bilingüe",
      shortDesc: "Inglés natural como herramienta de pensamiento.",
      fullDesc:
        "En el Instituto Educativo Montes, el inglés se vive en el aula. Nuestros alumnos aprenden inglés no como una materia teórica de gramática, sino de forma inmersiva y natural como una herramienta para estructurar ideas, resolver problemas y comunicarse con el mundo.",
      bullets: [
        "Inmersión en clases y materias selectas.",
        "Vocabulario académico y conversacional.",
        "Preparación para certificaciones futuras.",
        "Fomento de la confianza oral y escrita."
      ],
      image: "/images/bilingue.webp",
      colorClass: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    },
    {
      id: "robotica",
      icon: <Cpu className="h-5 w-5" />,
      title: "Plataforma de Robótica",
      shortDesc: "Pensamiento lógico e iniciación a la ingeniería.",
      fullDesc:
        "Fomentamos la curiosidad y el análisis lógico a través de nuestra plataforma de Robótica. Los alumnos de primaria aprenden a diseñar, construir y programar prototipos interactivos, desarrollando habilidades tempranas de STEM (Ciencia, Tecnología, Ingeniería y Matemáticas).",
      bullets: [
        "Kits de robótica física acordes a la edad.",
        "Introducción al razonamiento de algoritmos.",
        "Resolución de retos en equipo.",
        "Integración de las TICs en proyectos reales."
      ],
      image: "/images/robotica.webp",
      colorClass: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    },
    {
      id: "financiera",
      icon: <Landmark className="h-5 w-5" />,
      title: "Educación Financiera",
      shortDesc: "Ahorro y toma de decisiones a través del juego.",
      fullDesc:
        "A través de actividades lúdicas e interactivas (desarrolladas en sintonía con las herramientas pedagógicas de CEN Labs), los niños aprenden la importancia del ahorro, el valor del trabajo, y la toma de decisiones económicas responsables y conscientes.",
      bullets: [
        "Juegos prácticos de simulación financiera.",
        "Conceptos básicos de presupuesto y ahorro.",
        "Talleres de emprendimiento a nivel primaria.",
        "Decisiones inteligentes de consumo y recursos."
      ],
      image: "/images/financiera.webp",
      colorClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    },
    {
      id: "arte-deporte",
      icon: <Palette className="h-5 w-5" />,
      title: "Arte, Música y Deportes",
      shortDesc: "Desarrollo integral del cuerpo y la creatividad.",
      fullDesc:
        "Creemos en una educación que nutre la mente y el corazón. Por ello, las actividades artísticas, musicales y deportivas son parte fundamental de nuestro currículo para fomentar la disciplina, el trabajo en equipo y la autoexpresión.",
      bullets: [
        "Clases dinámicas de música e instrumentos.",
        "Talleres artísticos y de artes plásticas.",
        "Deportes y actividades físicas estructuradas.",
        "Desarrollo motor y coordinación corporal."
      ],
      image: "/images/artedeporte.webp",
      colorClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    },
    {
      id: "extendido",
      icon: <Clock className="h-5 w-5" />,
      title: "Horario Extendido",
      shortDesc: "Tranquilidad para papás de 7:00 a.m. a 6:30 p.m.",
      fullDesc:
        "Nuestro horario extendido está diseñado para ser un segundo hogar seguro y productivo. Los niños reciben servicio de comida caliente y balanceada, realizan sus tareas escolares con asesoría personalizada y se relajan con actividades lúdicas.",
      bullets: [
        "Servicio de comedor caliente y supervisado.",
        "Apoyo escolar para realizar tareas sin estrés.",
        "Actividades extracurriculares y recreativas.",
        "Monitoreo constante en instalaciones seguras."
      ],
      image: "/images/extendido.webp",
      colorClass: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    },
  ];

  const currentProgram = programs[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const getGlowBg = (id: string) => {
    switch (id) {
      case "bilingue": return "bg-blue-500/20";
      case "robotica": return "bg-purple-500/20";
      case "financiera": return "bg-emerald-500/20";
      case "arte-deporte": return "bg-emerald-500/20";
      case "extendido": return "bg-rose-500/20";
      default: return "bg-blue-500/20";
    }
  };

  const getBorderGradient = (id: string) => {
    switch (id) {
      case "bilingue": return "from-blue-500 via-emerald-500 to-teal-400";
      case "robotica": return "from-purple-500 via-emerald-500 to-teal-400";
      case "financiera": return "from-emerald-500 via-teal-500 to-emerald-400";
      case "arte-deporte": return "from-emerald-500 via-teal-400 to-emerald-300";
      case "extendido": return "from-rose-500 via-emerald-500 to-teal-400";
      default: return "from-emerald-500 via-teal-400 to-blue-500";
    }
  };

  const getBorderShadow = (id: string) => {
    switch (id) {
      case "bilingue": return "shadow-[0_0_35px_rgba(59,130,246,0.25)]";
      case "robotica": return "shadow-[0_0_35px_rgba(16,85,247,0.25)]";
      case "financiera": return "shadow-[0_0_35px_rgba(16,185,129,0.25)]";
      case "arte-deporte": return "shadow-[0_0_35px_rgba(16,185,129,0.25)]";
      case "extendido": return "shadow-[0_0_35px_rgba(244,63,94,0.25)]";
      default: return "shadow-[0_0_35px_rgba(16,185,129,0.25)]";
    }
  };

  const progressPercentage = (currentIndex / (programs.length - 1)) * 100;

  return (
    <section id="programas" className="scroll-mt-32 school-grid-blue bg-[#091b3e] py-24 px-6 lg:px-8 text-white relative overflow-hidden">
      {/* Background canvas particles */}
      <CanvasParticles color="rgba(16, 185, 129, 0.25)" count={40} />

      {/* Decorative background glow blob */}
      <div className="absolute top-1/4 right-[-10%] w-[450px] h-[450px] bg-accent-gold/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 left-[-10%] w-[450px] h-[450px] bg-primary-blue/20 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
 
      {/* Floating Sparkles decorative */}
      <div className="absolute top-12 left-10 pointer-events-none opacity-30 animate-bounce">
        <Sparkles className="h-6 w-6 text-accent-gold" />
      </div>
 
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-extrabold text-accent-gold bg-accent-gold/10 border border-accent-gold/25 px-4 py-1.5 rounded-full uppercase tracking-widest">
            Nuestro Modelo
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Programas Académicos y Plataformas
          </h2>
          <p className="font-sans text-white/70 mt-4 text-lg leading-relaxed">
            Un plan de estudio completo que expande los límites de la educación unconventional y 
            forma estudiantes competentes y humanos en un entorno de alto nivel.
          </p>
        </div>
 
        {/* Carousel Progress Timeline Indicator */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4 hidden md:block">
          <div className="relative">
            {/* Base Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2"></div>
            {/* Filled Active Line */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-accent-gold rounded-full -translate-y-1/2 transition-all duration-500 ease-out shadow-[0_0_10px_#10b981]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
 
            {/* Nodes */}
            <div className="relative flex justify-between">
              {programs.map((prog, idx) => {
                const isActive = idx === currentIndex;
                const isPast = idx < currentIndex;
                return (
                  <button
                    key={prog.id}
                    onClick={() => setCurrentIndex(idx)}
                    className="flex flex-col items-center gap-3 focus:outline-none group relative"
                  >
                    {/* Node Dot with Icon */}
                    <div 
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 relative z-10 ${
                        isActive 
                          ? "bg-accent-gold border-none text-primary-dark shadow-[0_0_20px_rgba(16,185,129,0.45)] scale-115" 
                          : isPast 
                            ? "bg-[#091b3e] border-accent-gold text-accent-gold" 
                            : "bg-[#091b3e] border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-accent-gold/40 animate-ping z-[-1]"></span>
                      )}
                      {prog.icon}
                    </div>
                    {/* Node Text */}
                    <span 
                      className={`absolute top-14 text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                        isActive ? "text-accent-gold scale-105" : "text-white/55 group-hover:text-white"
                      }`}
                    >
                      {prog.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
 
        {/* Carousel Viewport Box */}
        <div className="relative max-w-5xl mx-auto mt-20 md:mt-24">
          
          {/* Previous Button (Hidden on Mobile) */}
          <button 
            onClick={handlePrev}
            className="absolute left-[-28px] lg:left-[-60px] top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-dark hover:border-accent-gold transition-all duration-300 shadow-2xl z-20 cursor-pointer hidden md:flex"
            aria-label="Programa Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
 
          {/* Next Button (Hidden on Mobile) */}
          <button 
            onClick={handleNext}
            className="absolute right-[-28px] lg:right-[-60px] top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-dark hover:border-accent-gold transition-all duration-300 shadow-2xl z-20 cursor-pointer hidden md:flex"
            aria-label="Programa Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
 
          {/* Carousel Card Slider Wrapper */}
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 border border-white/20 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.3)] relative">
            <div 
              className="w-full h-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {programs.map((prog, idx) => {
                  return (
                    <div key={prog.id} className="w-full shrink-0 p-8 sm:p-12 lg:p-16">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left Column: Details */}
                        <div className="lg:col-span-7 text-left flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-white/15 text-white border border-white/25 backdrop-blur-md shadow-lg shrink-0">
                               {prog.icon}
                            </div>
                            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                              {prog.title}
                            </h3>
                          </div>
 
                          <p className="font-sans text-emerald-50/95 text-base sm:text-lg leading-relaxed font-medium">
                            {prog.fullDesc}
                          </p>
 
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {prog.bullets.map((bullet, bulletIdx) => (
                              <li key={bulletIdx} className="flex items-start gap-2.5 text-sm text-white font-semibold">
                                <CheckCircle className="h-5 w-5 text-emerald-300 shrink-0 mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
 
                        {/* Right Column: Image */}
                        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[260px] lg:min-h-[320px]">
                          {/* Dynamic glow behind the illustration */}
                          <div className="absolute w-64 h-64 bg-white/20 rounded-full filter blur-3xl opacity-75 animate-pulse"></div>
                          
                          <div className="relative animate-float w-full max-w-[280px] aspect-square rounded-3xl bg-white border border-white/25 shadow-[0_25px_50px_rgba(0,0,0,0.35)] group/img hover:scale-105 transition-transform duration-500 overflow-hidden">
                            <Image
                              src={prog.image}
                              alt={prog.title}
                              width={280}
                              height={280}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Arrows / Navigation dots below the card */}
          <div className="flex items-center justify-between mt-6 px-4 md:hidden">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white active:bg-accent-gold active:text-primary-dark"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Micro Dot Indicators */}
            <div className="flex gap-2">
              {programs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-accent-gold" : "w-2 bg-white/20"}`}
                ></button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white active:bg-accent-gold active:text-primary-dark"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
