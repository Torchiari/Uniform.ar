import Hero from "./components/Hero"
import AboutUs from "./components/AboutUs"
// import Catalog from "./components/Catalog"
import Reviews from "./components/Reviews"
import Contact from "./components/Contact"
import Faq from "./components/Faq"

export default function HomePage() {
  return (
    <main className="pt-20">
    
      <Hero />
      <AboutUs />
      {/* <Catalog /> */}
      <Reviews />
      <Contact />
      <Faq />
    </main>
  )
}
