"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#2e1f27] text-[#E8DDE2] min-h-screen transition-colors duration-500">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
