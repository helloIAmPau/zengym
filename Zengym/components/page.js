import { View, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingLeft: theme.baseUnit,
    paddingRight: theme.baseUnit,
    gap: theme.baseUnit * 1.5
  }
});

export default function Page({ children }) {
  return (
    <View style={ styles.page }>
      { children }
    </View>
  );
};
