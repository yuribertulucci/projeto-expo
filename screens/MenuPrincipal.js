import {View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from "../context/AuthContext";
import {useEffect} from "react";
import styles from "../css/styles";

export default function MenuPrincipal({ navigation }) {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user === null) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ marginBottom: 12, fontSize: 20 }}>Olá, {user?.nome ?? 'erro'}!</Text>
      <Text>Email: {user?.email ?? 'erro'}</Text>
      <View style={{
        flexDirection: 'column',
        height: 100,
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 24,
        gap: 12,
      }}>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ListaReceitas')}>
          <Text style={styles.textoBotao}>Lista de Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Favoritos')}>
          <Text style={styles.textoBotao}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Categorias')}>
          <Text style={styles.textoBotao}>Categorias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}