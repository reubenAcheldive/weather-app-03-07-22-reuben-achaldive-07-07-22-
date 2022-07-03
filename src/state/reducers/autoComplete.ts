import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AutoComplete } from "../../interfaces/AutoComplete.modal";

export interface State {
  state: AutoComplete | null;
}

const initialState: State = {
  state: null,
};


const autoCompleteSlice = createSlice({
    name:"auto-complete",
    initialState,
    reducers:{}
})

export const {actions} = autoCompleteSlice;

export default autoCompleteSlice.reducer
