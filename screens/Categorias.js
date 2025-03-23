import { View, FlatList, Text, TouchableOpacity } from 'react-native';

const categorias = [
  { id: '1', nome: 'Doces' },
  { id: '2', nome: 'Salgados' },
];

export default function Categorias({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ListaReceitas')}>
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}