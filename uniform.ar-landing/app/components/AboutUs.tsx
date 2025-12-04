"use client";

export default function AboutUs() {
  return (
    <section
      id="aboutus"
      className="bg-[#2e1f27] text-white py-24 px-6 md:px-16 lg:px-28"
    >
      {/* CONTENEDOR GENERAL */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* BLOQUE DE TITULO + TEXTO */}
        <div>

          {/* TITULO ESTILO TARJETA */}
          <div className="border-2 border-[#745968] p-8 mb-12 relative w-full max-w-[95%]">
            
            {/* Texto */}
            <h2 className="text-5xl font-extrabold tracking-wide text-[#E9D7E9] leading-tight">
              SOBRE <br /> NOSOTROS
            </h2>

            {/* Esquina diagonal / Triángulo */}
            <div
              className="absolute top-0 right-0 w-20 h-20"
              style={{
                background:
                  "linear-gradient(135deg, transparent 50%, #745968 50%)",
              }}
            />
          </div>

          {/* TEXTO PRINCIPAL */}
          <p className="text-white/80 leading-relaxed mb-6 text-lg">
            En Uniformar entendemos que la indumentaria laboral es una herramienta estratégica. 
            No se trata solo de elegir una prenda, sino de construir identidad, transmitir 
            profesionalismo y unificar la presencia de cada equipo.
            <br /><br />
            Nos especializamos en personalizar prendas de calidad con la identidad visual de 
            cada empresa, logrando uniformes cómodos, duraderos y estéticamente coherentes. 
            Adaptamos nuestro trabajo a cualquier industria, siempre cuidando cada detalle.
            <br /><br />
            No solo hacemos ropa: diseñamos presencia.
          </p>

          <p className="text-white/70 leading-relaxed text-lg">
            Acompañamos a nuestros clientes de manera cercana y ágil, entendiendo sus 
            necesidades para crear uniformes que refuercen su marca, generen pertenencia y 
            eleven la imagen de su empresa.
          </p>
        </div>

        {/* IMAGEN */}
        <div className="flex justify-center">
          <img
            src="/aboutus.jpg"
            alt="about-us"
            className="rounded-2xl shadow-lg border border-[#745968]/40 max-h-[560px] object-cover"
          />
        </div>

      </div>
    </section>
  );
}
