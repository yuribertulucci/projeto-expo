import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from "../context/AuthContext";
import UserRepository from '../repositories/UserRepository';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../css/styles';

export default function Perfil({ navigation }) {
  const auth = useAuth();
  const user = auth.user;
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome não pode ficar em branco.');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await UserRepository.updateUser(user.id, { nome, email });
      auth.setUser(userData);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setEditando(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao sair: ' + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      Alert.alert('Atenção', 'Você tem certeza que deseja remover sua conta?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            setIsLoading(true);
            try {
              await UserRepository.deleteUser(user.id);
              await auth.logout();
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao remover conta: ' + error.message);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao remover conta: ' + error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/default-avatar.png')}
            defaultSource={require('../assets/default-avatar.png')}
            style={styles.avatar}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informações Pessoais</Text>
            <TouchableOpacity
              onPress={() => setEditando(!editando)}
              style={styles.editButton}
            >
              <FontAwesome name={editando ? "times" : "pencil"} size={18} color="#3498db"/>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nome</Text>
            {editando ? (
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Seu nome"
              />
            ) : (
              <Text style={styles.infoText}>{user?.nome || 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            {editando ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Seu email"
                keyboardType="email-address"
                editable={false}
              />
            ) : (
              <Text style={styles.infoText}>{user?.email || 'Não informado'}</Text>
            )}
          </View>

          {editando && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSalvar}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: '#666', marginVertical: 10 }]}
          onPress={handleDeleteAccount}
        >
          <FontAwesome name="trash" size={16} color="#fff" style={styles.logoutIcon}/>
          <Text style={styles.logoutText}>Remover Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={16} color="#fff" style={styles.logoutIcon}/>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}