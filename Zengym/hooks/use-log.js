import { useCallback } from 'react';
import useGraphql from './use-graphql';

export default function() {
  const [ logMutation, isLoading ] = useGraphql(`
mutation($logInput: LogInput!) {
  log(logInput: $logInput)
}
  `);

  const log = useCallback(function(logInput) {
    return logMutation({
      logInput
    });
  }, [ logMutation ]);

  return [
    log,
    isLoading
  ];
};
