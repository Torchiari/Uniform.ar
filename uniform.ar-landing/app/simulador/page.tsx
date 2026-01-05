import SimuladorCanvas from "../components/SimuladorCanvas";

export default function SimuladorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#2e1f27]">
      <section className="flex-grow pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#E9D7E9] mb-4">
              Diseñador Interactivo
            </h1>
            <p className="text-[#F5EEF7] text-lg max-w-2xl mx-auto">
              Probá cómo quedaría el logo de tu empresa en nuestros uniformes. 
              Elegí el modelo, subí tu imagen y envianos el diseño.
            </p>
          </div>

          <SimuladorCanvas />
          
        </div>
      </section>
    </main>
  );
}