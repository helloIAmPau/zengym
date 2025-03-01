import { useCallback } from 'react';
import DiarySection from './diary-section';
import { Carrot } from 'phosphor-react-native';

export default function NutritionDiarySection() {
  const onTotal = useCallback(function({ filteredEntries }) {
    const total = filteredEntries.reduce(function(main_total, { total_calories }) {
      return main_total + total_calories;
    }, 0);

    return `${ total } Kcal`;
  }, []);

  return (
    <DiarySection
      type='FOOD'
      label='Food'
      editorName='DiaryFoodEditor'
      icon={ Carrot }
      title='Nutrition'
      onTotal={ onTotal }
      />
  );
};
