"use client";

import { useEffect, useRef, useState } from "react";

// --- URL DE LA API ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// --- ESTRUCTURA DE DATOS ---
const COLORES = [
  { nombre: "Blanco", hex: "#FFFFFF", id: "blanco" },
  { nombre: "Negro", hex: "#000000", id: "negro" },
  { nombre: "Azul", hex: "#0D1A3A", id: "azul" },
  { nombre: "Verde", hex: "#8DA78A", id: "verde" },
  { nombre: "Gris", hex: "#9A9A9A", id: "gris" },
  { nombre: "Marrón", hex: "#8F735B", id: "marron" },
];

const TIPOS_PRENDA = [
  { id: "remera", nombre: "Remera" },
  { id: "chomba", nombre: "Chomba" },
  { id: "buzo", nombre: "Buzo" },
  { id: "camisa", nombre: "Camisa de grafa" },
];

const COLORES_TEXTO = [
    { nombre: "Negro", hex: "#000000", id: "negro" },
    { nombre: "Blanco", hex: "#FFFFFF", id: "blanco" },
];

const getPrendaSrc = (tipoId: string, colorId: string) => {
  return `/img/mockups/${tipoId}_${colorId}.png`;
};

// --- COMPONENTE PRINCIPAL ---
export default function SimuladorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [tipoSeleccionado, setTipoSeleccionado] = useState(TIPOS_PRENDA[0].id);
  const [colorSeleccionado, setColorSeleccionado] = useState(COLORES[0].id);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoConfig, setLogoConfig] = useState({ x: 180, y: 150, width: 0, height: 0 });
  const [textoValue, setTextoValue] = useState("");
  const [textoColor, setTextoColor] = useState(COLORES_TEXTO[0]); 
  const [textoConfig, setTextoConfig] = useState({ x: 250, y: 300, fontSize: 30 });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clientData, setClientData] = useState({ name: "", contact: "", message: "" });
  
  // --- LÓGICA DE DIBUJO ---
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseImg = new Image();
    baseImg.src = getPrendaSrc(tipoSeleccionado, colorSeleccionado);
    
    baseImg.onload = () => {
      ctx.drawImage(baseImg, 0, 0, 500, 500);

      if (logoSrc) {
        const logoImg = new Image();
        logoImg.src = logoSrc;
        logoImg.onload = () => {
            ctx.drawImage(logoImg, logoConfig.x, logoConfig.y, logoConfig.width, logoConfig.height);
            drawText(ctx);
        };
      } else {
          drawText(ctx);
      }
    };

    baseImg.onerror = () => {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#333";
        ctx.font = "20px Arial";
        ctx.fillText("Imagen no disponible", 150, 250);
    };
  };

  const drawText = (ctx: CanvasRenderingContext2D) => {
      if (!textoValue.trim()) return;

      ctx.font = `bold ${textoConfig.fontSize}px Arial, sans-serif`;
      ctx.fillStyle = textoColor.hex;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle"; 
      ctx.shadowColor = textoColor.id === 'blanco' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = 4;
      ctx.fillText(textoValue, textoConfig.x, textoConfig.y);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
  }

  useEffect(() => {
    draw();
  }, [tipoSeleccionado, colorSeleccionado, logoSrc, logoConfig, textoValue, textoConfig, textoColor]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
          const maxInitialSize = 150;
          let newWidth = img.naturalWidth;
          let newHeight = img.naturalHeight;

          if (newWidth > maxInitialSize || newHeight > maxInitialSize) {
              const ratio = newWidth / newHeight;
              if (newWidth > newHeight) {
                  newWidth = maxInitialSize;
                  newHeight = maxInitialSize / ratio;
              } else {
                  newHeight = maxInitialSize;
                  newWidth = maxInitialSize * ratio;
              }
          }
          const initialX = (500 - newWidth) / 2;
          const initialY = 200;

          setLogoConfig({ x: initialX, y: initialY, width: newWidth, height: newHeight });
          setLogoSrc(src);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenModal = () => setShowModal(true);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const canvas = canvasRef.current;
    draw();

    setTimeout(async () => {
        if (!canvas) return;
        const base64 = canvas.toDataURL("image/png");

        try {
          const res = await fetch(`${API_URL}/designs/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                image: base64,
                clientName: clientData.name,
                clientContact: clientData.contact,
                clientMessage: clientData.message
            }),
          });
          const data = await res.json();
          
          if (res.ok) {
              alert("¡Diseño enviado con éxito! Nos pondremos en contacto pronto.");
              setShowModal(false);
              setClientData({ name: "", contact: "", message: "" });
          } else {
              alert("Hubo un error al enviar: " + data.message);
          }
        } catch (error) {
          console.error(error);
          alert("Error de conexión con el servidor.");
        } finally {
          setLoading(false);
        }
    }, 100);
  };

  const moveLogo = (dx: number, dy: number) => {
    setLogoConfig(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };
  const resizeLogo = (factor: number) => {
    setLogoConfig(prev => ({
      ...prev,
      width: Math.max(20, prev.width * factor),
      height: Math.max(20, prev.height * factor)
    }));
  };
   const moveText = (dx: number, dy: number) => {
    setTextoConfig(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };
  const resizeTextLabel = (factor: number) => {
    setTextoConfig(prev => ({
      ...prev,
      fontSize: Math.max(10, prev.fontSize * factor),
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start justify-center mt-24 mb-10 lg:my-10 relative px-4 lg:px-0">
      
      {/* Área del Canvas */}
      <div className="bg-white p-2 md:p-4 shadow-xl rounded-xl border border-gray-200 sticky top-20 lg:top-10 z-10 w-full max-w-[500px]">
        <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            className="border bg-gray-50 rounded-lg w-full h-auto block"
        />
        <p className="text-center text-xs text-gray-400 mt-2 lg:hidden">
            La imagen final tendrá alta calidad
        </p>
      </div>

      {/* Controles */}
      <div className="flex flex-col gap-6 w-full max-w-[500px] lg:max-w-md bg-[#3a2a31] p-6 lg:p-8 rounded-xl text-[#F5EEF7] shadow-2xl z-0">
        <h3 className="text-2xl lg:text-3xl font-bold text-[#E9D7E9] mb-2 lg:mb-4 text-center lg:text-left">
            Personalizá tu Uniforme
        </h3>

        {/* 1. Selección de Tipo de Prenda */}
        <div className="bg-[#4a3840]/50 p-3 lg:p-4 rounded-lg border border-[#745968]/50">
          <label className="block mb-3 font-medium text-base lg:text-lg">1. ¿Qué prenda buscás?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-[#4a3840] p-1 rounded-lg">
            {TIPOS_PRENDA.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() => setTipoSeleccionado(tipo.id)}
                className={`py-2 px-1 text-xs md:text-sm font-semibold rounded-md transition-all ${
                  tipoSeleccionado === tipo.id
                    ? "bg-[#E9D7E9] text-[#3a2a31] shadow-sm"
                    : "text-[#F5EEF7]/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tipo.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Selección de Color */}
        <div className="bg-[#4a3840]/50 p-3 lg:p-4 rounded-lg border border-[#745968]/50">
            <label className="block mb-3 font-medium text-base lg:text-lg">
                2. Elegí el color
            </label>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {COLORES.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => setColorSeleccionado(color.id)}
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                            colorSeleccionado === color.id
                                ? "border-[#E9D7E9] scale-110 shadow-[0_0_10px_rgba(233,215,233,0.5)]"
                                : "border-transparent hover:scale-105 hover:border-white/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.nombre}
                    >
                        {colorSeleccionado === color.id && (
                            <span className={`flex items-center justify-center h-full w-full text-lg ${
                                color.id === 'blanco' || color.id === 'gris' ? 'text-black/50' : 'text-white/80'
                            }`}>✓</span>
                        )}
                    </button>
                ))}
            </div>
            <p className="mt-2 text-sm text-[#E9D7E9] text-center md:text-left">
                Color: <span className="font-bold">{COLORES.find(c => c.id === colorSeleccionado)?.nombre}</span>
            </p>
        </div>

        {/* 3. Subida de Logo */}
        <div className="bg-[#4a3840]/50 p-3 lg:p-4 rounded-lg border border-[#745968]/50">
            <label className="block mb-1 font-medium text-base lg:text-lg">3. Subí tu Logo</label>
            <p className="text-xs text-[#E9D7E9]/70 mb-3">
                Formato <strong>.PNG sin fondo</strong> recomendado.
            </p>
            <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
                className="w-full text-xs lg:text-sm text-gray-300 file:mr-2 lg:file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#745968] file:text-white hover:file:bg-[#8a6b7d] cursor-pointer"
            />

            {/* Controles de Logo */}
            {logoSrc && (
                <div className="mt-4 bg-[#4a3840] p-2 lg:p-3 rounded-lg">
                    <label className="block mb-2 font-medium text-xs lg:text-sm text-gray-300 text-center">Ajustar Logo</label>
                    <div className="flex justify-between items-center gap-1 lg:gap-2">
                        <button onClick={() => resizeLogo(0.9)} className="control-btn" title="Achicar"> − </button>
                        {/* D-PAD para mover */}
                        <div className="grid grid-cols-3 gap-1">
                            <div></div>
                            <button onClick={() => moveLogo(0, -10)} className="control-btn-arrow">↑</button>
                            <div></div>
                            <button onClick={() => moveLogo(-10, 0)} className="control-btn-arrow">←</button>
                            <div className="w-8 h-8 flex items-center justify-center text-[#E9D7E9] text-xs">Mover</div>
                            <button onClick={() => moveLogo(10, 0)} className="control-btn-arrow">→</button>
                            <div></div>
                            <button onClick={() => moveLogo(0, 10)} className="control-btn-arrow">↓</button>
                            <div></div>
                        </div>
                        <button onClick={() => resizeLogo(1.1)} className="control-btn" title="Agrandar"> + </button>
                    </div>
                </div>
            )}
        </div>

        {/* 4. Agregar Texto */}
        <div className="bg-[#4a3840]/50 p-3 lg:p-4 rounded-lg border border-[#745968]/50">
            <label className="block mb-3 font-medium text-base lg:text-lg">4. Agregar Texto (Opcional)</label>
            
            <input 
                type="text"
                value={textoValue}
                onChange={(e) => setTextoValue(e.target.value)}
                placeholder="Escribí algo aquí..."
                className="w-full p-2 mb-3 rounded bg-[#4a3840] border border-[#745968] text-[#F5EEF7] placeholder-gray-500 focus:outline-none focus:border-[#E9D7E9]"
            />

            <div className="mb-3 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                <span className="text-sm">Color del texto:</span>
                <div className="flex gap-2 bg-[#4a3840] p-1 rounded overflow-x-auto max-w-full">
                {COLORES_TEXTO.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => setTextoColor(color)}
                        className={`w-8 h-8 rounded shrink-0 transition-all flex items-center justify-center border ${
                            textoColor.id === color.id
                                ? "border-[#E9D7E9] shadow-sm"
                                : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                    >
                        {textoColor.id === color.id && (
                           <span className={`text-sm ${color.id === 'blanco' ? 'text-black' : 'text-white'}`}>A</span>
                        )}
                    </button>
                ))}
                </div>
            </div>

             {/* Controles de Texto */}
             {textoValue.trim() && (
                <div className="mt-4 bg-[#4a3840] p-2 lg:p-3 rounded-lg">
                    <label className="block mb-2 font-medium text-xs lg:text-sm text-gray-300 text-center">Ajustar Texto</label>
                    <div className="flex justify-between items-center gap-1 lg:gap-2">
                        <button onClick={() => resizeTextLabel(0.9)} className="control-btn" title="Achicar"> <span className="text-xs">A</span>− </button>
                        <div className="grid grid-cols-3 gap-1">
                            <div></div>
                            <button onClick={() => moveText(0, -10)} className="control-btn-arrow">↑</button>
                            <div></div>
                            <button onClick={() => moveText(-10, 0)} className="control-btn-arrow">←</button>
                            <div className="w-8 h-8 flex items-center justify-center text-[#E9D7E9] text-xs">Txt</div>
                            <button onClick={() => moveText(10, 0)} className="control-btn-arrow">→</button>
                            <div></div>
                            <button onClick={() => moveText(0, 10)} className="control-btn-arrow">↓</button>
                            <div></div>
                        </div>
                        <button onClick={() => resizeTextLabel(1.1)} className="control-btn" title="Agrandar"> <span className="text-lg">A</span>+ </button>
                    </div>
                </div>
            )}
        </div>

        <hr className="border-[#745968] my-2" />

        {/* Botón Principal */}
        <button
          onClick={handleOpenModal}
          disabled={loading || (!logoSrc && !textoValue.trim())}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-md 
            ${loading || (!logoSrc && !textoValue.trim())
                ? "bg-[#4a3840] text-white/50 cursor-not-allowed"
                : "bg-[#E9D7E9] text-[#2e1f27] hover:bg-white hover:scale-[1.02] shadow-[#E9D7E9]/30"
            }`}
        >
          {(!logoSrc && !textoValue.trim()) ? "Añadí algo para finalizar" : "Solicitar Presupuesto"}
        </button>
      </div>

      {/* --- MODAL DE DATOS DE CONTACTO --- */}
      {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 backdrop-blur-sm overflow-y-auto">
              <div className="bg-[#3a2a31] p-6 sm:p-8 rounded-t-2xl sm:rounded-xl w-full max-w-md border-t sm:border border-[#E9D7E9]/30 shadow-2xl animate-slide-up sm:animate-none">
                  <h3 className="text-2xl font-bold text-[#E9D7E9] mb-2">¡Ya casi estamos!</h3>
                  <p className="text-gray-300 mb-6 text-sm">Déjanos tus datos para enviarte el presupuesto.</p>
                  
                  <form onSubmit={submitForm} className="flex flex-col gap-4">
                      <div>
                          <label className="text-white text-sm font-semibold">Nombre y Apellido</label>
                          <input required type="text" className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none" 
                                 value={clientData.name} onChange={e => setClientData({...clientData, name: e.target.value})} placeholder="Tu nombre" />
                      </div>
                      <div>
                          <label className="text-white text-sm font-semibold">WhatsApp o Email</label>
                          <input required type="text" className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none" 
                                 value={clientData.contact} onChange={e => setClientData({...clientData, contact: e.target.value})} placeholder="Ej: 11 1234 5678" />
                      </div>
                      <div>
                          <label className="text-white text-sm font-semibold">Mensaje Adicional</label>
                          <textarea className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none h-20 resize-none" 
                                 value={clientData.message} onChange={e => setClientData({...clientData, message: e.target.value})} placeholder="Ej: Necesito 20 unidades..." />
                      </div>

                      <div className="flex gap-3 mt-4 mb-4 sm:mb-0">
                          <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-transparent border border-[#E9D7E9] text-[#E9D7E9] rounded-lg hover:bg-[#E9D7E9]/10">Cancelar</button>
                          <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#E9D7E9] text-[#3a2a31] font-bold rounded-lg hover:bg-white transition-colors">
                              {loading ? "Enviando..." : "Enviar"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Estilos utilitarios */}
      <style jsx>{`
        .control-btn {
            @apply bg-[#745968] hover:bg-[#8a6b7d] w-12 h-12 rounded-lg transition-colors font-bold text-xl flex items-center justify-center pb-1 shadow-sm active:scale-95 touch-manipulation;
        }
        .control-btn-arrow {
             @apply bg-[#745968] hover:bg-[#8a6b7d] w-10 h-10 lg:w-8 lg:h-8 rounded transition-colors font-bold flex items-center justify-center shadow-sm active:scale-95 touch-manipulation;
        }
      `}</style>
    </div>
  );
}