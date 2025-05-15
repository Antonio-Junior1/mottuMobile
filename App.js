import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import BranchesScreen from './screens/BranchesScreen';
import MotorcycleRegisterScreen from './screens/MotorcycleRegisterScreen';
import MotorcyclesListScreen from './screens/MotorcyclesListScreen';
import PatioMapScreen from './screens/PatioMapScreen';
import colors from './theme/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          tabBarActiveTintColor: colors.secondary[500],
          tabBarInactiveTintColor: colors.text.secondary,
          tabBarStyle: {
            backgroundColor: colors.primary[900],
            borderTopColor: colors.primary[700],
          },
          headerStyle: {
            backgroundColor: colors.primary[900],
          },
          headerTitleStyle: {
            color: colors.text.primary,
          },
          headerTintColor: colors.secondary[500],
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Tab.Screen name="Filiais" component={BranchesScreen} />
        <Tab.Screen name="Pátio" component={PatioMapScreen} options={{ title: 'Mapa do Pátio' }} />
        <Tab.Screen name="Cadastro" component={MotorcycleRegisterScreen} />
        <Tab.Screen name="Motos" component={MotorcyclesListScreen} options={{ title: 'Motos Cadastradas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

