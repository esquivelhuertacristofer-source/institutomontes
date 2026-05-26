"use client";

import React, { useRef } from "react";
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasParticles from "./CanvasParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ value, suffix, label, description, icon }: StatItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    
    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      transformPerspective: 600,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  useGSAP(() => {
    if (numRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numRef.current,
          start: "top 90%",
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.innerText = Math.floor(obj.val).toString();
          }
        },
      });
    }
  }, [value]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-[#0c234c] border border-white/10 rounded-[1.9rem] p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 shadow-2xl"
    >
      {/* Background flare */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-accent-gold/5 rounded-full blur-xl pointer-events-none transition-all duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-primary-blue/5 rounded-full blur-xl pointer-events-none transition-all duration-500"></div>
      
      <div className="w-12 h-12 bg-accent-gold/10 border border-accent-gold/20 rounded-2xl flex items-center justify-center text-accent-gold mb-6 shadow-inner transition-all duration-300">
        {icon}
      </div>

      <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-2">
        <span ref={numRef}>0</span>
        <span className="text-accent-gold ml-0.5">{suffix}</span>
      </div>

      <h4 className="font-display font-extrabold text-base sm:text-lg text-white mb-1">
        {label}
      </h4>

      <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function StatsTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="logros"
      ref={containerRef}
      className="scroll-mt-32 school-grid-blue pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden px-6 lg:px-8"
    >
      {/* Canvas particles */}
      <CanvasParticles color="rgba(255, 184, 0, 0.15)" count={25} speed={0.3} />
      {/* Sutil diagonal transition from HistoryBanner (ice blue #eef2f9) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg className="relative block w-full h-[30px] md:h-[50px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200,0 H0 V120 Z" className="fill-[#eef2f9]"></path>
        </svg>
      </div>
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-blue/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent-gold text-xs font-bold uppercase tracking-wider self-center">
            Nuestros Números
          </span>
          <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            La Confianza y Calidad que nos Respaldan
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/70">
            Cifras que demuestran nuestro compromiso con el desarrollo académico y la tranquilidad de las familias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            value={25}
            suffix="+"
            label="Años de Experiencia"
            description="Formando generaciones con metodologías de excelencia."
            icon={<GraduationCap className="h-6 w-6" />}
          />
          <StatCard
            value={100}
            suffix="%"
            label="Inmersión Bilingüe"
            description="Inglés integrado de forma práctica desde el primer día."
            icon={<BookOpen className="h-6 w-6" />}
          />
          <StatCard
            value={10}
            suffix="+"
            label="Talleres y Programas"
            description="Robótica, finanzas lúdicas, deportes, arte y computación."
            icon={<Award className="h-6 w-6" />}
          />
          <StatCard
            value={100}
            suffix="%"
            label="Incorporación Oficial SEP"
            description="Incorporación oficial SEP y cumplimiento estricto del programa escolar."
            icon={<Users className="h-6 w-6" />}
          />
        </div>
      </div>
    </section>
  );
}
