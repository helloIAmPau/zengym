import { Carrot } from 'phosphor-react-native';
import HomeCard from './home-card';

export default function NutritionCard() {
  return (
    <HomeCard icon={ Carrot } title='Nutrition' completed={ 1340 } unit='KCal' total={ 2340 } />
  );
};
