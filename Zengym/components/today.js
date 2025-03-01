import { useMemo, useState, useLayoutEffect, useCallback } from 'react';

import Card from './card';
import TodaySummaryEmpty from './today-summary-empty';
import TodaySummary from './today-summary';
import Loading from './loading';

import { useNavigation } from '@react-navigation/native';
import useSubscription from '../hooks/use-subscription';

export default function Today() {
  const { navigate } = useNavigation();

  const { data: { today }, isLoading } = useSubscription({
    query: `
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
    `
  }, [ 'FOOD', 'ACTIVITY' ]);

  const onClick = useCallback(function() {
    navigate('Diary');
  }, [ navigate ]);

  const content = useMemo(function() {
    if(isLoading === true) {
      return;
    }

    if(today.nutrition.total === 0 && today.activities.total === 0) {
      return (
        <TodaySummaryEmpty />
      );
    }

    return (
      <TodaySummary info={ today } />
    );
  }, [ today, isLoading ]);

  return (
    <Loading isLoading={ isLoading }>
      <Card onClick={ onClick }>
        { content }
      </Card>
    </Loading>
  );
};
