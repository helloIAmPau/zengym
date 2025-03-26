import { View, StyleSheet } from 'react-native';
import { CheckFat } from 'phosphor-react-native';

import Heading from './heading';

import theme from '../theme';

const styles = StyleSheet.create({
  homeCardBigIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.baseUnit * 0.25
  }
});

export default function HomeCardBigIcon({ color, icon: Icon, label }) {
  return (
    <View style={ styles.homeCardBigIcon }>
      <Icon weight='fill' color={ color } size={ theme.baseUnit * 3 } />
      <Heading variant='small' style={ { color } }>{ label }</Heading>
    </View>
  );
};
