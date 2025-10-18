

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.bitechx.com', 
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.token;
    
    
    if (token && endpoint !== 'login') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});
