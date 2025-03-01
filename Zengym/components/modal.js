import { useMemo, useState, useCallback } from 'react';
import { View, Modal as RNModal, TouchableOpacity, StyleSheet } from 'react-native';

import { theme } from '../theme';

export const useModal = function() {
  const [ isOpen, setIsOpen ] = useState(false);

  const open = useCallback(function() {
    setIsOpen(true);
  }, []);

  const close = useCallback(function() {
    setIsOpen(false);
  }, []);

  return useMemo(function() {
    return {
      isOpen,
      open,
      close
    }
  }, [ isOpen, open, close ]);
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column-reverse',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    backgroundColor: theme.base2,
    borderTopLeftRadius: 2 * theme.borderRadius,
    borderTopRightRadius: 2 * theme.borderRadius,
    paddingTop: theme.baseUnit,
    paddingRight: 0.75 * theme.baseUnit,
    paddingLeft: 0.75 * theme.baseUnit,
    paddingBottom: 0.75 * theme.baseUnit
  },
  backdrop: {
    flex: 1
  }
});

export const Modal = function({ children, isOpen, close }) {
  return (
    <RNModal transparent animationType='fade' visible={ isOpen }>
      <View style={ styles.wrapper }>
        <View style={ styles.content }>
          { children }
        </View>
        <TouchableOpacity style={ styles.backdrop } onPress={ close } />
      </View>
    </RNModal>
  );
};
