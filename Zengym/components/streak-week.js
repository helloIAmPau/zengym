import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import StreakDay from './streak-day';

import theme from '../theme';

const styles = StyleSheet.create({
  streakWeekView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default function StreakWeek() {
  const days = useMemo(function() {
    return [{
      day: '2022-01-01',
      label: 'T',
      completed: true
    }, {
      day: '2022-01-02',
      label: 'F',
      completed: false
    }, {
      day: '2022-01-03',
      label: 'S',
      completed: false
    }, {
      day: '2022-01-04',
      label: 'S',
      completed: true
    }, {
      day: '2022-01-05',
      label: 'M',
      completed: true
    }, {
      day: '2022-01-06',
      label: 'T',
      completed: true
    }, {
      day: '2022-01-07',
      label: 'W',
      completed: true
    }].map(function({ day, label, completed }) {
      return (
        <StreakDay key={ day } day={ label } completed={ completed } />
      );
    });
  }, []);

  return (
    <View style={ styles.streakWeekView }>
      { days }
    </View>
  );
};
