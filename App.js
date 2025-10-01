import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Appearance, useColorScheme } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import BranchesScreen from './screens/BranchesScreen';
import MotorcycleRegisterScreen from './screens/MotorcycleRegisterScreen';
import MotorcyclesListScreen from './screens/MotorcyclesListScreen';
import PatioMapScreen from './screens/PatioMapScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { lightTheme, darkTheme } from './theme';
import { auth } from './firebaseConfig'; // Importa a instância de autenticação do Firebase
import { onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(scheme === 'dark' ? darkTheme : lightTheme);
  const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado
  const [initializing, setInitializing] = useState(true); // Estado para verificar se o Firebase está inicializando

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => subscription.remove();
  }, []);

  // Listener para o estado de autenticação do Firebase
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // Desinscreve-se do listener ao desmontar o componente
  }, []);

  if (initializing) {
    return null; // Ou um componente de carregamento
  }

  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  navigationTheme.colors.background = currentTheme.background;
  navigationTheme.colors.card = currentTheme.primary[900];
  navigationTheme.colors.text = currentTheme.text.primary;
  navigationTheme.colors.primary = currentTheme.secondary[500];

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Filiais') {
                iconName = focused ? 'business' : 'business-outline';
              } else if (route.name === 'Pátio') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Cadastro') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Motos') {
                iconName = focused ? 'bicycle' : 'bicycle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: currentTheme.secondary[500],
            tabBarInactiveTintColor: currentTheme.text.secondary,
            tabBarStyle: {
              backgroundColor: currentTheme.primary[900],
              borderTopColor: currentTheme.primary[700],
            },
            headerStyle: {
              backgroundColor: currentTheme.primary[900],
            },
            headerTitleStyle: {
              color: currentTheme.text.primary,
            },
            headerTintColor: currentTheme.secondary[500],
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
          <Tab.Screen name="Filiais" component={BranchesScreen} />
          <Tab.Screen name="Pátio" component={PatioMapScreen} options={{ title: 'Mapa do Pátio' }} />
          <Tab.Screen name="Cadastro" component={MotorcycleRegisterScreen} />
          <Tab.Screen name="Motos" component={MotorcyclesListScreen} options={{ title: 'Motos Cadastradas' }} />
        </Tab.Navigator>
      ) : (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: currentTheme.background } // Garante que o fundo seja do tema
          }}
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

