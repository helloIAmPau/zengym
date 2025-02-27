import { useContext, createContext, useMemo, useState, useLayoutEffect } from 'react';
import useGraphql from '../hooks/use-graphql';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

const Context = createContext();

export const useDiary = function() {
  return useContext(Context);
};

export const DiaryProvider = function({ children }) {
  const [ day, setDay ] = useState(dayjs());

  const value = useMemo(function() {
    return {
      day,
      setDay
    };
  }, [ day ]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};
