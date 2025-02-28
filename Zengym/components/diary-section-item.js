import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 0.75 * theme.baseUnit,
    paddingBottom: 0.75 * theme.baseUnit,
    flexDirection: 'row',
    gap: 0.5 * theme.baseUnit
  }
});

export default function DiarySectionItem({ children, editorName, uid, style }) {
  const { navigate } = useNavigation();

  const onPress = useCallback(function() {
    navigate(editorName, {
      uid
    });
  }, [ editorName, navigate, uid ]);

  return (
    <TouchableOpacity style={ [ styles.wrapper ].concat(style) } onPress={ onPress }>
      { children }
    </TouchableOpacity>
  );
};
