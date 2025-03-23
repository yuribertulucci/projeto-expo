import { View, TextInput, Button, Text } from 'react-native';

export default function Pesquisa() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Digite sua busca" style={{ borderWidth: 1, marginVertical: 10 }} />
      <Button title="Pesquisar" onPress={() => {}} />
      <Text>Resultados: ...</Text>
    </View>
  );
}