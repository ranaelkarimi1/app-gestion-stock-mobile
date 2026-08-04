// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { ProductFormScreen } from './src/screens/ProductFormScreen'; // <-- 1. Add import

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Form: { id?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Gestion de Stock' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={ProductDetailScreen} 
          options={{ title: 'Détails du Produit' }} 
        />
        {/* 2. Add the Form screen here */}
        <Stack.Screen 
          name="Form" 
          component={ProductFormScreen} 
          options={{ title: 'Nouveau Produit' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}