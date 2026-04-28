import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, db, collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc, getDoc } from '../lib/firebase';
import { QRState } from '../types/qr';

interface Design {
  id: string;
  name: string;
  config: QRState;
  createdAt: string;
  isShared?: boolean;
  isDynamic?: boolean;
  targetUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  designs: Design[];
  saveDesign: (name: string, config: QRState) => Promise<void>;
  deleteDesign: (id: string) => Promise<void>;
  toggleShare: (id: string, isShared: boolean) => Promise<void>;
  toggleDynamic: (id: string, isDynamic: boolean, targetUrl: string) => Promise<void>;
  updateTargetUrl: (id: string, targetUrl: string) => Promise<void>;
  getDesign: (id: string) => Promise<Design | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setDesigns([]);
      return;
    }

    const q = query(collection(db, 'designs'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const designsData: Design[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Design));
      setDesigns(designsData);
    }, (error) => {
      console.error("Firestore Error: ", error);
    });

    return unsubscribe;
  }, [user]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the login popup.');
      } else {
        console.error('Login Error:', error);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const saveDesign = async (name: string, config: QRState) => {
    if (!user) return;
    await addDoc(collection(db, 'designs'), {
      userId: user.uid,
      name,
      config,
      createdAt: new Date().toISOString()
    });
  };

  const deleteDesign = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, 'designs', id));
  };

  const toggleShare = async (id: string, isShared: boolean) => {
    if (!user) return;
    await updateDoc(doc(db, 'designs', id), { isShared });
  };

  const toggleDynamic = async (id: string, isDynamic: boolean, targetUrl: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'designs', id), { isDynamic, targetUrl });
  };

  const updateTargetUrl = async (id: string, targetUrl: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'designs', id), { targetUrl });
  };

  const getDesign = async (id: string): Promise<Design | null> => {
    const docSnap = await getDoc(doc(db, 'designs', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Design;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, designs, saveDesign, deleteDesign, toggleShare, toggleDynamic, updateTargetUrl, getDesign }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
