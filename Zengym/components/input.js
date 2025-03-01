import { StyleSheet, View, TextInput } from 'react-native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color2,
    padding: 0.5 * theme.baseUnit,
    borderRadius: theme.borderRadius,
    gap: 0.5 * theme.baseUnit
  },
  input: {
    placeholderColor: theme.color2,
    flex: 1,
    fontFamily: theme.font
  }
});

export default function Input({ value, onChange, placeholder, icon: Icon }) {
  return (
    <View style={ styles.wrapper }>
      <Icon color={ theme.color2 } />
      <TextInput style={ styles.input } value={ value } onChangeText={ onChange } placeholderTextColor={ theme.color2 } placeholder={ placeholder } />
    </View>
  );
};
