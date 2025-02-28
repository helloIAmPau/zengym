import { StyleSheet, View } from 'react-native';
import Heading from './heading';
import { theme } from '../theme';

export default function Title({ children, icon }) {
  return (
    <Heading icon={ icon } size={ 2 }>{ children }</Heading>
  );
};
