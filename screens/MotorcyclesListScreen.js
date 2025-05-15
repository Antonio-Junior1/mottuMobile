import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

const MOTOS_STORAGE_KEY = '@motorcyclesList_v2';

const MotorcyclesListScreen = ({ navigation, route }) => {
  const [allMotorcycles, setAllMotorcycles] = useState([]);
  const [displayedMotorcycles, setDisplayedMotorcycles] = useState([]);
  const branchNameFromParams = route.params?.branchName;

  const fetchMotorcycles = async () => {
    try {
      const savedMotorcycles = await AsyncStorage.getItem(MOTOS_STORAGE_KEY);
      const loadedMotorcycles = savedMotorcycles ? JSON.parse(savedMotorcycles) : [];
      setAllMotorcycles(loadedMotorcycles);
    } catch (error) {
      console.error('Erro ao carregar motos do AsyncStorage:', error);
      Alert.alert('Erro', 'Não foi possível carregar as motos.');
      setAllMotorcycles([]);
    }
  };

  
  useFocusEffect(
    React.useCallback(() => {
      fetchMotorcycles();
    }, [])
  );

  useEffect(() => {
    if (branchNameFromParams) {
      setDisplayedMotorcycles(allMotorcycles.filter(m => m.branch === branchNameFromParams));
      navigation.setOptions({ title: `Motos em ${branchNameFromParams}` });
    } else {
      setDisplayedMotorcycles(allMotorcycles);
      navigation.setOptions({ title: 'Todas as Motos Cadastradas' });
    }
  }, [allMotorcycles, branchNameFromParams, navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.motorcycleCard}
      
    >
      <Image source={item.image || require('../assets/images/pop.webp')} style={styles.motorcycleImage} />
      <View style={styles.motorcycleInfo}>
        <Text style={styles.motorcycleModel}>{item.brand} {item.model}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Ano: {item.year}</Text>
          <Text style={styles.detailText}>Placa: {item.plate}</Text>
        </View>
        <Text style={styles.detailText}>Filial: {item.branch}</Text>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.primary[900], colors.primary[800]]}
      style={styles.container}
    >
      <FlatList
        data={displayedMotorcycles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
           
            <Text style={styles.subtitle}>Total exibido: {displayedMotorcycles.length}</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyComponentContainer}>
            <Text style={styles.emptyComponentText}>
              {branchNameFromParams 
                ? `Nenhuma moto encontrada para a filial: ${branchNameFromParams}`
                : 'Nenhuma moto cadastrada ainda.'
              }
            </Text>
          </View>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary[500],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  motorcycleCard: {
    backgroundColor: colors.primary[700],
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  motorcycleImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: colors.primary[600],
  },
  motorcycleInfo: {
    flex: 1,
  },
  motorcycleModel: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  emptyComponentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyComponentText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default MotorcyclesListScreen;

