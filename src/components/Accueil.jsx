// src/components/Accueil.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api';

export default function Accueil({ navigation }) {
  const utilisateur = auth.currentUser;
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.reset({ index: 0, routes: [{ name: 'connexion' }] });
    }
  }, [navigation]);

  const deconnecter = async () => {
    try { await signOut(auth); }
    catch (e) { Alert.alert('Erreur déconnexion', e.message); }
  };

  const allerMedecins = () => navigation.navigate('medecins');
  const allerMesRDV = () => navigation.navigate('mesRendezVous');

  const monProfilServeur = async () => {
    try {
      const { data } = await api.get('/me'); // token Firebase ajouté par l'interceptor
      setProfil(data);
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    }
  };

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Bienvenue 👋</Text>
      <Text>Connecté(e) : <Text style={{ fontWeight:'bold' }}>{utilisateur?.email}</Text></Text>

      <View style={{ height:12 }} />
      <Button title="Trouver un médecin" onPress={allerMedecins} />

      <View style={{ height:8 }} />
      <Button title="Mes RDV" onPress={allerMesRDV} />

      <View style={{ height:8 }} />
      <Button title="Mon profil serveur" onPress={monProfilServeur} />

      {profil && (
        <View style={{ marginTop:12, alignItems:'center' }}>
          <Text>UID: {profil.uid || profil.id || '—'}</Text>
          <Text>Email: {profil.email || '—'}</Text>
        </View>
      )}

      <View style={{ height:12 }} />
      <Button title="Se déconnecter" onPress={deconnecter} />
    </View>
  );
}
