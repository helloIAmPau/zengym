import { useState, useLayoutEffect } from 'react';

import Title from './title';
import Loading from './loading';
import useGraphql from '../hooks/use-graphql';

export default function UserGreeting() {
  const [ firstName, setFirstName ] = useState();

  const [ meQuery, isLoading ] = useGraphql(`
query {
  me {
    firstName
  }
}
  `, true);

  useLayoutEffect(function() {
    meQuery().then(function({ me }) {
      setFirstName(me.firstName);
    });
  }, [ meQuery ]);

  return (
    <Loading isLoading={ isLoading }>
      <Title>Hello { firstName }</Title>
    </Loading>
  );
};
