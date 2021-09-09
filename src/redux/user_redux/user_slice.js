import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { createUserActions, signInUserActions, retrieveUserDataActions } from "./user_action"


const initialCompetitionState = {
  isLoading: false,
  payload: null,
  createUserResponce: null,
  createUserError: null,
  signInUserResponce: null,
  signInUserError: null,
};


export const userSlice = createSlice({
  name: "userReducer",
  initialState: initialCompetitionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // // CREATE USER REDUCER
      .addCase(createUserActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createUserActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createUserResponce = action.payload;
      })
      .addCase(createUserActions.rejected, (state, action) => {
        state.isLoading = false;
        state.createUserError = action.meta.data;
      })

      // // SIGNIN USER REDUCER
      .addCase(signInUserActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(signInUserActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signInUserResponce = action.payload;
      })
      .addCase(signInUserActions.rejected, (state, action) => {
        state.isLoading = false;
        state.signInUserError = action.meta.data;
      })
  },
});
