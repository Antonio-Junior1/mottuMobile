import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../theme';
import { useColorScheme } from 'react-native';
import { auth } from '../firebaseConfig'; // Importa a instância de autenticação do Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import i18n from '../i18n';

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
      Alert.alert(i18n.t('error'), i18n.t('fillAllFields'));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(i18n.t('error'), i18n.t('passwordsDontMatch'));
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert(i18n.t('success'), i18n.t('registerSuccess'));
      navigation.navigate("Login"); // Redireciona para a tela de Login após o cadastro
    } catch (error) {
      let errorMessage = i18n.t('registerError');
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = i18n.t('emailInUse');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = i18n.t('invalidEmail');
      } else if (error.code === 'auth/weak-password') {
        errorMessage = i18n.t('weakPassword');
      }
      Alert.alert(i18n.t('registerError_title'), errorMessage);
      console.error('Erro de cadastro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>{i18n.t('register')}</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color={theme.text.secondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.text.primary, borderBottomColor: theme.text.secondary }]}
          placeholder={i18n.t('fullName')}
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
          placeholder={i18n.t('email')}
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
          placeholder={i18n.t('password')}
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
          placeholder={i18n.t('confirmPassword')}
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
          <Text style={[styles.buttonText, { color: theme.text.primary }]}>{i18n.t('registerButton')}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.registerText, { color: theme.secondary[500] }]}>
          {i18n.t('alreadyHaveAccount')} {i18n.t('loginHere')}
        </Text>
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
