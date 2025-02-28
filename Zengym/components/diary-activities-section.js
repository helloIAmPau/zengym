import { useMemo } from 'react';
import DiarySection from './diary-section';
import { PersonSimpleTaiChi } from 'phosphor-react-native';
import { useDiary } from '../contexts/diary';

export default function ActivitiesDiarySection() {
  const { entries } = useDiary();

  const activities = useMemo(function() {
    return entries.filter(function({ type }) {
      return type === 'ACTIVITY';
    });
  }, [ entries ]);

  return (
    <DiarySection editorName='DiaryActivityEditor' label='Activity' icon={ PersonSimpleTaiChi } title='Activities' entries={ activities } counter={ activities.length } />
  );
};
