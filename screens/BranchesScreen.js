import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const branchesData = [
  { id: '1', name: 'Matriz - Centro', address: 'Rua Principal, 123' },
  { id: '2', name: 'Filial - Zona Norte', address: 'Av. Secundária, 456' },
  { id: '3', name: 'Filial - Zona Sul', address: 'Rua Terciária, 789' },
];

const BranchesScreen = ({ navigation }) => {
  const handleSelectBranch = (item) => {
    Alert.alert(
      item.name,
      `O que você gostaria de fazer para a filial ${item.name}?`,
      [
        {
          text: 'Ver Pátio',
          onPress: () => navigation.navigate('Pátio', { branchId: item.id, branchName: item.name }),
        },
        {
          text: 'Ver Motos da Filial',
          onPress: () => navigation.navigate('Motos', { branchName: item.name }),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.branchCard}
      onPress={() => handleSelectBranch(item)} 
    >
      <Ionicons name="business" size={24} color={colors.secondary[500]} />
      <View style={styles.branchInfo}>
        <Text style={styles.branchName}>{item.name}</Text>
        <Text style={styles.branchAddress}>{item.address}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.primary[900], colors.primary[800]]}
      style={styles.container}
    >
      <FlatList
        data={branchesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.title}>Nossas Filiais</Text>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary[500],
    marginBottom: 20,
    textAlign: 'center',
  },
  branchCard: {
    backgroundColor: colors.primary[700],
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchInfo: {
    flex: 1,
    marginLeft: 16,
  },
  branchName: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  branchAddress: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: 4,
  },
});

export default BranchesScreen;
