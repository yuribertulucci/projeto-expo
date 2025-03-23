import * as SplashScreen from 'expo-splash-screen';
import { View, Image } from 'react-native';
import { useEffect } from 'react';

export default function Splash({ navigation }) {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(() => {
        SplashScreen.hideAsync();
        navigation.replace('Login');
      }, 2000);
    }
    prepare();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/splash-icon.png')} />
    </View>
  );
}