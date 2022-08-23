import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { absencesApi } from 'src/services';

import user from './user';

const rootReducer = combineReducers({
  user,
  [absencesApi.reducerPath]: absencesApi.reducer
});

export const setupStore = (preloadedState?: PreloadedState<TRootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(absencesApi.middleware),
    preloadedState
  });
};

export const store = setupStore();
setupListeners(store.dispatch);

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
