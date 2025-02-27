import { useMemo, useCallback } from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react-native';
import Heading from './heading';

import { useDiary } from '../contexts/diary';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  previous: {},
  next: {},
  label: {}
});


export default function DaySelector({ value, onChange }) {
  const { day, setDay } = useDiary();

  const onPrevious = useCallback(function() {
    setDay(day.subtract(1, 'day'));
  }, [ day ]);

  const onNext = useCallback(function() {
    setDay(day.add(1, 'day'));
  }, [ day ]);

  const dayLabel = useMemo(function() {
    return day.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'D MMM YYYY'
    });
  }, [ day ]);

  return (
    <View style={ styles.wrapper } >
      <TouchableOpacity onPress={ onPrevious }>
        <CaretDoubleLeft />
      </TouchableOpacity>
      <TouchableOpacity>
        <Heading>{ dayLabel }</Heading>
      </TouchableOpacity>
      <TouchableOpacity onPress={ onNext }>
        <CaretDoubleRight />
      </TouchableOpacity>
    </View>
  );
};
