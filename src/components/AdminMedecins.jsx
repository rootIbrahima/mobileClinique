import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { api } from '../services/api';

export default function AdminMedecins() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // optionnel; si vide, un mot de passe temporaire sera généré
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [years, setYears] = useState('5');
  const [specs, setSpecs] = useState(''); // "Cardiologie, Pédiatrie"
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim() || !fullName.trim()) {
      Alert.alert('Champs requis', 'Email et Nom complet sont obligatoires.');
      return;
    }
    try {
      setLoading(true);
      const specList = specs
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const { data } = await api.post('/admin/doctors', {
        email: email.trim().toLowerCase(),
        password: password.trim() || undefined, // si absent -> backend génère un temporaire
        full_name: fullName.trim(),
        bio: bio.trim() || null,
        years_experience: Number(years) || 0,
        specializations: specList
      });

      setResult(data);
      Alert.alert('Succès', 'Médecin créé/mis à jour.');
    } catch (e) {
      const msg = e?.response
        ? `${e.response.status} – ${typeof e.response.data === 'object' ? JSON.stringify(e.response.data) : e.response.data}`
        : e.message;
      Alert.alert('Erreur', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Admin — Ajouter un médecin</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mot de passe (optionnel)" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Nom complet" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Bio (optionnel)" value={bio} onChangeText={setBio} />
      <TextInput style={styles.input} placeholder="Années d'expérience (ex: 5)" value={years} onChangeText={setYears} keyboardType="number-pad" />
      <TextInput style={styles.input} placeholder="Spécialités (séparées par des virgules)" value={specs} onChangeText={setSpecs} />

      <Button title={loading ? 'En cours...' : 'Créer / Mettre à jour'} onPress={submit} disabled={loading} />

      {result && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight:'600' }}>Résultat :</Text>
          <Text>Doctor ID: {result.doctor_id}</Text>
          <Text>User ID: {result.user_id}</Text>
          <Text>Email: {result.email}</Text>
          {result.tempPassword && <Text style={{ color:'#b00' }}>Mot de passe temporaire: {result.tempPassword}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex:1, padding:16 },
  title: { fontSize:18, fontWeight:'bold', marginBottom:12 },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:10, marginBottom:10 }
});
