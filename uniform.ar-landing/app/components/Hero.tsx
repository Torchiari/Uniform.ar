"use client"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden"
    >

      {/* Video de fondo */}
      <video
        src="/video.fondo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover brightness-75"
      />


    
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-6 text-white">

        {/* Título */}
        <h1
          className="text-4xl sm:text-5xl font-extrabold leading-tight text-white"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
        >
          Diseñamos lo que viste a tu equipo, y refleja la identidad de tu empresa.
        </h1>

        <p className="text-lg sm:text-xl font-light max-w-2xl drop-shadow-md">
          Indumentaria personalizada para que tu marca se vea tan profesional como lo que hacés.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">

          {/* WhatsApp */}
          <a
            href="https://wa.me/+5491138005433?text=Hola!%20Quisiera%20hacer%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-[#1EBE5A] hover:shadow-lg transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.8 11.8 0 0 0 12 0C5.37 0 0 5.37 0 12a11.84 11.84 0 0 0 1.62 6L0 24l6.26-1.64A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 21.82a9.76 9.76 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37A9.8 9.8 0 1 1 12 21.82zm5.39-7.47c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.06 2.88 1.2 3.08.15.2 2.08 3.17 5.04 4.45.7.3 1.25.48 1.68.61.7.22 1.33.19 1.83.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.27.17-1.38-.07-.12-.26-.2-.54-.34z" />
            </svg>
            Contactanos por WhatsApp
          </a>

          {/* Botón Catálogo */}
          <a
            href="/Catálogo Uniformar 2025.pdf"
            download
            className="inline-flex items-center gap-2 bg-[#745968] text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-[#624955] hover:shadow-lg transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8 12h8v2H8v-2zm0 4h5v2H8v-2z" />
            </svg>
            Descargar catálogo
          </a>

        </div>
      </div>
    </section>
  )
}
