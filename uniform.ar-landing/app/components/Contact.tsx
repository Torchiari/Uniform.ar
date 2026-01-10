"use client"

import { useState } from "react"

// Detectamos la URL automáticamente:
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Contact() {
  // Estado para los datos de texto
  const [form, setForm] = useState({
    empresa: "",
    contacto: "",
    empleados: "",
    mensaje: "",
  })

  // Estado separado para contar las prendas: { "Remeras": 5, "Chombas": 2 }
  const [indumentariaCounts, setIndumentariaCounts] = useState<{ [key: string]: number }>({})

  const [openDropdown, setOpenDropdown] = useState(false)
  const [status, setStatus] = useState<"success" | "error" | "">("")
  const [loading, setLoading] = useState(false)

  // Opciones disponibles
  const opcionesIndumentaria = [
    "Remeras",
    "Chombas",
    "Buzo friza",
    "Buzo canguro",
    "Buzo polar",
    "Chaleco polar",
    "Campera trucker",
    "Chaleco trucker",
    "Camisa de grafa",
    "Bombacha de campo",
    "Pantalon cargo",
    "Pantalon cargo antidesgarro",
    "Pantalon clasico",
    "Pantalon jean",
    "Bermuda cargo",
  ]

  // --- LÓGICA DE CONTADORES ---

  // Calcula el total sumando los valores del objeto
  const totalPrendas = Object.values(indumentariaCounts).reduce((a, b) => a + b, 0)

  const updateCount = (prenda: string, delta: number) => {
    setIndumentariaCounts((prev) => {
      const current = prev[prenda] || 0
      const next = Math.max(0, current + delta) // No permite negativos
      
      const newCounts = { ...prev, [prenda]: next }
      
      // Si es 0, lo borramos del objeto para mantenerlo limpio
      if (next === 0) {
        delete newCounts[prenda]
      }
      return newCounts
    })
  }

  // --- MANEJO DEL FORMULARIO ---

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Validación: Campos llenos Y mínimo 30 prendas
  const formIncompleto =
    !form.empresa.trim() ||
    !form.contacto.trim() ||
    !form.empleados.trim() ||
    !form.mensaje.trim() ||
    totalPrendas < 30

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formIncompleto) return;
    setLoading(true);

    // Convertimos el objeto de contadores a un string legible para el email
    // Ej: "Remeras: 10, Chombas: 20"
    const indumentariaString = Object.entries(indumentariaCounts)
      .map(([nombre, cantidad]) => `${nombre}: ${cantidad}`)
      .join(", ");

    // Preparamos los datos para enviar al backend
    const body = {
      empresa: form.empresa,
      contacto: form.contacto,
      empleados: form.empleados,
      indumentaria: indumentariaString, // Enviamos el string formateado
      mensaje: form.mensaje,
    };

    try {
      const res = await fetch(`${API_URL}/mail/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Error en el servidor");
      }

      setStatus("success");
      // Limpiamos todo
      setForm({
        empresa: "",
        contacto: "",
        empleados: "",
        mensaje: "",
      });
      setIndumentariaCounts({}); // Reiniciar contadores
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#2e1f27] text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-28"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-[#E9D7E9] mb-2">
          Solicitá tu presupuesto
        </h2>
      </div>

      {status === "success" && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-green-700/20 text-green-300 rounded-lg text-center border border-green-500/30">
          ✅ Tu solicitud fue enviada correctamente. ¡Te contactaremos pronto!
        </div>
      )}

      {status === "error" && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-700/20 text-red-300 rounded-lg text-center border border-red-500/30">
          ❌ Ocurrió un error al enviar el formulario. Por favor intentá nuevamente.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#3a2a31] rounded-2xl shadow-md border border-[#745968]/40 p-8 md:p-10 space-y-6"
      >
        {/* Empresa */}
        <div>
          <label className="block mb-1 font-medium">Nombre de la empresa</label>
          <input
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#745968]/40 bg-[#4a3840] text-white focus:outline-none focus:border-[#E9D7E9]"
          />
        </div>

        {/* Contacto */}
        <div>
          <label className="block mb-1 font-medium">
            Contacto{" "}
            <span className="text-sm text-[#c8b0ba]">
              (Email o número de celular)
            </span>
          </label>

          <input
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#745968]/40 bg-[#4a3840] text-white focus:outline-none focus:border-[#E9D7E9]"
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
              className="w-full appearance-none p-3 rounded-md border border-[#745968]/40 bg-[#4a3840] text-white focus:outline-none focus:border-[#E9D7E9]"
            >
              <option value="">Seleccioná la cantidad</option>
              <option value="1-10 empleados">1-10 empleados</option>
              <option value="11-50 empleados">11-50 empleados</option>
              <option value="51-100 empleados">51-100 empleados</option>
              <option value="Más de 100 empleados">Más de 100 empleados</option>
            </select>

            <span className="absolute right-3 top-3 text-[#E9D7E9] pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Indumentaria CON CONTADORES */}
        <div>
          <label className="block mb-1 font-medium">Indumentaria de interés</label>

          <div
            className={`w-full p-3 rounded-md border bg-[#4a3840] cursor-pointer relative text-white transition-colors
              ${totalPrendas >= 30 ? 'border-[#E9D7E9]/60' : 'border-[#745968]/40'}
            `}
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {totalPrendas > 0
              ? `Seleccionaste ${totalPrendas} prendas en total`
              : "Seleccioná las prendas y cantidades"}

            <span className="absolute right-3 top-3 text-[#E9D7E9]">
              {openDropdown ? "▲" : "▼"}
            </span>
          </div>

          {openDropdown && (
            <div className="mt-2 border rounded-md bg-[#3a2a31] border-[#745968]/40 p-3 space-y-3 shadow-lg max-h-96 overflow-y-auto">
              {opcionesIndumentaria.map((op) => {
                const count = indumentariaCounts[op] || 0
                return (
                  <div key={op} className="flex items-center justify-between p-2 hover:bg-[#4a3840] rounded transition-colors">
                    {/* Nombre Prenda */}
                    <span className="text-white font-medium">{op}</span>
                    
                    {/* Contador */}
                    <div className="flex items-center gap-3 bg-[#2e1f27] rounded px-2 py-1 border border-[#745968]/30">
                      <button
                        type="button" // Importante: type="button" para no enviar form
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCount(op, -1);
                        }}
                        className="w-6 h-6 flex items-center justify-center text-[#E9D7E9] hover:bg-[#745968] rounded text-lg font-bold"
                      >
                        -
                      </button>
                      
                      <span className="w-6 text-center text-white font-semibold">
                        {count}
                      </span>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCount(op, 1);
                        }}
                        className="w-6 h-6 flex items-center justify-center text-[#E9D7E9] hover:bg-[#745968] rounded text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
              
              <div className="pt-2 border-t border-[#745968]/30 flex justify-between items-center">
                 <span className="text-sm text-[#c8b0ba]">Total acumulado:</span>
                 <span className={`font-bold ${totalPrendas >= 30 ? 'text-green-400' : 'text-orange-400'}`}>
                   {totalPrendas} / 30
                 </span>
              </div>
            </div>
          )}
          {/* Mensaje de validación debajo del dropdown */}
          {totalPrendas > 0 && totalPrendas < 30 && (
            <p className="text-sm text-orange-400 mt-2">
              ⚠️ Faltan {30 - totalPrendas} prendas para llegar al mínimo.
            </p>
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
            className="w-full p-3 rounded-md border border-[#745968]/40 bg-[#4a3840] text-white focus:outline-none focus:border-[#E9D7E9]"
          />
        </div>

        {/* Botón */}
        <div className="space-y-2">
          <button
            type="submit"
            disabled={formIncompleto || loading}
            className={`w-full bg-[#745968] text-white py-3 rounded-md font-semibold 
              transition-all shadow-lg
              ${
                formIncompleto || loading
                  ? "opacity-50 cursor-not-allowed grayscale"
                  : "hover:bg-[#5a4358] hover:scale-[1.01]"
              }`}
          >
            {loading ? "Solicitando presupuesto..." : "Solicitar presupuesto"}
          </button>
          
          {/* Mensaje final si el botón está bloqueado por cantidad */}
          {totalPrendas < 30 && (
            <p className="text-center text-sm text-[#c8b0ba]">
              El botón se habilitará al seleccionar 30 o más prendas.
            </p>
          )}
        </div>
      </form>
    </section>
  )
}