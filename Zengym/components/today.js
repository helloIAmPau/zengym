import { useMemo, useState, useLayoutEffect, useCallback } from 'react';

import Card from './card';
import TodaySummaryEmpty from './today-summary-empty';
import TodaySummary from './today-summary';
import Loading from './loading';

import { useNavigation } from '@react-navigation/native';

import useGraphql from '../hooks/use-graphql';

export default function Today() {
  const { navigate } = useNavigation();
  const [ info, setInfo ] = useState({});

  const [ todayQuery, isLoading ] = useGraphql(`
query {
  today {
    nutrition {
      pending
      completed
      total
    }
    activities {
      pending
      completed
      total
    }
  }
}
  `, true);

  const onClick = useCallback(function() {
    navigate('Diary');
  }, [ navigate ]);

  useLayoutEffect(function() {
    todayQuery().then(function({ today }) {
      setInfo(today);
    }).catch(function(error) {
      console.log(error);
    });
  }, [ todayQuery ]);

  const content = useMemo(function() {
    if(isLoading === true) {
      return;
    }

    if(info.nutrition.total === 0 && info.activities.total === 0) {
      return (
        <TodaySummaryEmpty />
      );
    }

    return (
      <TodaySummary info={ info } />
    );
  }, [ info, isLoading ]);

  return (
    <Loading isLoading={ isLoading }>
      <Card onClick={ onClick }>
        { content }
      </Card>
    </Loading>
  );
};
