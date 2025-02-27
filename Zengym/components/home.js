import Page from './page';
import UserGreeting from './user-greeting';
import Today from './today';

export default function Home() {
  return (
    <Page>
      <UserGreeting />
      <Today />
    </Page>
  );
};
