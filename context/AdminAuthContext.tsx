"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  type User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check for admin custom claim
        const tokenResult = await firebaseUser.getIdTokenResult();
        const hasAdminClaim = tokenResult.claims.isAdmin === true;
        setUser(firebaseUser);
        setIsAdmin(hasAdminClaim);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const tokenResult = await credential.user.getIdTokenResult();
    const hasAdminClaim = tokenResult.claims.isAdmin === true;
    
    if (!hasAdminClaim) {
      await signOut(auth);
      throw new Error('You do not have admin access. Contact the administrator.');
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
