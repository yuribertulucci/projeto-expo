import {View, Button, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../context/AuthContext";

export default function MenuPrincipal({ navigation }) {
  const { login, user, loading } = useAuth();
  console.log("menu:", user);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Olá, {user.nome}!</Text>
      <Button title="Lista de Receitas" onPress={() => navigation.navigate('ListaReceitas')} />
      <Button title="Favoritos" onPress={() => navigation.navigate('Favoritos')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Button title="Pesquisar" onPress={() => navigation.navigate('Pesquisa')} />
      <Button title="Categorias" onPress={() => navigation.navigate('Categorias')} />
    </View>
  );
}