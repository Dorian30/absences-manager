import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';

import { setupStore, TRootState, TAppStore } from 'src/store';
import { THEMES, THEMES_TYPES } from 'src/constants';

export interface IExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<TRootState>;
  store?: TAppStore;
}

const DEFAULT_STATE: TRootState = {
  user: {
    theme: THEMES_TYPES.DARK
  }
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Uses default state if no preloadedState is provided
    preloadedState = DEFAULT_STATE,
    // Automatically create a store instance if no store is passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: IExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    const { user } = store.getState();
    return (
      <Provider store={store}>
        <ThemeProvider theme={THEMES[user.theme]}>{children}</ThemeProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}
