import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import { auth } from '../firebaseConfig'; // Importa a instância de autenticação do Firebase
import { signOut } from 'firebase/auth';
import ApiConfig from '../components/ApiConfig';
import Button from '../components/Button';

import NetworkHelper from '../components/NetworkHelper';

const HomeScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [showApiConfig, setShowApiConfig] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Sucesso', 'Logout realizado com sucesso!');
      // A navegação será tratada automaticamente pelo listener em App.js
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
      console.error('Erro de logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.primary[900], theme.primary[800]]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title(theme)}>Mottu Manager</Text>
          
          <Button 
            title="Ver Filiais"
            onPress={() => navigation.navigate("Filiais")}
            style={styles.button}
          />
          
          <Button 
            title="Cadastrar Moto"
            onPress={() => navigation.navigate("Cadastro")}
            style={styles.button}
          />
          
          <Button 
            title="Lista de Motos"
            onPress={() => navigation.navigate("Motos")}
            style={styles.button}
          />

          <Button 
            title="Configurar API"
            onPress={() => setShowApiConfig(true)}
            style={[styles.button, { backgroundColor: theme.primary[600] }]}
          />

          <Button 
            title="Sair"
            onPress={handleLogout}
            style={[styles.button, { backgroundColor: theme.error[500] }]} // Botão de logout com cor diferente
          />
        </ScrollView>
      </LinearGradient>

      <ApiConfig 
        visible={showApiConfig}
        onClose={() => setShowApiConfig(false)}
      />
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
  title: (theme) => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginVertical: 30,
    textShadowColor: theme.secondary[500],
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  }),
  button: {
    width: '80%',
    marginVertical: 10,
  },
});

export default HomeScreen;

