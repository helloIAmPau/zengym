import { useState, useCallback } from 'react';

export default function(query, initialIsLoading) {
  const [ isLoading, setIsLoading ] = useState(initialIsLoading);

  const client = useCallback(function(variables = {}) {
    setIsLoading(true);
    console.log(variables);

    return fetch(`${ global.API_HOST }/graphql`, {
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
    }).finally(function() {
      setIsLoading(false);
    });
  }, [ query ]);

  return [
    client,
    isLoading
  ];
};
