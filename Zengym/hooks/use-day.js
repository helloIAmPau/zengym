import { useCallback, useMemo } from 'react';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export default function(value) {
  const format = useCallback(function() {
    return value.format('YYYY-MM-DD');
  }, [ value ]);

  const asLabel = useCallback(function() {
    return value.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'D MMM YYYY'
    });
  }, [ value ]);

  return useMemo(function() {
    return {
      asLabel,
      format
    };
  }, [ format, asLabel ]);
};
