"use client"

import { useState } from "react"

export default function PreguntasPage() {
  const faqs = [
    {
      question: "¿Hacen envíos a todo el país?",
      answer: "Sí, realizamos envíos a toda Argentina sin cargo.",
    },
    {
      question: "¿Puedo personalizar la indumentaria con mi logo?",
      answer: "Sí, ofrecemos bordado y estampado de alta calidad.",
    },
    {
      question: "¿En cuánto tiempo recibo mi pedido?",
      answer: "Depende del volumen y la personalización, pero en promedio 10-15 días hábiles.",
    },
    {
      question: "¿Ofrecen descuentos por compras grandes?",
      answer: "Sí, tenemos precios especiales para pedidos por volumen.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="min-h-screen bg-[#F8F5F0] dark:bg-[#2e1f27] text-[#3E2E32] dark:text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-32 transition-colors duration-500">

      {/* Título */}
      <h1 className="text-4xl font-bold text-center mb-14 text-[#6B4A52] dark:text-[#E9D7E9]">
        Preguntas frecuentes
      </h1>

      {/* Contenedor de preguntas */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md border border-[#d6c9c2]/50 dark:border-[#745968]/40 transition-all duration-300"
          >
            {/* Pregunta */}
            <button
              className="w-full flex justify-between items-center px-6 py-6 text-lg font-medium text-left hover:opacity-90"
              onClick={() => toggleFAQ(i)}
            >
              {faq.question}

              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {/* Respuesta */}
            {openIndex === i && (
              <div className="px-6 pb-6 text-[#6B4A52] dark:text-[#E9D7E9] leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
