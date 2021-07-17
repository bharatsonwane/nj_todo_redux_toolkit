import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialCompetitionState = {
  isLoading: false,
  payload: null,
  retrievePdfResponce: null,
  retrievePdfError: null,
};


export const puppetterSlice = createSlice({
  name: "puppetterReducer",
  initialState: initialCompetitionState,
  reducers: {
    // // CREATE USER REDUCER
    retrievePdf: (state, action) => {
      state.isLoading = true;
      state.retrievePdfResponce = null;
      state.retrievePdfError = null;
    },
    retrievePdfSuccess: (state, action) => {
      state.isLoading = false;
      state.retrievePdfResponce = action.payload;
    },
    retrievePdfFailure: (state, action) => {
      state.isLoading = false;
      state.retrievePdfError = action.payload;
    },

    // // AUTH USER REDUCER

  },


  extraReducers: {

  },
});
