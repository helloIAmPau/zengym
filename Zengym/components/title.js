import { View, Text, StyleSheet } from 'react-native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fontBold,
    fontSize: 2 * theme.baseUnit
  },
  wrapper: {
    flexDirection: 'row',
    gap: 0.5 * theme.baseUnit,
    alignItems: 'center'
  }
});

export default function Title({ children, icon: Icon }) {
  if(Icon == null) {
    return (
      <Text style={ styles.title }>{ children }</Text>
    );
  }

  return (
    <View style={ styles.wrapper }>
      <Icon size={ 2.5 * theme.baseUnit } />
      <Text style={ styles.title }>{ children }</Text>
    </View>
  );
};
