
export type SentimentLabel = 'Positivo' | 'Neutro' | 'Negativo';

export interface SentimentResult {
  id: string;
  text: string;
  prevision: SentimentLabel;
  probabilidad: number;
  timestamp: Date;
  top_features?: string[];
}

export interface SentimentStats {
  total: number;
  positivo: number;
  neutro: number;
  negativo: number;
  avgProbabilidad: number;
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  ANALYZE = 'ANALYZE',
  HISTORY = 'HISTORY',
  MODEL_DOCS = 'MODEL_DOCS'
}
