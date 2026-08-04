// src/screens/ProductDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useProductStore } from '../store/useProductStore';

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  
  // Get our state and actions from the Zustand store
  const products = useProductStore((state) => state.products);
  const updateStock = useProductStore((state) => state.updateStock);
  
  // Find the specific product
  const product = products.find(p => p.id === id);

  if (!product) {
    return <Text style={styles.error}>Produit introuvable.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.ref}>Réf: {product.reference}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.detail}>Catégorie: {product.category}</Text>
        <Text style={styles.detail}>Description: {product.description || 'N/A'}</Text>
        <Text style={styles.detail}>Seuil d'alerte: {product.threshold}</Text>
        <Text style={styles.detail}>Dernière maj: {new Date(product.lastUpdated).toLocaleDateString()}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.stockLabel}>Quantité en stock</Text>
        <Text style={styles.stockNumber}>{product.quantity}</Text>

        {/* Entry and Exit Buttons */}
        {/* Entry and Exit Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonMinus]} onPress={() => updateStock(id, -1)}>
            <Text style={styles.buttonText}>- 1 (Sortie)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonPlus]} onPress={() => updateStock(id, 1)}>
            <Text style={styles.buttonText}>+ 1 (Entrée)</Text>
          </TouchableOpacity>
        </View>

        {/* NEW EDIT BUTTON */}
        <TouchableOpacity 
          style={{ backgroundColor: '#f39c12', padding: 15, borderRadius: 8, marginTop: 15, alignItems: 'center' }} 
          onPress={() => navigation.navigate('Form', { id: product.id })}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Modifier le produit</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonMinus]} 
            onPress={() => updateStock(id, -1)}
          >
            <Text style={styles.buttonText}>- 1 (Sortie)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonPlus]} 
            onPress={() => updateStock(id, 1)}
          >
            <Text style={styles.buttonText}>+ 1 (Entrée)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ref: {
    color: '#888',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  stockLabel: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  stockNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonMinus: {
    backgroundColor: '#e74c3c',
  },
  buttonPlus: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
  }
});