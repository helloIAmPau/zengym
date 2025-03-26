import { View, StyleSheet, Text } from 'react-native';
import Heading from './heading';
import CardContent from './card-content';

import theme from '../theme';

const styles = StyleSheet.create({
  footer: {
    fontFamily: theme.font,
    fontSize: theme.baseUnit,
    color: theme.color2
  }
});

export default function HomeCardContent({ completed, total, unit }) {
  return (
    <>
      <CardContent title={ completed } description={ unit || 'completed' } />
      <View className={ styles.footer }>
        <Text style={ styles.footer }>of { total } { unit }</Text>
      </View>
    </>
  );
};
