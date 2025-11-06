import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import ApiConfig from '../components/ApiConfig';
import Button from '../components/Button';
import i18n from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

import NetworkHelper from '../components/NetworkHelper';

const HomeScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [showApiConfig, setShowApiConfig] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'pt' ? 'es' : 'pt';
    changeLanguage(newLang);
    Alert.alert(
      i18n.t('languageChanged'), 
      `${i18n.t('languageChangedTo')} ${newLang === 'pt' ? 'Português' : 'Español'}`
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert(i18n.t('success'), i18n.t('logoutSuccess'));
    } catch (error) {
      Alert.alert(i18n.t('error'), i18n.t('logoutError'));
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
          <Text style={styles.title(theme)}>{i18n.t('mottuManager')}</Text>
          
          <Button 
            title={i18n.t('viewBranches')}
            onPress={() => navigation.navigate("Filiais")}
            style={styles.button}
          />
          
          <Button 
            title={i18n.t('registerMotorcycle')}
            onPress={() => navigation.navigate("Cadastro")}
            style={styles.button}
          />
          
          <Button 
            title={i18n.t('motorcycleList')}
            onPress={() => navigation.navigate("Motos")}
            style={styles.button}
          />

          <Button 
            title={i18n.t('viewThingSpeak')}
            onPress={() => navigation.navigate("ThingSpeak")}
            style={[styles.button, { backgroundColor: theme.secondary[700] }]}
          />

          <Button 
            title={i18n.t('configureApi')}
            onPress={() => setShowApiConfig(true)}
            style={[styles.button, { backgroundColor: theme.primary[600] }]}
          />

          <Button 
            title={`${i18n.t('language')}: ${currentLanguage.toUpperCase()} 🌍`}
            onPress={toggleLanguage}
            style={[styles.button, { backgroundColor: theme.secondary[600] }]}
          />

          <Button 
            title={i18n.t('logout')}
            onPress={handleLogout}
            style={[styles.button, { backgroundColor: theme.error[500] }]}
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
