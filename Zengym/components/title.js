import { View, StyleSheet } from 'react-native';
import Heading from './heading';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default function Title({ title }) {
  return (
    <View style={ styles.title }>
      <Heading>
        { title }
      </Heading>
    </View>
  );
};
