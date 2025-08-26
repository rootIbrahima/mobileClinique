import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from '../components/Connexion';
import Inscription from '../components/Inscription';

const Stack = createNativeStackNavigator();

export default function NavigationAuth() {
  return (
    <Stack.Navigator initialRouteName="connexion" id={undefined}>
      <Stack.Screen name="connexion" component={Connexion} options={{ headerShown: false }} />
      <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
