import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit';

import user from './user';

const rootReducer = combineReducers({
  user
});

export const setupStore = (preloadedState?: PreloadedState<TRootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export const store = setupStore();

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
