import { createStackNavigator } from '@react-navigation/stack';

import Title from './title';
import DiaryDayView from './diary-day-view';
import DiaryActivityEditor from './diary-activity-editor';
import { BookOpenText, CaretLeft, PersonSimpleTaiChi } from 'phosphor-react-native';
import { DiaryProvider } from '../contexts/diary';

import { screenOptions } from  '../theme';

const diaryScreenOptions = function({ route }) {
  return {
    ...screenOptions,
    headerBackTitle: '',
    headerBackImage: function() {
      return (
        <CaretLeft />
      );
    },
    headerTitle: function() {
      if(route.name === 'DiaryDayView') {
        return (
          <Title icon={ BookOpenText }>Diary</Title>
        );
      }

      if(route.name === 'DiaryActivityEditor') {
        return (
          <Title icon={ PersonSimpleTaiChi }>Activity</Title>
        );
      }
    }
  };
};

const { Navigator, Screen } = createStackNavigator();

export default function Diary() {
  return (
    <DiaryProvider>
      <Navigator screenOptions={ diaryScreenOptions } initialRouteName='DiaryDayView'>
        <Screen name='DiaryActivityEditor' component={ DiaryActivityEditor } />
        <Screen name='DiaryDayView' component={ DiaryDayView } />
      </Navigator>
    </DiaryProvider>
  );
};
