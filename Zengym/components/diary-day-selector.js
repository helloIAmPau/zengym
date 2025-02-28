import { useDiary } from '../contexts/diary';
import DaySelector from './day-selector';

export default function DiaryDaySelector() {
  const { day, setDay } = useDiary();

  return (
    <DaySelector value={ day } onChange={ setDay } />
  );
};
