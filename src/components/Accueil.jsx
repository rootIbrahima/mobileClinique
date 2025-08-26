// src/components/Accueil.jsx
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Accueil({ navigation }) {
  const utilisateur = auth.currentUser;

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.reset({ index: 0, routes: [{ name: 'connexion' }] });
    }
  }, [navigation]);

  const deconnecter = async () => {
    try { await signOut(auth); } 
    catch (e) { Alert.alert('Erreur déconnexion', e.message); }
  };

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Bienvenue 👋</Text>
      <Text>Connecté(e) : <Text style={{ fontWeight:'bold' }}>{utilisateur?.email}</Text></Text>
      <View style={{ height:12 }} />
      <Button title="Se déconnecter" onPress={deconnecter} />
    </View>
  );
}
