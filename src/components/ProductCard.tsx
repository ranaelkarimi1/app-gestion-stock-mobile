// src/components/ProductCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types';

interface Props {
  product: Product;
  onPress: () => void;
}

export const ProductCard = ({ product, onPress }: Props) => {
  const getStatusIcon = () => {
    if (product.quantity === 0) return '🔴';
    if (product.quantity <= product.threshold) return '🟡';
    return '🟢';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.icon}>{getStatusIcon()}</Text>
      </View>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.stock}>En stock : {product.quantity}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    fontSize: 18,
  },
  category: {
    color: '#666',
    fontSize: 14,
  },
  stock: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
});