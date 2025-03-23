import { View, Text, Button } from 'react-native';

export default function Perfil({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome: Usuário</Text>
      <Text>Email: usuario@email.com</Text>
      <Button title="Sair" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}