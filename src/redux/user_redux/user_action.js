import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosNextConfig from "src/helper/config/axiosNextConfig";




// // CREATE USER ACTIONS
export const createUserActions = createAsyncThunk(
    "user/createUser",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosNextConfig().post(`/api/authJWT/create`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], error.response);
        }
    }
);


// // SIGNIN USER ACTIONS
export const signInUserActions = createAsyncThunk(
    "user/signin",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosNextConfig().post(`/api/authJWT/signin`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], error.response);
        }
    }
);


// // USER TOKEN EXPIRY ACTIONS
export const userTokenExpiryActions = (model) => async (dispatch) => {

    if (typeof window !== "undefined") {
        console.log("tokenExpiryonClientSideResponse")
    }
}


// // RETRIEVE USER ACTIONS
export const retrieveUserDataActions = createAsyncThunk(
    "user/signin",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosNextConfig().post(`/api/authUser`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], error.response);
        }
    }
);
