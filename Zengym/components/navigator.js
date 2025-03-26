import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, createStaticNavigation } from '@react-navigation/native';

import Home from './home';
import HomeTitle from './home-title';
import UserProfileButton from './user-profile-button';

import theme from '../theme';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.base
  }
};

const stackNavigator = createStackNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: theme.base,
    },
    headerTitleAlign: 'left',
    headerShadowVisible: false
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        headerTitle: HomeTitle,
        headerRight: UserProfileButton
      }
    }
  }
});

const Navigation = createStaticNavigation(stackNavigator);

export default function Navigator() {
  return (
    <Navigation theme={ navigatorTheme } />
  );
}
