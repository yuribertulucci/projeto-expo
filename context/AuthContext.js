import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../models/User';
import authService from '../services/AuthService';
import userRepository from '../repositories/UserRepository';

const AuthContext = createContext();

// Funções auxiliares para gerenciamento do AsyncStorage
const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Falha ao obter dados do usuário:', error);
    return null;
  }
};

const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Falha ao armazenar dados do usuário:', error);
    throw error;
  }
};

const removeStoredUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Falha ao remover dados do usuário:', error);
    throw error;
  }
};

export function AuthProvider({children}) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getStoredUser();
      setUserState(storedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (user, senha) => {
    try {
      if (user instanceof User) {
        const userCredential = await authService.createUserWithEmailAndPassword(user.email, senha);
        const {uid} = userCredential.user;

        const userData = {
          id: uid,
          nome: user.nome,
          email: user.email,
        };

        await userRepository.createUser(uid, userData);

        await storeUser(userData);
        setUserState(userData);

        return userData;
      }
    } catch (error) {
      console.error('Falha ao registrar usuário:', error);
      throw error;
    }
  };

  const login = async (email, senha) => {
    try {
      const userCredential = await authService.signInWithEmailAndPassword(email, senha);
      const {uid} = userCredential.user;

      const userData = await userRepository.getUserById(uid);

      await storeUser(userData);
      setUserState(userData);

      return userData;
    } catch (error) {
      console.error('Falha ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      await removeStoredUser();
      setUserState(null);
    } catch (error) {
      console.error('Falha ao fazer logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    setUser: (userData) => {
      storeUser(userData);
      setUserState(userData);
    },
    getUser: getStoredUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}