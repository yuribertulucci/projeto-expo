import { View, Text } from 'react-native';

export default function DetalhesReceita({ route }) {
  const { receita } = route.params;
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{receita.nome}</Text>
      <Text>Ingredientes: ...</Text>
      <Text>Modo de preparo: ...</Text>
    </View>
  );
}