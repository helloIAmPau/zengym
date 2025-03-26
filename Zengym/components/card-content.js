import { View, StyleSheet } from 'react-native';
import Heading from './heading';

import theme from '../theme';

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    paddingTop: theme.baseUnit * 0.5,
    paddingBottom: theme.baseUnit * 0.5,
    gap: theme.baseUnit * 0.25
  },
  unit: {
    lineHeight: theme.baseUnit
  }
});

export default function CardContent({ title, description, style }) {
  return (
    <View style={ [ styles.content ].concat(style) }>
      <Heading>{ title }</Heading>
      <Heading style={ styles.unit } variant='small'>{ description }</Heading>
    </View>
  );
};
