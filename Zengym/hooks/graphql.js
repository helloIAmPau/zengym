import { useLayoutEffect, useState, useMemo } from 'react';
import { useEvents } from '../contexts/events';

const client = function(query, variables = {}) {
  return fetch(`${ global.API_URL }/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then(function(response) {
    if(response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.json();
  }).then(function({ errors, data }) {
    if(Array.isArray(errors) === true) {
      throw new Error(errors[0].message);
    }

    return data;
  });
};

export const useSubscription = function({ query, variables }, events = []) {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ data, setData ] = useState({});
  const [ error, setError ] = useState();
  
  const { socket } = useEvents();

  useLayoutEffect(function() {
    if(socket == null) {
      return;
    }

    const handler = function() {
      setIsLoading(true);

      client(query, variables).then(function(data) {
        setData(data);
        setError();
      }).catch(function(error) {
        setData({});
        setError(error);
      }).finally(function() {
        setIsLoading(false);
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
    query,
    variables,
    socket,
    ...events
  ]);

  return useMemo(function() {
    return {
      isLoading,
      data,
      error
    };
  }, [ isLoading, data, error ])
};
