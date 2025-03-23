import {View, TextInput, Button, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from 'react';

export default function Registro({navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const register = (nome, email, senha) => {
    if (!verifyParams(nome, email, senha)) {
      return;
    }
    // Salvar dados no AsyncStorage
    const user = {nome, email, senha};
    AsyncStorage.setItem('user', JSON.stringify(user))
    .then(() => {
      alert('Usuário registrado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao registrar usuário:', error);
    });
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
      <Button title="Cadastrar" onPress={() => register(nome, email, senha)}/>
    </View>
  );
}