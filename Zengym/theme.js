import { DefaultTheme } from '@react-navigation/native';

export const theme = {
  base: '#FAF9FF',
  base2: '#FFFFFF',
  color: '#27292C',
  color2: '#9AA2AC',
  primary: '#9FDEF7',
  baseUnit: 16,
  font: 'Sora_400Regular',
  fontBold: 'Sora_600SemiBold',
  borderRadius: 4
};

export const screenOptions = {
  headerStyle: {
    backgroundColor: theme.base,
  },
  headerTitleAlign: 'left',
  headerShadowVisible: false
};

export const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.base
  }
};

