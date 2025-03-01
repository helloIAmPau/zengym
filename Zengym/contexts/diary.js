import { useContext, createContext, useMemo, useState, useLayoutEffect } from 'react';

import dayjs from 'dayjs';
import useDay from '../hooks/use-day';
import useSubscription from '../hooks/use-subscription';

const Context = createContext();

export const useDiary = function() {
  return useContext(Context);
};

export const DiaryProvider = function({ children }) {
  const [ day, setDay ] = useState(dayjs());
  const { format } = useDay(day);

  const { data: { diary }, isLoading } = useSubscription({
    query: `
query($day: Date!) {
  diary(day: $day) {
    uid,
    log_type,
    name,
    meta,
    food_quantity,
    food_calories,
    total_food_calories,
    completed
  }
}
    `,
    variables: useMemo(function() {
      return {
        day: format()
      };
    }, [ format ])
  }, [ 'FOOD', 'ACTIVITY' ]);

  const value = useMemo(function() {
    return {
      day,
      setDay,
      isLoading,
      diary
    };
  }, [ day, isLoading, diary ]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};
