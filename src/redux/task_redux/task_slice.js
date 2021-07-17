import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialCompetitionState = {
  isLoading: false,
  payload: null,
  createResponce: null,
  createError: null,
  retrieveResponce: null,
  retrieveError: null,
  updateResponce: null,
  updateError: null,
  deleteResponce: false,   // true || false
  deleteError: null,
};


export const taskSlice = createSlice({
  name: "taskReducer",
  initialState: initialCompetitionState,
  reducers: {
    // // CREATE TASK REDUCER
    createTask: (state, action) => {
      state.isLoading = true;
      state.createResponce = null;
      state.createError = null;
    },
    createTaskSuccess: (state, action) => {
      state.isLoading = false;
      state.createResponce = action.payload;
    },
    createTaskFailure: (state, action) => {
      state.isLoading = false;
      state.createError = action.payload;
    },

    // // RETRIEVE TASK REDUCER
    retrieveTask: (state, action) => {
      state.isLoading = true;
      state.retrieveResponce = null;
      state.retrieveError = null;
    },
    retrieveTaskSuccess: (state, action) => {
      state.isLoading = false;
      state.retrieveResponce = action.payload;
    },
    retrieveTaskFailure: (state, action) => {
      state.isLoading = false;
      state.retrieveError = action.payload;
    },

    // // UPDATE TASK REDUCER
    updateTask: (state, action) => {
      state.isLoading = true;
      state.updateResponce = null;
      state.updateError = null;
    },
    updateTaskSuccess: (state, action) => {
      state.isLoading = false;
      state.updateResponce = action.payload;
    },
    updateTaskFailure: (state, action) => {
      state.isLoading = false;
      state.updateError = action.payload;
    },

    // // DELETE TASK REDUCER
    deleteTask: (state, action) => {
      state.isLoading = true;
      state.deleteResponce = false;      // true || false
      state.deleteError = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.isLoading = false;
      state.deleteResponce = true;
    },
    deleteTaskFailure: (state, action) => {
      state.isLoading = false;
      state.deleteError = action.payload;
    },
  },


  extraReducers: {
    // // Hydrate
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.taskReducer,
      };
    },
  },
});
