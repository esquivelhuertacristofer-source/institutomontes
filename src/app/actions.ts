"use server";

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    parentName?: string;
    studentName?: string;
    grade?: string;
    phone?: string;
    email?: string;
  };
};

export async function submitInquiry(prevState: FormState, formData: FormData): Promise<FormState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const parentName = formData.get("parentName") as string;
  const studentName = formData.get("studentName") as string;
  const grade = formData.get("grade") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const errors: FormState["errors"] = {};

  if (!parentName || parentName.trim().length < 3) {
    errors.parentName = "El nombre del padre o tutor es obligatorio y debe tener al menos 3 caracteres.";
  }

  if (!studentName || studentName.trim().length < 3) {
    errors.studentName = "El nombre del alumno es obligatorio y debe tener al menos 3 caracteres.";
  }

  if (!grade || grade === "") {
    errors.grade = "Por favor selecciona el grado de interés (1° a 6° de Primaria).";
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone.replace(/\s+/g, ""))) {
    errors.phone = "Por favor ingresa un número de teléfono válido de 10 dígitos.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Por favor ingresa un correo electrónico válido.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Por favor corrige los errores del formulario.",
      errors,
    };
  }

  // Success simulation
  console.log("Inscripción/Informes Recibidos:", {
    parentName,
    studentName,
    grade,
    phone,
    email,
    message,
    submittedAt: new Date().toISOString()
  });

  return {
    success: true,
    message: `¡Muchas gracias, ${parentName}! Hemos registrado la solicitud para ${studentName} (${grade}° Primaria). Nos comunicaremos contigo al teléfono ${phone} o al correo ${email} en las próximas horas.`,
  };
}
