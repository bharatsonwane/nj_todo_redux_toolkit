import { createSlice } from "@reduxjs/toolkit";

const initialCompetitionState = {
    pathName: "",
    isAuthenticated: false,
    task: null,
};


export const globalClientStateSlice = createSlice({
    name: "globalClientStateReducer",
    initialState: initialCompetitionState,

    reducers: {
        // // clientSideAuthGuard
        clientSideAuthGuard: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        // // CREATE TASK REDUCER
        globalStateSave: (state, action) => {
            state.task = action.payload;
        },

    },


    extraReducers: {

    },
});
