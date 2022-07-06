import { createSlice } from "@reduxjs/toolkit";

export interface State {
  theme: boolean;
}

const initialState: State = {
  theme: false,
};

const themeToggleSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {
    changeThemeToggle: (state, action) => {
      state.theme = action.payload ;
    },

  },
});

export const { changeThemeToggle } = themeToggleSlice.actions;

export default themeToggleSlice.reducer;
