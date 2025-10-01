import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../theme';
import { useColorScheme } from 'react-native';
import { auth } from '../firebaseConfig'; // Importa a instância de autenticação do Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate("Login"); // Redireciona para a tela de Login após o cadastro
    } catch (error) {
      let errorMessage = 'Ocorreu um erro ao cadastrar. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      }
      Alert.alert('Erro de Cadastro', errorMessage);
      console.error('Erro de cadastro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color={theme.text.secondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.text.primary, borderBottomColor: theme.text.secondary }]}
          placeholder="Nome Completo"
          placeholderTextColor={theme.text.secondary}
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color={theme.text.secondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.text.primary, borderBottomColor: theme.text.secondary }]}
          placeholder="Email"
          placeholderTextColor={theme.text.secondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color={theme.text.secondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.text.primary, borderBottomColor: theme.text.secondary }]}
          placeholder="Senha"
          placeholderTextColor={theme.text.secondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color={theme.text.secondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.text.primary, borderBottomColor: theme.text.secondary }]}
          placeholder="Confirmar Senha"
          placeholderTextColor={theme.text.secondary}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary[500] }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.text.primary} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.text.primary }]}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.registerText, { color: theme.secondary[500] }]}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default RegisterScreen;

