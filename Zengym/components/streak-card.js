import { StyleSheet } from 'react-native';
import CardContent from './card-content';

import theme from '../theme';

const styles = StyleSheet.create({
  streakCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  }
});

export default function StreakCard() {
  return (
    <CardContent style={ styles.streakCard } title={ 4 } description='days streak' />
  );
};
