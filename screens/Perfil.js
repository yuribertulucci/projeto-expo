import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Image } from 'react-native';
import { useAuth } from "../context/AuthContext";
import UserRepository from '../repositories/UserRepository';
import { FontAwesome } from '@expo/vector-icons';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            <FontAwesome name={editando ? "times" : "pencil"} size={18} color="#3498db" />
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
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <FontAwesome name="sign-out" size={16} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
  },
  avatarText: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutIcon: {
    marginRight: 8,
  },
});