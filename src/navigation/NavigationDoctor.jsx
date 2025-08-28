import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../components/Accueil';
import MesDisponibilitesDocteur from '../components/MesDisponibilitesDocteur';
import AgendaDocteur from '../components/AgendaDocteur';

const Stack = createNativeStackNavigator();

export default function NavigationDoctor() {
  return (
    <Stack.Navigator initialRouteName="accueil" id={undefined}>
      <Stack.Screen name="accueil" component={Accueil} options={{ title: 'Espace Docteur' }} />
      <Stack.Screen name="mesDisposDocteur" component={MesDisponibilitesDocteur} options={{ title: 'Mes disponibilités' }} />
      <Stack.Screen name="agendaDocteur" component={AgendaDocteur} options={{ title: 'Mon agenda' }} />
    </Stack.Navigator>
  );
}
