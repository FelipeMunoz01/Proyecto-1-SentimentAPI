
import React from 'react';
import { LayoutDashboard, MessageSquarePlus, History, BookOpen, BarChart3, Menu, X } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppSection.ANALYZE, label: 'Análisis IA', icon: MessageSquarePlus },
    { id: AppSection.HISTORY, label: 'Historial', icon: History },
    { id: AppSection.MODEL_DOCS, label: 'Documentación', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-zinc-950 text-white transition-all duration-300 ease-in-out flex flex-col z-20 border-r border-zinc-800`}
      >
        <div className="p-5 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-indigo-500 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                <BarChart3 size={18} className="text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Sentix AI</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' 
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-900">
          <div className="text-[10px] text-zinc-600 text-center uppercase tracking-[0.2em] font-bold">
            {isSidebarOpen ? 'Enterprise Edition' : 'V1'}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
