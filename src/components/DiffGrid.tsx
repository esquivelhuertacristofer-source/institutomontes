"use client";

import React, { useRef } from "react";
import { Apple, Cpu, Clock, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Benefit {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  bgColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  hoverGradient: string;
  glowShadow: string;
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        "--spotlight-color": benefit.iconColor.includes("blue") 
          ? "rgba(0, 86, 198, 0.08)" 
          : benefit.iconColor.includes("red") 
          ? "rgba(239, 68, 68, 0.08)" 
          : benefit.iconColor.includes("emerald") 
          ? "rgba(16, 185, 129, 0.08)" 
          : "rgba(255, 184, 0, 0.08)"
      } as React.CSSProperties}
      className="relative w-full bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-[0_15px_30px_rgba(9,27,62,0.02)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_45px_rgba(9,27,62,0.08)] group spotlight-card"
    >

      {/* Subtle flare behind icon in card */}
      <div className={`absolute -top-12 -right-12 w-28 h-28 ${benefit.iconBg} rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4.5 rounded-2xl ${benefit.iconBg} ${benefit.iconColor} shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[10deg]`}>
            {benefit.icon}
          </div>
          <div>
            <h3 className="font-display font-black text-xl lg:text-2xl text-primary-dark tracking-tight">
              {benefit.title}
            </h3>
            <p className={`font-sans text-xs font-extrabold uppercase tracking-wider ${benefit.iconColor} mt-1`}>
              {benefit.subtitle}
            </p>
          </div>
        </div>

        <p className="font-sans text-sm sm:text-base text-primary-dark/80 leading-relaxed mb-6 font-semibold">
          {benefit.description}
        </p>
      </div>

      {/* Bullet points checkmark list */}
      <ul className="space-y-3 border-t border-white/60 pt-6 mt-auto relative z-10">
        {benefit.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className={`h-5 w-5 ${benefit.iconColor} shrink-0 mt-0.5`} />
            <span className="font-sans text-xs sm:text-sm text-primary-dark/80 font-bold">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DiffGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate decorative background stars
      gsap.to(".floating-diff-star-1", {
        y: -15,
        rotate: 15,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut"
      });
      gsap.to(".floating-diff-star-2", {
        y: 12,
        rotate: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.7,
        ease: "sine.inOut"
      });
    },
    { scope: sectionRef }
  );

  const benefits: Benefit[] = [
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Horario Extendido Completo",
      subtitle: "7:00 a.m. a 6:30 p.m.",
      description: "La tranquilidad y flexibilidad total que las familias trabajadoras necesitan. Tu hijo está en un ambiente seguro y estimulante todo el día.",
      bullets: ["Recibimiento temprano desde 7:00 AM", "Salida flexible hasta 6:30 PM", "Planificación adaptada a padres de familia"],
      bgColor: "bg-white/95 border-gray-100",
      borderColor: "hover:shadow-[0_25px_45px_rgba(0,86,198,0.12)]",
      iconBg: "bg-primary-blue/15",
      iconColor: "text-primary-blue",
      hoverGradient: "hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400",
      glowShadow: "hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]",
    },
    {
      icon: <Apple className="h-7 w-7" />,
      title: "Comedor y Alimentación",
      subtitle: "Nutrición balanceada incluida",
      description: "Servicio de comedor escolar que ofrece menús variados, higiénicos y diseñados por especialistas para potenciar la energía y el sano crecimiento infantil.",
      bullets: ["Ingredientes frescos y de calidad", "Hábitos de higiene y convivencia", "Comida completa y merienda saludable"],
      bgColor: "bg-white/95 border-gray-100",
      borderColor: "hover:shadow-[0_25px_45px_rgba(239,68,68,0.12)]",
      iconBg: "bg-red-500/15",
      iconColor: "text-red-500",
      hoverGradient: "hover:from-red-400 hover:via-rose-300 hover:to-red-200",
      glowShadow: "hover:shadow-[0_20px_40px_rgba(239,68,68,0.1)]",
    },
    {
      icon: <Cpu className="h-7 w-7" />,
      title: "Robótica, Computación & TICs",
      subtitle: "Tecnología de Vanguardia",
      description: "Preparación activa para la era digital. Los alumnos aprenden lógica, programación física y el uso inteligente y ético de sistemas computacionales.",
      bullets: ["Kits de robótica adaptados por grado", "Clases de computación práctica", "Fomento del pensamiento lógico"],
      bgColor: "bg-white/95 border-gray-100",
      borderColor: "hover:shadow-[0_25px_45px_rgba(16,185,129,0.12)]",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-600",
      hoverGradient: "hover:from-emerald-400 hover:via-teal-300 hover:to-emerald-300",
      glowShadow: "hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]",
    },
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: "Asesoría de Tareas Dirigida",
      subtitle: "Estudio Guiado y sin Estrés",
      description: "Garantizamos el aprendizaje supervisando las actividades escolares. Los alumnos aclaran dudas con docentes del plantel, regresando a casa listos para disfrutar en familia.",
      bullets: ["Explicación de conceptos difíciles", "Hábitos de estudio autónomos", "Tardes libres de tensiones en casa"],
      bgColor: "bg-white/95 border-gray-100",
      borderColor: "hover:shadow-[0_25px_45px_rgba(232,188,93,0.15)]",
      iconBg: "bg-accent-gold/20",
      iconColor: "text-accent-gold-dark",
      hoverGradient: "hover:from-emerald-400 hover:via-teal-200 hover:to-accent-gold",
      glowShadow: "hover:shadow-[0_20px_40px_rgba(232,188,93,0.15)]",
    },
  ];

  return (
    <section
      id="diferenciadores"
      ref={sectionRef}
      className="scroll-mt-32 school-grid-light pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#f4f7fc] via-[#eef2f9] to-[#f4f7fc]"
    >
      {/* Creative transition wave from ProgramDetails (dark navy #091b3e) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg className="relative block w-full h-[50px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" className="fill-[#091b3e]"></path>
        </svg>
      </div>
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-accent-gold/15 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      {/* Floating vector sparkles */}
      <div className="absolute top-[15%] right-[10%] pointer-events-none opacity-35 floating-diff-star-1">
        <Sparkles className="h-8 w-8 text-accent-gold-dark" />
      </div>
      <div className="absolute bottom-[20%] left-[8%] pointer-events-none opacity-45 floating-diff-star-2">
        <Sparkles className="h-7 w-7 text-accent-gold" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 flex flex-col gap-4 items-center">
          <span className="text-sm font-extrabold text-accent-gold-dark bg-accent-gold/15 border border-accent-gold/25 px-4 py-1.5 rounded-full uppercase tracking-widest">
            ¿Por qué elegir Instituto Montes?
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-primary-dark tracking-tight leading-tight">
            Los Beneficios que Aseguran el Éxito de tu Hijo
          </h2>
          <p className="font-sans text-base sm:text-lg text-primary-dark/70 max-w-2xl mt-2 leading-relaxed font-medium">
            Diseñamos una experiencia de cuidado integral y excelencia académica para que tengas la tranquilidad
            absoluta de que tu hijo está en el mejor lugar.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              benefit={benefit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
