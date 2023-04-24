import { createContext, useState } from 'react';
import usePersistedState from '../../tools/usePersistedState';

export const StorageBookingContext = createContext();

export function StorageBookingProvider({ children }) {
  const [storageBooking, setStorageBooking] = usePersistedState(
    'bookmarked-repos',
    []
  );

  return (
    <StorageBookingContext.Provider value={[storageBooking, setStorageBooking]}>
      {children}
    </StorageBookingContext.Provider>
  );
}
