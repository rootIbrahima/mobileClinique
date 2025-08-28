import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api';

export default function Accueil({ navigation }) {
  const utilisateur = auth.currentUser;
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  const chargerProfil = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/me');
      setProfil(data);
    } catch (e) {
      const msg = e?.response
        ? `${e.response.status} – ${typeof e.response.data === 'object' ? JSON.stringify(e.response.data) : e.response.data}`
        : e.message;
      Alert.alert('Erreur', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.reset({ index: 0, routes: [{ name: 'connexion' }] });
    } else {
      chargerProfil();
    }
  }, [navigation]);

  const deconnecter = async () => {
    try { await signOut(auth); }
    catch (e) { Alert.alert('Erreur déconnexion', e.message); }
  };

  if (!utilisateur || loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop:8 }}>Chargement…</Text>
      </View>
    );
  }

  const role = (profil?.role || 'patient').toLowerCase();
  const isAdmin = role === 'admin';
  const isDoctor = role === 'doctor';
  const isPatient = !isAdmin && !isDoctor;

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Bienvenue 👋</Text>
      <Text>Connecté(e) : <Text style={{ fontWeight:'bold' }}>{utilisateur?.email}</Text></Text>
      <Text style={{ marginTop: 4 }}>Rôle : <Text style={{ fontWeight:'bold' }}>{role}</Text></Text>

      {/* ------- Espace Patient ------- */}
      {isPatient && (
        <View style={{ marginTop: 16, width: '100%', paddingHorizontal: 40 }}>
          <Button title="Trouver un médecin" onPress={() => navigation.navigate('medecins')} />
          <View style={{ height:8 }} />
          <Button title="Mes RDV" onPress={() => navigation.navigate('mesRendezVous')} />
          <View style={{ height:8 }} />
          <Button title="Mon profil" onPress={() => navigation.navigate('profil')} />
        </View>
      )}

      {/* ------- Espace Docteur ------- */}
      {isDoctor && (
        <View style={{ marginTop: 16, width: '100%', paddingHorizontal: 40 }}>
          <Button title="Mes disponibilités" onPress={() => navigation.navigate('mesDisposDocteur')} />
          <View style={{ height:8 }} />
          <Button title="Mon agenda" onPress={() => navigation.navigate('agendaDocteur')} />
        </View>
      )}

      {/* ------- Espace Admin ------- */}
      {isAdmin && (
        <View style={{ marginTop: 16, width: '100%', paddingHorizontal: 40 }}>
          <Button title="Admin — Spécialités" onPress={() => navigation.navigate('adminSpecialites')} />
          <View style={{ height:8 }} />
          <Button title="Admin — Ajouter un médecin" onPress={() => navigation.navigate('adminMedecins')} />
        </View>
      )}

      <View style={{ height:16 }} />
      <Button title="Se déconnecter" onPress={deconnecter} />
    </View>
  );
}
