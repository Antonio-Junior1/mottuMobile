import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, useColorScheme, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { lightTheme, darkTheme } from '../theme';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import i18n from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const patioDataForAllBranches = {
  mapImage: require('../assets/images/patios/mapa_patio_exemplo.png'),
  locationImages: [
    require('../assets/images/patios/local_exemplo_1.png'),
    require('../assets/images/patios/local_exemplo_2.png'),
  ],
};

export default function PatioMapScreen({ route, navigation }) {
  const { branchId, branchName } = route.params || { branchId: '', branchName: i18n.t('unknownPatio') };
  const [motorcycleCount, setMotorcycleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { currentLanguage } = useLanguage();

  const fetchMotorcycleCount = async () => {
    setLoading(true);
    try {
      if (!branchName) {
        setMotorcycleCount(0);
        return;
      }
      const motosRef = collection(db, 'motos');
      const q = query(motosRef, where('filial', '==', branchName));
      const querySnapshot = await getDocs(q);
      setMotorcycleCount(querySnapshot.size);
    } catch (error) {
      console.error('Erro ao carregar contagem de motos do Firestore:', error);
      Alert.alert(i18n.t('error'), i18n.t('couldNotLoadMotorcycleCount'));
      setMotorcycleCount(0);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMotorcycleCount();
      navigation.setOptions({ title: `${i18n.t('patio')}: ${branchName}` });
    }, [branchName, navigation, currentLanguage])
  );

  return (
    <LinearGradient
      colors={[theme.primary[900], theme.primary[800]]}
      style={styles.container}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.secondary[500]} />
          <Text style={{ color: theme.text.primary, marginTop: 10 }}>{i18n.t('loadingPatioData')}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title(theme)}>{i18n.t('patioOf')} {branchName}</Text>
          <Text style={styles.subtitle(theme)}>{i18n.t('patioVisualization')}</Text>
          
          <View style={styles.sectionContainer(theme)}>
            <Text style={styles.sectionTitle(theme)}>{i18n.t('patioMap')}</Text>
            <Image source={patioDataForAllBranches.mapImage} style={styles.mapImage(theme)} resizeMode="contain" />
            <Text style={styles.motorcycleCountText(theme)}>
              {i18n.t('motorcycleCountInBranch')} {motorcycleCount}
            </Text>
          </View>

          <View style={styles.sectionContainer(theme)}>
            <Text style={styles.sectionTitle(theme)}>{i18n.t('locationImages')}</Text>
            {patioDataForAllBranches.locationImages.map((imgSrc, index) => (
              <Image key={index} source={imgSrc} style={styles.locationImage(theme)} resizeMode="cover" />
            ))}
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  title: (theme) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.secondary[500],
    marginBottom: 8,
    textAlign: 'center',
  }),
  subtitle: (theme) => ({
    fontSize: 16,
    color: theme.text.secondary,
    textAlign: 'center',
    marginBottom: 25,
  }),
  sectionContainer: (theme) => ({
    marginBottom: 25,
    backgroundColor: theme.primary[700],
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.primary[600],
  }),
  sectionTitle: (theme) => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.secondary[400],
    marginBottom: 15,
  }),
  mapImage: (theme) => ({
    width: '100%',
    height: 250, 
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: theme.primary[600], 
  }),
  motorcycleCountText: (theme) => ({
    fontSize: 16,
    color: theme.text.primary,
    textAlign: 'center',
    marginTop: 10,
  }),
  locationImage: (theme) => ({
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: theme.primary[600], 
  }),
});
