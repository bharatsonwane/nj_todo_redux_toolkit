import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { createTaskActions, retrieveTaskActions, updateTaskActions, deleteTaskActions } from "./task_actions"


const initialCompetitionState = {
  isLoading: false,
  payload: null,
  createTaskResponse: null,
  createTaskError: null,
  retrieveTaskResponse: null,
  retrieveTaskError: null,
  updateTaskResponse: null,
  updateTaskError: null,
  deleteTaskResponse: null,
  deleteTaskError: null,
};


export const taskSlice = createSlice({
  name: "taskReducer",
  initialState: initialCompetitionState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // CREATE TASK
      .addCase(createTaskActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createTaskActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createTaskResponse = action.payload;
      })
      .addCase(createTaskActions.rejected, (state, action) => {
        state.isLoading = false;
        state.createTaskError = action.meta.data
      })

      // RETREIVE TASK
      .addCase(retrieveTaskActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(retrieveTaskActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.retrieveTaskResponse = action.payload;
      })
      .addCase(retrieveTaskActions.rejected, (state, action) => {
        console.log("retrieveTaskErrorBharat", action)
        state.isLoading = false;
        state.retrieveTaskError = action.meta;
      })

      // UPDATE TASK
      .addCase(updateTaskActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateTaskActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateTaskResponse = action.payload;
      })
      .addCase(updateTaskActions.rejected, (state, action) => {
        state.isLoading = false;
        state.updateTaskError = action.meta;
      })

      // DELETE TASK
      .addCase(deleteTaskActions.pending, (state, action) => {
        state.isLoading = true
        state.deleteTaskResponse = null;
      })
      .addCase(deleteTaskActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteTaskResponse = action.payload;
      })
      .addCase(deleteTaskActions.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteTaskError = action.meta;
      })

      // // Hydrate case
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.taskReducer,
        }
      })
  },
});
