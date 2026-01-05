"use client";

import { useEffect, useRef, useState } from "react";

// --- URL DE LA API (Detecta si es local o producción) ---
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
  { id: "camisa", nombre: "Camisa grafa" },
];

// Opciones de color para el texto
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
  
  // Estados para la selección actual de prenda
  const [tipoSeleccionado, setTipoSeleccionado] = useState(TIPOS_PRENDA[0].id);
  const [colorSeleccionado, setColorSeleccionado] = useState(COLORES[0].id);

  // ESTADOS DEL LOGO
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoConfig, setLogoConfig] = useState({ x: 180, y: 150, width: 0, height: 0 });

  // ESTADOS DEL TEXTO
  const [textoValue, setTextoValue] = useState("");
  const [textoColor, setTextoColor] = useState(COLORES_TEXTO[0]); // Por defecto negro
  const [textoConfig, setTextoConfig] = useState({ x: 250, y: 300, fontSize: 30 });

  // ESTADOS DE UI Y FORMULARIO
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Controla el modal
  const [clientData, setClientData] = useState({ name: "", contact: "", message: "" });
  
  // Función principal de dibujo
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Dibujar Prenda Base
    const baseImg = new Image();
    baseImg.src = getPrendaSrc(tipoSeleccionado, colorSeleccionado);
    
    baseImg.onload = () => {
      ctx.drawImage(baseImg, 0, 0, 500, 500);

      // 2. Dibujar Logo (si existe)
      if (logoSrc) {
        const logoImg = new Image();
        logoImg.src = logoSrc;
        logoImg.onload = () => {
            // Usamos las dimensiones del estado que ya mantienen la proporción
            ctx.drawImage(logoImg, logoConfig.x, logoConfig.y, logoConfig.width, logoConfig.height);
            
            // 3. Dibujar Texto (si existe) - Se dibuja DESPUÉS del logo para que quede arriba si se superponen
            drawText(ctx);
        };
      } else {
          // Si no hay logo, dibujamos el texto directamente después de la prenda
          drawText(ctx);
      }
    };

    baseImg.onerror = () => {
        console.error(`No se encontró la imagen: ${baseImg.src}`);
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#333";
        ctx.font = "20px Arial";
        ctx.fillText("Imagen de prenda no disponible", 150, 250);
    };
  };

  // Función auxiliar para dibujar el texto
  const drawText = (ctx: CanvasRenderingContext2D) => {
      if (!textoValue.trim()) return;

      ctx.font = `bold ${textoConfig.fontSize}px Arial, sans-serif`;
      ctx.fillStyle = textoColor.hex;
      ctx.textAlign = "center"; // Centramos el texto en su punto X
      ctx.textBaseline = "middle"; 
      
      // Sombra suave para que se lea mejor sobre cualquier fondo
      ctx.shadowColor = textoColor.id === 'blanco' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = 4;
      ctx.fillText(textoValue, textoConfig.x, textoConfig.y);
      
      // Resetear sombra para lo siguiente que se dibuje
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
  }

  // Efecto para redibujar cuando cambia cualquier estado relevante
  useEffect(() => {
    draw();
  }, [tipoSeleccionado, colorSeleccionado, logoSrc, logoConfig, textoValue, textoConfig, textoColor]);

  // Manejo de subida de logo para mantener relación de aspecto
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      
      // Pre-cargamos la imagen para calcular sus dimensiones naturales
      const img = new Image();
      img.onload = () => {
          // Definimos un tamaño máximo inicial
          const maxInitialSize = 150;
          let newWidth = img.naturalWidth;
          let newHeight = img.naturalHeight;

          // Lógica para escalar manteniendo proporción
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

          // Centramos inicialmente
          const initialX = (500 - newWidth) / 2;
          const initialY = 200;

          setLogoConfig({ x: initialX, y: initialY, width: newWidth, height: newHeight });
          setLogoSrc(src);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // --- NUEVA LÓGICA DE ENVÍO CON MODAL ---
  
  // 1. Abrir modal
  const handleOpenModal = () => {
      setShowModal(true);
  };

  // 2. Enviar datos reales al backend
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const canvas = canvasRef.current;
    
    // Aseguramos renderizado final antes de enviar
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
              setShowModal(false); // Cerrar modal
              setClientData({ name: "", contact: "", message: "" }); // Limpiar form
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


  // --- FUNCIONES DE CONTROL (LOGO) ---
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

   // --- FUNCIONES DE CONTROL (TEXTO) ---
   const moveText = (dx: number, dy: number) => {
    setTextoConfig(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const resizeTextLabel = (factor: number) => {
    setTextoConfig(prev => ({
      ...prev,
      fontSize: Math.max(10, prev.fontSize * factor), // Mínimo 10px de fuente
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start justify-center my-10 relative">
      
      {/* Área del Canvas */}
      <div className="bg-white p-4 shadow-xl rounded-xl border border-gray-200 sticky top-10">
        <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            className="border bg-gray-50 rounded-lg max-w-full h-auto transition-all duration-300"
        />
      </div>

      {/* Controles (DISEÑO ANTIGUO) */}
      <div className="flex flex-col gap-6 w-full max-w-md bg-[#3a2a31] p-8 rounded-xl text-[#F5EEF7] shadow-2xl">
        <h3 className="text-3xl font-bold text-[#E9D7E9] mb-4">Personalizá tu Uniforme</h3>

        {/* 1. Selección de Tipo de Prenda */}
        <div className="bg-[#4a3840]/50 p-4 rounded-lg border border-[#745968]/50">
          <label className="block mb-3 font-medium text-lg">1. ¿Qué prenda buscás?</label>
          <div className="flex bg-[#4a3840] p-1 rounded-lg">
            {TIPOS_PRENDA.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() => setTipoSeleccionado(tipo.id)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
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
        <div className="bg-[#4a3840]/50 p-4 rounded-lg border border-[#745968]/50">
            <label className="block mb-3 font-medium text-lg">
                2. Elegí el color <span className="text-sm font-normal text-[#E9D7E9]/80">(CONSULTÁ POR OTROS DISPONIBLES)</span>:
            </label>
            <div className="flex flex-wrap gap-3">
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
            <p className="mt-2 text-sm text-[#E9D7E9]">Color seleccionado: <span className="font-bold">{COLORES.find(c => c.id === colorSeleccionado)?.nombre}</span></p>
        </div>

        {/* 3. Subida de Logo */}
        <div className="bg-[#4a3840]/50 p-4 rounded-lg border border-[#745968]/50">
            <label className="block mb-1 font-medium text-lg">3. Subí tu Logo</label>
            <p className="text-xs text-[#E9D7E9]/70 mb-3">
                Recomendamos subir archivos en formato <strong>.PNG y sin fondo</strong> para un mejor resultado.
            </p>
            <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#745968] file:text-white hover:file:bg-[#8a6b7d] cursor-pointer"
            />

            {/* Controles de Logo */}
            {logoSrc && (
                <div className="mt-4 bg-[#4a3840] p-3 rounded-lg">
                    <label className="block mb-2 font-medium text-sm text-gray-300 text-center">Mover y ajustar tamaño del logo</label>
                    <div className="flex justify-between items-center gap-2">
                        <button onClick={() => resizeLogo(0.9)} className="control-btn" title="Achicar"> − </button>
                        <div className="grid grid-cols-3 gap-1">
                            <div></div>
                            <button onClick={() => moveLogo(0, -10)} className="control-btn-arrow">↑</button>
                            <div></div>
                            <button onClick={() => moveLogo(-10, 0)} className="control-btn-arrow">←</button>
                            <div className="w-8 h-8 flex items-center justify-center text-[#E9D7E9]">Logo</div>
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
        <div className="bg-[#4a3840]/50 p-4 rounded-lg border border-[#745968]/50">
            <label className="block mb-3 font-medium text-lg">4. Agregar Texto (Opcional)</label>
            
            <input 
                type="text"
                value={textoValue}
                onChange={(e) => setTextoValue(e.target.value)}
                placeholder="Escribí algo aquí..."
                className="w-full p-2 mb-3 rounded bg-[#4a3840] border border-[#745968] text-[#F5EEF7] placeholder-gray-500 focus:outline-none focus:border-[#E9D7E9]"
            />

            <div className="mb-3 flex items-center gap-3">
                <span className="text-sm">Color del texto:</span>
                <div className="flex gap-2 bg-[#4a3840] p-1 rounded">
                {COLORES_TEXTO.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => setTextoColor(color)}
                        className={`w-8 h-8 rounded transition-all flex items-center justify-center border ${
                            textoColor.id === color.id
                                ? "border-[#E9D7E9] shadow-sm"
                                : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.nombre}
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
                <div className="mt-4 bg-[#4a3840] p-3 rounded-lg">
                    <label className="block mb-2 font-medium text-sm text-gray-300 text-center">Mover y ajustar tamaño del texto</label>
                    <div className="flex justify-between items-center gap-2">
                        <button onClick={() => resizeTextLabel(0.9)} className="control-btn" title="Achicar letra"> <span className="text-xs">A</span>− </button>
                        <div className="grid grid-cols-3 gap-1">
                            <div></div>
                            <button onClick={() => moveText(0, -10)} className="control-btn-arrow">↑</button>
                            <div></div>
                            <button onClick={() => moveText(-10, 0)} className="control-btn-arrow">←</button>
                            <div className="w-8 h-8 flex items-center justify-center text-[#E9D7E9] text-sm">Txt</div>
                            <button onClick={() => moveText(10, 0)} className="control-btn-arrow">→</button>
                            <div></div>
                            <button onClick={() => moveText(0, 10)} className="control-btn-arrow">↓</button>
                            <div></div>
                        </div>
                        <button onClick={() => resizeTextLabel(1.1)} className="control-btn" title="Agrandar letra"> <span className="text-lg">A</span>+ </button>
                    </div>
                </div>
            )}
        </div>

        <hr className="border-[#745968] my-2" />

        {/* Botón Principal (Ahora abre el modal) */}
        <button
          onClick={handleOpenModal}
          disabled={loading || (!logoSrc && !textoValue.trim())}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-md 
            ${loading || (!logoSrc && !textoValue.trim())
                ? "bg-[#4a3840] text-white/50 cursor-not-allowed"
                : "bg-[#E9D7E9] text-[#2e1f27] hover:bg-white hover:scale-[1.02] shadow-[#E9D7E9]/30"
            }`}
        >
          {(!logoSrc && !textoValue.trim()) ? "Añadí un logo o texto para finalizar" : "Finalizar y Solicitar Presupuesto"}
        </button>
      </div>

      {/* --- MODAL DE DATOS DE CONTACTO (AGREGADO) --- */}
      {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-[#3a2a31] p-8 rounded-xl max-w-md w-full border border-[#E9D7E9]/30 shadow-2xl">
                  <h3 className="text-2xl font-bold text-[#E9D7E9] mb-2">¡Ya casi estamos!</h3>
                  <p className="text-gray-300 mb-6 text-sm">Déjanos tus datos para enviarte el presupuesto de este diseño.</p>
                  
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
                          <label className="text-white text-sm font-semibold">Mensaje Adicional (Opcional)</label>
                          <textarea className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none h-24 resize-none" 
                                 value={clientData.message} onChange={e => setClientData({...clientData, message: e.target.value})} placeholder="Ej: Necesito 20 unidades..." />
                      </div>

                      <div className="flex gap-3 mt-4">
                          <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-transparent border border-[#E9D7E9] text-[#E9D7E9] rounded-lg hover:bg-[#E9D7E9]/10">Cancelar</button>
                          <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#E9D7E9] text-[#3a2a31] font-bold rounded-lg hover:bg-white transition-colors">
                              {loading ? "Enviando..." : "Enviar Diseño"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Estilos utilitarios para los botones de control */}
      <style jsx>{`
        .control-btn {
            @apply bg-[#745968] hover:bg-[#8a6b7d] w-12 h-12 rounded-lg transition-colors font-bold text-xl flex items-center justify-center pb-1 shadow-sm;
        }
        .control-btn-arrow {
             @apply bg-[#745968] hover:bg-[#8a6b7d] w-8 h-8 rounded transition-colors font-bold flex items-center justify-center shadow-sm;
        }
      `}</style>
    </div>
  );
}