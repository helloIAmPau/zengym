import { useLayoutEffect, useCallback, useContext, createContext, useMemo, useState } from 'react';

const Context = createContext();

export const useForm = function() {
  return useContext(Context);
};

export const Form = function({ children, defaults = {}, onSubmit, onValidate }) {
  const [ values, setValues ] = useState(defaults);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isDirty, setIsDirty ] = useState(false);

  const [ isValid, setIsValid ] = useState(true);
  const [ errors, setErrors ] = useState({});

  const register = useCallback(function(name) {
    return {
      name,
      value: values[name],
      error: errors[name],
      onChange: function(value) {
        setValues({
          ...values,
          [ name ]: value
        });

        setIsDirty(true);
      }
    };
  }, [ values, errors ]);

  const submit = useCallback(function() {
    setIsLoading(true);

    return Promise.resolve().then(function() {
      return onSubmit(values);
    }).finally(function() {
      setIsLoading(false);
    });
  }, [ values, onSubmit ]);

  useLayoutEffect(function() {
    let isValid = true;
    const errors = {};

    const onError = function(field, message) {
      isValid = false;
      errors[field] = message;
    };
    onValidate({ values, onError });

    setIsValid(isValid);
    setErrors(errors);
  }, [ values ]);

  const value = useMemo(function() {
    return {
      values,
      register,
      isDirty,
      isLoading,
      isValid,
      disabled: isDirty === false || isLoading === true || isValid === false,
      submit
    };
  }, [ values, register, isDirty, isLoading, isValid, onSubmit ]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};
