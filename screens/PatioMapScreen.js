import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MOTOS_STORAGE_KEY = '@motorcyclesList_v2';

// Dados mockados para exibição inicial
const MOCK_MOTORCYCLES = [
  { id: 'mock1', brand: 'Honda', model: 'CG 160', year: '2023', branch: 'Filial Centro' },
  { id: 'mock2', brand: 'Yamaha', model: 'Factor 150', year: '2023', branch: 'Filial Centro' },
  { id: 'mock3', brand: 'Honda', model: 'Biz 125', year: '2022', branch: 'Filial Norte' },
  { id: 'mock4', brand: 'Yamaha', model: 'Fazer 250', year: '2023', branch: 'Filial Sul' },
  { id: 'mock5', brand: 'Honda', model: 'XRE 300', year: '2022', branch: 'Filial Leste' },
];

const patioDataForAllBranches = {
  mapImage: require('../assets/images/patios/mapa_patio_exemplo.png'),
  locationImages: [
    require('../assets/images/patios/local_exemplo_1.png'),
    require('../assets/images/patios/local_exemplo_2.png'),
  ],
};

export default function PatioMapScreen({ route, navigation }) {
  const { branchId, branchName } = route.params || { branchId: '1', branchName: 'Filial Centro' }; // Valor padrão caso não receba parâmetros
  const [motorcycleCount, setMotorcycleCount] = useState(0);

  const fetchMotorcycleCount = async () => {
    try {
      const savedMotorcycles = await AsyncStorage.getItem(MOTOS_STORAGE_KEY);
      let loadedMotorcycles = savedMotorcycles ? JSON.parse(savedMotorcycles) : [];
      
     
      if (loadedMotorcycles.length === 0) {
        loadedMotorcycles = MOCK_MOTORCYCLES;
        
      }
      
      const count = loadedMotorcycles.filter(m => m.branch === branchName).length;
      setMotorcycleCount(count);
    } catch (error) {
      console.error('Erro ao carregar contagem de motos:', error);
      Alert.alert('Erro', 'Não foi possível carregar o número de motos no pátio.');
      
     
      const count = MOCK_MOTORCYCLES.filter(m => m.branch === branchName).length;
      setMotorcycleCount(count);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMotorcycleCount();
      navigation.setOptions({ title: `Pátio: ${branchName}` });
    }, [branchName, navigation])
  );

  return (
    <LinearGradient
      colors={[colors.primary[900], colors.primary[800]]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Pátio da Filial: {branchName}</Text>
        <Text style={styles.subtitle}>Visualização do layout e localização das motos.</Text>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mapa do Pátio</Text>
          <Image source={patioDataForAllBranches.mapImage} style={styles.mapImage} resizeMode="contain" />
          <Text style={styles.motorcycleCountText}>Número de Motos na Filial: {motorcycleCount}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Imagens do Local</Text>
          {patioDataForAllBranches.locationImages.map((imgSrc, index) => (
            <Image key={index} source={imgSrc} style={styles.locationImage} resizeMode="cover" />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary[500],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 25,
  },
  sectionContainer: {
    marginBottom: 25,
    backgroundColor: colors.primary[700],
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.primary[600],
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary[400],
    marginBottom: 15,
  },
  mapImage: {
    width: '100%',
    height: 250, 
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: colors.primary[600], 
  },
  motorcycleCountText: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  locationImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: colors.primary[600], 
  },
});
