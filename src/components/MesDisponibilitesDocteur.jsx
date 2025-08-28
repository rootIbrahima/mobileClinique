import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { api } from '../services/api';

const labels = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

export default function MesDisponibilitesDocteur() {
  const [items, setItems] = useState([]);
  const [weekday, setWeekday] = useState('1');        // Lundi par défaut
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('12:00');
  const [slot, setSlot] = useState('30');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/my/availability');
      setItems(data);
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    try {
      await api.post('/my/availability', {
        weekday: Number(weekday),
        start_time: start,
        end_time: end,
        slot_minutes: Number(slot),
      });
      load();
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    }
  };

  const delItem = async (id) => {
    try {
      await api.delete(`/my/availability/${id}`);
      load();
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Mes disponibilités</Text>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text>Jour (0=Dim..6=Sam)</Text>
          <TextInput value={weekday} onChangeText={setWeekday} keyboardType="number-pad" style={styles.input} />
        </View>
        <View style={styles.col}>
          <Text>Début (HH:MM)</Text>
          <TextInput value={start} onChangeText={setStart} placeholder="09:00" style={styles.input} />
        </View>
        <View style={styles.col}>
          <Text>Fin (HH:MM)</Text>
          <TextInput value={end} onChangeText={setEnd} placeholder="12:00" style={styles.input} />
        </View>
        <View style={styles.col}>
          <Text>Durée (min)</Text>
          <TextInput value={slot} onChangeText={setSlot} keyboardType="number-pad" style={styles.input} />
        </View>
      </View>

      <Button title="Ajouter la plage" onPress={add} />

      <Text style={[styles.title, { marginTop: 16 }]}>Plages existantes</Text>
      <FlatList
        refreshing={loading} onRefresh={load}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight:'600' }}>
              {labels[item.weekday]} — {String(item.start_time).slice(0,5)} → {String(item.end_time).slice(0,5)} ({item.slot_minutes}m)
            </Text>
            <View style={{ marginTop: 8 }}>
              <Button title="Supprimer" onPress={() => delItem(item.id)} />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex:1, padding:16 },
  title: { fontSize:18, fontWeight:'bold', marginBottom:8 },
  row: { flexDirection:'row', gap:8, marginBottom:8, flexWrap:'wrap' },
  col: { width:'23%' },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:8, marginTop:4 },
  card: { borderWidth:1, borderColor:'#eee', borderRadius:10, padding:12 }
});
