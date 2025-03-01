import { useLayoutEffect, useState, useContext, createContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const Context = createContext();

export const useEvents = function() {
  return useContext(Context);
};

export const EventsProvider = function({ children }) {
  const [ socket, setSocket ] = useState();

  useLayoutEffect(function() {
    const socket = io(global.API_URL, {
      path: '/events',
    });
    socket.on('connect', function() {
      console.log('Event socket connected');
    });
    socket.on('disconnect', function() {
      console.log('Event socket disconnected');
    });
    socket.on('connect_error', function(error) {
      console.log(error);
    });

    setSocket(socket);

    return function() {
      socket.disconnect();
      setSocket();
    };
  }, []);

  const value = useMemo(function() {
    return {
      socket
    };
  }, [ socket ]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};
