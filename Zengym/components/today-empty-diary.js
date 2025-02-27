import { View, StyleSheet } from 'react-native';
import { BookOpen } from 'phosphor-react-native';

import P from './p';
import Heading from './heading';

import { theme } from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: theme.baseUnit
  },
  empty_text: {
    color: theme.color2
  }
});

export default function TodayEmptyDiary() {
  return (
    <View style={ styles.wrapper }>
      <BookOpen size={ 3 * theme.baseUnit } />
      <View>
        <P style={ styles.empty_text }>Nothing to do for today.</P>
        <Heading>Start planning!</Heading>
      </View>
    </View>
  );
};
