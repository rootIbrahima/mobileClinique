import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Inscription({ navigation }) {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [chargement, setChargement] = useState(false);

  const inscrire = async () => {
    if (!email || !motdepasse) return Alert.alert('Info', 'Email et mot de passe requis (≥6).');
    setChargement(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), motdepasse);
      // déconnecter immédiatement pour revenir à la pile Auth
      await signOut(auth);
      // forcer la navigation vers la page de connexion
      navigation.reset({ index: 0, routes: [{ name: 'connexion' }] });
      Alert.alert('Succès', 'Compte créé. Connectez-vous.');
    } catch (e) {
      Alert.alert('Erreur inscription', e.message);
    } finally {
      setChargement(false);
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Créer un compte</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.champ}
      />
      <TextInput
        placeholder="Mot de passe (min. 6)"
        secureTextEntry
        value={motdepasse}
        onChangeText={setMotdepasse}
        style={styles.champ}
      />
      <Button title={chargement ? 'Création…' : "S'inscrire"} onPress={inscrire} disabled={chargement} />
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex:1, padding:16, justifyContent:'center' },
  titre: { fontSize:24, fontWeight:'bold', marginBottom:16 },
  champ: { borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12, marginBottom:12 },
});
