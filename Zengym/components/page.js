import { SafeAreaView, StyleSheet } from 'react-native';

import { theme } from '../theme.js';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    gap: 1.5 * theme.baseUnit,
    marginTop: 1.5 * theme.baseUnit,
    marginLeft: theme.baseUnit,
    marginRight: theme.baseUnit
  }
});

export default function Page({ children }) {
  return (
    <SafeAreaView style={ styles.page } >
      { children }
    </SafeAreaView>
  );
};
