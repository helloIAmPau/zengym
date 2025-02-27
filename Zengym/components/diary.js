import Page from './page';
import Title from './title';
import DaySelector from './day-selector'
import { BookOpenText } from 'phosphor-react-native';

import { DiaryProvider } from '../contexts/diary';

export default function Diary() {
  return (
    <Page>
      <Title icon={ BookOpenText }>Diary</Title>
      <DiaryProvider>
        <DaySelector />
      </DiaryProvider>
    </Page>
  );
};
