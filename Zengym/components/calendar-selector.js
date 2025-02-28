import { useCallback, useState } from 'react';

import { View, StyleSheet } from 'react-native';
import Heading from './heading';
import Button from './button';
import DateTimePicker from 'react-native-ui-datepicker';
import { Check } from 'phosphor-react-native';

import { theme } from '../theme';

import useDay from '../hooks/use-day';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  wrapper: {
    gap: 0.5 * theme.baseUnit,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0.5 * theme.baseUnit
  },
  calendar_selected: {
    color: theme.color
  }
});

export default function CalendarSelector({ value, onChange, label='Select day' }) {
  const [ selectedDate, setSelectedDate ] = useState(value);

	const onDateChanged = useCallback(function({ date }) {
    setSelectedDate(date);
  }, []);

  const onClick = useCallback(function() {
    onChange(selectedDate);
  }, [ selectedDate ])

  const onToday = useCallback(function() {
    setSelectedDate(dayjs());
  }, []);

  const { asLabel } = useDay(selectedDate);
  
  return (
    <View style={ styles.wrapper }>
      <View style={ styles.heading }>
        <Heading>{ label }</Heading>
        <View style={ styles.toolbar }>
          <Button onClick={ onToday } type='inverted'>Today</Button>
          <Button onClick={ onClick } icon={ Check }>Save</Button>
        </View>
      </View>
      <DateTimePicker selectedTextStyle={ styles.calendar_selected } selectedItemColor={ theme.primary } mode='single' onChange={ onDateChanged } date={ selectedDate } />
    </View>
  );
};
