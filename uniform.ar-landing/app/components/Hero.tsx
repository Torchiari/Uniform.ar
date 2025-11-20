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
            href="https://wa.me/541100000000?text=Hola!%20Quisiera%20hacer%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6B4A52] dark:bg-[#745968] text-[#F8F5F0] dark:text-white px-8 py-3 rounded-md text-base sm:text-lg font-semibold shadow-md hover:bg-[#5D3F47] dark:hover:bg-[#5a4358] hover:shadow-lg transition-all duration-300"
          >
            {/* Ícono WhatsApp blanco */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M20.52 3.48A11.8 11.8 0 0 0 12 0C5.37 0 0 5.37 0 12a11.84 11.84 0 0 0 1.62 6L0 24l6.26-1.64A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 21.82a9.76 9.76 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37A9.8 9.8 0 1 1 12 21.82zm5.39-7.47c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.06 2.88 1.2 3.08.15.2 2.08 3.17 5.04 4.45.7.3 1.25.48 1.68.61.7.22 1.33.19 1.83.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.27.17-1.38-.07-.12-.26-.2-.54-.34z" />
            </svg>

            Contactanos por WhatsApp
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
