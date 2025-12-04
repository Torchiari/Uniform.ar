import Image from "next/image"
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1D] text-[#EDE8E3] py-12 px-6 md:px-16 lg:px-28 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

        {/* Logo y descripción */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-3">
            <Image
              src="/logo.png"
              alt="Uniform.AR logo"
              width={80}
              height={60}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-[#C8BEB8] leading-relaxed text-center">
            Indumentaria laboral y uniformes de calidad para empresas
            de todo el país. Comprometidos con la excelencia y la comodidad en el trabajo.
          </p>
        </div>

        {/* Datos de contacto */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#D8CFC8] mb-4 text-center">Contacto</h3>
          <ul className="space-y-2 text-sm text-[#C8BEB8] text-center">
            <li>📍 Buenos Aires, Argentina</li>
            <li>📞 +54 9 11 3800-5433</li>
            <li className="flex items-center justify-center gap-2">
              <FaEnvelope className="text-[#9A7383]" />
              uniformarindumentaria@gmail.com
            </li>
            <li>🕒 Lunes a Viernes de 9:00 a 18:00</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#D8CFC8] mb-4 text-center">Seguinos</h3>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="https://www.instagram.com/uniform.ar/"
              target="_blank"
              className="text-[#EDE8E3] hover:text-[#9A7383] transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/+5491138005433"
              target="_blank"
              className="text-[#EDE8E3] hover:text-[#9A7383] transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:uniformarindumentaria@gmail.com"
              className="text-[#EDE8E3] hover:text-[#9A7383] transition-colors"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-[#3A2F34] mt-10 pt-6 text-center text-sm text-[#AFA6A1]">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#C8BEB8]">UNIFORM·AR</span>. Todos los derechos reservados.
      </div>
    </footer>
  )
}
