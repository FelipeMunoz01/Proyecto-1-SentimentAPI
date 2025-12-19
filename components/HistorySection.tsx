
import React from 'react';
import { Download, Search, ChevronRight, Filter, Calendar } from 'lucide-react';
import { SentimentResult, SentimentLabel } from '../types';

interface HistorySectionProps {
  history: SentimentResult[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState<SentimentLabel | 'Todos'>('Todos');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todos' || item.prevision === filter;
    return matchesSearch && matchesFilter;
  });

  const getLabelBadge = (label: SentimentLabel) => {
    switch (label) {
      case 'Positivo': return 'bg-teal-50 text-teal-600 border-teal-100';
      case 'Negativo': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Neutro': return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Fecha', 'Texto', 'Previsión', 'Probabilidad'];
    const rows = filteredHistory.map(item => [
      item.id,
      item.timestamp.toISOString(),
      `"${item.text.replace(/"/g, '""')}"`,
      item.prevision,
      item.probabilidad.toFixed(4)
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sentix_export.csv");
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Logs de Registro</h1>
          <p className="text-zinc-500 mt-2 font-medium">Auditoría completa de las peticiones procesadas por el motor.</p>
        </div>
        <button 
          onClick={handleDownloadCSV}
          disabled={filteredHistory.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-950 text-white rounded-2xl hover:bg-zinc-900 disabled:bg-zinc-200 transition-all font-bold shadow-xl shadow-zinc-950/20 text-sm"
        >
          <Download size={18} />
          Exportar Datos (.csv)
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-200/60 overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row gap-4 bg-zinc-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text"
              placeholder="Filtrar por contenido o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2">
              <Filter className="text-zinc-400" size={16} />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-zinc-600 focus:outline-none cursor-pointer"
              >
                <option value="Todos">SENTIMIENTO: TODOS</option>
                <option value="Positivo">POSITIVO</option>
                <option value="Neutro">NEUTRO</option>
                <option value="Negativo">NEGATIVO</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50/50 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-zinc-100">
              <tr>
                <th className="px-8 py-5">Identificador</th>
                <th className="px-8 py-5">Feedback Original</th>
                <th className="px-8 py-5">Score IA</th>
                <th className="px-8 py-5">Confianza</th>
                <th className="px-8 py-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors group cursor-default">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-900 tracking-tight mb-1">{item.id}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold">
                           <Calendar size={10} /> {item.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-sm">
                      <p className="text-sm text-zinc-500 truncate leading-relaxed">"{item.text}"</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-wider ${getLabelBadge(item.prevision)}`}>
                        {item.prevision}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center w-24">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Puntaje</span>
                          <span className="text-xs font-black text-indigo-600">{(item.probabilidad * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 w-24 bg-zinc-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                                item.prevision === 'Positivo' ? 'bg-teal-400' : item.prevision === 'Negativo' ? 'bg-rose-400' : 'bg-indigo-400'
                            }`}
                            style={{ width: `${item.probabilidad * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-zinc-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 rounded-xl transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <Search size={40} className="text-zinc-400" />
                       <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Sin coincidencias en el registro</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
