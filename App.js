import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FournisseurAuth, useAuth } from './src/fournisseurs/FournisseurAuth';
import NavigationAuth from './src/navigation/NavigationAuth';
import NavigationApp from './src/navigation/NavigationApp';


function Racine() {
  const { utilisateur } = useAuth();
  // connecté ? -> pile App ; sinon -> pile Auth
  return (
    <NavigationContainer>
      {utilisateur ? <NavigationApp /> : <NavigationAuth />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <FournisseurAuth>
      <Racine />
    </FournisseurAuth>
  );
}
