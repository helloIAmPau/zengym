import { TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.base2,
    borderRadius: theme.borderRadius,
    padding: theme.baseUnit
  }
});

export default function Card({ children, onClick, style = [] }) {
  return (
    <TouchableOpacity onPress={ onClick } style={ [ styles.card ].concat(style) }>
      { children }
    </TouchableOpacity>
  );
};
