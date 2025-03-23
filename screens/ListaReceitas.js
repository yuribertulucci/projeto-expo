import { View, FlatList, Text, TouchableOpacity } from 'react-native';

const receitas = [
  { id: '1', nome: 'Bolo de Chocolate' },
  { id: '2', nome: 'Pizza Caseira' },
];

export default function ListaReceitas({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={receitas}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesReceita', { receita: item })}>
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}