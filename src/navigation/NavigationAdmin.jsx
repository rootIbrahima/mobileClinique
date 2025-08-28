import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../components/Accueil';
import AdminSpecialites from '../components/AdminSpecialites';
import AdminMedecins from '../components/AdminMedecins';

const Stack = createNativeStackNavigator();

export default function NavigationAdmin() {
  return (
    <Stack.Navigator initialRouteName="accueil" id={undefined}>
      <Stack.Screen name="accueil" component={Accueil} options={{ title: 'Espace Admin' }} />
      <Stack.Screen name="adminSpecialites" component={AdminSpecialites} options={{ title: 'Spécialités' }} />
      <Stack.Screen name="adminMedecins" component={AdminMedecins} options={{ title: 'Ajouter un médecin' }} />
    </Stack.Navigator>
  );
}
