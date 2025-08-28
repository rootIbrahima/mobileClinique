import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../components/Accueil';
import Medecins from '../components/Medecins';
import DetailsMedecin from '../components/DetailsMedecin';
import PrendreRdv from '../components/PrendreRdv';
import MesRendezVous from '../components/MesRendezVous';
import Profil from '../components/Profil';
import MesDisponibilitesDocteur from '../components/MesDisponibilitesDocteur';
import AgendaDocteur from '../components/AgendaDocteur';

import AdminSpecialites from '../components/AdminSpecialites';
import AdminMedecins from '../components/AdminMedecins';

const Stack = createNativeStackNavigator();

export default function NavigationApp() {
  return (
    <Stack.Navigator initialRouteName="accueil" id={undefined}>
      <Stack.Screen name="accueil" component={Accueil} options={{ title: 'Accueil' }} />
      <Stack.Screen name="medecins" component={Medecins} options={{ title: 'Médecins' }} />
      <Stack.Screen name="detailsMedecin" component={DetailsMedecin} options={{ title: 'Détails' }} />
      <Stack.Screen name="prendreRdv" component={PrendreRdv} options={{ title: 'Prendre RDV' }} />
      <Stack.Screen name="mesRendezVous" component={MesRendezVous} options={{ title: 'Mes RDV' }} />
      <Stack.Screen name="profil" component={Profil} options={{ title: 'Mon profil' }} />

      {/* Espace Docteur */}
      <Stack.Screen name="mesDisposDocteur" component={MesDisponibilitesDocteur} options={{ title: 'Mes disponibilités' }} />
      <Stack.Screen name="agendaDocteur" component={AgendaDocteur} options={{ title: 'Mon agenda' }} />

      {/* Espace Admin */}
      <Stack.Screen name="adminSpecialites" component={AdminSpecialites} options={{ title: 'Admin — Spécialités' }} />
      <Stack.Screen name="adminMedecins" component={AdminMedecins} options={{ title: 'Admin — Médecins' }} />
    </Stack.Navigator>
  );
}
