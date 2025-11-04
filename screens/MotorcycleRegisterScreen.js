import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { lightTheme, darkTheme } from '../theme';
import { motoService } from '../services/apiService';
import { useApiState } from '../hooks/useApiState';
import i18n from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const MotorcycleRegisterScreen = ({ navigation, route }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { currentLanguage } = useLanguage();

  const editingMoto = route.params?.moto;

  const [form, setForm] = useState({
    model: '',
    plate: '',
  });
  
  const { loading, execute } = useApiState();
  
  const plateInputRef = useRef(null);

  useEffect(() => {
    if (editingMoto) {
      setForm({
        model: editingMoto.modelo || '',
        plate: editingMoto.placa || '',
      });
    }
  }, [editingMoto]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.model || !form.plate) {
      Alert.alert(i18n.t('error'), i18n.t('modelAndPlateRequired'));
      return;
    }

    try {
      const motoData = {
        placa: form.plate.toUpperCase(),
        modelo: form.model,
      };

      if (editingMoto) {
        await execute(
          () => motoService.update(editingMoto.id, motoData),
          {
            successMessage: i18n.t('motorcycleUpdated'),
            onSuccess: () => {
              setForm({ model: '', plate: '' });
              navigation.goBack();
            }
          }
        );
      } else {
        await execute(
          () => motoService.create(motoData),
          {
            successMessage: i18n.t('motorcycleRegistered'),
            onSuccess: () => {
              setForm({ model: '', plate: '' });
              navigation.goBack();
            }
          }
        );
      }
    } catch (error) {
      console.error('Erro ao salvar moto:', error);
    }
  };

  const CustomInput = ({ label, value, onChangeText, placeholder, keyboardType, autoCapitalize, returnKeyType, onSubmitEditing, blurOnSubmit, inputRef }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label(theme)}>{label}</Text>
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={styles.inputWrapper}
        onPress={() => inputRef?.current?.focus()}
      >
        <TextInput
          ref={inputRef}
          style={styles.input(theme)}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.text.secondary}
          keyboardType={keyboardType || 'default'}
          autoCapitalize={autoCapitalize || 'none'}
          returnKeyType={returnKeyType || 'next'}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit || false}
          underlineColorAndroid="transparent"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[theme.primary[900], theme.primary[800]]}
        style={styles.container}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.content}>
              <Text style={styles.title(theme)}>
                {editingMoto ? i18n.t('editMotorcycle') : i18n.t('motorcycleRegister')}
              </Text>
              
              <CustomInput
                label={i18n.t('model')}
                value={form.model}
                onChangeText={(text) => handleChange('model', text)}
                placeholder={i18n.t('modelPlaceholder')}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => plateInputRef.current?.focus()}
              />
              
              <CustomInput
                label={i18n.t('plate')}
                value={form.plate}
                onChangeText={(text) => handleChange('plate', text.toUpperCase())}
                placeholder={i18n.t('platePlaceholder')}
                autoCapitalize="characters"
                inputRef={plateInputRef}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                blurOnSubmit={true}
              />
              
              <Button 
                title={loading ? <ActivityIndicator color={theme.text.primary} /> : (editingMoto ? i18n.t('updateMotorcycle') : i18n.t('registerMotorcycle'))}
                onPress={handleSubmit}
                style={styles.submitButton}
                disabled={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: (theme) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginBottom: 30,
    textAlign: 'center',
  }),
  inputGroup: {
    marginBottom: 20,
  },
  label: (theme) => ({
    color: theme.text.primary,
    marginBottom: 8,
    fontSize: 16,
  }),
  inputWrapper: {
    width: '100%',
  },
  input: (theme) => ({
    backgroundColor: theme.primary[700],
    borderRadius: 8,
    padding: 14,
    color: theme.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.primary[600],
    height: 50,
  }),
  pickerContainer: (theme) => ({
    backgroundColor: theme.primary[700],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.primary[600],
    overflow: 'hidden', 
  }),
  picker: (theme) => ({
    width: '100%',
    color: theme.text.primary,
  }),
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 30, 
  },
});

export default MotorcycleRegisterScreen;
