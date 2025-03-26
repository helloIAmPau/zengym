import Page from './page';

import HomeRow from './home-row';
import NutritionCard from './nutrition-card';
import ActivitiesCard from './activities-card';
import StreakRow from './streak-row';

export default function Home() {
  return (
    <Page>
      <StreakRow />
      <HomeRow>
        <NutritionCard />
        <ActivitiesCard />
      </HomeRow>
    </Page>
  );
};
