import {View, TextInput, Button, Text} from 'react-native';
import {useState} from 'react';
import {useAuth} from "../context/AuthContext";
import User from "../models/User";

export default function Registro({navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {login, user, loading, register} = useAuth();

  const registerUser = async (nome, email, senha) => {
    const user = new User(null, nome, email);
    const result = await register(user, senha);
    navigation.replace('Main');
  };

  const verifyParams = (nome, email, senha) => {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos');
      return false;
    }
    return true;
  }


  return (
    <View style={{flex: 1, padding: 20}}>
      <Text>Registro</Text>
      <TextInput
        placeholder="Nome"
        style={{borderWidth: 1, marginVertical: 10}}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="Email"
        style={{borderWidth: 1, marginVertical: 10}}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{borderWidth: 1, marginVertical: 10}}
        onChangeText={(text) => setSenha(text)}
      />
      <Button title="Cadastrar" onPress={() => registerUser(nome, email, senha)}/>
    </View>
  );
}