import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Cities } from "../../interfaces/Cities.modal";
import { fetchByAutoComplete } from "../../services/autoComplete";

export const fetchCitiesBySearch = createAsyncThunk(
  "autoComplete/fetchByQuery",
  async (query: string, err) => {
    try {
      const data = await fetchByAutoComplete(query);
      return data;
    } catch (error: any) {
      err.rejectWithValue(error.message);
    }
  }
);

export interface State {
  cities: Cities[];
  status: boolean;
  error: any;
}

const initialState: State = {
  cities: [] as Cities[],
  status: false,
  error: null,
};

const citiesSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesBySearch.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchCitiesBySearch.fulfilled, (state, { payload }) => {
        state.status = false;
        state.cities = payload?.data as Cities[];
      })
      .addCase(fetchCitiesBySearch.rejected, (state, action) => {
        state.status = false;
        state.cities = [];
        state.error = action.error.message
      });
  },
});

export const { actions } = citiesSlice;

export default citiesSlice.reducer;
