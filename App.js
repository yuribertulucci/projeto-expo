import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Navigator from './navigation/Navigator';
import { AuthProvider } from './context/AuthContext';

// Evite que a tela de splash seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // // Carregue fontes ou outros recursos aqui, se necessário
        // await Font.loadAsync({
        //   // Exemplo: Carregue fontes personalizadas, se você estiver usando
        //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        // });

        // Simule um tempo de carregamento (opcional)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <Navigator onLayout={onLayoutRootView} />
    </AuthProvider>
  );
}