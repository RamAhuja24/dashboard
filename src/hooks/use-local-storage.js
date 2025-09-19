import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }

    try {
      const parsed = JSON.parse(storedValue);
      return parsed;
    } catch {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const update = useCallback(
    (name, updateValue) => {
      setState((prevValue) => {
        const newValue = {
          ...prevValue,
          [name]: updateValue,
        };

        localStorage.setItem(key, JSON.stringify(newValue));

        return newValue;
      });
    },
    [key]
  );

  const reset = useCallback(() => {
    setState(defaultValue);
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [defaultValue, key]);

  return {
    state,
    update,
    reset,
  };
}