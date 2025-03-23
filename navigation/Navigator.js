import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Registro from '../screens/Registro';
import MenuPrincipal from '../screens/MenuPrincipal';
import ListaReceitas from '../screens/ListaReceitas';
import DetalhesReceita from '../screens/DetalhesReceita';
import Favoritos from '../screens/Favoritos';
import Perfil from '../screens/Perfil';
import Pesquisa from '../screens/Pesquisa';
import Categorias from '../screens/Categorias';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
        <Stack.Screen name="ListaReceitas" component={ListaReceitas} />
        <Stack.Screen name="DetalhesReceita" component={DetalhesReceita} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Pesquisa" component={Pesquisa} />
        <Stack.Screen name="Categorias" component={Categorias} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}