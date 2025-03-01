import { useMemo } from 'react';
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

    borderRadius: theme.borderRadius
  },
  disabled: {
    opacity: 0.4
  },
  primary: {
    backgroundColor: theme.primary
  },
  inverted: {
    borderWidth: 1,
    borderColor: theme.primary
  }
});


export default function Button({ children, icon: Icon, onClick, type = 'primary', disabled=false }) {
  const content = useMemo(function() {
    if(Icon == null) {
      return (
        <Text>{ children }</Text>
      );
    }

    return (
      <>
        <Icon size={ theme.baseUnit } />
        <Text>{ children }</Text>
      </>
    );
  }, [ Icon ]);

  const disabled_style = useMemo(function() {
    if(disabled === false) {
      return;
    }

    return styles.disabled;
  }, [ disabled ]);

  return (
    <TouchableOpacity disabled={ disabled } onPress={ onClick } style={ [ styles.wrapper, styles[type], disabled_style ] }>
      { content }
    </TouchableOpacity>
  );
};
