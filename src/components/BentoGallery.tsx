"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasParticles from "./CanvasParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const items: GalleryItem[] = [
  {
    id: 0,
    title: "Aulas de Innovación y Colaboración",
    category: "Aulas Temáticas",
    image: "/images/gallery_classroom.webp",
    description: "Espacios educativos modernos, luminosos y flexibles, diseñados para incentivar el trabajo en equipo y el aprendizaje activo."
  },
  {
    id: 1,
    title: "Laboratorio STEM & Robótica",
    category: "Robótica y TICs",
    image: "/images/gallery_robotics.webp",
    description: "Plataforma práctica donde los estudiantes programan, construyen prototipos y desarrollan pensamiento lógico para resolver retos reales."
  },
  {
    id: 2,
    title: "Zona Deportiva",
    category: "Deporte y Recreo",
    image: "/images/gallery_playground.webp",
    description: "Espacios de recreación al aire libre estructurados para fomentar el juego cooperativo, la motricidad y la integración social."
  },
  {
    id: 3,
    title: "Comedor Montes Saludable",
    category: "Alimentación Balanceada",
    image: "/images/gallery_dining.webp",
    description: "Servicio de comedor higiénico y acogedor, con menús nutritivos supervisados para asegurar el óptimo crecimiento de los alumnos."
  },
  {
    id: 4,
    title: "Biblioteca y Centro de Indagación",
    category: "Estudio y Lectura",
    image: "/images/gallery_library.png",
    description: "Acervo de lectura interactivo y cómodo que estimula la imaginación, la indagación independiente y el amor por los libros."
  }
];

interface CardProps {
  item: GalleryItem;
  idx: number;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="relative w-[300px] sm:w-[380px] md:w-[440px] h-[380px] sm:h-[460px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer group shrink-0 transition-all duration-500 hover:scale-[1.02] hover:border-accent-gold/40 hover:shadow-[0_25px_60px_rgba(255,184,0,0.15)]"
    >
      {/* Background photographic image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 300px, 440px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/20 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 z-10"></div>
      </div>

      {/* Card Contents */}
      <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-between text-left">
        {/* Category Label at the top */}
        <div className="flex justify-between items-start">
          <span className="bg-primary-dark/85 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black text-accent-gold border border-white/10 uppercase tracking-widest">
            {item.category}
          </span>
          <div className="p-2 rounded-xl bg-primary-dark/85 backdrop-blur-md border border-white/10 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="h-4 w-4 text-accent-gold" />
          </div>
        </div>

        {/* Text information at the bottom */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h4 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {item.title}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BentoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Setup animations on load
  useGSAP(
    () => {
      // Intro fade in for slider container
      gsap.fromTo(
        ".carousel-container",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".carousel-container",
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && lightboxIndex !== null) handleNextLightbox();
      if (e.key === "ArrowLeft" && lightboxIndex !== null) handlePrevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev === null ? null : prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev === null ? null : prev === items.length - 1 ? 0 : prev + 1));
  };

  const slideNext = () => {
    setCurrentIndex((prev) => {
      // Max index allowed depends on card width and viewport. Let's allow sliding step by step.
      if (prev >= items.length - 1) return 0;
      return prev + 1;
    });
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return items.length - 1;
      return prev - 1;
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      slideNext();
    } else if (isRightSwipe) {
      slidePrev();
    }
  };

  return (
    <section 
      id="galeria" 
      ref={containerRef}
      className="scroll-mt-32 school-grid-blue bg-[#061530] py-28 lg:py-36 text-white relative overflow-hidden px-6 lg:px-8"
    >

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-[-15%] w-[550px] h-[550px] bg-primary-blue/30 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-[-10%] w-[550px] h-[550px] bg-accent-gold/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

      {/* Floating vector sparkles */}
      <div className="absolute top-12 right-12 pointer-events-none opacity-20 animate-pulse">
        <Sparkles className="h-10 w-10 text-accent-gold" />
      </div>

      <CanvasParticles color="rgba(255, 184, 0, 0.15)" count={30} speed={0.2} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-sm font-extrabold text-accent-gold bg-accent-gold/10 border border-accent-gold/25 px-4 py-1.5 rounded-full uppercase tracking-widest">
            Instalaciones Montes
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Nuestros Espacios Educativos
          </h2>
          <p className="font-sans text-white/70 mt-4 text-lg leading-relaxed font-semibold">
            Un entorno seguro, interactivo y de alto nivel diseñado para que tu hijo viva el aprendizaje al máximo todos los días.
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div className="carousel-container relative w-full overflow-visible py-8">
          {/* Nav Controls */}
          <div className="absolute top-[-50px] right-4 flex gap-4 z-20">
            <button 
              onClick={slidePrev}
              className="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-dark hover:border-accent-gold transition-all duration-300 shadow-2xl cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={slideNext}
              className="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-dark hover:border-accent-gold transition-all duration-300 shadow-2xl cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Sliding Track wrapper */}
          <div className="overflow-visible select-none">
            <div 
              ref={trackRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="flex gap-6 sm:gap-8 transition-transform duration-700 ease-out"
              style={{ transform: `translateX(calc(-${currentIndex * 320}px + 0px))` }}
            >
              {items.map((item, idx) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  onClick={() => setLightboxIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Micro Dots indicator */}
        <div className="flex justify-center gap-2.5 mt-10">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-accent-gold" : "w-2.5 bg-white/20"}`}
              aria-label={`Ir a imagen ${idx + 1}`}
            ></button>
          ))}
        </div>

      </div>

      {/* Immersive Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#040e21]/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-10 select-none animate-fadeIn">
          {/* Close Area */}
          <div className="absolute inset-0 cursor-default" onClick={() => setLightboxIndex(null)}></div>

          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-30 border border-white/10"
            aria-label="Cerrar galería"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Nav Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevLightbox(); }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-30 border border-white/10"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Lightbox Content Container */}
          <div className="relative max-w-4xl w-full bg-[#091b3e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-20 flex flex-col md:flex-row h-[80vh] md:h-auto max-h-[640px]">
            {/* Left side: Image display */}
            <div className="flex-1 bg-[#061530] flex items-center justify-center p-4 relative min-h-[300px]">
              <Image
                src={items[lightboxIndex].image}
                alt={items[lightboxIndex].title}
                fill
                className="object-cover"
              />
            </div>

            {/* Right side: Information Details */}
            <div className="w-full md:w-80 bg-[#091b3e] p-8 flex flex-col justify-between text-left border-t md:border-t-0 md:border-l border-white/10 shrink-0">
              <div>
                <span className="text-xs font-black text-accent-gold bg-accent-gold/10 border border-accent-gold/25 px-3 py-1 rounded-full uppercase tracking-wider">
                  {items[lightboxIndex].category}
                </span>
                <h3 className="font-display font-black text-2xl text-white mt-4 tracking-tight leading-tight">
                  {items[lightboxIndex].title}
                </h3>
                <p className="font-sans text-sm text-white/80 mt-4 leading-relaxed font-semibold">
                  {items[lightboxIndex].description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-white/50">
                <MapPin className="h-4 w-4 text-accent-gold shrink-0" />
                <span>Campus Principal Montes</span>
              </div>
            </div>
          </div>

          {/* Nav Next */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNextLightbox(); }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-30 border border-white/10"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </section>
  );
}
