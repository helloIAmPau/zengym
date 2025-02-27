import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  heading: {
    fontFamily: theme.fontBold,
    fontSize: theme.baseUnit,
    lineHeight: 1.5 * theme.baseUnit
  }
});

export default function Heading({ children }) {
  return (
    <Text style={ styles.heading }>{ children }</Text>
  );
};
