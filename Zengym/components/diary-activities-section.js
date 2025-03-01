import { useCallback } from 'react';
import DiarySection from './diary-section';
import { PersonSimpleTaiChi } from 'phosphor-react-native';

export default function ActivitiesDiarySection() {
  const onTotal = useCallback(function({ filteredEntries }) {
    return filteredEntries.length;
  }, []);

  return (
    <DiarySection
      type='ACTIVITY'
      label='Activity'
      editorName='DiaryActivityEditor'
      icon={ PersonSimpleTaiChi }
      title='Activities'
      onTotal={ onTotal }
      />
  );
};
