import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, Text } from 'react-native';

import { FournisseurAuth, useAuth } from './src/fournisseurs/FournisseurAuth';
import { FournisseurRole, useRole } from './src/fournisseurs/FournisseurRole';

import NavigationAuth from './src/navigation/NavigationAuth';
import NavigationPatient from './src/navigation/NavigationPatient';
import NavigationDoctor from './src/navigation/NavigationDoctor';
import NavigationAdmin from './src/navigation/NavigationAdmin';

function ChoixStack() {
  const { utilisateur, loadingAuth } = useAuth?.() || {};
  const { role, loading } = useRole();

  if (loadingAuth || (utilisateur && loading)) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Chargement…</Text>
      </View>
    );
  }

  if (!utilisateur) {
    return <NavigationAuth />;
  }

  switch ((role || 'patient').toLowerCase()) {
    case 'admin':  return <NavigationAdmin />;
    case 'doctor': return <NavigationDoctor />;
    default:       return <NavigationPatient />;
  }
}

export default function App() {
  return (
    <FournisseurAuth>
      <FournisseurRole>
        <NavigationContainer>
          <ChoixStack />
        </NavigationContainer>
      </FournisseurRole>
    </FournisseurAuth>
  );
}
