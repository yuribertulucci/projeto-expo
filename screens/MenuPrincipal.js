import {View, Button, Text} from 'react-native';
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";

export default function MenuPrincipal({ navigation }) {
  const { login, user, loading } = useAuth();
  useEffect(() => {
    if (user === null) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ marginBottom: 12, fontSize: 20 }}>Olá, {user?.nome ?? 'erro'}!</Text>
      <Text>Email: {user?.email ?? 'erro'}</Text>
      <Text style={{ marginBottom: 24 }}>Senha: {user?.senha ?? 'erro'}</Text>
      <View style={{
        flexDirection: 'column',
        height: 100,
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 24,
        gap: 12,
      }}>
        <Button title="Lista de Receitas" onPress={() => navigation.navigate('ListaReceitas')}/>
        <Button title="Favoritos" onPress={() => navigation.navigate('Favoritos')}/>
        <Button title="Perfil" onPress={() => navigation.navigate('Perfil')}/>
        <Button title="Pesquisar" onPress={() => navigation.navigate('Pesquisa')}/>
        <Button title="Categorias" onPress={() => navigation.navigate('Categorias')}/>
      </View>
    </View>
  );
}