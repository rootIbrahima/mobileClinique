import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function Connexion({ navigation }) {
  const [email, setEmail] = useState('test@example.com');
  const [motdepasse, setMotdepasse] = useState('password123');
  const [chargement, setChargement] = useState(false);

  const connecter = async () => {
    if (!email || !motdepasse) return Alert.alert('Info', 'Email et mot de passe requis.');
    setChargement(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), motdepasse);
      // -> le provider détecte l’état connecté et App.js affiche NavigationApp (Accueil)
    } catch (e) {
      Alert.alert('Erreur de connexion', e.message);
    } finally {
      setChargement(false);
    }
  };

  const reinitialiser = async () => {
    if (!email) return Alert.alert('Info', 'Saisis ton email.');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert('OK', 'Email de réinitialisation envoyé.');
    } catch (e) {
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Se connecter</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.champ}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={motdepasse}
        onChangeText={setMotdepasse}
        style={styles.champ}
      />
      <Button title={chargement ? 'Connexion…' : 'Connexion'} onPress={connecter} disabled={chargement} />

      <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
        <Text style={styles.lien}>Pas de compte ? <Text style={{ fontWeight:'bold' }}>S'inscrire</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={reinitialiser}>
        <Text style={[styles.lien, { color:'#555', marginTop:8 }]}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex:1, padding:16, justifyContent:'center' },
  titre: { fontSize:24, fontWeight:'bold', marginBottom:16 },
  champ: { borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12, marginBottom:12 },
  lien: { textAlign:'center', marginTop:12 },
});
