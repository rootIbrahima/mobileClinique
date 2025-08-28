import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { api } from '../services/api';

export default function Profil() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone]       = useState('');
  const [loading, setLoading]   = useState(false);

  const charger = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/me');
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const enregistrer = async () => {
    try {
      setLoading(true);
      const { data } = await api.put('/me', { full_name: fullName.trim(), phone: phone.trim() });
      Alert.alert('Succès', 'Profil enregistré.');
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
    } catch (e) {
      Alert.alert('Erreur', e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { charger(); }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.titre}>Mon profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title={loading ? 'Enregistrement…' : 'Enregistrer'} onPress={enregistrer} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex:1, padding:16 },
  titre: { fontSize:18, fontWeight:'bold', marginBottom:12 },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:10, marginBottom:12 },
});
