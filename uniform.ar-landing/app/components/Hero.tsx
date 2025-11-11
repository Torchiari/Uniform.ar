"use client"
import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-[#F8F5F0] text-[#6B4A52] dark:bg-[#2e1f27] dark:text-[#F5EEF7] w-full py-24 md:py-28 mt-16 transition-all duration-500"
    >
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-center justify-between px-8 lg:px-24 gap-20">
        <div className="md:w-[55%] space-y-7 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-extrabold leading-[1.15] tracking-tight font-sans">
            Indumentaria de trabajo y uniformes
          </h1>

          <p className="text-[#6B4A52]/80 dark:text-[#E9D7E9] text-base sm:text-lg lg:text-[1.15rem] font-normal leading-relaxed max-w-md mx-auto md:mx-0">
            Somos fabricantes de indumentaria laboral de calidad y distribuidores de una amplia línea de calzados de seguridad. 
            Ofrecemos atención personalizada y servicio integral a empresas y distribuidores de todo el país.
          </p>

          <a
            href="#catalog"
            className="inline-block bg-[#6B4A52] dark:bg-[#745968] text-[#F8F5F0] dark:text-white px-8 py-3 rounded-md text-base sm:text-lg font-semibold shadow-md hover:bg-[#5D3F47] dark:hover:bg-[#5a4358] hover:shadow-lg transition-all duration-300"
          >
            Solicitar presupuesto
          </a>
        </div>

        <div className="hidden md:flex md:w-[45%] justify-center">
          <div className="relative w-[440px] h-[440px]">
            {/* Imagen modo claro */}
            <Image
              src="/hero-image.png"
              alt="Indumentaria personalizada"
              fill
              className="object-cover rounded-xl shadow-2xl border border-[#6B4A52]/30 dark:hidden"
            />
            {/* Imagen modo oscuro */}
            <Image
              src="/hero-black.png"
              alt="Indumentaria personalizada (oscuro)"
              fill
              className="object-cover rounded-xl shadow-2xl border border-[#745968]/40 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
