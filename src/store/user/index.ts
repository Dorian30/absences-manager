import { createSlice } from '@reduxjs/toolkit';

import { THEMES_TYPES } from 'src/constants';

export interface IUserState {
  theme: THEMES_TYPES;
}

export const initialState: IUserState = {
  theme: THEMES_TYPES.DARK
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchTheme: state => {
      /* RTK allows us to write "mutating" logic in reducers. It
       * doesn't actually mutate the state because it uses the Immer library.
       */
      console.log({ state });
      state.theme =
        state.theme === THEMES_TYPES.LIGHT
          ? THEMES_TYPES.DARK
          : THEMES_TYPES.LIGHT;
    }
  }
});

// Action creators are generated for each case reducer function
export const { switchTheme } = userSlice.actions;

export default userSlice.reducer;
