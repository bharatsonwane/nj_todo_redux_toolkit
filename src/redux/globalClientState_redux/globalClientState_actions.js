import { globalClientStateSlice } from "./globalClientState_slice";
const { actions } = globalClientStateSlice;


// // SET IS CLIENTSIDE AUTHENTICAT
export const clientSideAuthGuardAction = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        console.log("model", model)
        dispatch(actions.clientSideAuthGuard(model))
    } catch (error) {
        // dispatch failure action

    }
}



// // CREATE TASK ACTIONS
export const globalStateSaveActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.globalStateSave(model));
    } catch (error) {
        // dispatch failure action

    }
}
