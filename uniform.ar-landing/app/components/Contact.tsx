"use client"

import { useState } from "react"
import emailjs from "emailjs-com"

export default function Contact() {
  const [form, setForm] = useState({
    empresa: "",
    contacto: "",
    empleados: "",
    indumentaria: [] as string[],
    mensaje: "",
  })

  const [openDropdown, setOpenDropdown] = useState(false)
  const [status, setStatus] = useState<"success" | "error" | "">("")
  const [loading, setLoading] = useState(false)

  const toggleIndumentaria = (value: string) => {
    setForm((prev) => {
      const alreadySelected = prev.indumentaria.includes(value)
      return {
        ...prev,
        indumentaria: alreadySelected
          ? prev.indumentaria.filter((item) => item !== value)
          : [...prev.indumentaria, value],
      }
    })
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔹 VALIDACIÓN COMPLETA
  const formIncompleto =
    !form.empresa.trim() ||
    !form.contacto.trim() ||
    !form.empleados.trim() ||
    form.indumentaria.length === 0 ||
    !form.mensaje.trim()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (formIncompleto) return

    setLoading(true)

    const templateParams = {
      empresa: form.empresa,
      contacto: form.contacto,
      empleados: form.empleados,
      indumentaria: form.indumentaria.join(", "),
      mensaje: form.mensaje,
    }

    emailjs
      .send(
        "service_hihya7k",
        "template_83n3xbq",
        templateParams,
        "YItQg6pN27jBvCQct"
      )
      .then(() => {
        setStatus("success")
        setForm({
          empresa: "",
          contacto: "",
          empleados: "",
          indumentaria: [],
          mensaje: "",
        })
      })
      .catch(() => setStatus("error"))
      .finally(() => setLoading(false))
  }

  const opcionesIndumentaria = [
    "Remeras y Chombas",
    "Pantalones de trabajo",
    "Camperas y Buzos",
    "Chalecos de seguridad",
    "Overoles",
    "Gorras y Guantes",
    "Equipamiento completo",
  ]

  return (
    <section
      id="contact"
      className="bg-[#F8F5F0] text-[#3E2E32] dark:bg-[#2e1f27] dark:text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-28"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight text-[#6B4A52] dark:text-[#E9D7E9]">
        Solicitá tu presupuesto
      </h2>

      {status === "success" && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          ✅ Tu solicitud fue enviada correctamente. ¡Te contactaremos pronto!
        </div>
      )}

      {status === "error" && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
          ❌ Ocurrió un error al enviar el formulario. Intentá nuevamente.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md border border-[#d6c9c2]/50 dark:border-[#745968]/40 p-8 md:p-10 space-y-6"
      >
        {/* Empresa */}
        <div>
          <label className="block mb-1 font-medium">Nombre de la empresa</label>
          <input
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840]"
          />
        </div>

        {/* Contacto */}
        <div>
          <label className="block mb-1 font-medium">
            Contacto{" "}
            <span className="text-sm text-[#917780] dark:text-[#c8b0ba]">
                 (Email o número de celular)
            </span>
          </label>

          <input
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840]"
          />
        </div>

        {/* Empleados */}
        <div>
          <label className="block mb-1 font-medium">Cantidad de empleados</label>

          <div className="relative">
            <select
              name="empleados"
              value={form.empleados}
              onChange={handleChange}
              className="w-full appearance-none p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840]"
            >
              <option value="">Seleccioná la cantidad</option>
              <option value="1-10 empleados">1-10 empleados</option>
              <option value="11-50 empleados">11-50 empleados</option>
              <option value="51-100 empleados">51-100 empleados</option>
              <option value="Más de 100 empleados">Más de 100 empleados</option>
            </select>

            {/* MISMA FLECHA QUE EL DROPDOWN */}
            <span className="absolute right-3 top-3 text-[#6B4A52] dark:text-[#E9D7E9] pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Indumentaria */}
        <div>
          <label className="block mb-1 font-medium">Indumentaria de interés</label>

          <div
            className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840] cursor-pointer relative"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {form.indumentaria.length > 0
              ? form.indumentaria.join(", ")
              : "Seleccioná el tipo de indumentaria"}

            <span className="absolute right-3 top-3 text-[#6B4A52] dark:text-[#E9D7E9]">
              ▼
            </span>
          </div>

          {openDropdown && (
            <div className="mt-2 border rounded-md bg-white dark:bg-[#3a2a31] border-[#d6c9c2] dark:border-[#745968] p-3 space-y-2 shadow-lg">
              {opcionesIndumentaria.map((op) => (
                <label key={op} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.indumentaria.includes(op)}
                    onChange={() => toggleIndumentaria(op)}
                  />
                  <span className="text-[#3E2E32] dark:text-white">{op}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <label className="block mb-1 font-medium">Mensaje adicional</label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            rows={4}
            placeholder="Contanos más detalles..."
            className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840]"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={formIncompleto || loading}
          className={`w-full bg-[#6B4A52] dark:bg-[#745968] text-white py-3 rounded-md font-semibold 
            hover:bg-[#5a3f46] dark:hover:bg-[#5a4358] transition-colors
            ${formIncompleto || loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Solicitando presupuesto..." : "Solicitar presupuesto"}
        </button>
      </form>
    </section>
  )
}
