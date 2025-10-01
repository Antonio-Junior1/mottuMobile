import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { motoService } from '../services/apiService';
import { useApiState } from '../hooks/useApiState';

const MotorcyclesListScreen = ({ navigation, route }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const [allMotorcycles, setAllMotorcycles] = useState([]);
  const [displayedMotorcycles, setDisplayedMotorcycles] = useState([]);
  const branchNameFromParams = route.params?.branchName;
  
  const { loading, execute } = useApiState();
  const deleteState = useApiState();

  const fetchMotorcycles = async () => {
    try {
      await execute(
        () => motoService.getAll(),
        {
          showErrorAlert: true,
          onSuccess: (motos) => {
            setAllMotorcycles(motos);
          },
          onError: () => {
            setAllMotorcycles([]);
          }
        }
      );
    } catch (error) {
      console.error('Erro ao carregar motos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMotorcycles();
    }, [])
  );

  useEffect(() => {
    if (branchNameFromParams) {
      setDisplayedMotorcycles(allMotorcycles.filter(m => m.filial === branchNameFromParams));
      navigation.setOptions({ title: `Motos em ${branchNameFromParams}` });
    } else {
      setDisplayedMotorcycles(allMotorcycles);
      navigation.setOptions({ title: 'Todas as Motos Cadastradas' });
    }
  }, [allMotorcycles, branchNameFromParams, navigation]);

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta moto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteState.execute(
                () => motoService.delete(id),
                {
                  successMessage: 'Moto excluída com sucesso!',
                  onSuccess: () => {
                    fetchMotorcycles(); // Recarrega a lista após a exclusão
                  }
                }
              );
            } catch (error) {
              console.error('Erro ao excluir moto:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (moto) => {
    navigation.navigate('Cadastro', { moto: moto });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.motorcycleCard(theme)}
      onPress={() => handleEdit(item)}
    >
      <Image source={item.image || require('../assets/images/pop.webp')} style={styles.motorcycleImage(theme)} />
      <View style={styles.motorcycleInfo}>
        <Text style={styles.motorcycleModel(theme)}>{item.marca} {item.modelo}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText(theme)}>Ano: {item.ano}</Text>
          <Text style={styles.detailText(theme)}>Placa: {item.placa}</Text>
        </View>
        <Text style={styles.detailText(theme)}>Filial: {item.filial}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => handleDelete(item.id)} 
        style={styles.deleteButton}
        disabled={deleteState.loading}
      >
        {deleteState.loading ? (
          <ActivityIndicator size="small" color={theme.error[500]} />
        ) : (
          <Ionicons name="trash-outline" size={24} color={theme.error[500]} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[theme.primary[900], theme.primary[800]]}
      style={styles.container}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.secondary[500]} />
          <Text style={{ color: theme.text.primary, marginTop: 10 }}>Carregando motos...</Text>
        </View>
      ) : (
        <FlatList
          data={displayedMotorcycles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.subtitle(theme)}>Total exibido: {displayedMotorcycles.length}</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Text style={styles.emptyComponentText(theme)}>
                {branchNameFromParams
                  ? `Nenhuma moto encontrada para a filial: ${branchNameFromParams}`
                  : 'Nenhuma moto cadastrada ainda.'
                }
              </Text>
            </View>
          }
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: (theme) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.secondary[500],
    textAlign: 'center',
  }),
  subtitle: (theme) => ({
    fontSize: 16,
    color: theme.text.secondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 10,
  }),
  motorcycleCard: (theme) => ({
    backgroundColor: theme.primary[700],
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  motorcycleImage: (theme) => ({
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: theme.primary[600],
  }),
  motorcycleInfo: {
    flex: 1,
  },
  motorcycleModel: (theme) => ({
    color: theme.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  }),
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailText: (theme) => ({
    color: theme.text.secondary,
    fontSize: 14,
  }),
  deleteButton: {
    padding: 8,
  },
  emptyComponentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyComponentText: (theme) => ({
    fontSize: 16,
    color: theme.text.secondary,
    textAlign: 'center',
  }),
});

export default MotorcyclesListScreen;

