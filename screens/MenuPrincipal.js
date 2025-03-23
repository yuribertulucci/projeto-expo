import { View, Button } from 'react-native';

export default function MenuPrincipal({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Lista de Receitas" onPress={() => navigation.navigate('ListaReceitas')} />
      <Button title="Favoritos" onPress={() => navigation.navigate('Favoritos')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Button title="Pesquisar" onPress={() => navigation.navigate('Pesquisa')} />
      <Button title="Categorias" onPress={() => navigation.navigate('Categorias')} />
    </View>
  );
}