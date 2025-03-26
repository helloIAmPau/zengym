import { CheckFat } from 'phosphor-react-native';

import HomeCardBigIcon from './home-card-big-icon';

import theme from '../theme';

export default function HomeCardCompleted() {
  return (
    <HomeCardBigIcon icon={ CheckFat } color={ theme.success } label='Completed!' />
  );
};
