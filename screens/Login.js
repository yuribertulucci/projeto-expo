import {View, TextInput, Button, Text} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {useEffect, useState} from "react";

export default function Login({navigation}) {
  const { login, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  if (loading) {
    return <Text>Carregando...</Text>;
  }

	useEffect(() => {
		if (user) {
			navigation.navigate('Main');
		}
	}, [user, navigation]); // Dependências: user e navigation

  const handleLogin = () => {
    if (!email || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    login(email, senha)
      .then(() => {
        navigation.replace('Main');
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        style={{borderWidth: 1, marginVertical: 10}}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{borderWidth: 1, marginVertical: 10}}
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={handleLogin}/>
      <Button title="Registrar" onPress={() => navigation.navigate('Registro')}/>
    </View>
  );
}