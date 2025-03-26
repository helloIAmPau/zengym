import { StyleSheet, View, TouchableOpacity } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.base2,
    borderRadius: theme.baseUnit,
    padding: theme.baseUnit
  }
});

export default function Card({ children, style }) {
  return (
    <TouchableOpacity style={ [ styles.card ].concat(style) }>
      { children }
    </TouchableOpacity>
  );
};
