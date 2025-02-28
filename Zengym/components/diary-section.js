import { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Heading from './heading';
import DiarySectionAddItem from './diary-section-add-item';

import { CaretUp, CaretDown } from 'phosphor-react-native';

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default function DiarySection({ icon, title, initialOpen = true, entries = [], counter = -1, label, editorName }) {
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
  }, [ isOpen ])

  const content = useMemo(function() {
    if(isOpen === false) {
      return;
    }

    return (
      <DiarySectionAddItem label={ label } editorName={ editorName } />
    );
  }, [ isOpen, label, editorName ]);

  return (
    <View>
      <TouchableOpacity onPress={ toggle } style={ styles.title }>
        <Heading icon={ icon }>{ title } ({ counter })</Heading>
        { caret }
      </TouchableOpacity>
      { content }
    </View>
  );
};
