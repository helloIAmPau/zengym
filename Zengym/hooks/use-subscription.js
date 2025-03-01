import { useLayoutEffect, useState, useMemo } from 'react';

import useGraphql from './use-graphql';
import { useEvents } from '../contexts/events';

export default function({ query, variables }, events) {
  const [ client, isLoading ] = useGraphql(query, true);
  const [ data, setData ] = useState({});
  const { socket } = useEvents();

  useLayoutEffect(function() {
    if(socket == null) {
      return;
    }

    const handler = function() {
      client(variables).then(function(data) {
        setData(data);
      });
    };
    events.forEach(function(evt) {
      socket.on(evt, handler);
    });
    handler();

    return function() {
      events.forEach(function(evt) {
        socket.off(evt, handler);
      });
    };
  }, [
    socket,
    client,
    variables,
    ...events
  ]);

  return useMemo(function() {
    return {
      isLoading,
      data
    };
  }, [ isLoading, data ]);
};
