import { userSlice } from "./user_slice";
const { actions } = userSlice;
import axiosNextConfig from "src/constants/common/axiosNextConfig";


// // CREATE USER ACTIONS
export const createUserActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.createUser());

        // using interceptor for axios
        const response = await axiosNextConfig().post(`/api/authJWT/create`, model)

        // dispatch success action
        dispatch(actions.createUserSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.createUserFailure({ error }));
    }
}


// // SIGNIN USER ACTIONS
export const signInUserActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.signInUser());

        // using interceptor for axios
        const response = await axiosNextConfig().post(`/api/authJWT/signin`, model)

        // dispatch success action
        dispatch(actions.signInUserSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.signInUserFailure({ error }));
    }
}


// // USER TOKEN EXPIRY ACTIONS
export const userTokenExpiryActions = (model) => async (dispatch) => {

    if (typeof window !== "undefined") {
        console.log("tokenExpiryonClientSideResponse")
    }
}


// // RETRIEVE USER ACTIONS
export const retrieveUserDataActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.retrieveUserData());

        // using interceptor for axios
        const response = await axiosNextConfig().post(`/api/authUser`, model)

        // dispatch success action
        dispatch(actions.retrieveUserDataSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.retrieveUserDataFailure({ error }));
    }
}

