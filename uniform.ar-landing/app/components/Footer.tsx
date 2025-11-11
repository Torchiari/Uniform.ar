import Image from "next/image"
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1D] text-[#EDE8E3] py-12 px-6 md:px-16 lg:px-28 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Logo y descripción */}
        <div>
          <div className="flex items-center justify-center md:justify-start mb-3">
            <Image
              src="/logo.png"
              alt="Uniform.AR logo"
              width={80}
              height={60}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-[#C8BEB8] leading-relaxed">
            Indumentaria laboral y uniformes de calidad para empresas y distribuidores
            de todo el país. Comprometidos con la excelencia y la comodidad en el trabajo.
          </p>
        </div>

        {/* Datos de contacto */}
        <div>
          <h3 className="text-lg font-semibold text-[#D8CFC8] mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm text-[#C8BEB8]">
            <li>📍 Buenos Aires, Argentina</li>
            <li>📞 +54 9 11 1234-5678</li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-[#9A7383]" />
              contacto@uniformar.com.ar
            </li>
            <li>🕒 Lunes a Viernes de 9:00 a 18:00</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold text-[#D8CFC8] mb-4">Seguinos</h3>
          <div className="flex justify-center md:justify-start gap-6 text-2xl">
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="text-[#EDE8E3] hover:text-[#9A7383] transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/5491112345678"
              target="_blank"
              className="text-[#EDE8E3] hover:text-[#9A7383] transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:contacto@uniformar.com.ar"
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
