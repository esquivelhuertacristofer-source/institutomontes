"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "¿Qué grados escolares ofrecen?",
    answer:
      "Somos una institución dedicada exclusivamente al nivel Primaria, atendiendo de 1º a 6º grado de educación básica. Esto nos permite enfocar el 100% de nuestra infraestructura y metodologías pedagógicas en esta etapa crucial del desarrollo infantil.",
  },
  {
    question: "¿Cómo funciona el horario extendido?",
    answer:
      "Nuestras puertas abren desde las 7:00 a.m. para comodidad de los padres de familia. El programa extendido abarca hasta las 6:30 p.m. e incluye el servicio de comedor escolar con alimentación balanceada y asesoría de tareas dirigida por docentes de la escuela, asegurando que los alumnos vayan a casa con sus deberes completos.",
  },
  {
    question: "¿Cuál es el enfoque bilingüe de la primaria?",
    answer:
      "Impartimos un programa diario y estructurado de inglés. El aprendizaje se realiza mediante inmersión práctica en materias académicas, dinámicas orales y comprensión de lectura, preparando a los alumnos para una comunicación bilingüe fluida y natural.",
  },
  {
    question: "¿Qué talleres o programas tecnológicos imparten?",
    answer:
      "Nuestros diferenciadores clave son los talleres integrados en la jornada: Robótica aplicada (donde arman y programan kits adaptados a su edad), Educación Financiera lúdica mediante plataformas interactivas (desarrollando hábitos inteligentes de ahorro y planeación), y Tecnologías de la Información (TICs).",
  },
  {
    question: "¿Cómo puedo agendar una visita o iniciar la inscripción?",
    answer:
      "El proceso es muy sencillo: puedes llenar el formulario de registro al final de esta página seleccionando el grado de tu interés, o bien comunicarte vía telefónica. Nos pondremos en contacto contigo para agendar una sesión informativa y un recorrido personalizado por nuestras instalaciones.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="school-grid-light py-24 lg:py-32 bg-gradient-to-b from-[#f4f7fc] via-[#eef2f9] to-[#f4f7fc] relative overflow-hidden px-6 lg:px-8">
      {/* Decorative Blur BG */}
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-gold/15 rounded-full blur-[90px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent-gold/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="absolute top-16 right-16 pointer-events-none opacity-35">
        <Sparkles className="h-6 w-6 text-accent-gold-dark" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="text-center mb-16 sm:mb-20 flex flex-col gap-4 items-center">
          <span className="text-sm font-extrabold text-accent-gold-dark bg-accent-gold/15 border border-accent-gold/25 px-4 py-1.5 rounded-full uppercase tracking-widest">
            Preguntas Frecuentes
          </span>
          <h3 className="font-display font-black text-4xl sm:text-5xl text-primary-dark tracking-tight">
            Resolvemos todas tus dudas
          </h3>
          <p className="font-sans text-base text-primary-dark/70 max-w-lg mt-2 leading-relaxed font-medium">
            Encuentra respuestas rápidas sobre nuestra primaria, horarios, comedor e inscripciones.
          </p>
        </div>

        {/* Accordion Cards */}
        <div className="space-y-4.5 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`bg-white border rounded-2.5xl transition-all duration-300 ${
                  isOpen
                    ? "border-accent-gold shadow-xl scale-[1.01]"
                    : "border-gray-200/85 shadow-sm hover:border-accent-gold/45"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex gap-4 items-start pr-4">
                    <HelpCircle className={`h-6 w-6 shrink-0 mt-0.5 transition-colors duration-300 ${isOpen ? "text-accent-gold-dark" : "text-gray-400"}`} />
                    <span className="font-display font-black text-base sm:text-lg text-primary-dark leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-accent-gold-dark" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
                    isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 pl-[64px] border-t border-emerald-50 bg-gradient-to-r from-accent-gold/5 via-transparent to-transparent">
                    <p className="font-sans text-sm sm:text-base text-primary-dark/85 leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
