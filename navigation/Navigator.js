import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importe o Tab Navigator
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
import MainTabs from "./MainTabs";

// Crie os navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador principal (Stack Navigator)
export default function Navigator({ onLayout }) {
  return (
    <NavigationContainer onReady={onLayout}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="ListaReceitas" component={ListaReceitas} />
        <Stack.Screen name="DetalhesReceita" component={DetalhesReceita} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Categorias" component={Categorias} />

        {/* Bottom Menu Navigator */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}