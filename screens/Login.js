import { View, TextInput, Button, Text } from 'react-native';

export default function Login({ navigation }) {
	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text>Login</Text>
			<TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 10 }} />
			<TextInput placeholder="Senha" secureTextEntry style={{ borderWidth: 1, marginVertical: 10 }} />
			<Button title="Entrar" onPress={() => navigation.navigate('MenuPrincipal')} />
			<Button title="Registrar" onPress={() => navigation.navigate('Registro')} />
		</View>
	);
}