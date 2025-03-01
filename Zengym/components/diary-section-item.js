import { useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Heading from './heading';
import { CheckCircle, Circle } from 'phosphor-react-native';
import useLog from '../hooks/use-log';

import { theme } from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 0.75 * theme.baseUnit,
    paddingBottom: 0.75 * theme.baseUnit,
    flexDirection: 'row',
    gap: 0.5 * theme.baseUnit
  },
  completed: {
    fontFamily: theme.font,
    textDecorationLine: 'line-through'
  }
});

export default function DiarySectionItem({ uid, color, title, completed, icon, editorName }) {
  const { navigate } = useNavigation();
  const [ log ] = useLog();

  const toggleCompleted = useCallback(function() {
    return log({
      uid,
      completed: !completed
    });
  }, [ completed, log, uid ]);

  const CurrentIcon = useMemo(function() {
    if(icon != null) {
      return icon;
    }

    if(completed === true) {
      return CheckCircle;
    }

    return Circle;
  }, [ icon, completed ]);

  const completed_style = useMemo(function() {
    if(completed !== true) {
      return
    }

    return styles.completed;
  }, [ completed ]);

  const selectedButtonDisabled = useMemo(function() {
    return uid == null;
  }, [ uid ]);

  const onPress = useCallback(function() {
    navigate(editorName, {
      uid
    });
  }, [ editorName, navigate, uid ]);

  return (
    <View style={ styles.wrapper }>
      <TouchableOpacity onPress={ toggleCompleted } disabled={ selectedButtonDisabled }>
        <CurrentIcon color={ color } />
      </TouchableOpacity>
      <TouchableOpacity onPress={ onPress }>
        <Heading textStyle={ completed_style } color={ color }>{ title }</Heading>
      </TouchableOpacity>
    </View>
  );
};
