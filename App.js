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
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import i18n from './i18n';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

function MainTabs({ currentTheme }) {
  const { currentLanguage } = useLanguage();
  
  return (
    <Tab.Navigator
      key={currentLanguage}
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
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: i18n.t('home'),
          tabBarLabel: i18n.t('home')
        }} 
      />
      <Tab.Screen 
        name="Filiais" 
        component={BranchesScreen}
        options={{ 
          title: i18n.t('branches'),
          tabBarLabel: i18n.t('branches')
        }}
      />
      <Tab.Screen 
        name="Pátio" 
        component={PatioMapScreen} 
        options={{ 
          title: i18n.t('patioMap'),
          tabBarLabel: i18n.t('patio')
        }} 
      />
      <Tab.Screen 
        name="Cadastro" 
        component={MotorcycleRegisterScreen}
        options={{ 
          title: i18n.t('register'),
          tabBarLabel: i18n.t('register')
        }}
      />
      <Tab.Screen 
        name="Motos" 
        component={MotorcyclesListScreen} 
        options={{ 
          title: i18n.t('registeredMotorcycles'),
          tabBarLabel: i18n.t('motorcycles')
        }} 
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const scheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(scheme === 'dark' ? darkTheme : lightTheme);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  navigationTheme.colors.background = currentTheme.background;
  navigationTheme.colors.card = currentTheme.primary[900];
  navigationTheme.colors.text = currentTheme.text.primary;
  navigationTheme.colors.primary = currentTheme.secondary[500];

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? (
        <MainTabs currentTheme={currentTheme} />
      ) : (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: currentTheme.background }
          }}
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
}
