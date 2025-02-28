import { useMemo, useCallback } from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react-native';
import Heading from './heading';
import CalendarSelector from './calendar-selector';
import { Modal, useModal } from './modal';

import useDay from '../hooks/use-day';


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
  const { open, close, isOpen } = useModal();

  const onSelect = useCallback(function() {
    open(<CalendarSelector value={ value } onChange={ onChange } />)
  }, [ open, value ]);

  const onPrevious = useCallback(function() {
    onChange(value.subtract(1, 'day'));
  }, [ value ]);

  const onNext = useCallback(function() {
    onChange(value.add(1, 'day'));
  }, [ value ]);

  const handler = useCallback(function(value) {
    onChange(value);
    close();
  }, [ onChange, close ]);

  const { asLabel } = useDay(value);
  const dayLabel = asLabel();

  return (
    <>
      <Modal isOpen={ isOpen } close={ close } >
        <CalendarSelector value={ value } onChange={ handler } />
      </Modal>
      <View style={ styles.wrapper } >
        <TouchableOpacity onPress={ onPrevious }>
          <CaretDoubleLeft />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onSelect }>
          <Heading>{ dayLabel }</Heading>
        </TouchableOpacity>
        <TouchableOpacity onPress={ onNext }>
          <CaretDoubleRight />
        </TouchableOpacity>
      </View>
    </>
  );
};
