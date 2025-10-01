import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, useColorScheme, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebaseConfig'; // Importa a instância do Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';

const patioDataForAllBranches = {
  mapImage: require('../assets/images/patios/mapa_patio_exemplo.png'),
  locationImages: [
    require('../assets/images/patios/local_exemplo_1.png'),
    require('../assets/images/patios/local_exemplo_2.png'),
  ],
};

export default function PatioMapScreen({ route, navigation }) {
  const { branchId, branchName } = route.params || { branchId: '', branchName: 'Pátio Desconhecido' };
  const [motorcycleCount, setMotorcycleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const fetchMotorcycleCount = async () => {
    setLoading(true);
    try {
      if (!branchName) {
        setMotorcycleCount(0);
        return;
      }
      const motosRef = collection(db, 'motos');
      const q = query(motosRef, where('filial', '==', branchName));
      const querySnapshot = await getDocs(q);
      setMotorcycleCount(querySnapshot.size);
    } catch (error) {
      console.error('Erro ao carregar contagem de motos do Firestore:', error);
      Alert.alert('Erro', 'Não foi possível carregar o número de motos no pátio.');
      setMotorcycleCount(0);
    } finally {
      setLoading(false);
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
      colors={[theme.primary[900], theme.primary[800]]}
      style={styles.container}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.secondary[500]} />
          <Text style={{ color: theme.text.primary, marginTop: 10 }}>Carregando dados do pátio...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title(theme)}>Pátio da Filial: {branchName}</Text>
          <Text style={styles.subtitle(theme)}>Visualização do layout e localização das motos.</Text>
          
          <View style={styles.sectionContainer(theme)}>
            <Text style={styles.sectionTitle(theme)}>Mapa do Pátio</Text>
            <Image source={patioDataForAllBranches.mapImage} style={styles.mapImage(theme)} resizeMode="contain" />
            <Text style={styles.motorcycleCountText(theme)}>Número de Motos na Filial: {motorcycleCount}</Text>
          </View>

          <View style={styles.sectionContainer(theme)}>
            <Text style={styles.sectionTitle(theme)}>Imagens do Local</Text>
            {patioDataForAllBranches.locationImages.map((imgSrc, index) => (
              <Image key={index} source={imgSrc} style={styles.locationImage(theme)} resizeMode="cover" />
            ))}
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  title: (theme) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginBottom: 8,
    textAlign: 'center',
  }),
  subtitle: (theme) => ({
    fontSize: 16,
    color: theme.text.secondary,
    textAlign: 'center',
    marginBottom: 25,
  }),
  sectionContainer: (theme) => ({
    marginBottom: 25,
    backgroundColor: theme.primary[700],
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.primary[600],
  }),
  sectionTitle: (theme) => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.secondary[400],
    marginBottom: 15,
  }),
  mapImage: (theme) => ({
    width: '100%',
    height: 250, 
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: theme.primary[600], 
  }),
  motorcycleCountText: (theme) => ({
    fontSize: 16,
    color: theme.text.primary,
    textAlign: 'center',
    marginTop: 10,
  }),
  locationImage: (theme) => ({
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: theme.primary[600], 
  }),
});

