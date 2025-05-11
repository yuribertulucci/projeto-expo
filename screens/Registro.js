import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useAuth} from "../context/AuthContext";
import User from "../models/User";
import styles from '../css/styles';
import {FontAwesome} from '@expo/vector-icons';

export default function Registro({navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();

  const registerUser = async () => {
    if (!verifyParams()) return;

    setLoading(true);
    try {
      const user = new User(null, nome, email);
      await register(user, senha);
      navigation.replace('Main');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar usuário: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyParams = () => {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos');
      return false;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não conferem');
      return false;
    }

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    return true;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para se registrar</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#666" style={styles.inputIcon}/>
            <TextInput
              placeholder="Nome completo"
              style={[styles.input, {flex: 1}]}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#666" style={styles.inputIcon}/>
            <TextInput
              placeholder="Email"
              style={[styles.input, {flex: 1}]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon}/>
            <TextInput
              placeholder="Senha"
              secureTextEntry={!mostrarSenha}
              style={[styles.input, {flex: 1}]}
              value={senha}
              onChangeText={setSenha}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={styles.eyeIcon}
            >
              <FontAwesome
                name={mostrarSenha ? "eye-slash" : "eye"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon}/>
            <TextInput
              placeholder="Confirmar senha"
              secureTextEntry={!mostrarSenha}
              style={[styles.input, {flex: 1}]}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && {opacity: 0.7}]}
            onPress={registerUser}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Registrando...' : 'Criar conta'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.registerButtonText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}