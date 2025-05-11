// services/AuthService.js
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
    import FirebaseService from './FirebaseService';

    class AuthService {
      constructor() {
        const firebase = FirebaseService.getInstance();
        this.auth = firebase.auth;
      }

      async createUserWithEmailAndPassword(email, senha) {
        try {
          const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
          return userCredential;
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
          throw error;
        }
      }

      async signInWithEmailAndPassword(email, senha) {
        try {
          const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
          return userCredential;
        } catch (error) {
          console.error('Erro ao autenticar usuário:', error);
          throw error;
        }
      }

      async signOut() {
        try {
          await signOut(this.auth);
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
          throw error;
        }
      }

      getCurrentUser() {
        return this.auth.currentUser;
      }
    }

    export default new AuthService();