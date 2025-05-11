import {collection, doc, setDoc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import {deleteUser as deleteUserAuth} from 'firebase/auth';
import FirebaseService from '../services/FirebaseService';
import User from '../models/User';

class UserRepository {
  constructor() {
    const firebase = FirebaseService.getInstance();
    this.firestore = firebase.firestore;
    this.auth = firebase.auth;
    this.usersCollection = collection(this.firestore, 'users');
  }

  async createUser(uid, userData) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await setDoc(userRef, userData);
      return userData;
    } catch (error) {
      console.error('Erro ao salvar usuário no Firestore:', error);
      throw error;
    }
  }

  async getUserById(uid) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        // Assumindo que User tem um método estático fromFirestore
        return User.fromFirestore(docSnap);
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  async updateUser(uid, userData) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, userData);
      return userData;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async deleteUser(uid) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await deleteDoc(userRef);
      await deleteUserAuth(this.auth.currentUser);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }
}

export default new UserRepository();