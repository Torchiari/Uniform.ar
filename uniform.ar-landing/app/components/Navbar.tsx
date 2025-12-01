"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#745968]/90 py-2 shadow-md" : "bg-[#745968] py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white font-medium">

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2"
          onClick={() => handleSetActive("hero")}
        >
          <Image
            src="/logo-blanco.png"
            alt="Logo"
            width={scrolled ? 100 : 180}
            height={scrolled ? 100 : 180}
          />
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-12 text-lg">
          {[
            { id: "reviews", label: "Reseñas" },
            { id: "contact", label: "Solicitá tu presupuesto" },
            { id: "faq", label: "FAQ" },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
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
        </ul>

        {/* Botones derecha */}
        <div className="flex items-center gap-4">

          {/* Instagram Icon */}
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
          <ul className="absolute top-full left-0 w-full bg-[#2e1f27]/95 flex flex-col items-center py-4 gap-4 md:hidden text-lg font-semibold text-white">
            {[
              { id: "reviews", label: "Reseñas" },
              { id: "contact", label: "Solicitá tu presupuesto" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
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

          </ul>
        )}
      </nav>
    </header>
  );
}
