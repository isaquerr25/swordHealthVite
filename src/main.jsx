import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import { StorageBookingProvider } from './contexts/storageBooking';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StorageBookingProvider>
        <App />
      </StorageBookingProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
