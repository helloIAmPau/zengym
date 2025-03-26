import { View, StyleSheet } from 'react-native';
import Heading from './heading';

import theme from '../theme';

const styles = StyleSheet.create({
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.baseUnit * 0.25,
  },
  heading: {
    flex: 1
  }
});

export default function CardHeading({ children, icon: Icon }) {
  return (
    <View style={ styles.cardHeading }>
      <Icon color={ theme.color } size={ 1.25 * theme.baseUnit } weight='fill'/>
      <Heading style={ styles.heading } variant='small'>{ children }</Heading>
    </View>
  );
};
