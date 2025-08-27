import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../components/Accueil';
import Medecins from '../components/Medecins';
import DetailsMedecin from '../components/DetailsMedecin';
import PrendreRdv from '../components/PrendreRdv';
import MesRendezVous from '../components/MesRendezVous';

const Stack = createNativeStackNavigator();

export default function NavigationApp() {
  return (
    <Stack.Navigator initialRouteName="accueil" id={undefined}>
      <Stack.Screen name="accueil" component={Accueil} options={{ title: 'Accueil' }} />
      <Stack.Screen name="medecins" component={Medecins} options={{ title: 'Médecins' }} />
      <Stack.Screen name="detailsMedecin" component={DetailsMedecin} options={{ title: 'Détails' }} />
      <Stack.Screen name="prendreRdv" component={PrendreRdv} options={{ title: 'Prendre RDV' }} />
      <Stack.Screen name="mesRendezVous" component={MesRendezVous} options={{ title: 'Mes RDV' }} />
    </Stack.Navigator>
  );
}
