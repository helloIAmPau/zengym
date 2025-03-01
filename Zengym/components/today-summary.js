import { View, StyleSheet } from 'react-native';
import { Carrot, PersonSimpleTaiChi } from 'phosphor-react-native';
import TodaySummaryColumn from './today-summary-column';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default function TodaySummary({ info }) {
  return (
    <View style={ styles.wrapper }>
      <TodaySummaryColumn label='Activities' icon={ PersonSimpleTaiChi } info={ info.activities } />
      <TodaySummaryColumn label='Nutrition' icon={ Carrot } info={ info.nutrition } />
    </View>
  );
};
