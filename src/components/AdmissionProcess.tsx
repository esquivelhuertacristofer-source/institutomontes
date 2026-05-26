"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Calendar, 
  ClipboardCheck, 
  Sparkles, 
  Check, 
  Clock, 
  FileText,
  ArrowRight
} from "lucide-react";

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  longDesc: string;
  duration: string;
  requirements: string[];
  colorClass: string;
  glowClass: string;
}

export default function AdmissionProcess() {
  const [activeStep, setActiveStep] = useState(1);
  const [isChanging, setIsChanging] = useState(false);
  const [displayStep, setDisplayStep] = useState(1);

  const steps: Step[] = [
    {
      id: 1,
      icon: <MessageSquare className="h-6 w-6" />,
      title: "1. Registro e Información",
      shortDesc: "Envía tus datos y habla con un asesor.",
      longDesc: "El primer paso es registrar tu interés a través de nuestro formulario en línea o visitando directamente nuestras oficinas. Un asesor educativo se pondrá en contacto contigo para resolver cualquier duda inicial sobre costos, horarios y programas curriculares.",
      duration: "Respuesta en < 24 horas",
      requirements: [
        "Llenar formulario en línea",
        "Proporcionar datos de contacto",
        "Especificar grado de interés"
      ],
      colorClass: "bg-primary-blue text-white shadow-[0_8px_20px_rgba(0,86,198,0.25)]",
      glowClass: "bg-primary-blue/10",
    },
    {
      id: 2,
      icon: <Calendar className="h-6 w-6" />,
      title: "2. Visita y Entrevista",
      shortDesc: "Conoce el campus y a la dirección.",
      longDesc: "Te invitamos a recorrer nuestras instalaciones: aulas interactivas, comedor, áreas deportivas y laboratorios. Durante la visita, sostendrás una entrevista con nuestra Directora General para platicar sobre la filosofía educativa y el perfil del alumno.",
      duration: "1 hora aprox.",
      requirements: [
        "Agendar cita previa",
        "Asistencia de ambos padres",
        "Diálogo pedagógico interactivo"
      ],
      colorClass: "bg-[#7c3aed] text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)]",
      glowClass: "bg-purple-500/10",
    },
    {
      id: 3,
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "3. Valoración Diagnóstica",
      shortDesc: "Sesión amigable de aptitudes.",
      longDesc: "Realizamos una valoración psicopedagógica y diagnóstica a tu hijo. No es un examen de exclusión, sino una herramienta para entender su nivel socioemocional, de lectoescritura, razonamiento lógico y nivel de inglés para brindarle el mejor apoyo.",
      duration: "1.5 horas aprox.",
      requirements: [
        "Acta de nacimiento",
        "Boleta del ciclo escolar anterior",
        "Ficha diagnóstica contestada"
      ],
      colorClass: "bg-accent-gold text-primary-dark shadow-[0_8px_20px_rgba(255,184,0,0.25)]",
      glowClass: "bg-accent-gold/20",
    },
    {
      id: 4,
      icon: <Sparkles className="h-6 w-6" />,
      title: "4. Inscripción y Bienvenida",
      shortDesc: "Entrega de documentos y kit.",
      longDesc: "Una vez autorizada la admisión, procederemos al llenado de la ficha de inscripción, entrega de documentos oficiales y pago de cuotas. ¡Felicidades! Recibirás el kit de bienvenida para el alumno y accesos a nuestra plataforma digital.",
      duration: "30 minutos",
      requirements: [
        "Cartilla de vacunación",
        "CURP del alumno e identificación de tutores",
        "Firma del reglamento interno"
      ],
      colorClass: "bg-emerald-600 text-white shadow-[0_8px_20px_rgba(5,150,105,0.25)]",
      glowClass: "bg-emerald-500/10",
    },
  ];

  const handleStepClick = (stepId: number) => {
    if (stepId === activeStep || isChanging) return;
    setIsChanging(true);
    setActiveStep(stepId);
    
    // Smooth transition between details panels
    setTimeout(() => {
      setDisplayStep(stepId);
      setIsChanging(false);
    }, 200);
  };

  const currentStep = steps.find(s => s.id === displayStep) || steps[0];

  return (
    <section 
      id="admisiones" 
      className="scroll-mt-32 school-grid-light py-24 lg:py-32 bg-gradient-to-b from-[#eef2f9] via-[#f4f7fc] to-[#eef2f9] relative overflow-hidden px-6 lg:px-8 border-b border-gray-150"
    >
      {/* Glow Orbs background */}
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] bg-primary-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="text-sm font-extrabold text-primary-blue bg-primary-blue/10 border border-primary-blue/15 px-4 py-1.5 rounded-full uppercase tracking-widest">
            Admisiones Abiertas
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-[4.3rem] xl:text-[5.2rem] text-primary-dark mt-5 tracking-tight leading-[1.02]">
            Proceso de Admisión en 4 Pasos
          </h2>
          <p className="font-sans text-primary-dark/70 mt-4 text-lg leading-relaxed">
            Acompañamos a tu familia en cada etapa de inscripción para asegurar una integración cómoda, 
            ágil y exitosa a nuestro colegio.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Timeline Steps */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            {/* Vertical timeline bar (desktop) */}
            <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-[3px] bg-gray-200/80 rounded-full">
              <div 
                className="w-full bg-primary-blue transition-all duration-500 ease-out rounded-full relative"
                style={{ height: `${((activeStep - 1) / 3) * 100}%` }}
              >
                {/* Glowing tracking dot */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 bg-primary-blue rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,86,198,0.6)] z-20"></div>
              </div>
            </div>

            <div className="flex flex-col gap-5 relative z-10">
              {steps.map((step) => {
                const isActive = step.id === activeStep;
                const isCompleted = step.id < activeStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`w-full text-left flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? "bg-white shadow-[0_15px_30px_rgba(9,27,62,0.04)] scale-102 border border-gray-200" 
                        : "hover:bg-white/60 border border-transparent"
                    }`}
                  >
                    {/* Circle icon marker */}
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 relative ${
                        isActive 
                          ? step.colorClass + " scale-110" 
                          : isCompleted 
                            ? "bg-primary-blue text-white" 
                            : "bg-white text-gray-400 border border-gray-150 shadow-sm"
                      }`}
                    >
                      {isCompleted ? <Check className="h-5 w-5 stroke-[3px]" /> : step.icon}
                      
                      {/* Pulsating outline for active step */}
                      {isActive && (
                        <span className={`absolute -inset-1 rounded-xl ${step.colorClass} opacity-20 animate-ping pointer-events-none`}></span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`font-display font-extrabold text-base sm:text-lg transition-colors ${
                        isActive ? "text-primary-dark" : "text-primary-dark/85"
                      }`}>
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-primary-dark/60 mt-1 font-medium">
                        {step.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Detail Panel with transition */}
          <div className="lg:col-span-6 flex">
            <div 
              style={{
                opacity: isChanging ? 0 : 1,
                transform: isChanging ? "translateY(15px)" : "translateY(0)",
                transition: "all 200ms ease-out",
              }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(9,27,62,0.05)] relative overflow-hidden text-left flex-1 flex flex-col justify-between"
            >
              {/* Colored ambient glow inside card */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${currentStep.glowClass} rounded-full filter blur-2xl`}></div>

              <div>
                <div className="flex items-center gap-3 mb-6 relative">
                  <div className={`p-3.5 rounded-2xl ${currentStep.colorClass}`}>
                    {currentStep.icon}
                  </div>
                  <div>
                    <span className="font-sans text-xs font-black uppercase tracking-wider text-primary-blue">
                      Paso {currentStep.id} de 4
                    </span>
                    <h3 className="font-display font-black text-2xl text-primary-dark mt-1">
                      {currentStep.title.substring(3)}
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-primary-dark/70 leading-relaxed mb-8 font-medium">
                  {currentStep.longDesc}
                </p>

                {/* Step info block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-primary-dark/50 uppercase tracking-wider mb-3">
                      <Clock className="h-4 w-4 text-primary-blue" />
                      <span>Duración Estimada</span>
                    </div>
                    <span className="font-display font-bold text-sm sm:text-base text-primary-dark bg-surface-bone px-3 py-1.5 rounded-lg border border-gray-150/50">
                      {currentStep.duration}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-primary-dark/50 uppercase tracking-wider mb-3">
                      <FileText className="h-4 w-4 text-primary-blue" />
                      <span>Requisitos Clave</span>
                    </div>
                    <ul className="space-y-2.5">
                      {currentStep.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-primary-dark/80 font-semibold">
                          <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 stroke-[3px] mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to action inside details */}
              <div className="mt-10 flex justify-end">
                <a 
                  href="#registro"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-primary-blue hover:text-primary-blue-dark transition-colors group/link cursor-pointer"
                >
                  <span>Iniciar este paso</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
