import { View, TextInput, Button, Text } from 'react-native';

export default function Registro({ navigation }) {
	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text>Registro</Text>
			<TextInput placeholder="Nome" style={{ borderWidth: 1, marginVertical: 10 }} />
			<TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 10 }} />
			<TextInput placeholder="Senha" secureTextEntry style={{ borderWidth: 1, marginVertical: 10 }} />
			<Button title="Cadastrar" onPress={() => navigation.navigate('Login')} />
		</View>
	);
}