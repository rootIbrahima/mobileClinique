import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { api } from '../services/api';

export default function Medecins({ navigation }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const charger = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/doctors', { params: q ? { q } : {} });
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { charger(); }, []);
  useEffect(() => { const t = setTimeout(charger, 300); return () => clearTimeout(t); }, [q]);

  return (
    <View style={styles.page}>
      <Text style={styles.titre}>Médecins</Text>
      <TextInput
        placeholder="Rechercher par nom…"
        value={q}
        onChangeText={setQ}
        style={styles.recherche}
      />
      <FlatList
        data={items}
        keyExtractor={(d) => d.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={charger} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.carte}
            onPress={() => navigation.navigate('detailsMedecin', { id: item.id })}
          >
            <Text style={styles.nom}>{item.full_name}</Text>
            <Text style={styles.specs}>
              {(item.specializations || []).map(s => s.name).join(', ') || '—'}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  titre: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  recherche: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 12 },
  carte: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10 },
  nom: { fontWeight: '700' },
  specs: { color: '#666', marginTop: 4 },
});
