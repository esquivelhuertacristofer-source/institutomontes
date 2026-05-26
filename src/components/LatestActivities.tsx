"use client";

import React, { useRef, useState, useEffect } from "react";
import { BookOpen, Smile, Cpu, Heart, Calendar, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasParticles from "./CanvasParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Activity = {
  id: string;
  date: string;
  month: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  borderColor: string;
};

export default function LatestActivities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild;
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild;
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activities: Activity[] = [
    {
      id: "libro",
      date: "23",
      month: "Abril",
      title: "Día Mundial del Libro",
      description: "Fomentamos el amor por la lectura con un maratón de cuentacuentos, intercambio de libros y disfraces inspirados en sus personajes literarios favoritos.",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      tag: "Cultura & Lectura",
      tagColor: "bg-blue-500 text-white",
      borderColor: "hover:border-blue-300",
    },
    {
      id: "nino",
      date: "30",
      month: "Abril",
      title: "Día del Niño y la Niña",
      description: "¡Un día inolvidable de diversión! Celebramos la alegría de nuestras infancias con juegos inflables, talleres de arte al aire libre y una feria escolar de dulces.",
      icon: <Smile className="h-6 w-6 text-white" />,
      tag: "Recreativo",
      tagColor: "bg-emerald-500 text-white",
      borderColor: "hover:border-emerald-300",
    },
    {
      id: "ciencia",
      date: "15",
      month: "Mayo",
      title: "Expo Ciencias & Robótica",
      description: "Nuestros alumnos de primaria presentaron prototipos tecnológicos automatizados y experimentos científicos que resolvían retos cotidianos en equipo.",
      icon: <Cpu className="h-6 w-6 text-white" />,
      tag: "Tecnología STEM",
      tagColor: "bg-purple-500 text-white",
      borderColor: "hover:border-purple-300",
    },
    {
      id: "madres",
      date: "10",
      month: "Mayo",
      title: "Día de las Madres y la Familia",
      description: "Un emotivo festival con recitales de flauta, bailables típicos del Estado de México y la entrega de cartas hechas a mano para celebrar el pilar de nuestros hogares.",
      icon: <Heart className="h-6 w-6 text-white" />,
      tag: "Comunidad Montes",
      tagColor: "bg-rose-500 text-white",
      borderColor: "hover:border-rose-300",
    },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".activity-card",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="actividades"
      ref={containerRef}
      className="scroll-mt-32 py-28 lg:py-36 px-6 lg:px-8 bg-[#091b3e] text-white relative overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 right-[-10%] w-[450px] h-[450px] bg-primary-blue/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 left-[-10%] w-[450px] h-[450px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute top-12 left-12 pointer-events-none opacity-20">
        <Sparkles className="h-8 w-8 text-accent-gold" />
      </div>

      {/* Background Particles */}
      <CanvasParticles color="rgba(16, 185, 129, 0.15)" count={25} speed={0.25} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-extrabold text-accent-gold bg-accent-gold/10 border border-accent-gold/25 px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Vida Escolar Montes
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Últimas Actividades y Efemérides
          </h2>
          <p className="font-sans text-white/70 mt-4 text-lg leading-relaxed font-semibold">
            Descubre los eventos especiales que organizamos en nuestra primaria para celebrar 
            la cultura, la familia y el desarrollo socioemocional de nuestros alumnos.
          </p>
        </div>

        {/* Polaroid/Bulletin Grid - 4 Columns / Mobile Swipeable Row */}
        <div ref={scrollContainerRef} className="flex w-full lg:grid overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 hide-scrollbar snap-x snap-mandatory grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(() => {
            const rotations = [-1.5, 2, -2, 1.5];
            return activities.map((act, index) => {
              const rotation = rotations[index % rotations.length];
              return (
                <div 
                  key={act.id} 
                  className="activity-card transition-all duration-300 ease-out transform origin-center relative z-10 h-full w-[280px] sm:w-[310px] lg:w-auto shrink-0 snap-center"
                  style={{ transform: isMobile ? "none" : `rotate(${rotation}deg)` }}
                  onMouseEnter={(e) => {
                    if (isMobile) return;
                    e.currentTarget.style.transform = "rotate(0deg) scale(1.04) translateY(-10px)";
                    e.currentTarget.style.zIndex = "20";
                  }}
                  onMouseLeave={(e) => {
                    if (isMobile) return;
                    e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                    e.currentTarget.style.zIndex = "10";
                  }}
                >
                  <div
                    className="bg-white border border-white/10 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full text-left"
                  >
                    <div className="w-full">
                      {/* Date Box / Sticker Style */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col bg-primary-dark text-white rounded-2xl px-3.5 py-2 text-center shadow-md border border-white/10">
                          <span className="font-display font-black text-xl leading-none">{act.date}</span>
                          <span className="font-sans text-[10px] uppercase font-black tracking-wider opacity-85 mt-0.5">{act.month}</span>
                        </div>
                        
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${act.tagColor} border border-white/5`}>
                          {act.tag}
                        </span>
                      </div>
 
                      {/* Icon Circle & Info */}
                      <div className="flex-grow">
                        <div className={`w-12 h-12 ${act.tagColor.split(' ')[0]} rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                          {act.icon}
                        </div>
                        
                        <h3 className="font-display font-black text-lg text-primary-dark mb-3 tracking-tight group-hover:text-primary-blue transition-colors">
                          {act.title}
                        </h3>
                        
                        <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold break-words whitespace-normal">
                          {act.description}
                        </p>
                      </div>
                    </div>
 
                    {/* Decorative tape effect on polaroid */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-5 bg-accent-gold/25 backdrop-blur-xs border border-accent-gold/15 rotate-[-3deg] rounded-sm group-hover:rotate-[2deg] transition-transform duration-300"></div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Mobile/Tablet Arrow Navigation Controls */}
        <div className="flex lg:hidden items-center justify-center gap-6 mt-8">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 rounded-xl border border-white/10 hover:border-accent-gold text-white hover:text-primary-dark hover:bg-accent-gold flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-white/5 cursor-pointer shadow-sm z-20"
            aria-label="Actividad Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-xl border border-white/10 hover:border-accent-gold text-white hover:text-primary-dark hover:bg-accent-gold flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-white/5 cursor-pointer shadow-sm z-20"
            aria-label="Siguiente Actividad"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
