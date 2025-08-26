// src/navigation/NavigationApp.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../components/Accueil';

const Stack = createNativeStackNavigator();

export default function NavigationApp() {
  return (
    <Stack.Navigator initialRouteName="accueil" id={undefined}>
      <Stack.Screen name="accueil" component={Accueil} options={{ title: 'Accueil' }} />
    </Stack.Navigator>
  );
}
