
import React from 'react';
import { Code2, Database, BrainCircuit, LineChart, FileJson, Layers } from 'lucide-react';

const ModelDocs: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Arquitectura DS</h1>
          <p className="text-zinc-500 mt-2 font-medium">Especificaciones del pipeline de inteligencia artificial.</p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-1.5 bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
           Model v4.2-Stable
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-200/60 group hover:border-indigo-100 transition-colors">
            <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
              <Database className="text-indigo-600" />
              Ingesta y Preprocesamiento
            </h2>
            <div className="text-zinc-500 text-lg leading-relaxed space-y-6">
              <p>
                El motor Sentix AI procesa los datos mediante un flujo de limpieza riguroso antes de la inferencia, asegurando que el ruido sintáctico no afecte la precisión:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { t: 'Tokenización', d: 'División de frases en unidades atómicas de significado.' },
                  { t: 'Lematización', d: 'Reducción de palabras a su raíz funcional (infinitivos).' },
                  { t: 'Noise Reduction', d: 'Eliminación de caracteres especiales y Stop Words.' },
                  { t: 'Encoding', d: 'Mapeo de términos a vectores numéricos densos.' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="text-zinc-900 font-bold text-sm mb-1">{item.t}</h4>
                    <p className="text-xs text-zinc-400">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-zinc-950 p-10 rounded-3xl shadow-2xl border border-zinc-800">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <BrainCircuit className="text-indigo-400" />
              Lógica de Inferencia
            </h2>
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-2xl p-8 font-mono text-sm overflow-x-auto shadow-inner border border-zinc-800">
                <p className="text-zinc-500 italic mb-4"># Vectorización TF-IDF con N-Gramas (1,2)</p>
                <p className="text-indigo-400">vectorizer = TfidfVectorizer(max_features=5000, norm='l2')</p>
                <p className="text-indigo-400">X_train_vec = vectorizer.fit_transform(corpus)</p>
                <br />
                <p className="text-zinc-500 italic mb-4"># Clasificador Supervisado: Logistic Regression</p>
                <p className="text-teal-400">classifier = LogisticRegression(C=1.5, class_weight='balanced')</p>
                <p className="text-teal-400">classifier.fit(X_train_vec, labels)</p>
              </div>
              <div className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20">
                 <p className="text-indigo-300 text-sm leading-relaxed">
                   <strong>Nota Técnica:</strong> El uso de <code>class_weight='balanced'</code> permite al modelo manejar datasets donde las quejas (negativos) son menos frecuentes que los elogios, evitando sesgos.
                 </p>
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-200/60">
            <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
              <Layers className="text-teal-500" />
              Integración de Capas (SaaS)
            </h2>
            <div className="space-y-6">
              <p className="text-zinc-500">
                La arquitectura desacoplada permite que el equipo de Data Science actualice los modelos sin interrumpir el servicio de la API de producción.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                 <div className="flex-1 p-6 bg-zinc-900 text-white rounded-2xl w-full">
                    <span className="text-[10px] font-bold text-zinc-500 block mb-2 uppercase">Core Engine</span>
                    <span className="font-bold">Python / FastAPI</span>
                 </div>
                 <div className="text-zinc-300">➔</div>
                 <div className="flex-1 p-6 bg-indigo-600 text-white rounded-2xl w-full">
                    <span className="text-[10px] font-bold text-indigo-200 block mb-2 uppercase">Orquestación</span>
                    <span className="font-bold">Java / Spring Boot</span>
                 </div>
                 <div className="text-zinc-300">➔</div>
                 <div className="flex-1 p-6 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl w-full">
                    <span className="text-[10px] font-bold text-zinc-400 block mb-2 uppercase">Interface</span>
                    <span className="font-bold">React Modern UI</span>
                 </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <LineChart size={120} />
            </div>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              Métricas de Confianza
            </h3>
            <div className="space-y-6 relative z-10">
              {[
                { label: 'Accuracy', val: '92.4%' },
                { label: 'Precision', val: '91.8%' },
                { label: 'Recall', val: '93.1%' },
                { label: 'F1-Score', val: '92.4%' }
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/20 pb-2">
                  <span className="text-xs font-bold text-indigo-100 uppercase tracking-widest">{m.label}</span>
                  <span className="text-2xl font-black">{m.val}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200/60">
            <h3 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-widest">Ecosistema</h3>
            <div className="flex flex-wrap gap-2">
              {['PyTorch', 'ONNX', 'Scikit-Learn', 'FastAPI', 'Spring Boot 3', 'Tailwind', 'Recharts'].map(tag => (
                <span key={tag} className="px-3 py-2 bg-zinc-100 text-zinc-600 rounded-xl text-[10px] font-black border border-zinc-200 hover:border-indigo-300 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModelDocs;
