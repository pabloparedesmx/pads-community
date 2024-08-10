import axios from 'axios';

export const createXanoClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_XANO_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    get: (url) => client.get(url).then((res) => res.data),
    post: (url, data) => client.post(url, data).then((res) => res.data),
  };
};
