// src/screens/ProductFormScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useProductStore } from '../store/useProductStore';

export const ProductFormScreen = ({ route, navigation }: any) => {
  // Grab the ID from navigation (it will be undefined if we are adding a new product)
  const { id } = route.params || {}; 

  const addProduct = useProductStore((state) => state.addProduct);
  const editProduct = useProductStore((state) => state.editProduct);
  const products = useProductStore((state) => state.products);
  
  // Find the product if we are editing
  const existingProduct = id ? products.find(p => p.id === id) : null;

  // Pre-fill states if existingProduct exists
  const [name, setName] = useState(existingProduct?.name || '');
  const [reference, setReference] = useState(existingProduct?.reference || '');
  const [category, setCategory] = useState(existingProduct?.category || '');
  const [quantity, setQuantity] = useState(existingProduct?.quantity.toString() || '');
  const [threshold, setThreshold] = useState(existingProduct?.threshold.toString() || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !reference || !category || !quantity || !threshold) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const parsedQty = parseInt(quantity, 10);
    const parsedThreshold = parseInt(threshold, 10);

    if (isNaN(parsedQty) || parsedQty < 0 || isNaN(parsedThreshold) || parsedThreshold < 0) {
      setErrorMessage('La quantité et le seuil doivent être des nombres positifs.');
      return;
    }

    if (existingProduct) {
      // EDIT MODE
      editProduct(id, {
        name,
        reference,
        category,
        quantity: parsedQty,
        threshold: parsedThreshold,
      });
    } else {
      // ADD MODE
      addProduct({
        name,
        reference,
        category,
        quantity: parsedQty,
        threshold: parsedThreshold,
      });
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {errorMessage !== '' && (
          <Text style={styles.error}>{errorMessage}</Text>
        )}

        <Text style={styles.label}>Nom du produit *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Référence *</Text>
        <TextInput style={styles.input} value={reference} onChangeText={setReference} />

        <Text style={styles.label}>Catégorie *</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} />

        <Text style={styles.label}>Quantité initiale *</Text>
        <TextInput 
          style={styles.input} 
          value={quantity} 
          onChangeText={setQuantity} 
          keyboardType="numeric" 
        />

        <Text style={styles.label}>Seuil d'alerte *</Text>
        <TextInput 
          style={styles.input} 
          value={threshold} 
          onChangeText={setThreshold} 
          keyboardType="numeric" 
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {existingProduct ? 'Modifier le produit' : 'Ajouter le produit'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// ... keep your exact same styles from before!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, marginBottom: 40 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: '#3498db', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  error: { color: '#e74c3c', marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }
});