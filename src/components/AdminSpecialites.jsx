import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '../services/api';

export default function AdminSpecialites() {
  const [name, setName]   = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/specializations');
      setItems(data);
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    if (!name.trim()) return;
    try {
      await api.post('/admin/specializations', { name: name.trim() });
      setName('');
      load();
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/admin/specializations/${id}`);
      load();
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Admin — Spécialités</Text>
      <View style={{ flexDirection:'row', gap:8, marginBottom:12 }}>
        <TextInput
          placeholder="Nom de la spécialité"
          value={name}
          onChangeText={setName}
          style={[styles.input, { flex:1 }]}
        />
        <Button title="Ajouter" onPress={add} />
      </View>

      <FlatList
        refreshing={loading}
        onRefresh={load}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight:'600' }}>{item.name} {item.doctors_count ? `(${item.doctors_count})` : ''}</Text>
            <TouchableOpacity onPress={() => remove(item.id)} style={styles.deleteBtn}>
              <Text style={{ color:'#fff' }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height:8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex:1, padding:16 },
  title: { fontSize:18, fontWeight:'bold', marginBottom:12 },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:10 },
  card: { borderWidth:1, borderColor:'#eee', borderRadius:10, padding:12, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  deleteBtn: { backgroundColor:'#d33', paddingVertical:6, paddingHorizontal:10, borderRadius:8 }
});
