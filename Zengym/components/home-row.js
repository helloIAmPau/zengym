import { View, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  homeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default function HomeRow({ children }) {
  return (
    <View style={ styles.homeRow }>
      { children }
    </View>
  );
};
