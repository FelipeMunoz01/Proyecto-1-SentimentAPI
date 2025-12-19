
import React from 'react';
import { Send, Loader2, Sparkles, CheckCircle2, AlertCircle, Trash2, Cpu } from 'lucide-react';
import { analyzeSentiment } from '../services/geminiService';
import { SentimentResult, SentimentLabel } from '../types';

interface AnalyzeSectionProps {
  onAnalysisComplete: (result: SentimentResult) => void;
}

const AnalyzeSection: React.FC<AnalyzeSectionProps> = ({ onAnalysisComplete }) => {
  const [inputText, setInputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastResult, setLastResult] = React.useState<SentimentResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    
    if (text.length < 5) {
      setError('Contenido insuficiente. Se requiere un mínimo de 5 caracteres.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await analyzeSentiment(text);
      const newResult: SentimentResult = {
        id: "AN-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
        text,
        prevision: response.prevision,
        probabilidad: response.probabilidad,
        timestamp: new Date(),
        top_features: response.top_features
      };
      
      setLastResult(newResult);
      onAnalysisComplete(newResult);
      setInputText('');
    } catch (err: any) {
      console.error(err);
      setError('Interrupción en el servicio de inferencia. Verifique su conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentStyles = (label: SentimentLabel) => {
    switch (label) {
      case 'Positivo': return 'bg-teal-500 text-white';
      case 'Negativo': return 'bg-rose-500 text-white';
      default: return 'bg-zinc-800 text-white';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div>
        <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Análisis Predictivo</h1>
        <p className="text-zinc-500 mt-2 font-medium">Motor de inteligencia artificial para clasificación de feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Input Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Cpu size={120} />
          </div>
          
          <form onSubmit={handleAnalyze} className="space-y-6 relative z-10">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Entrada de Datos</label>
              <div className="relative group">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escriba aquí el comentario o reseña del cliente..."
                  className="w-full h-56 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-zinc-700 placeholder:text-zinc-400 text-lg leading-relaxed shadow-inner"
                  disabled={isLoading}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                   <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="p-3 text-zinc-400 hover:text-rose-500 transition-colors bg-white rounded-xl shadow-sm border border-zinc-100"
                    title="Limpiar"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    Ejecutar Análisis
                  </button>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-3 text-rose-600 text-sm font-bold bg-rose-50 p-4 rounded-xl border border-rose-100">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-100">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-5">Plantillas de Prueba</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                "La atención en sucursal superó mis expectativas, muy recomendado.",
                "Pésima gestión del envío, el paquete llegó abierto y mojado.",
                "Funciona como se describe, pero el material se siente algo plástico."
              ].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(sample)}
                  className="text-xs text-left bg-zinc-50 hover:bg-zinc-100 text-zinc-600 p-3 rounded-xl transition-all border border-transparent hover:border-zinc-200 truncate"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-zinc-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[500px] border border-zinc-800">
          {!lastResult && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-zinc-900 p-6 rounded-3xl mb-6 border border-zinc-800">
                <Sparkles className="text-indigo-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Procesador Listo</h3>
              <p className="text-zinc-500 max-w-[280px] text-sm leading-relaxed">
                El motor de lenguaje natural está en espera. Ingrese feedback para generar métricas.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                <Loader2 className="animate-spin text-indigo-500 mb-6 relative z-10" size={56} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Calculando Pesos...</h3>
              <p className="text-zinc-500 text-sm italic tracking-wide">Transformando texto vía TF-IDF</p>
            </div>
          )}

          {lastResult && !isLoading && (
            <div className="animate-in slide-in-from-top-4 duration-500 h-full flex flex-col">
              <div className={`p-10 ${getSentimentStyles(lastResult.prevision)} relative overflow-hidden`}>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                   <Sparkles size={160} />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Resultado de Predicción</span>
                  <h2 className="text-5xl font-black tracking-tighter italic">{lastResult.prevision}</h2>
                  <div className="mt-4 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                     <span className="text-xl font-bold">{(lastResult.probabilidad * 100).toFixed(1)}% <span className="text-xs opacity-70">CONFIDENCIA</span></span>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-8 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Muestra Procesada</h4>
                  <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 italic text-zinc-300 text-lg leading-relaxed">
                    "{lastResult.text}"
                  </div>
                </div>

                {lastResult.top_features && (
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Inferencia de Palabras Clave</h4>
                    <div className="flex flex-wrap gap-2">
                      {lastResult.top_features.map((tag, i) => (
                        <span key={i} className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl text-xs font-bold border border-indigo-500/20 uppercase">
                          <CheckCircle2 size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-8 border-t border-zinc-800 flex items-center justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  <span>REF: {lastResult.id}</span>
                  <span>TIME: {lastResult.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeSection;
