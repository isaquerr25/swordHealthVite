import { useNavigate } from 'react-router-dom';

export const validation = (values) => {
  const storage = JSON.parse(localStorage.getItem('valid'));
  if (
    storage &&
    (storage.username === values.username ||
      storage.email === values.username) &&
    storage.password === values.password
  ) {
    localStorage.setItem(
      'valid',
      JSON.stringify({ ...storage, logging: true })
    );
    return 'success';
  }
  if (
    !storage &&
    values.username === 'username' &&
    values.password === 'pass'
  ) {
    localStorage.setItem('valid', JSON.stringify({ ...values, logging: true }));
    // router('/discovery');
    return 'success';
  }
  return 'error';
};

export const isValid = () => {
  const router = useNavigate();
  const storage = JSON.parse(localStorage.getItem('valid'));
  if (storage && storage.logging === true) {
    return true;
  }
  router('/');
  return false;
};

export const alterUserInfo = (values) => {
  try {
    const storage = JSON.parse(localStorage.getItem('valid'));
    localStorage.setItem('valid', JSON.stringify({ ...storage, ...values }));
    return true;
  } catch (error) {
    return false;
  }
};

export const isLogout = () => {
  const value = alterUserInfo({ logging: false });
  if (value === true) {
    return true;
  }
  return false;
};
