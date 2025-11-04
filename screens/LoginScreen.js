import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../theme';
import { useColorScheme } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { registerForPushNotificationsAsync, sendLoginNotification } from '../services/notificationService';
import i18n from '../i18n';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(i18n.t('error'), i18n.t('fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await sendLoginNotification(userCredential.user.email);
      Alert.alert(i18n.t('success'), i18n.t('loginSuccess'));
      // A navegação é automática através do onAuthStateChanged no App.js
    } catch (error) {
      let errorMessage = i18n.t('loginError');
      if (error.code === 'auth/invalid-email') {
        errorMessage = i18n.t('invalidEmail');
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = i18n.t('userDisabled');
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = i18n.t('userNotFound');
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = i18n.t('wrongPassword');
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = i18n.t('invalidCredentials');
      }
      Alert.alert(i18n.t('loginError_title'), errorMessage);
      console.error('Erro de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>{i18n.t('login')}</Text>

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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary[500] }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.text.primary} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.text.primary }]}>{i18n.t('loginButton')}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.registerText, { color: theme.secondary[500] }]}>
          {i18n.t('noAccount')} {i18n.t('registerHere')}
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

export default LoginScreen;
