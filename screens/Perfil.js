import { View, Text, Button } from 'react-native';
import {useAuth} from "../context/AuthContext";

export default function Perfil({ navigation }) {
  const auth = useAuth();
  const user = auth.user;
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome: {user?.nome}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Senha: {user?.senha}</Text>
      <Button title="Sair" onPress={() => auth.logout().then(() => navigation.navigate('Login'))} />
    </View>
  );
}