import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api';

const Ctx = createContext({ role: null, loading: true, refresh: () => {} });

export function FournisseurRole({ children }) {
  const [role, setRole] = useState(null);     // 'patient' | 'doctor' | 'admin' | null
  const [loading, setLoading] = useState(true);

  const loadRole = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/me');              // nécessite token
      const r = (data?.role || 'patient').toLowerCase();
      setRole(r === 'doctor' || r === 'admin' ? r : 'patient');
    } catch (_e) {
      // pas connecté ou token manquant => pas de rôle
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) { setRole(null); setLoading(false); return; }
      loadRole();
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Ctx.Provider value={{ role, loading, refresh: loadRole }}>
      {children}
    </Ctx.Provider>
  );
}

export const useRole = () => useContext(Ctx);
