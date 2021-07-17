import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

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
  reducers: {
    // // CREATE USER REDUCER
    createUser: (state, action) => {
      state.isLoading = true;
      state.createUserResponce = null;
      state.createUserError = null;
    },
    createUserSuccess: (state, action) => {
      state.isLoading = false;
      state.createUserResponce = action.payload;
    },
    createUserFailure: (state, action) => {
      state.isLoading = false;
      state.createUserError = action.payload;
    },

    // // SIGNIN USER REDUCER
    signInUser: (state, action) => {
      state.isLoading = true;
      state.signInUserResponce = null;
      state.signInUserError = null;
    },
    signInUserSuccess: (state, action) => {
      state.isLoading = false;
      state.signInUserResponce = action.payload;
    },
    signInUserFailure: (state, action) => {
      state.isLoading = false;
      state.signInUserError = action.payload;
    },


  },


  extraReducers: {

  },
});
