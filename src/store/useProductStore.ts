// src/store/useProductStore.ts

import { create } from 'zustand';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  updateStock: (id: string, amount: number) => void;
  editProduct: (id: string, updatedData: Partial<Product>) => void; 
}

export const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Clavier Mécanique',
      reference: 'KEY-MECH-01',
      description: 'Clavier AZERTY pour développeur',
      category: 'Informatique',
      quantity: 15,
      threshold: 5, 
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Souris Ergonomique',
      reference: 'MOUSE-ERGO-02',
      description: 'Souris sans fil',
      category: 'Informatique',
      quantity: 3,
      threshold: 5, 
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Écran 27 pouces',
      reference: 'MON-27-03',
      category: 'Informatique',
      quantity: 0,
      threshold: 2, 
      lastUpdated: new Date().toISOString(),
    }
  ],
  
  addProduct: (newProduct) => set((state) => ({
    products: [
      ...state.products,
      {
        ...newProduct,
        id: Math.random().toString(36).substring(7),
        lastUpdated: new Date().toISOString(),
      }
    ]
  })),

  updateStock: (id, amount) => set((state) => ({
    products: state.products.map(product => {
      if (product.id === id) {
        const newQuantity = Math.max(0, product.quantity + amount); 
        return { ...product, quantity: newQuantity, lastUpdated: new Date().toISOString() };
      }
      return product;
    })
  })), // <--- Notice the comma added here!

  editProduct: (id, updatedData) => set((state) => ({
    products: state.products.map(product => {
      if (product.id === id) {
        return { ...product, ...updatedData, lastUpdated: new Date().toISOString() };
      }
      return product;
    })
  })) 
})); // <--- Fixed the closing brackets here!