import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NoInternet from './page/noInternetWarning';
import LoginPage from './page/login';
import Username from './page/username';
import Discovery from './page/discovery';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);
  return isOnline ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />{' '}
        <Route path="/discovery" element={<Discovery />} />{' '}
        <Route path="/profile" element={<Username />} />{' '}
      </Routes>
    </BrowserRouter>
  ) : (
    <NoInternet />
  );
}

export default App;
