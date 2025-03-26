import { Text, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  heading: {
    fontFamily: theme.fontBold,
    fontSize: theme.baseUnit * 1.5,
    color: theme.color
  },
  small: {
    fontSize: theme.baseUnit
  }
});

export default function Heading({ children, variant, style }) {
  return (
    <Text style={ [ styles.heading, styles[variant] ].concat(style) }>{ children }</Text>
  );
};
