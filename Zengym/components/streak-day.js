import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckCircle, XCircle } from 'phosphor-react-native';

import Heading from './heading';

import theme from '../theme';

const styles = StyleSheet.create({
  streakDay: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.baseUnit * 0.25
  }
});

export default function StreakDay({ day, completed }) {
  const icon = useMemo(function() {
    if(completed === true) {
      return (
        <CheckCircle color={ theme.success } size={ theme.baseUnit * 1.5 } weight='fill' />
      );
    }

    return (
      <XCircle color={ theme.danger } size={ theme.baseUnit * 1.5 } weight='fill' />
    )
  }, [ completed ]);

  return (
    <View style={ styles.streakDay }>
      <Heading variant='small'>{ day }</Heading>
      { icon }
    </View>
  );
};
