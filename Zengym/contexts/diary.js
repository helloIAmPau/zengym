import { useContext, createContext, useMemo, useState, useLayoutEffect } from 'react';

import useGraphql from '../hooks/use-graphql';

import dayjs from 'dayjs';
import useDay from '../hooks/use-day';

const Context = createContext();

export const useDiary = function() {
  return useContext(Context);
};

export const DiaryProvider = function({ children }) {
  const [ day, setDay ] = useState(dayjs());
  const [ entries, setEmtries ] = useState([]);

  const { format } = useDay(day);

  const [ diaryQuery, isLoading ] = useGraphql(`
query($day: Date!) {
  diary(day: $day) {
    uid,
    log_type,
    name,
    description,
    food_quantity,
    food_calories,
    total_food_calories,
    completed
  }
}
  `, true);

  useLayoutEffect(function() {
    diaryQuery({
      day: format()
    }).then(function({ diary }) {
      setEntries(diary);
    });
  }, [ format ]);

  const value = useMemo(function() {
    return {
      day,
      setDay,
      isLoading,
      entries
    };
  }, [ day, isLoading, entries ]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};
