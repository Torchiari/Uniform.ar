"use client";

import { useEffect, useRef, useState } from "react";

// --- URL DE LA API ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// --- ESTILOS EN VARIABLES ---
const BTN_STYLE = "bg-[#745968] hover:bg-[#8a6b7d] w-12 h-12 rounded-lg transition-colors font-bold text-xl flex items-center justify-center pb-1 shadow-sm active:scale-95 touch-manipulation text-white cursor-pointer border-none";
const ARROW_STYLE = "bg-[#745968] hover:bg-[#8a6b7d] w-10 h-10 lg:w-8 lg:h-8 rounded transition-colors font-bold flex items-center justify-center shadow-sm active:scale-95 touch-manipulation text-white cursor-pointer border-none";

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
  { id: "bermuda_cargo", nombre: "Bermuda Cargo" },
  { id: "pantalon_cargo", nombre: "Pantalón Cargo" },
  { id: "pantalon_trabajo", nombre: "Pantalón Trabajo" },
  { id: "bombacha_campo", nombre: "Bombacha de Campo" },
];

// Función para obtener la ruta
const getPrendaSrc = (tipoId: string, colorId: string, lado: 'frente' | 'dorso') => {
  return `/img/mockups/${tipoId}_${colorId}_${lado}.png`;
};

// --- COMPONENTE PRINCIPAL ---
export default function SimuladorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Estados generales
  const [tipoSeleccionado, setTipoSeleccionado] = useState(TIPOS_PRENDA[0].id);
  const [colorSeleccionado, setColorSeleccionado] = useState(COLORES[0].id);
  const [ladoSeleccionado, setLadoSeleccionado] = useState<'frente' | 'dorso'>('frente');

  // ESTADOS DEL LOGO (Separados por lado)
  // Frente
  const [logoFrenteSrc, setLogoFrenteSrc] = useState<string | null>(null);
  const [configFrente, setConfigFrente] = useState({ x: 180, y: 150, width: 0, height: 0 });
  
  // Dorso
  const [logoDorsoSrc, setLogoDorsoSrc] = useState<string | null>(null);
  const [configDorso, setConfigDorso] = useState({ x: 180, y: 150, width: 0, height: 0 });

  // UI
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clientData, setClientData] = useState({ name: "", contact: "", message: "" });
  
  // Nuevo estado para controlar el flujo del envío: 'idle' (formulario), 'success' (éxito), 'error' (fallo)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // --- LÓGICA DE DIBUJO EN PANTALLA ---
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Determinar qué mostrar según el lado actual
    const bgSrc = getPrendaSrc(tipoSeleccionado, colorSeleccionado, ladoSeleccionado);
    const currentLogoSrc = ladoSeleccionado === 'frente' ? logoFrenteSrc : logoDorsoSrc;
    const currentConfig = ladoSeleccionado === 'frente' ? configFrente : configDorso;

    // 2. Cargar Fondo
    const baseImg = new Image();
    baseImg.src = bgSrc;
    
    baseImg.onload = () => {
      ctx.drawImage(baseImg, 0, 0, 500, 500);

      // 3. Cargar Logo si existe para este lado
      if (currentLogoSrc) {
        const logoImg = new Image();
        logoImg.src = currentLogoSrc;
        logoImg.onload = () => {
            ctx.drawImage(logoImg, currentConfig.x, currentConfig.y, currentConfig.width, currentConfig.height);
        };
      }
    };

    baseImg.onerror = () => {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#333";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Vista no disponible", 250, 250);
        ctx.font = "14px Arial";
        ctx.fillText("(Verifique nombre de archivo)", 250, 280);
    };
  };

  useEffect(() => {
    draw();
  }, [tipoSeleccionado, colorSeleccionado, ladoSeleccionado, logoFrenteSrc, configFrente, logoDorsoSrc, configDorso]);

  // --- MANEJO DE ARCHIVOS ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      
      const img = new Image();
      img.onload = () => {
          // Lógica de tamaño inicial
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

          // Guardamos en el estado CORRESPONDIENTE al lado actual
          if (ladoSeleccionado === 'frente') {
              setConfigFrente({ x: initialX, y: initialY, width: newWidth, height: newHeight });
              setLogoFrenteSrc(src);
          } else {
              setConfigDorso({ x: initialX, y: initialY, width: newWidth, height: newHeight });
              setLogoDorsoSrc(src);
          }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    
    // Limpiar input para permitir subir la misma imagen si se desea
    e.target.value = '';
  };

  // Función para eliminar el logo actual
  const handleDeleteLogo = () => {
    if (ladoSeleccionado === 'frente') {
      setLogoFrenteSrc(null);
    } else {
      setLogoDorsoSrc(null);
    }
  };

  // --- LOGICA DE MOVIMIENTO ---
  const updateCurrentConfig = (callback: (prev: any) => any) => {
      if (ladoSeleccionado === 'frente') {
          setConfigFrente(callback);
      } else {
          setConfigDorso(callback);
      }
  };

  const moveLogo = (dx: number, dy: number) => {
    updateCurrentConfig(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };
  
  const resizeLogo = (factor: number) => {
    updateCurrentConfig(prev => ({
      ...prev,
      width: Math.max(20, prev.width * factor),
      height: Math.max(20, prev.height * factor)
    }));
  };

  // --- GENERACIÓN DE IMAGEN COMBINADA (FRENTE + DORSO) ---
  const generarImagenCombinada = async (): Promise<string> => {
      const canvasTemp = document.createElement('canvas');
      canvasTemp.width = 1000;
      canvasTemp.height = 500;
      const ctx = canvasTemp.getContext('2d');
      if (!ctx) throw new Error("No context");

      const dibujarLado = (lado: 'frente' | 'dorso', offsetX: number): Promise<void> => {
          return new Promise((resolve, reject) => {
              const bgSrc = getPrendaSrc(tipoSeleccionado, colorSeleccionado, lado);
              const logoSrc = lado === 'frente' ? logoFrenteSrc : logoDorsoSrc;
              const config = lado === 'frente' ? configFrente : configDorso;

              const imgBase = new Image();
              imgBase.crossOrigin = "anonymous";
              imgBase.src = bgSrc;
              
              imgBase.onload = () => {
                  ctx.drawImage(imgBase, offsetX, 0, 500, 500);
                  
                  if (logoSrc) {
                      const imgLogo = new Image();
                      imgLogo.crossOrigin = "anonymous";
                      imgLogo.src = logoSrc;
                      imgLogo.onload = () => {
                          ctx.drawImage(imgLogo, offsetX + config.x, config.y, config.width, config.height);
                          resolve();
                      };
                      imgLogo.onerror = () => resolve(); 
                  } else {
                      resolve();
                  }
                  
                  ctx.fillStyle = "#999";
                  ctx.font = "bold 20px Arial";
                  ctx.fillText(lado.toUpperCase(), offsetX + 20, 480);
              };
              imgBase.onerror = () => {
                  resolve(); 
              };
          });
      };

      await dibujarLado('frente', 0);   
      await dibujarLado('dorso', 500);  

      return canvasTemp.toDataURL("image/png");
  };

  const handleOpenModal = () => {
    setSubmissionStatus('idle'); // Reseteamos el estado al abrir
    setShowModal(true);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const base64Combinada = await generarImagenCombinada();

        const res = await fetch(`${API_URL}/designs/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              image: base64Combinada,
              clientName: clientData.name,
              clientContact: clientData.contact,
              clientMessage: clientData.message + `\n(Prenda: ${tipoSeleccionado} - Color: ${colorSeleccionado})`
          }),
        });
        
        if (res.ok) {
            setSubmissionStatus('success');
            setClientData({ name: "", contact: "", message: "" });
        } else {
            setSubmissionStatus('error');
        }
    } catch (error) {
        console.error(error);
        setSubmissionStatus('error');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start justify-center mt-24 mb-10 lg:my-10 relative px-4 lg:px-0">
      
      {/* Área del Canvas */}
      <div className="flex flex-col gap-2 sticky top-24 lg:top-10 z-10 w-full max-w-[500px]">
        {/* Pestañas para cambiar vista */}
        <div className="flex bg-[#3a2a31] rounded-t-lg overflow-hidden border border-[#745968]">
            <button 
                onClick={() => setLadoSeleccionado('frente')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${
                    ladoSeleccionado === 'frente' 
                    ? 'bg-[#E9D7E9] text-[#3a2a31]' 
                    : 'text-[#F5EEF7] hover:bg-white/10'
                }`}
            >
                VISTA FRENTE
            </button>
            <button 
                onClick={() => setLadoSeleccionado('dorso')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${
                    ladoSeleccionado === 'dorso' 
                    ? 'bg-[#E9D7E9] text-[#3a2a31]' 
                    : 'text-[#F5EEF7] hover:bg-white/10'
                }`}
            >
                VISTA DORSO
            </button>
        </div>

        <div className="bg-white p-2 md:p-4 shadow-xl rounded-b-xl border border-gray-200">
            <canvas 
                ref={canvasRef} 
                width={500} 
                height={500} 
                className="border bg-gray-50 rounded-lg w-full h-auto block"
            />
        </div>
        <p className="text-center text-xs text-gray-500">
            Estás editando la vista: <strong className="uppercase">{ladoSeleccionado}</strong>
        </p>
      </div>

      {/* Controles */}
      <div className="flex flex-col gap-6 w-full max-w-[500px] lg:max-w-md bg-[#3a2a31] p-6 lg:p-8 rounded-xl text-[#F5EEF7] shadow-2xl z-0">
        <h3 className="text-2xl lg:text-3xl font-bold text-[#E9D7E9] mb-2 lg:mb-4 text-center lg:text-left">
            Personalizá tu Uniforme
        </h3>

        {/* 1. Selección de Tipo de Prenda (GRILLA EDITADA) */}
        <div className="bg-[#4a3840]/50 p-3 lg:p-4 rounded-lg border border-[#745968]/50">
          <label className="block mb-3 font-medium text-base lg:text-lg">1. ¿Qué prenda buscás?</label>
          {/* CAMBIO AQUI: grid-cols-2 md:grid-cols-4 para que queden 2 filas de 4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#4a3840] p-2 rounded-lg">
            {TIPOS_PRENDA.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() => setTipoSeleccionado(tipo.id)}
                className={`py-2 px-1 text-xs font-semibold rounded-md transition-all h-full flex items-center justify-center text-center ${
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

        {/* 3. Subida de Logo (ALERTAS AGREGADAS) */}
        <div className="bg-[#4a3840]/50 p-3 lg:p-4 rounded-lg border border-[#745968]/50 transition-all duration-300">
            <div className="flex justify-between items-center mb-1">
                <label className="block font-medium text-base lg:text-lg">
                    3. Logo para el <span className="text-[#E9D7E9] uppercase font-bold">{ladoSeleccionado}</span>
                </label>
                <span className="text-xs bg-[#E9D7E9]/20 px-2 py-1 rounded text-[#E9D7E9]">
                    {ladoSeleccionado === 'frente' ? 'Opcional' : 'Opcional'}
                </span>
            </div>
            
            {/* Si NO hay logo cargado en el lado actual */}
            { !((ladoSeleccionado === 'frente' && logoFrenteSrc) || (ladoSeleccionado === 'dorso' && logoDorsoSrc)) && (
              <>
                <p className="text-xs text-[#E9D7E9]/70 mb-3">
                    Formato <strong>.PNG sin fondo</strong> recomendado.
                </p>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleLogoUpload}
                    key={ladoSeleccionado} 
                    className="w-full text-xs lg:text-sm text-gray-300 file:mr-2 lg:file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#745968] file:text-white hover:file:bg-[#8a6b7d] cursor-pointer"
                />
                
                {/* ALERTA: Si no hay NINGÚN logo cargado (ni frente ni dorso) */}
                { !logoFrenteSrc && !logoDorsoSrc && (
                    <div className="mt-3 bg-blue-500/10 border border-blue-500/20 p-2 rounded flex gap-2 items-start">
                        <span className="text-blue-300">ℹ️</span>
                        <p className="text-xs text-blue-100/90 leading-tight">
                            Todavía no hay logos. Podés cargar un logo en el <strong>frente</strong> o en el <strong>dorso</strong> para visualizar tu uniforme.
                        </p>
                    </div>
                )}
              </>
            )}

            {/* Si HAY logo cargado en el lado actual, mostramos controles */}
            {((ladoSeleccionado === 'frente' && logoFrenteSrc) || (ladoSeleccionado === 'dorso' && logoDorsoSrc)) && (
                <div className="mt-2 bg-[#4a3840] p-2 lg:p-3 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-xs lg:text-sm text-gray-300">
                          Ajustar Logo
                      </label>
                      <button 
                        onClick={handleDeleteLogo}
                        className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded hover:bg-red-500/40 transition-colors border border-red-500/30"
                      >
                    Eliminar logo
                      </button>
                    </div>

                    <div className="flex justify-between items-center gap-1 lg:gap-2">
                        <button onClick={() => resizeLogo(0.9)} className={BTN_STYLE} title="Achicar"> − </button>
                        <div className="grid grid-cols-3 gap-1">
                            <div></div>
                            <button onClick={() => moveLogo(0, -10)} className={ARROW_STYLE}>↑</button>
                            <div></div>
                            <button onClick={() => moveLogo(-10, 0)} className={ARROW_STYLE}>←</button>
                            <div className="w-8 h-8 flex items-center justify-center text-[#E9D7E9] text-xs">Mov</div>
                            <button onClick={() => moveLogo(10, 0)} className={ARROW_STYLE}>→</button>
                            <div></div>
                            <button onClick={() => moveLogo(0, 10)} className={ARROW_STYLE}>↓</button>
                            <div></div>
                        </div>
                        <button onClick={() => resizeLogo(1.1)} className={BTN_STYLE} title="Agrandar"> + </button>
                    </div>
                    
                    {/* ALERTA POSITIVA: Confirmación de carga en ESTE lado */}
                    <div className="mt-3 bg-green-500/10 border border-green-500/20 p-2 rounded text-center">
                        <p className="text-xs text-green-200 font-medium">
                            ✓ Ya cargaste un logo en el {ladoSeleccionado}.
                        </p>
                    </div>
                </div>
            )}

            {/* ALERTA: Mensaje si el OTRO lado tiene logo pero este no */}
            {ladoSeleccionado === 'frente' && !logoFrenteSrc && logoDorsoSrc && (
                <p className="mt-3 text-xs text-green-300/80 text-center bg-green-900/20 p-2 rounded border border-green-900/30">
                    ✓ Ya tenés un logo atrás. Podés sumar uno acá si querés.
                </p>
            )}
             {ladoSeleccionado === 'dorso' && !logoDorsoSrc && logoFrenteSrc && (
                <p className="mt-3 text-xs text-green-300/80 text-center bg-green-900/20 p-2 rounded border border-green-900/30">
                    ✓ Ya tenés un logo adelante. Podés sumar uno acá si querés.
                </p>
            )}
        </div>

        <hr className="border-[#745968] my-2" />

        {/* Botón Principal */}
        <button
          onClick={handleOpenModal}
          disabled={loading || (!logoFrenteSrc && !logoDorsoSrc)}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-md 
            ${loading || (!logoFrenteSrc && !logoDorsoSrc)
                ? "bg-[#4a3840] text-white/50 cursor-not-allowed"
                : "bg-[#E9D7E9] text-[#2e1f27] hover:bg-white hover:scale-[1.02] shadow-[#E9D7E9]/30"
            }`}
        >
          {(!logoFrenteSrc && !logoDorsoSrc) ? "Cargá un logo para finalizar" : "Solicitar Presupuesto"}
        </button>
      </div>

      {/* --- MODAL DE DATOS DE CONTACTO (MEJORADO) --- */}
      {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 backdrop-blur-sm overflow-y-auto">
              <div className="bg-[#3a2a31] p-6 sm:p-8 rounded-t-2xl sm:rounded-xl w-full max-w-md border-t sm:border border-[#E9D7E9]/30 shadow-2xl animate-slide-up sm:animate-none">
                  
                  {/* ESTADO 1: FORMULARIO NORMAL */}
                  {submissionStatus === 'idle' && (
                    <>
                      <h3 className="text-2xl font-bold text-[#E9D7E9] mb-2">¡Ya casi estamos!</h3>
                      <p className="text-gray-300 mb-6 text-sm">Te enviaremos el presupuesto con la vista frontal y dorsal.</p>
                      
                      <form onSubmit={submitForm} className="flex flex-col gap-4">
                          <div>
                              <label className="text-white text-sm font-semibold">Nombre y Apellido</label>
                              <input 
                                required 
                                type="text" 
                                disabled={loading}
                                className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none disabled:opacity-50" 
                                value={clientData.name} 
                                onChange={e => setClientData({...clientData, name: e.target.value})} 
                                placeholder="Tu nombre" 
                              />
                          </div>
                          <div>
                              <label className="text-white text-sm font-semibold">WhatsApp o Email</label>
                              <input 
                                required 
                                type="text" 
                                disabled={loading}
                                className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none disabled:opacity-50" 
                                value={clientData.contact} 
                                onChange={e => setClientData({...clientData, contact: e.target.value})} 
                                placeholder="Ej: 11 1234 5678" 
                              />
                          </div>
                          <div>
                              <label className="text-white text-sm font-semibold">Mensaje Adicional</label>
                              <textarea 
                                disabled={loading}
                                className="w-full p-3 rounded bg-[#4a3840] border border-[#745968] text-white focus:border-[#E9D7E9] outline-none h-20 resize-none disabled:opacity-50" 
                                value={clientData.message} 
                                onChange={e => setClientData({...clientData, message: e.target.value})} 
                                placeholder="Ej: Necesito 20 unidades..." 
                              />
                          </div>

                          <div className="flex gap-3 mt-4 mb-4 sm:mb-0">
                              <button 
                                type="button" 
                                onClick={() => setShowModal(false)} 
                                disabled={loading}
                                className="flex-1 py-3 bg-transparent border border-[#E9D7E9] text-[#E9D7E9] rounded-lg hover:bg-[#E9D7E9]/10 disabled:opacity-50"
                              >
                                Cancelar
                              </button>
                              
                              <button 
                                type="submit" 
                                disabled={loading} 
                                className="flex-1 py-3 bg-[#E9D7E9] text-[#3a2a31] font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-80 flex items-center justify-center gap-2"
                              >
                                  {loading ? (
                                    <>
                                      {/* Spinner simple con CSS */}
                                      <span className="w-4 h-4 border-2 border-[#3a2a31] border-t-transparent rounded-full animate-spin"></span>
                                      Enviando...
                                    </>
                                  ) : "Enviar Diseño"}
                              </button>
                          </div>
                      </form>
                    </>
                  )}

                  {/* ESTADO 2: ÉXITO */}
                  {submissionStatus === 'success' && (
                    <div className="flex flex-col items-center text-center py-4">
                      <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mb-4 border border-green-500/50">
                        ✓
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">¡Diseño enviado!</h3>
                      <p className="text-gray-300 mb-6">Hemos recibido tu diseño correctamente. Te contactaremos a la brevedad con el presupuesto.</p>
                      <button 
                        onClick={() => setShowModal(false)} 
                        className="w-full py-3 bg-[#E9D7E9] text-[#3a2a31] font-bold rounded-lg hover:bg-white transition-colors"
                      >
                        Cerrar
                      </button>
                    </div>
                  )}

                  {/* ESTADO 3: ERROR */}
                  {submissionStatus === 'error' && (
                    <div className="flex flex-col items-center text-center py-4">
                      <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-3xl mb-4 border border-red-500/50">
                        !
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Hubo un problema</h3>
                      <p className="text-gray-300 mb-6">No pudimos enviar tu diseño. Por favor, verifica tu conexión e inténtalo nuevamente.</p>
                      <div className="flex gap-3 w-full">
                        <button 
                          onClick={() => setShowModal(false)} 
                          className="flex-1 py-3 bg-transparent border border-[#E9D7E9] text-[#E9D7E9] rounded-lg hover:bg-[#E9D7E9]/10"
                        >
                          Cerrar
                        </button>
                        <button 
                          onClick={() => setSubmissionStatus('idle')} 
                          className="flex-1 py-3 bg-[#E9D7E9] text-[#3a2a31] font-bold rounded-lg hover:bg-white transition-colors"
                        >
                          Reintentar
                        </button>
                      </div>
                    </div>
                  )}

              </div>
          </div>
      )}
    </div>
  );
}