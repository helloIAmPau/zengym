import { useMemo, useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Heading from './heading';

import { CaretUp, CaretDown } from 'phosphor-react-native';

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default function Accordion({ initialOpen = true, items, icon, title, total }) {
  const [ isOpen, setIsOpen ] =  useState(initialOpen);

  const toggle = useCallback(function() {
    setIsOpen(!isOpen);
  }, [ isOpen ]);

  const caret = useMemo(function() {
    if(isOpen === true) {
      return (
        <CaretUp />
      );
    }

    return (
      <CaretDown />
    );
  }, [ isOpen ]);

  const content = useMemo(function() {
    if(isOpen === false) {
      return;
    }

    return items;
  }, [ isOpen, items ]);

  return (
    <View>
      <TouchableOpacity onPress={ toggle } style={ styles.title }>
        <Heading icon={ icon }>{ title } ({ total })</Heading>
        { caret }
      </TouchableOpacity>
      { content }
    </View>
  );
};
