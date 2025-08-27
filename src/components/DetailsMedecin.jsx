import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import { api } from '../services/api';

export default function DetailsMedecin({ route, navigation }) {
  const { id } = route.params;
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.get(`/doctors/${id}`).then(r => mounted && setDoctor(r.data)).catch(() => Alert.alert('Erreur', 'Chargement médecin'));
    const from = new Date();
    const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    api.get(`/doctors/${id}/availability`, { params: { from: from.toISOString(), to: to.toISOString() } })
      .then(r => mounted && setSlots(r.data))
      .catch(() => Alert.alert('Erreur', 'Chargement créneaux'));
    return () => { mounted = false; };
  }, [id]);

  if (!doctor) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Chargement…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{doctor.full_name}</Text>
      {doctor.bio ? <Text style={{ marginTop: 6 }}>{doctor.bio}</Text> : null}

      <Text style={{ marginTop: 12, fontWeight: '600' }}>Créneaux (7 jours) :</Text>
      {slots.length === 0 && <Text style={{ marginTop: 8 }}>Aucun créneau disponible.</Text>}

      {slots.slice(0, 30).map((s) => (
        <View key={s.startsAt} style={{ marginTop: 8 }}>
          <Button
            title={new Date(s.startsAt).toLocaleString()}
            onPress={() => navigation.navigate('prendreRdv', { doctor_id: id, starts_at: s.startsAt })}
          />
        </View>
      ))}
    </ScrollView>
  );
}
