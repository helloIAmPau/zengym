import { useLayoutEffect } from 'react';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useFonts, Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigatorTheme, screenOptions } from  '../theme';
import { EventsProvider } from '../contexts/events';

import UserGreeting from './user-greeting';

import Home from './home';
import Diary from './diary';

preventAutoHideAsync(); 

const BottomTabsNavigator = createBottomTabNavigator({
  screenOptions,
  initialRouteName: 'Home',
  screens: {
    Diary: {
      screen: Diary,
      options: {
        headerShown: false
      }
    },
    Home: {
      screen: Home,
      options: {
        headerTitle: function() {
          return (
            <UserGreeting />
          );
        }
      }
    }
  }
});

const Navigation = createStaticNavigation(BottomTabsNavigator);

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
      <Navigation theme={ navigatorTheme } />
    </EventsProvider>
  );
}
