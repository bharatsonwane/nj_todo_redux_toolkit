import { puppetterSlice } from "./puppetter_slice";
const { actions } = puppetterSlice;
import axiosConfig from 'src/constants/common/axiosConfig';
import axiosNextConfig from "src/constants/common/axiosNextConfig";
import axios from "axios";

// // CREATE USER ACTIONS
export const retrievePdfActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.retrievePdf());

        // using interceptor for axios
        const response = await axiosNextConfig().post(`/api/puppetter`, model)
        console.log(response)

        // dispatch success action
        dispatch(actions.retrievePdfSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.retrievePdfFailure({ error }));
    }
}


