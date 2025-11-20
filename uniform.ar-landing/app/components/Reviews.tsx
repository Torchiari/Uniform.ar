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

  // ref para forzar reflow si es necesario (mejora la fluidez en algunos navegadores)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Forzar reflow para asegurar animación consistente
    if (trackRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      trackRef.current.offsetWidth
    }
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

      {/* Grid de reviews (igual que antes) */}
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
            className="bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md border border-[#d6c9c2]/50 dark:border-[#745968]/40 p-8 transition-all duration-300"
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

      {/* Subtítulo inferior */}
      <p className="text-center mt-14 text-lg text-[#6B4A52] dark:text-[#E9D7E9] font-medium">
        Ellos ya lo hicieron. Vos también podés vestir tu marca
      </p>

      {/* ===== Carrusel infinito contínuo (sin marco, "flotando") ===== */}
      <div
        className="w-full mt-10"
        aria-hidden={false}
      >
        {/* contenedor: centrado y sin marco */}
        <div
          className="overflow-hidden"
        // al pasar el mouse, la animación se pausará gracias al CSS más abajo
        >
          {/* track animado: duplicamos la lista de imágenes para lograr loop continuo */}
          <div
            ref={trackRef}
            className="track flex items-center"
            style={{ alignItems: "center" }}
          >
            {/* Renderizamos imágenes dos veces para loop continuo */}
            {[...images, ...images].map((src, idx) => (
              <div
                key={idx}
                className="logo-wrap flex-shrink-0 flex justify-center items-center px-6"
                style={{ width: "220px" }} // ancho fijo para que se vean varias juntas; ajustá si querés
              >
                <img
                  src={src}
                  alt={`logo-${idx}`}
                  className="max-h-20 md:max-h-28 object-contain"
                  style={{ display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Sección de 3 cards - igual a la imagen, añadida abajo del carousel ===== */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="sr-only">Beneficios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-10 border border-[#e9e6e4] dark:bg-[#3a2a31] dark:border-[#745968]/30">
            <div className="flex justify-center mb-6">
              {/* Icono camión en violeta */}
              <div className="p-4 rounded-full text-[#745968] bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  className="w-14 h-14 text-[#745968]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5h11v11H3zM14 8h3l3 3v5h-6zM6.5 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>

              </div>
            </div>
            <h4 className="text-center font-semibold text-[#3E2E32] dark:text-[#F5EEF7] mb-2">Envíos sin cargo</h4>
            <p className="text-center text-sm text-[#7C6A64] dark:text-[#d8c8d1]">
              Enviamos a todo el país sin costo adicional para tu empresa
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-10 border border-[#e9e6e4] dark:bg-[#3a2a31] dark:border-[#745968]/30">
            <div className="flex justify-center mb-6">
              {/* Icono medalla en violeta */}
              <div className="p-4 rounded-full text-[#745968] bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  className="w-14 h-14 text-[#745968]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 12l-2 8 6-3 6 3-2-8" />
                </svg>

              </div>
            </div>
            <h4 className="text-center font-semibold text-[#3E2E32] dark:text-[#F5EEF7] mb-2">Personalización incluida</h4>
            <p className="text-center text-sm text-[#7C6A64] dark:text-[#d8c8d1]">
              Bordado y estampado de alta calidad con tu logo empresarial
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-10 border border-[#e9e6e4] dark:bg-[#3a2a31] dark:border-[#745968]/30">
            <div className="flex justify-center mb-6">
              {/* Icono escudo en violeta */}
              <div className="p-4 rounded-full text-[#745968] bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  className="w-14 h-14 text-[#745968]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 2l7 4v6c0 6-4.2 10-7 11-2.8-1-7-5-7-11V6l7-4z" />
                </svg>

              </div>
            </div>
            <h4 className="text-center font-semibold text-[#3E2E32] dark:text-[#F5EEF7] mb-2">Calidad garantizada</h4>
            <p className="text-center text-sm text-[#7C6A64] dark:text-[#d8c8d1]">
              Materiales resistentes y duraderos para uso industrial intensivo
            </p>
          </div>
        </div>
      </div>

      {/* Scoped styles para la animación y pausa on hover */}
      <style jsx>{`
        .track {
          display: flex;
          /* animación: desplaza al 50% (porque duplicamos el contenido) */
          animation: scroll 40s linear infinite;
        }

        /* pausa al pasar el mouse por todo el contenedor que contiene la pista */
        .track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* estilos para que el contenedor se vea "flotando" (sin borde ni sombra) */
        .logo-wrap img {
          /* pequeño ajuste para que las imágenes se vean mejor */
          filter: none;
        }

        /* Responsivo: reducir ancho del logo-wrap en pantallas pequeñas */
        @media (max-width: 640px) {
          .logo-wrap {
            width: 140px !important;
            padding-left: 12px;
            padding-right: 12px;
          }
          .track {
            animation-duration: 30s;
          }
        }
        @media (min-width: 1024px) {
          .track {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  )
}
