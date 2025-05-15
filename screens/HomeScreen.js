import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary[900], colors.primary[800]]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Mottu Manager</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Filiais')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Ver Filiais</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Cadastro')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Cadastrar Moto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Motos')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Lista de Motos</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary[500],
    marginVertical: 30,
    textShadowColor: colors.secondary[500],
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  button: {
    width: '80%',
    marginVertical: 15,
    backgroundColor: colors.secondary[500],
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: colors.primary[900],
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;