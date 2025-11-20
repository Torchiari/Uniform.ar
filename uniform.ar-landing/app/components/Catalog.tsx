"use client"

export default function Catalog() {
  return (
    <section
      id="catalog"
      className="bg-[#F8F5F0] text-[#3E2E32] dark:bg-[#2e1f27] dark:text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-28 transition-colors duration-500"
    >
      {/* Título */}
      <h2 className="text-4xl font-extrabold text-center mb-14 tracking-tight text-[#6B4A52] dark:text-[#E9D7E9]">
        Nuestro catálogo
      </h2>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#d6c9c2]/50 dark:border-[#745968]/40 hover:-translate-y-1"
          >
            {/* Imagen del producto */}
            <div className="h-52 bg-[#EDE9E6] dark:bg-[#4a3840] rounded-t-2xl flex items-center justify-center transition-colors duration-500">
              <span className="text-[#b1988c] dark:text-[#d6bcc9] font-medium">
                Imagen {item}
              </span>
            </div>

            {/* Info del producto */}
            <div className="p-6 text-center">
              <h3 className="font-semibold text-lg text-[#6B4A52] dark:text-[#E9D7E9] mb-2">
                Producto {item}
              </h3>
              <p className="text-[#7C6A64] dark:text-[#d8c8d1] text-sm leading-relaxed">
                Descripción breve del producto o categoría destacada.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
