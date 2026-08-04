// src/types/index.ts

export type StockStatus = 'Normal' | 'Faible' | 'Rupture'; 

export interface Product {
  id: string;
  name: string;
  reference: string;
  description?: string;
  category: string;
  quantity: number;
  threshold: number; 
  lastUpdated: string;
}