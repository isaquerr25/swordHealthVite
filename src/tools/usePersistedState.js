import { useState, useEffect } from 'react';

export default function usePersistedState(storageKey, defaultState) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : defaultState;
    } catch (error) {
      return defaultState;
    }
  });

  useEffect(() => {
    const stateJson = JSON.stringify(state);
    localStorage.setItem(storageKey, stateJson);
  }, [state]);

  return [state, setState];
}
