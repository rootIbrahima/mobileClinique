import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { api } from '../services/api';

export default function AgendaDocteur() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get('/my/appointments');
      setItems(data);
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Mon agenda</Text>
      <FlatList
        data={items}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <View style={{ padding:12, borderWidth:1, borderColor:'#eee', borderRadius:10, marginBottom:10 }}>
            <Text style={{ fontWeight:'600' }}>{item.patient_name || 'Patient'}</Text>
            <Text>{new Date(item.starts_at).toLocaleString()} → {new Date(item.ends_at).toLocaleTimeString()}</Text>
            <Text style={{ color:'#666' }}>Statut: {item.status}</Text>
            {item.patient_email ? <Text style={{ color:'#666' }}>Email: {item.patient_email}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}
