import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { lightTheme, darkTheme } from '../theme';
import { setApiBaseUrl } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const NetworkHelper = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { currentLanguage } = useLanguage();
  const [customIP, setCustomIP] = useState('');
  const [testing, setTesting] = useState(false);

  const testUrls = [
    'http://10.0.2.2:5102/api',      // Android Emulator
    'http://localhost:5102/api',      // Local
    'http://127.0.0.1:5102/api',     // Loopback
    'http://192.168.1.100:5102/api', // Exemplo IP local
  ];

  const testConnection = async (url) => {
    try {
      const response = await fetch(`${url}/motos`, {
        method: 'GET',
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const autoDetectAPI = async () => {
    setTesting(true);
    
    for (const url of testUrls) {
      console.log(`🔍 Testando: ${url}`);
      const works = await testConnection(url);
      
      if (works) {
        await AsyncStorage.setItem('@api_base_url', url);
        setApiBaseUrl(url);
        Alert.alert(i18n.t('success'), `${i18n.t('apiFoundAt')} ${url}`);
        setTesting(false);
        return;
      }
    }
    
    Alert.alert(i18n.t('error'), i18n.t('noApiFound'));
    setTesting(false);
  };

  const testCustomIP = async () => {
    if (!customIP) {
      Alert.alert(i18n.t('error'), i18n.t('enterValidIp'));
      return;
    }
    
    const url = `http://${customIP}:5102/api`;
    setTesting(true);
    
    const works = await testConnection(url);
    
    if (works) {
      await AsyncStorage.setItem('@api_base_url', url);
      setApiBaseUrl(url);
      Alert.alert(i18n.t('success'), `${i18n.t('apiConfigured')} ${url}`);
    } else {
      Alert.alert(i18n.t('error'), `${i18n.t('couldNotConnect')} ${url}`);
    }
    
    setTesting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text.primary }]}>
        {i18n.t('networkAssistant')}
      </Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary[500] }]}
        onPress={autoDetectAPI}
        disabled={testing}
      >
        {testing ? (
          <ActivityIndicator color={theme.text.primary} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.text.primary }]}>
            {i18n.t('autoDetectApi')}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.manualSection}>
        <Text style={[styles.label, { color: theme.text.secondary }]}>
          {i18n.t('orEnterIpManually')}
        </Text>
        <TextInput
          style={[styles.input, { 
            color: theme.text.primary, 
            borderColor: theme.primary[600],
            backgroundColor: theme.primary[700]
          }]}
          placeholder={i18n.t('ipPlaceholder')}
          placeholderTextColor={theme.text.secondary}
          value={customIP}
          onChangeText={setCustomIP}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary[600] }]}
          onPress={testCustomIP}
          disabled={testing || !customIP}
        >
          <Text style={[styles.buttonText, { color: theme.text.primary }]}>
            {i18n.t('testIp')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.helpSection}>
        <Text style={[styles.helpTitle, { color: theme.text.primary }]}>
          {i18n.t('howToFindIp')}
        </Text>
        <Text style={[styles.helpText, { color: theme.text.secondary }]}>
          {i18n.t('ipInstructions')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  manualSection: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  helpSection: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default NetworkHelper;
