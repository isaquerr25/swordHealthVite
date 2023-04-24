import axios from 'axios';

// eslint-disable-next-line
const GIT_KEY = import.meta.env.VITE_GIT_KEY;

export const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: `Authorization: Bearer ${GIT_KEY}`,
});

export const getStarred = ({ queryKey }) => {
  const [_] = queryKey;
  return api.get('/user/starred').then((response) => response.data);
};

export const getLanguage = ({ queryKey }) => {
  const [_, { sort, language }] = queryKey;
  const params = {
    q: `language:${language} stars:>1000 license:mit`,
    sort,
    per_page: 15,
    page: 1,
  };
  return api
    .get('/search/repositories', { params })
    .then((response) => response.data.items);
};
