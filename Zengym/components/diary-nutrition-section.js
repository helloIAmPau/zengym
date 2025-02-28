import { useMemo } from 'react';
import DiarySection from './diary-section';
import { Carrot } from 'phosphor-react-native';
import { useDiary } from '../contexts/diary';

export default function NutritionDiarySection() {
  const { entries } = useDiary();

  const foods =  useMemo(function() {
    return entries.map(function({ type }) {
      type === 'FOOD';
    });
  }, [ entries ]);

  const totalCalories = useMemo(function() {
    return foods.reduce(function(main_total, { total_calories }) {
      return main_total + total_calories;
    }, 0);
  }, [ foods ]);

  return (
    <DiarySection label='Food' icon={ Carrot } title='Nutrition' entries={ foods } counter={ `${ totalCalories } Kcal` } />
  );
};
