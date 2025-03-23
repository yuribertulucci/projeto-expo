import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function Login() {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const tryLogin = (email, senha) => {
		if (email === 'admin' && senha === 'admin') {
			navigation.navigate('MenuPrincipal');
		} else {
			alert('Usuário ou senha inválidos');
		}
	}

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text>Login</Text>
			<TextInput
				placeholder="Email"
				style={{ borderWidth: 1, marginVertical: 10 }}
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="Senha"
				secureTextEntry
				style={{ borderWidth: 1, marginVertical: 10 }}
				value={senha}
				onChangeText={setSenha}
			/>
			<Button title="Entrar" onPress={() => tryLogin(email, senha)} />
			<Button title="Registrar" onPress={() => navigation.navigate('Registro')} />
		</View>
	);
}