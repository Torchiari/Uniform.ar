"use client"
import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-[#0b1220] text-white w-full py-24 md:py-28 mt-16"
    >
      {/* Contenedor principal centrado */}
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-center justify-between px-8 lg:px-24 gap-20">
        
        {/* Texto principal */}
        <div className="md:w-[55%] space-y-7 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-extrabold leading-[1.15] tracking-tight font-sans">
            Indumentaria de trabajo y uniformes 
            {/* <br className="hidden md:block"/> */}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg lg:text-[1.15rem] font-normal leading-relaxed max-w-md mx-auto md:mx-0">
            Somos fabricantes de indumentaria laboral de calidad y distribuidores de una amplia linea de calzados de seguridad. Ofrecemos atención personalizada y servicio integral a empresas y distribuidores de todo el país.
          </p>

          <a
            href="#catalog"
            className="inline-block bg-[#ff6600] text-white px-8 py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-[#e65c00] transition-all duration-300 shadow-md"
          >
            Solicitar presupuesto
          </a>
        </div>

        {/* Imagen a la derecha */}
        <div className="hidden md:flex md:w-[45%] justify-center">
          <div className="relative w-[440px] h-[440px]">
            <Image
              // src="/hero-image.png"
              alt="Indumentaria personalizada"
              fill
              className="object-cover rounded-xl shadow-2xl border border-[#ff6600]/40"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
