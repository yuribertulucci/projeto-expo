import { View, FlatList, Text } from 'react-native';

const favoritos = [{ id: '1', nome: 'Bolo de Chocolate' }];

export default function Favoritos() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoritos}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}