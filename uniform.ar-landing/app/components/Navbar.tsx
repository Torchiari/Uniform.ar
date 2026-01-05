"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSetActive = (section: string) => {
    setActive(section);
    setOpen(false);
  };

  const linksNavegacion = [
    { id: "aboutus", label: "Sobre Nosotros" },
    { id: "reviews", label: "Reseñas" },
    { id: "contact", label: "Solicitá tu presupuesto" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#745968]/90 py-2 shadow-md" : "bg-[#745968] py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white font-medium">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => handleSetActive("hero")}
        >
          <Image
            src="/logo-blanco.png"
            alt="Logo"
            width={scrolled ? 100 : 180}
            height={scrolled ? 100 : 180}
            className="transition-all duration-300"
          />
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8 text-lg">
          
          {linksNavegacion.map((item) => (
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                onClick={() => handleSetActive(item.id)}
                className={`relative transition-all duration-300 hover:text-white/80 ${
                  active === item.id
                    ? "text-white font-semibold after:w-full"
                    : "text-white/70 after:w-0"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all hover:after:w-full`}
              >
                {item.label}
              </a>
            </li>
          ))}

          <li>
            <Link 
              href="/simulador"
              className="bg-[#E9D7E9] text-[#745968] px-4 py-2 rounded-full font-bold hover:bg-white transition-colors shadow-sm"
            >
              Simulá tu prenda
            </Link>
          </li>

        </ul>

        {/* Botones derecha (Instagram y Menú Móvil) */}
        <div className="flex items-center gap-4">

          <a
            href="https://www.instagram.com/uniform.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Instagram size={28} strokeWidth={1.75} />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <ul className="absolute top-full left-0 w-full bg-[#2e1f27]/95 flex flex-col items-center py-6 gap-6 md:hidden text-lg font-semibold text-white shadow-xl border-t border-white/10">
            
            {linksNavegacion.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={() => handleSetActive(item.id)}
                  className={`relative transition-all duration-300 hover:text-white/80 ${
                    active === item.id
                      ? "text-white font-semibold after:w-full"
                      : "text-white/70 after:w-0"
                  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all`}
                >
                  {item.label}
                </a>
              </li>
            ))}

             {/* Link Especial Simulador Móvil */}
            <li>
                <Link 
                  href="/simulador"
                  onClick={() => setOpen(false)}
                  className="bg-[#E9D7E9] text-[#745968] px-6 py-2 rounded-full font-bold"
                >
                 Simulá tu prenda
                </Link>
            </li>

          </ul>
        )}
      </nav>
    </header>
  );
}