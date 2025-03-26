import { useLayoutEffect } from 'react';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useFonts, Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
import Navigator from './navigator';

import { EventsProvider } from '../contexts/events';

preventAutoHideAsync(); 

export default function App() {
  const [ loaded ] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold 
  });

  useLayoutEffect(function() {
    if(loaded === false) {
      return;
    }

    hideAsync();
  }, [ loaded ]);

  return (
    <EventsProvider>
      <Navigator />
    </EventsProvider>
  );
};
