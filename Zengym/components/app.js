import { useLayoutEffect } from 'react';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useFonts, Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { DefaultTheme, createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from  '../theme';

import Home from './home';
import Diary from './diary';

preventAutoHideAsync(); 

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.base
  }
};

const BottomTabsNavigator = createBottomTabNavigator({
  initialScreen: 'Home',
  screenOptions: {
    headerShown: false
  },
  screens: {
    Home,
    Diary
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
    <Navigation theme={ navigatorTheme } />
  );
}
