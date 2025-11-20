"use client"
import { useEffect, useRef } from "react"

export default function Reviews() {
  const images = [
    "/img/LOGO-ABERTURAS.png",
    "/img/LOGO-CTIBOR.png",
    "/img/LOGO-DECO.png",
    "/img/LOGO-ELMANA.png",
    "/img/LOGO-GROWING.png",
    "/img/LOGO-MORENO.png",
    "/img/LOGO-SANANTONIO.png",
    "/img/LOGO-TUBOFUSION.png",
    "/img/LOGO-WEBER.png",
  ]

  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (trackRef.current) trackRef.current.offsetWidth
  }, [])

  return (
    <section
      id="reviews"
      className="bg-[#F8F5F0] text-[#3E2E32] dark:bg-[#2e1f27] dark:text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-28 transition-colors duration-500"
    >
      {/* Título */}
      <h2 className="text-4xl font-bold text-center mb-14 tracking-tight text-[#6B4A52] dark:text-[#E9D7E9]">
        Marcas que nos eligieron para vestir su identidad
      </h2>

      {/* Grid de reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            text: "Excelente calidad y servicio. Nuestros empleados están muy conformes con la indumentaria.",
            author: "Moreno Materiales",
          },
          {
            text: "La personalización con nuestro logo quedó perfecta. Muy profesionales.",
            author: "Panificadora Maná",
          },
          {
            text: "Entrega rápida y productos de primera calidad. Los recomendamos.",
            author: "Panadería San Antonio",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md border border-[#d6c9c2]/50 dark:border-[#745968]/40 p-8"
          >
            <div className="flex text-[#E63946] dark:text-[#ff6b81] mb-4 text-xl">
              <span>★★★★★</span>
            </div>
            <p className="text-[#6B4A52]/90 dark:text-[#E9D7E9] leading-relaxed mb-4">
              "{item.text}"
            </p>
            <p className="font-semibold text-[#6B4A52] dark:text-[#E9D7E9]">
              - {item.author}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center mt-14 text-lg text-[#6B4A52] dark:text-[#E9D7E9] font-medium">
        Ellos ya lo hicieron. Vos también podés vestir tu marca
      </p>

      {/* ===== Carrusel ===== */}
      <div className="w-full mt-10">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="track flex items-center"
            style={{ width: "max-content" }}
          >
            {[...images, ...images].map((src, idx) => (
              <div
                key={idx}
                className="logo-wrap flex-shrink-0 flex justify-center items-center px-6"
                style={{ width: "220px" }}
              >
                <img
                  src={src}
                  alt={`logo-${idx}`}
                  className="max-h-20 md:max-h-28 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Cards ===== */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CARD 1 — NUEVO ICONO */}
        <div className="bg-white rounded-2xl p-10 border border-[#e9e6e4] dark:bg-[#3a2a31] dark:border-[#745968]/30">
          <div className="flex justify-center mb-6 text-[#745968] dark:text-white">
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7h13v10H3z" />
              <path d="M16 10h3l2 3v4h-5z" />
              <circle cx="7.5" cy="17" r="1.5" />
              <circle cx="17" cy="17" r="1.5" />
            </svg>
          </div>
          <h4 className="text-center font-semibold text-[#3E2E32] dark:text-[#F5EEF7] mb-2">
            Envíos sin cargo
          </h4>
          <p className="text-center text-sm text-[#7C6A64] dark:text-[#d8c8d1]">
            Enviamos a todo el país sin costo adicional para tu empresa
          </p>
        </div>

        {/* CARD 2 — NUEVO ICONO */}
        <div className="bg-white rounded-2xl p-10 border border-[#e9e6e4] dark:bg-[#3a2a31] dark:border-[#745968]/30">
          <div className="flex justify-center mb-6 text-[#745968] dark:text-white">
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M7 12l-1.5 8L12 17l6.5 3L17 12" />
            </svg>
          </div>
          <h4 className="text-center font-semibold text-[#3E2E32] dark:text-[#F5EEF7] mb-2">
            Personalización incluida
          </h4>
          <p className="text-center text-sm text-[#7C6A64] dark:text-[#d8c8d1]">
            Bordado y estampado de alta calidad con tu logo empresarial
          </p>
        </div>

        {/* CARD 3 — NUEVO ICONO */}
        <div className="bg-white rounded-2xl p-10 border border-[#e9e6e4] dark:bg-[#3a2a31] dark:border-[#745968]/30">
          <div className="flex justify-center mb-6 text-[#745968] dark:text-white">
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l8 4v6c0 6-4 10-8 11-4-1-8-5-8-11V6z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h4 className="text-center font-semibold text-[#3E2E32] dark:text-[#F5EEF7] mb-2">
            Calidad garantizada
          </h4>
          <p className="text-center text-sm text-[#7C6A64] dark:text-[#d8c8d1]">
            Materiales resistentes y duraderos para uso industrial intensivo
          </p>
        </div>
      </div>

      {/* Estilos del carrusel */}
      <style jsx>{`
        .track {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        .track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .track {
            animation-duration: 26s;
          }
          .logo-wrap {
            width: 140px !important;
          }
        }
      `}</style>
    </section>
  )
}
