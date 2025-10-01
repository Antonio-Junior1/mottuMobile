import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
  Modal,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../theme';
import { setApiBaseUrl } from '../services/apiService';

const API_URL_KEY = '@api_base_url';
const DEFAULT_API_URL = 'http://10.0.2.2:5102/api';

const ApiConfig = ({ visible, onClose }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApiUrl();
  }, []);

  const loadApiUrl = async () => {
    try {
      const savedUrl = await AsyncStorage.getItem(API_URL_KEY);
      if (savedUrl) {
        setApiUrl(savedUrl);
        setApiBaseUrl(savedUrl);
      }
    } catch (error) {
      console.error('Erro ao carregar URL da API:', error);
    }
  };

  const saveApiUrl = async () => {
    if (!apiUrl.trim()) {
      Alert.alert('Erro', 'URL da API não pode estar vazia');
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.setItem(API_URL_KEY, apiUrl.trim());
      setApiBaseUrl(apiUrl.trim());
      Alert.alert('Sucesso', 'URL da API salva com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar URL da API:', error);
      Alert.alert('Erro', 'Não foi possível salvar a URL da API');
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    setApiUrl(DEFAULT_API_URL);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={theme.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text.primary }]}>
            Configuração da API
          </Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={[styles.label, { color: theme.text.primary }]}>
            URL Base da API
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.primary[700],
              borderColor: theme.primary[600],
              color: theme.text.primary 
            }]}
            value={apiUrl}
            onChangeText={setApiUrl}
            placeholder="https://sua-api.com/api"
            placeholderTextColor={theme.text.secondary}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.secondary[500] }]}
            onPress={saveApiUrl}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { color: theme.text.primary }]}>
              {loading ? 'Salvando...' : 'Salvar Configuração'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, { 
              backgroundColor: theme.primary[600],
              borderColor: theme.primary[500] 
            }]}
            onPress={resetToDefault}
          >
            <Text style={[styles.buttonText, { color: theme.text.secondary }]}>
              Restaurar Padrão
            </Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoText, { color: theme.text.secondary }]}>
              Configure a URL base da sua API REST. Esta configuração será salva localmente no dispositivo.
            </Text>
            <Text style={[styles.infoText, { color: theme.text.secondary, marginTop: 10 }]}>
              URL atual: {apiUrl}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 30,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ApiConfig;
