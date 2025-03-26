import { TouchableOpacity, StyleSheet } from 'react-native';
import { UserCircle } from 'phosphor-react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  userProfileButton: {
    marginRight: theme.baseUnit
  }
});

export default function UserProfileButton() {
  return (
    <TouchableOpacity style={ styles.userProfileButton }>
      <UserCircle size={ theme.baseUnit * 1.75 } weight='bold' color={ theme.color } />
    </TouchableOpacity>
  );
};
