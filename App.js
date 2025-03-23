import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigator from "./navigation/Navigator";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<Navigator />
	);
}
