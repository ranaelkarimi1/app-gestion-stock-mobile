// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useProductStore } from '../store/useProductStore';
import { ProductCard } from '../components/ProductCard';

export const HomeScreen = ({ navigation }: any) => {
  const products = useProductStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  // --- DASHBOARD CALCULATIONS ---
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.quantity === 0).length;
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= p.threshold).length;

  // --- SEARCH FILTER ---
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      {/* NEW: DASHBOARD UI */}
      <View style={styles.dashboardContainer}>
        <View style={[styles.statBox, { borderTopColor: '#3498db' }]}>
          <Text style={styles.statNumber}>{totalProducts}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statBox, { borderTopColor: '#f1c40f' }]}>
          <Text style={styles.statNumber}>{lowStock}</Text>
          <Text style={styles.statLabel}>Faible</Text>
        </View>
        <View style={[styles.statBox, { borderTopColor: '#e74c3c' }]}>
          <Text style={styles.statNumber}>{outOfStock}</Text>
          <Text style={styles.statLabel}>Rupture</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit ou une catégorie..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Form', {})}
        >
          <Text style={styles.addButtonText}>+ Ajouter un produit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => navigation.navigate('Details', { id: item.id })} 
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun produit trouvé.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  // NEW DASHBOARD STYLES
  dashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    borderTopWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    fontWeight: '600',
  },
  // EXISTING STYLES
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f4f6f8',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  list: {
    paddingVertical: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});