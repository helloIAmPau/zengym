import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Heading from './heading';
import P from './p';

import { Confetti, SmileySad } from 'phosphor-react-native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 0.5 * theme.baseUnit
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    color: theme.color2
  },
  completed_heading: {
    gap: 0.25 * theme.baseUnit
  }
});

export default function TodaySummaryColumn({ icon: Icon, info, label }) {
  const values = useMemo(function() {
    if(info.total === 0) {
      return (
        <Heading style={ styles.completed_heading } icon={ SmileySad }>No Entries</Heading>
      );
    }

    if(info.total === info.completed) {
      return (
        <Heading style={ styles.completed_heading } icon={ Confetti }>Completed</Heading>
      );
    }

    return (
      <Heading>{ info.pending } of { info.total } left</Heading>
    );
  }, [ info ]);

  return (
    <View style={ styles.wrapper }>
      <Icon size={ 2 * theme.baseUnit } />
      <View style={ styles.textWrapper }>
        <P style={ styles.label }>{ label }</P>
        { values }
      </View>
    </View>
  );
};
