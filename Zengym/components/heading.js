import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  heading: {
    fontFamily: theme.fontBold
  },
  wrapper: {
    flexDirection: 'row',
    gap: 0.5 * theme.baseUnit
  }
});

export default function Heading({ children, icon: Icon, size = 1, color = theme.color }) {
  const extendedStyle = useMemo(function() {
    return {
      fontSize: size * theme.baseUnit,
      lineHeight: (size + 0.5) * theme.baseUnit,
      color
    };
  }, [ size, color ]);

  if(Icon == null) {
    return (
      <Text style={ [ styles.heading ].concat(extendedStyle) }>{ children }</Text>
    );
  }

  return (
    <View style={ styles.wrapper }>
      <Icon color={ color } size={ (size + 0.5) * theme.baseUnit } />
      <Text style={ [ styles.heading ].concat(extendedStyle) }>{ children }</Text>
    </View>
  );
};
