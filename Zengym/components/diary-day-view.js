import Page from './page';
import DiaryDaySelector from './diary-day-selector'
import DiaryActivitiesSection from './diary-activities-section';
import DiaryNutritionSection from './diary-nutrition-section';

export default function Diary() {
  return (
    <Page>
      <DiaryDaySelector />
      <DiaryActivitiesSection />
      <DiaryNutritionSection />
    </Page>
  );
};
