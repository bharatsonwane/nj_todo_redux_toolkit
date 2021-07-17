import { createSlice } from "@reduxjs/toolkit";

const initialCompetitionState = {
    serverCookie: "",
};


export const globalServerStateSlice = createSlice({
    name: "globalServerStateReducer",
    initialState: initialCompetitionState,

    reducers: {
        // // clientSideAuthGuard
        saveServerCookie: (state, action) => {
            state.serverCookie = action.payload;
        },

    },


    extraReducers: {

    },
});
