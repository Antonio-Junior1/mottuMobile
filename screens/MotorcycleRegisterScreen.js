import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import colors from '../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const MOTOS_STORAGE_KEY = '@motorcyclesList_v2';


const branchOptions = [
  { label: 'Selecione uma filial...', value: '' },
  { label: 'Matriz - Centro', value: 'Matriz - Centro' },
  { label: 'Filial - Zona Norte', value: 'Filial - Zona Norte' },
  { label: 'Filial - Zona Sul', value: 'Filial - Zona Sul' },
];

const MotorcycleRegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    model: '',
    brand: '',
    year: '',
    plate: '',
    branch: '', 
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.model || !form.brand || !form.year || !form.plate || !form.branch) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios, incluindo a seleção da filial.');
      return;
    }

    try {
      const currentMotorcycles = JSON.parse(await AsyncStorage.getItem(MOTOS_STORAGE_KEY)) || [];
      const newMotorcycle = {
        ...form,
        id: Date.now().toString(), 
      };
      const updatedMotorcycles = [...currentMotorcycles, newMotorcycle];
      await AsyncStorage.setItem(MOTOS_STORAGE_KEY, JSON.stringify(updatedMotorcycles));
      
      Alert.alert('Sucesso', 'Moto cadastrada!');
      const registeredBranch = form.branch; 
      setForm({ model: '', brand: '', year: '', plate: '', branch: '' }); 
      navigation.navigate('Motos', { branchName: registeredBranch });
    } catch (error) {
      console.error('Erro ao salvar a moto:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a moto.');
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary[900], colors.primary[800]]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Cadastro de Moto</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Modelo</Text>
          <TextInput
            style={styles.input}
            value={form.model}
            onChangeText={(text) => handleChange('model', text)}
            placeholder="Ex: CB 300"
            placeholderTextColor={colors.text.secondary}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            value={form.brand}
            onChangeText={(text) => handleChange('brand', text)}
            placeholder="Ex: Honda"
            placeholderTextColor={colors.text.secondary}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ano</Text>
          <TextInput
            style={styles.input}
            value={form.year}
            onChangeText={(text) => handleChange('year', text)}
            placeholder="Ex: 2023"
            placeholderTextColor={colors.text.secondary}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Placa</Text>
          <TextInput
            style={styles.input}
            value={form.plate}
            onChangeText={(text) => handleChange('plate', text)}
            placeholder="Ex: ABC1D23"
            placeholderTextColor={colors.text.secondary}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Filial</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.branch}
              style={styles.picker}
              onValueChange={(itemValue) => handleChange('branch', itemValue)}
              dropdownIconColor={colors.text.primary} 
            >
              {branchOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>
        
        <Button 
          title="Cadastrar Moto"
          onPress={handleSubmit}
          style={styles.submitButton}
        />

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary[500],
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: colors.text.primary,
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.primary[700],
    borderRadius: 8,
    padding: 14,
    color: colors.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.primary[600],
  },
  pickerContainer: {
    backgroundColor: colors.primary[700],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary[600],
    overflow: 'hidden', 
  },
  picker: {
    height: 50, 
    width: '100%',
    color: colors.text.primary,
    
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 30, 
  },
});

export default MotorcycleRegisterScreen;

