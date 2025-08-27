import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { api } from '../services/api';

export default function MesRendezVous() {
  const [data, setData] = useState([]);

  const charger = async () => {
    try {
      const { data } = await api.get('/appointments');
      setData(data);
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || 'Chargement RDV');
    }
  };

  const annuler = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      charger();
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || 'Annulation impossible');
    }
  };

  useEffect(() => { charger(); }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Mes rendez-vous</Text>
      <FlatList
        data={data}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <View style={{ padding:12, borderWidth:1, borderColor:'#eee', borderRadius:10, marginBottom:10 }}>
            <Text style={{ fontWeight:'600' }}>{item.doctor_name}</Text>
            <Text>{new Date(item.starts_at).toLocaleString()}</Text>
            {item.status !== 'cancelled' && (
              <View style={{ marginTop:8 }}>
                <Button title="Annuler" onPress={() => annuler(item.id)} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
