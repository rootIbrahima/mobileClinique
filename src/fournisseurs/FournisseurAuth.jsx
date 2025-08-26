// src/fournisseurs/FournisseurAuth.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { View, ActivityIndicator } from 'react-native';

const ContexteAuth = createContext({ utilisateur: null });

export function FournisseurAuth({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    const stop = onAuthStateChanged(auth, (u) => {
      setUtilisateur(u || null);
      setPret(true);
    });
    return () => stop();
  }, []);

  if (!pret) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ContexteAuth.Provider value={{ utilisateur }}>
      {children}
    </ContexteAuth.Provider>
  );
}

export const useAuth = () => useContext(ContexteAuth);
