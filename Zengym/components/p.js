import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  p: {
    fontFamily: theme.font,
    fontSize: theme.baseUnit,
    lineHeight: 1.5 * theme.baseUnit
  }
});

export default function P({ children, style }) {
  return (
    <Text style={ [ styles.p ].concat(style) }>{ children }</Text>
  );
};
