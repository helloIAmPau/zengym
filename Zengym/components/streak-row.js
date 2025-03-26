import { View, StyleSheet } from 'react-native';

import StreakWeek from './streak-week';
import StreakCard from './streak-card';

import theme from '../theme';

const styles = StyleSheet.create({
  streakRow: {
    flexDirection: 'row',
    gap: theme.baseUnit,
    alignItems: 'center'
  }
});

export default function StreakRow() {
  return (
    <View style={ styles.streakRow }>
      <StreakWeek />
      <StreakCard />
    </View>
  );
};
