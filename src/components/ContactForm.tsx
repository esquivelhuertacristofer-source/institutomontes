"use client";

import React, { useActionState } from "react";
import { submitInquiry, FormState } from "../app/actions";
import { User, Mail, Phone, BookOpen, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import CanvasParticles from "./CanvasParticles";

const initialState: FormState = {
  success: false,
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  return (
    <section id="contacto" className="scroll-mt-32 school-grid-blue pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-8 bg-[#091b3e] text-white relative overflow-hidden">
      {/* Canvas particles */}
      <CanvasParticles color="rgba(16, 185, 129, 0.15)" count={30} speed={0.3} />
      {/* Sutil diagonal transition from FAQAccordion (ice blue #f4f7fc) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg className="relative block w-full h-[30px] md:h-[50px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 H1200 V120 Z" className="fill-[#f4f7fc]"></path>
        </svg>
      </div>
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] bg-primary-blue/30 rounded-full blur-[110px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-accent-gold/15 rounded-full blur-[110px] pointer-events-none animate-pulse"></div>

      <div className="absolute top-12 left-12 pointer-events-none opacity-20">
        <Sparkles className="h-7 w-7 text-accent-gold" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-extrabold text-accent-gold bg-accent-gold/10 border border-accent-gold/25 px-4 py-1.5 rounded-full uppercase tracking-widest">
            Admisiones & Informes
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Inicia el Proceso de Inscripción
          </h2>
          <p className="font-sans text-white/70 mt-4 text-base sm:text-lg leading-relaxed">
            Déjanos tus datos y un asesor educativo se pondrá en contacto contigo para agendar 
            una visita guiada y resolver todas tus dudas sobre nuestra primaria.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          {state.success ? (
            <div className="flex flex-col items-center justify-center text-center py-10 gap-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20 animate-[bounce_1s_ease-in-out]">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                ¡Solicitud Registrada!
              </h3>
              <p className="font-sans text-white/80 max-w-md text-base leading-relaxed font-semibold">
                {state.message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-3d-blue px-6 py-3.5 rounded-xl font-display font-extrabold text-sm hover:scale-102 transition-transform duration-300"
              >
                Registrar otra solicitud
              </button>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              {state.message && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-3 text-sm font-semibold">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{state.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parent Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="parentName" className="text-sm font-bold text-white/90 text-left">
                    Nombre del Padre o Tutor
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      required
                      placeholder="Ej. Juan Pérez"
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all text-white placeholder-white/30 ${
                        state.errors?.parentName ? "border-rose-400" : "border-white/10 hover:border-white/20 focus:border-accent-gold"
                      }`}
                    />
                  </div>
                  {state.errors?.parentName && (
                    <span className="text-xs text-rose-400 font-medium text-left">{state.errors.parentName}</span>
                  )}
                </div>

                {/* Student Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="studentName" className="text-sm font-bold text-white/90 text-left">
                    Nombre del Alumno
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      required
                      placeholder="Ej. Sofía Pérez"
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all text-white placeholder-white/30 ${
                        state.errors?.studentName ? "border-rose-400" : "border-white/10 hover:border-white/20 focus:border-accent-gold"
                      }`}
                    />
                  </div>
                  {state.errors?.studentName && (
                    <span className="text-xs text-rose-400 font-medium text-left">{state.errors.studentName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Primary Grade */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="grade" className="text-sm font-bold text-white/90 text-left">
                    Grado de Interés (Primaria)
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <select
                      id="grade"
                      name="grade"
                      required
                      className={`w-full pl-12 pr-10 py-3.5 bg-white/5 border rounded-2xl font-sans text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all text-white ${
                        state.errors?.grade ? "border-rose-400" : "border-white/10 hover:border-white/20 focus:border-accent-gold"
                      }`}
                    >
                      <option value="" className="bg-[#091b3e] text-white">Seleccionar...</option>
                      <option value="1" className="bg-[#091b3e] text-white">1° de Primaria</option>
                      <option value="2" className="bg-[#091b3e] text-white">2° de Primaria</option>
                      <option value="3" className="bg-[#091b3e] text-white">3° de Primaria</option>
                      <option value="4" className="bg-[#091b3e] text-white">4° de Primaria</option>
                      <option value="5" className="bg-[#091b3e] text-white">5° de Primaria</option>
                      <option value="6" className="bg-[#091b3e] text-white">6° de Primaria</option>
                    </select>
                    {/* Select Arrow custom decoration */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[10px]">
                      ▼
                    </div>
                  </div>
                  {state.errors?.grade && (
                    <span className="text-xs text-rose-400 font-medium text-left">{state.errors.grade}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-bold text-white/90 text-left">
                    Teléfono (10 dígitos)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Ej. 7222389292"
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all text-white placeholder-white/30 ${
                        state.errors?.phone ? "border-rose-400" : "border-white/10 hover:border-white/20 focus:border-accent-gold"
                      }`}
                    />
                  </div>
                  {state.errors?.phone && (
                    <span className="text-xs text-rose-400 font-medium text-left">{state.errors.phone}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-white/90 text-left">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Ej. tutor@correo.com"
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all text-white placeholder-white/30 ${
                        state.errors?.email ? "border-rose-400" : "border-white/10 hover:border-white/20 focus:border-accent-gold"
                      }`}
                    />
                  </div>
                  {state.errors?.email && (
                    <span className="text-xs text-rose-400 font-medium text-left">{state.errors.email}</span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-white/90 text-left">
                  Preguntas o Comentarios Adicionales (Opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Escribe aquí si tienes alguna duda específica, horarios que te interesen, etc."
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 focus:border-accent-gold rounded-2xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all resize-none text-white placeholder-white/30"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="btn-3d-gold w-full py-4 rounded-2xl font-display font-extrabold text-base text-primary-dark flex items-center justify-center gap-2 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed hover:scale-102 transition-transform duration-300"
              >
                {isPending ? (
                  <>
                    <div className="h-5 w-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin"></div>
                    Procesando Registro...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar Solicitud de Informes
                  </>
                )}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-white/40 uppercase tracking-widest">Ó</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <a
                href="https://wa.me/527205599190?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informes%20e%20iniciar%20el%20proceso%20de%20inscripci%C3%B3n%20para%20mi%20hijo(a)%20en%20el%20Instituto%20Educativo%20Montes."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl font-display font-extrabold text-base text-white flex items-center justify-center gap-2.5 shadow-lg hover:scale-102 transition-transform duration-300 border-none"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.117-2.884-6.978C16.588 1.902 14.11 .88 11.47 1.88c-5.438 0-9.864 4.42-9.867 9.864-.001 1.8.486 3.568 1.412 5.124l-.97 3.548 3.612-.962zm11.448-5.063c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.195-.35.22-.651.07-3.002-1.498-5.07-3.153-6.242-5.17-.311-.536-.031-.827.244-1.102.247-.247.549-.643.824-.966.275-.322.366-.551.549-.92.182-.368.091-.689-.045-.99-.137-.3-.675-1.629-.925-2.228-.243-.584-.488-.507-.675-.517-.174-.01-.375-.012-.575-.012-.2 0-.526.075-.802.374-.275.3-1.05 1.024-1.05 2.5 0 1.475 1.074 2.9 1.225 3.1.15.2 2.11 3.224 5.116 4.519.715.309 1.273.493 1.707.63.718.228 1.37.196 1.885.12.573-.086 1.78-.727 2.03-1.43.25-.701.25-1.3.175-1.43-.075-.13-.275-.23-.576-.38z"/>
                </svg>
                Contactar por WhatsApp Directo
              </a>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
