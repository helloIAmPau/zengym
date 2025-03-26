import { FireSimple } from 'phosphor-react-native';
import HomeCard from './home-card';

export default function ActivitiesCard() {
  return (
    <HomeCard icon={ FireSimple } title='Activities' completed={ 10 } total={ 10 } />
  );
};
