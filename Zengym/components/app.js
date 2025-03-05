import { useLayoutEffect } from 'react';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useFonts, Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigatorTheme, screenOptions } from  '../theme';
import { EventsProvider } from '../contexts/events';

import { UserFocus } from 'phosphor-react-native';

import UserGreeting from './user-greeting';
import Title from './title';

import Home from './home';
import Diary from './diary';
import Metrics from './metrics';

preventAutoHideAsync(); 

const BottomTabsNavigator = createBottomTabNavigator({
  screenOptions,
  initialRouteName: 'Home',
  screens: {
    Metrics: {
      screen: Metrics,
      options: {
        headerTitle: function() {
          return (
            <Title icon={ UserFocus }>Metrics</Title>
          );
        }
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
    },
    Diary: {
      screen: Diary,
      options: {
        headerShown: false
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
