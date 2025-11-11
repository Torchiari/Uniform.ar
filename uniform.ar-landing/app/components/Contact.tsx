"use client"

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#F8F5F0] text-[#3E2E32] dark:bg-[#2e1f27] dark:text-[#F5EEF7] py-24 px-6 md:px-16 lg:px-28 transition-colors duration-500"
    >
      {/* Título */}
      <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight text-[#6B4A52] dark:text-[#E9D7E9]">
        Contacto
      </h2>

      {/* Descripción */}
      <p className="text-center text-[#7C6A64] dark:text-[#d8c8d1] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        ¿Tenés dudas o querés pedir un presupuesto?  
        Completá el formulario y te responderemos a la brevedad.
      </p>

      {/* Formulario */}
      <form className="max-w-lg mx-auto bg-white dark:bg-[#3a2a31] rounded-2xl shadow-md border border-[#d6c9c2]/50 dark:border-[#745968]/40 p-8 md:p-10 space-y-5 transition-all duration-500">
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840] text-[#3E2E32] dark:text-[#F5EEF7] placeholder:text-[#a38f86] dark:placeholder:text-[#c8b3bd] focus:outline-none focus:border-[#6B4A52] dark:focus:border-[#745968] transition"
        />
        <input
          type="email"
          placeholder="Tu correo"
          className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840] text-[#3E2E32] dark:text-[#F5EEF7] placeholder:text-[#a38f86] dark:placeholder:text-[#c8b3bd] focus:outline-none focus:border-[#6B4A52] dark:focus:border-[#745968] transition"
        />
        <textarea
          placeholder="Tu mensaje"
          rows={4}
          className="w-full p-3 rounded-md border border-[#e0d5cf] dark:border-[#745968]/40 bg-[#F9F6F3] dark:bg-[#4a3840] text-[#3E2E32] dark:text-[#F5EEF7] placeholder:text-[#a38f86] dark:placeholder:text-[#c8b3bd] focus:outline-none focus:border-[#6B4A52] dark:focus:border-[#745968] transition"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#6B4A52] dark:bg-[#745968] text-white py-3 rounded-md font-semibold hover:bg-[#5a3f46] dark:hover:bg-[#5a4358] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}
