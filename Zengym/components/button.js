import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 0.25 * theme.baseUnit,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0.5 * theme.baseUnit,
    paddingBottom: 0.5 * theme.baseUnit,
    paddingLeft: 0.75 * theme.baseUnit,
    paddingRight: 0.75 * theme.baseUnit,

    borderRadius: 0.5 * theme.borderRadius
  },
  primary: {
    backgroundColor: theme.primary
  },
  inverted: {
    borderWidth: 1,
    borderColor: theme.primary
  }
});


export default function Button({ children, icon: Icon, onClick, type = 'primary' }) {
  if(Icon == null) {
    return (
      <TouchableOpacity onPress={ onClick } style={ [ styles.wrapper, styles[type] ] }>
        <Text>{ children }</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={ onClick } style={ [ styles.wrapper, styles[type] ] }>
      <Icon size={ theme.baseUnit } />
      <Text>{ children }</Text>
    </TouchableOpacity>
  );
};
