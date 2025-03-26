import { SmileyXEyes } from 'phosphor-react-native';
import HomeCardBigIcon from './home-card-big-icon';

import theme from '../theme';

export default function HomeCardNoPlans() {
  return (
    <HomeCardBigIcon icon={ SmileyXEyes } color={ theme.danger } label='No Plans' />
  );
};
