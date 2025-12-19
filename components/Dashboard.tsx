
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';
import { SentimentResult, SentimentStats } from '../types';

interface DashboardProps {
  history: SentimentResult[];
}

const Dashboard: React.FC<DashboardProps> = ({ history }) => {
  const stats: SentimentStats = React.useMemo(() => {
    const total = history.length;
    if (total === 0) return { total: 0, positivo: 0, neutro: 0, negativo: 0, avgProbabilidad: 0 };
    
    const count = history.reduce(
      (acc, item) => {
        acc[item.prevision.toLowerCase() as 'positivo' | 'neutro' | 'negativo']++;
        acc.sumProb += item.probabilidad;
        return acc;
      }, 
      { positivo: 0, neutro: 0, negativo: 0, sumProb: 0 }
    );

    return {
      total,
      positivo: count.positivo,
      neutro: count.neutro,
      negativo: count.negativo,
      avgProbabilidad: count.sumProb / total
    };
  }, [history]);

  const pieData = [
    { name: 'Positivo', value: stats.positivo, color: '#2dd4bf' },
    { name: 'Neutro', value: stats.neutro, color: '#a1a1aa' },
    { name: 'Negativo', value: stats.negativo, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  const StatCard = ({ title, value, icon: Icon, colorClass, subValue, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/60 flex flex-col group hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl ${colorClass} group-hover:scale-110 transition-transform`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-zinc-900">{value}</span>
        {subValue && <span className="text-zinc-400 text-sm font-medium">{subValue}</span>}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-teal-600 bg-teal-50 w-fit px-2 py-0.5 rounded-full">
          <Activity size={10} /> CRECIMIENTO ESTABLE
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-2 font-medium">Visualización estratégica del sentimiento del cliente.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-2xl border border-indigo-100 shadow-sm">
          <Sparkles size={18} className="animate-pulse" />
          <span className="font-bold text-sm tracking-tight text-indigo-600">Confianza del Sistema: 94.2%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Procesado" 
          value={stats.total} 
          icon={Activity} 
          colorClass="bg-zinc-900" 
          trend={true}
        />
        <StatCard 
          title="Favorable" 
          value={stats.positivo} 
          icon={TrendingUp} 
          colorClass="bg-teal-500"
          subValue={`${((stats.positivo / stats.total || 0) * 100).toFixed(0)}%`}
        />
        <StatCard 
          title="Crítico" 
          value={stats.negativo} 
          icon={TrendingDown} 
          colorClass="bg-rose-500" 
          subValue={`${((stats.negativo / stats.total || 0) * 100).toFixed(0)}%`}
        />
        <StatCard 
          title="Prob. Media" 
          value={`${(stats.avgProbabilidad * 100).toFixed(1)}%`} 
          icon={Sparkles} 
          colorClass="bg-indigo-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-zinc-200/60">
          <h3 className="font-bold text-zinc-900 mb-8 text-lg">Distribución</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-500 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-zinc-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-zinc-200/60">
          <h3 className="font-bold text-zinc-900 mb-8 text-lg">Nivel de Confianza por Análisis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="id" hide />
                <YAxis hide domain={[0, 1]} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as SentimentResult;
                      return (
                        <div className="bg-white p-4 border border-zinc-100 rounded-2xl shadow-xl max-w-[200px]">
                          <p className="font-bold text-zinc-900 text-sm mb-1">{data.prevision}</p>
                          <p className="text-xs text-indigo-600 font-bold mb-2">{(data.probabilidad * 100).toFixed(0)}% Confianza</p>
                          <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed italic">"{data.text}"</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="probabilidad" 
                  radius={[6, 6, 6, 6]}
                  barSize={32}
                >
                  {history.slice(-10).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.prevision === 'Positivo' ? '#2dd4bf' : entry.prevision === 'Negativo' ? '#f43f5e' : '#a1a1aa'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
               <div className="w-2 h-2 rounded-full bg-teal-400"></div> POSITIVO
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
               <div className="w-2 h-2 rounded-full bg-rose-400"></div> NEGATIVO
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
