import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crie o contexto
const AuthContext = createContext();

// Função para obter o usuário do AsyncStorage
const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
};

// Função para salvar o usuário no AsyncStorage
const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('User saved:', user);
  } catch (error) {
    console.error('Failed to set user data:', error);
    throw error;
  }
};

// Função para remover o usuário do AsyncStorage
const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User removed');
  } catch (error) {
    console.error('Failed to remove user data:', error);
    throw error;
  }
};

// Provedor do contexto
export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      setUserState(storedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    await setUser(userData);
    setUserState(userData);
  };

  const logout = async () => {
    await removeUser();
    setUserState(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    setUser: login,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}