import { createSlice } from '@reduxjs/toolkit';

import { THEMES_TYPES } from 'src/constants';

export interface IUserState {
  theme: THEMES_TYPES;
}

export const initialState: IUserState = {
  theme: THEMES_TYPES.dark
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchTheme: state => {
      /* RTK allows us to write "mutating" logic in reducers. It
       * doesn't actually mutate the state because it uses the Immer library.
       */
      state.theme =
        state.theme === THEMES_TYPES.light
          ? THEMES_TYPES.dark
          : THEMES_TYPES.light;
    }
  }
});

// Action creators are generated for each case reducer function
export const { switchTheme } = userSlice.actions;

export default userSlice.reducer;
