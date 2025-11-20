"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const handleSetActive = (section: string) => {
    setActive(section);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#efeef1]/95 dark:bg-[#745968]/90 py-2 shadow-md"
          : "bg-[#efeef1] dark:bg-[#745968] py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[#6B4A52] dark:text-white font-medium transition-colors duration-500">

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2"
          onClick={() => handleSetActive("hero")}
        >
          <Image
            src="/navbarblanco.png"
            alt="Logo claro"
            width={scrolled ? 100 : 180}
            height={scrolled ? 100 : 180}
            className="dark:hidden"
          />
          <Image
            src="/footer.png"
            alt="Logo oscuro"
            width={scrolled ? 100 : 180}
            height={scrolled ? 100 : 180}
            className="hidden dark:block"
          />
        </a>

        {/* Links desktop (AQUÍ AGREGO Reseñas y FAQ's) */}
        <ul className="hidden md:flex items-center gap-12 text-lg">
          {[
            { id: "catalog", label: "Catálogo" },
            { id: "reviews", label: "Reseñas" },
            { id: "contact", label: "Contacto" },
            { id: "faq", label: "FAQ" },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => handleSetActive(item.id)}
                className={`relative transition-all duration-300 hover:text-[#4A2E35]/80 dark:hover:text-white/80 ${
                  active === item.id
                    ? "text-[#6B4A52] dark:text-white font-semibold after:w-full"
                    : "text-[#6B4A52]/90 dark:text-white/70 after:w-0"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#6B4A52] dark:after:bg-white after:transition-all hover:after:w-full`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Dark mode switch */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 cursor-pointer"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl transition-colors duration-500"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu (AQUÍ AGREGO Reseñas y FAQ's) */}
        {open && (
          <ul className="absolute top-full left-0 w-full bg-[#F8F5F0]/95 dark:bg-[#2a0010]/95 flex flex-col items-center py-4 gap-4 md:hidden text-lg font-semibold text-[#6B4A52] dark:text-white transition-colors duration-500">
            {[
              { id: "catalog", label: "Catálogo" },
              { id: "reviews", label: "Reseñas" },
              { id: "contact", label: "Contacto" },
              { id: "faq", label: "FAQ's" },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => handleSetActive(item.id)}
                  className={`relative transition-all duration-300 hover:text-[#4A2E35]/80 dark:hover:text-white/80 ${
                    active === item.id
                      ? "text-[#6B4A52] dark:text-white font-semibold after:w-full"
                      : "text-[#6B4A52]/90 dark:text-white/70 after:w-0"
                  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#6B4A52] dark:after:bg-white after:transition-all`}
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
