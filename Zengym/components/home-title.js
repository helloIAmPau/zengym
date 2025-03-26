import { useMemo } from 'react';
import { useSubscription } from '../hooks/graphql';

import Title from './title';
import UserProfileButton from './user-profile-button';

export default function HomeTitle() {
  const { data: { me }, isLoading } = useSubscription({
    query: useMemo(function() {
      return `
query {
  me {
    firstName
  }
}
      `;
    }, [])
  });

  if(isLoading === true) {
    return;
  }

  return (
    <Title title={ `Hello ${ me.firstName }` }>
      <UserProfileButton />
    </Title>
  );
};
