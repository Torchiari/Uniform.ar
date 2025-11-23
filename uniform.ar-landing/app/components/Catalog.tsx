"use client"

export default function Catalog() {
  const productos = [
    {
      id: 1,
      nombre: "Remeras",
      descripcion: "De tacto suave y acabado premium. Su hilado fino ofrece mayor confort y durabilidad.",
      imagen: "/catalog/5.jpg",
      talles: ["S", "M", "L", "XL", "XXL"],
      colores: ["#000000", "#FFFFFF", "#0D1A3A", "#8DA78A", "#9A9A9A", "#8F735B"],
    },

    {
      id: 2,
      nombre: "Chombas",
      descripcion: "Conocida por su textura con relieve tipo panal que permite una excelente ventilación y comodidad.",
      imagen: "/catalog/4.jpg",
      talles: ["S", "M", "L", "XL", "XXL"],
      colores: ["#000000", "#FFFFFF", "#0D1A3A", "#8DA78A", "#9A9A9A", "#8F735B"],
    },
    {
      id: 3,
      nombre: "Camisas Grafa",
      descripcion: "De tela resistente, ideal para trabajos industriales o de uso intensivo. Ofrece durabilidad, protección gran y confort. Su tejido asegura resistencia al desgaste y buena ventilación.",
      imagen: "/catalog/7.jpg",
      talles: ["S", "M", "L", "XL", "XXL"],
      colores: ["#000000", "#FFFFFF", "#0D1A3A", "#8DA78A", "#9A9A9A", "#8F735B"],
    },
    {
      id: 4,
      nombre: "Bombacha de campo",
      descripcion: "Prenda tradicional y funcional resistente que brinda comodidad, durabilidad y buena caída. Ideal para uso rural o cotidiano al ofrecer resistencia al desgaste y fácil mantenimiento.",
      imagen: "/catalog/8.jpg",
      talles: ["38", "40", "42", "44", "46", "48", "50", "52", "54"],
      colores: ["#000000", "#FFFFFF", "#0D1A3A", "#8DA78A", "#9A9A9A", "#8F735B"],
    },
    {
      id: 5,
      nombre: "Buzo friza",
      descripcion: " De interior afelpado y exterior liso, brinda abrigo medio con textura suave y confortable. Ideal para uso urbano o institucional, combinando calidez y comodidad.",
      imagen: "/catalog/9.jpg",
      talles: ["S", "M", "L", "XL", "XXL"],
      colores: ["#000000", "#FFFFFF", "#0D1A3A", "#8DA78A", "#9A9A9A", "#8F735B"],
    },
  ]

  return (
    <section
      id="catalog"
      className="bg-[#F8F5F0] text-[#3E2E32] dark:bg-[#2e1f27] dark:text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-28 transition-colors duration-500"
    >
      {/* Título */}
      <h2 className="text-4xl font-extrabold text-center mb-14 tracking-tight text-[#6B4A52] dark:text-[#E9D7E9]">
        Nuestro catálogo
      </h2>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
        {productos.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md border border-[#d6c9c2]/50 dark:border-[#745968]/40 w-[300px]"
          >
            {/* Imagen */}
            <div className="h-64 w-full rounded-t-2xl overflow-hidden bg-[#EDE9E6] dark:bg-[#4a3840] flex items-center justify-center">
              <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
            </div>

            {/* Contenido */}
            <div className="p-6 text-center">
              <h3 className="font-semibold text-lg text-[#6B4A52] dark:text-[#E9D7E9] mb-2">
                {p.nombre}
              </h3>

              <p className="text-[#7C6A64] dark:text-[#d8c8d1] text-sm leading-relaxed mb-4">
                {p.descripcion}
              </p>

              {/* Talles */}
              <div className="mb-4">
                <p className="font-medium text-[#6B4A52] dark:text-[#E9D7E9]">
                  Talles disponibles:
                </p>
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                  {p.talles.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm rounded-md bg-[#F1EAE6] dark:bg-[#5a4358] text-[#6B4A52] dark:text-white border border-[#d1c4be]/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colores */}
              <div className="mt-4">
                <p className="text-sm font-semibold text-[#6B4A52] dark:text-[#E9D7E9] mb-2">
                  COLORES:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {p.colores.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 border border-black rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Consultar por otros colores disponibles
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section >
  )
}
