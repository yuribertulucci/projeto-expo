import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importe a biblioteca de ícones
import MenuPrincipal from '../screens/MenuPrincipal';
import Pesquisa from '../screens/Pesquisa';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MenuPrincipal') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pesquisa') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Cor do ícone/texto quando a aba está ativa
        tabBarInactiveTintColor: 'gray', // Cor do ícone/texto quando a aba está inativa
        tabBarStyle: { backgroundColor: '#fff' }, // Cor de fundo da barra de abas
      })}
    >
      <Tab.Screen name="MenuPrincipal" component={MenuPrincipal} options={{ title: 'Início' }} />
      <Tab.Screen name="Pesquisa" component={Pesquisa} options={{ title: 'Pesquisar' }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default MainTabs;