import { configureStore } from '@reduxjs/toolkit';
import { echoSocketApi } from '../features/chat/echoSocket';
import { postsApi } from '../features/posts/postsApi';
import { authApi } from '../features/auth/authApi'; 

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    [postsApi.reducerPath]: postsApi.reducer,
    [echoSocketApi.reducerPath]: echoSocketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postsApi.middleware)
      .concat(echoSocketApi.middleware),
});
