import { globalServerStateSlice } from "./globalServerState_slice";
const { actions } = globalServerStateSlice;


// // SET IS CLIENTSIDE AUTHENTICAT
export const saveServerCookieActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.saveServerCookie(model))
    } catch (error) {
        // dispatch failure action
    }
}
