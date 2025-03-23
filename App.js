import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Navigator from './navigation/Navigator'; // Importe o seu navegador

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
        // Indique que o app está pronto
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Esconda a tela de splash quando o app estiver pronto
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Não renderize nada até que o app esteja pronto
  }

  return (
    <Navigator onLayout={onLayoutRootView} />
  );
}