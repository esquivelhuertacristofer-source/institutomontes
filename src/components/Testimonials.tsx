"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from "lucide-react";
import CanvasParticles from "./CanvasParticles";

interface Testimonial {
  name: string;
  relation: string;
  quote: string;
  rating: number;
  avatarColor: string;
  avatarInitials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Verónica Espinoza",
    relation: "Mamá de Mateo (4º de Primaria)",
    quote:
      "El horario extendido ha sido mi salvación como mamá profesionista. Saber que mi hijo recibe alimentación balanceada en el comedor y hace sus tareas asesorado por sus propios maestros me da una tranquilidad enorme. ¡El nivel de inglés es fantástico!",
    rating: 5,
    avatarColor: "bg-primary-blue",
    avatarInitials: "VE",
  },
  {
    name: "Alejandro Gómez",
    relation: "Papá de Sofía (2º de Primaria)",
    quote:
      "Me sorprende el nivel académico de mi hija. En su taller de robótica ya arma circuitos y entiende lógica básica de computación. Pero lo que más valoro es la calidez de los profesores y la formación humana que recibe todos los días.",
    rating: 5,
    avatarColor: "bg-accent-gold",
    avatarInitials: "AG",
  },
  {
    name: "María Luisa Ordóñez",
    relation: "Mamá de Santiago (5º) y Emiliano (1º)",
    quote:
      "Es una escuela muy segura y familiar. Mis dos hijos asisten felices. El programa de educación financiera les enseña el valor del ahorro de forma divertida. Recomiendo ampliamente al Instituto Montes por su excelencia y valores.",
    rating: 5,
    avatarColor: "bg-emerald-600",
    avatarInitials: "MO",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const handlePrev = () => {
    if (isExiting) return;
    setDirection("prev");
    setIsExiting(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsExiting(false);
    }, 300);
  };

  const handleNext = () => {
    if (isExiting) return;
    setDirection("next");
    setIsExiting(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsExiting(false);
    }, 300);
  };

  const getCardStyle = (idx: number) => {
    const diff = (idx - activeIndex + testimonials.length) % testimonials.length;

    if (diff === 0 && isExiting) {
      return {
        transform: direction === "next" ? "translateX(130%) rotate(12deg) scale(0.95)" : "translateX(-130%) rotate(-12deg) scale(0.95)",
        opacity: 0,
        zIndex: 40,
        pointerEvents: "none" as const,
      };
    }

    switch (diff) {
      case 0:
        return {
          transform: "translateX(0) translateY(0) rotate(0deg) scale(1)",
          opacity: 1,
          zIndex: 30,
        };
      case 1:
        return {
          transform: "translateX(16px) translateY(-14px) rotate(2deg) scale(0.96)",
          opacity: 0.65,
          zIndex: 20,
          pointerEvents: "none" as const,
        };
      case 2:
        return {
          transform: "translateX(-16px) translateY(-28px) rotate(-2deg) scale(0.92)",
          opacity: 0.35,
          zIndex: 10,
          pointerEvents: "none" as const,
        };
      default:
        return {
          transform: "translateX(0) translateY(-40px) scale(0.85)",
          opacity: 0,
          zIndex: 0,
          pointerEvents: "none" as const,
        };
    }
  };

  return (
    <section className="py-28 lg:py-36 bg-[#061530] text-white relative overflow-hidden px-6 lg:px-8">
      {/* Decorative vector */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-primary-blue/15 rounded-full blur-[90px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-gold/5 rounded-full blur-[110px] pointer-events-none z-0"></div>

      <div className="absolute top-12 right-12 pointer-events-none opacity-20">
        <Sparkles className="h-8 w-8 text-accent-gold" />
      </div>

      <CanvasParticles color="rgba(255, 184, 0, 0.15)" count={20} speed={0.2} />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        <div className="mb-20 flex flex-col gap-4 items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/25 text-accent-gold text-xs font-bold uppercase tracking-wider">
            Testimonios de Nuestra Familia
          </span>
          <h3 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
            Lo que los Padres opinan de Nosotros
          </h3>
          <div className="w-16 h-1.5 bg-accent-gold rounded-full mt-2"></div>
        </div>

        {/* 3D Stack Container */}
        <div className="relative w-full max-w-2xl mx-auto h-[380px] sm:h-[300px] mt-8">
          {testimonials.map((test, idx) => {
            const cardStyle = getCardStyle(idx);
            const diff = (idx - activeIndex + testimonials.length) % testimonials.length;

            return (
              <div
                key={idx}
                style={cardStyle}
                className="absolute inset-x-0 top-0 bg-[#091b3e]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between card-stack-card text-left h-full transition-all duration-300"
              >
                <div className={`h-full flex flex-col justify-between transition-opacity duration-300 ${diff === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  <div>
                    {/* Stars and Quote */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent-gold text-accent-gold" />
                        ))}
                      </div>
                      <Quote className="h-10 w-10 text-accent-gold/20 rotate-180 shrink-0" />
                    </div>

                    <p className="font-sans text-sm sm:text-base lg:text-lg text-white/90 italic leading-relaxed mb-6 font-semibold">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Parent Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-full ${test.avatarColor} text-white flex items-center justify-center font-display font-black text-sm shadow-md shrink-0 border border-white/10`}
                    >
                      {test.avatarInitials}
                    </div>
                    <div>
                      <h5 className="font-display font-black text-sm sm:text-base text-white leading-tight">
                        {test.name}
                      </h5>
                      <p className="font-sans text-xs text-white/70 font-semibold mt-0.5">
                        {test.relation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls and Indicators */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-xl border border-white/10 hover:border-accent-gold text-white hover:text-primary-dark hover:bg-accent-gold flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-white/5 cursor-pointer shadow-sm z-20"
            aria-label="Testimonio Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Indicators Dots */}
          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== activeIndex && !isExiting) {
                    setDirection(idx > activeIndex ? "next" : "prev");
                    setIsExiting(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsExiting(false);
                    }, 300);
                  }
                }}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? "w-8 bg-accent-gold" : "w-3 bg-white/20"
                }`}
                aria-label={`Ir al testimonio ${idx + 1}`}
              ></button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-xl border border-white/10 hover:border-accent-gold text-white hover:text-primary-dark hover:bg-accent-gold flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-white/5 cursor-pointer shadow-sm z-20"
            aria-label="Siguiente Testimonio"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
