
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AnalyzeSection from './components/AnalyzeSection';
import HistorySection from './components/HistorySection';
import ModelDocs from './components/ModelDocs';
import { AppSection, SentimentResult } from './types';

const INITIAL_HISTORY: SentimentResult[] = [
  {
    id: "tx_12345",
    text: "Excelente servicio al cliente, resolvieron mis dudas en minutos.",
    prevision: "Positivo",
    probabilidad: 0.98,
    timestamp: new Date(Date.now() - 3600000 * 5),
    top_features: ["excelente", "servicio", "minutos"]
  },
  {
    id: "tx_67890",
    text: "El producto llegó con retraso y la caja estaba dañada. Muy descontento.",
    prevision: "Negativo",
    probabilidad: 0.94,
    timestamp: new Date(Date.now() - 3600000 * 2),
    top_features: ["retraso", "dañada", "descontento"]
  },
  {
    id: "tx_54321",
    text: "Está bien por el precio, pero podría ser de mejor calidad.",
    prevision: "Neutro",
    probabilidad: 0.72,
    timestamp: new Date(Date.now() - 3600000 * 1),
    top_features: ["bien", "precio", "calidad"]
  }
];

function App() {
  const [activeSection, setActiveSection] = React.useState<AppSection>(AppSection.DASHBOARD);
  const [history, setHistory] = React.useState<SentimentResult[]>(INITIAL_HISTORY);

  const handleAnalysisComplete = (result: SentimentResult) => {
    setHistory(prev => [result, ...prev]);
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard history={history} />;
      case AppSection.ANALYZE:
        return <AnalyzeSection onAnalysisComplete={handleAnalysisComplete} />;
      case AppSection.HISTORY:
        return <HistorySection history={history} />;
      case AppSection.MODEL_DOCS:
        return <ModelDocs />;
      default:
        return <Dashboard history={history} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </Layout>
  );
}

export default App;
