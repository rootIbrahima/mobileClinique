import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { api } from '../services/api';

export default function PrendreRdv({ route, navigation }) {
  const { doctor_id, starts_at } = route.params;

  const confirmer = async () => {
    try {
      await api.post('/appointments', { doctor_id, starts_at });
      Alert.alert('Succès', 'Rendez-vous confirmé.');
      navigation.navigate('mesRendezVous');
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || 'Échec de la réservation');
    }
  };

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center' }}>
      <Text style={{ marginBottom: 12 }}>Confirmer le RDV du :</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>
        {new Date(starts_at).toLocaleString()}
      </Text>
      <Button title="Confirmer" onPress={confirmer} />
    </View>
  );
}
