import { taskSlice } from "./task_slice";
const { actions } = taskSlice;
import axiosConfig from 'src/constants/common/axiosConfig';
import {store} from 'src/redux/store'

// // CREATE TASK ACTIONS
export const createTaskActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.createTask());

        // using interceptor for axios
        const response = await axiosConfig().post(`/todo`, model)

        // dispatch success action
        dispatch(actions.createTaskSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.createTaskFailure({ error }));
    }
}


// // RETRIEVE TASK ACTIONS
export const retrieveTaskActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.retrieveTask());
        // using interceptor for axios
        const response = await axiosConfig().get(`/todo`)

        // dispatch success action
        dispatch(actions.retrieveTaskSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.retrieveTaskFailure({ error }));
    }
}


// // UPDATE TASK ACTIONS
export const updateTaskActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.updateTask());

        // using interceptor for axios
        const response = await axiosConfig().put(`/todo`, model)

        // dispatch success action
        dispatch(actions.updateTaskSuccess(response.data));
    } catch (error) {
        // dispatch failure action
        dispatch(actions.updateTaskFailure({ error }));
    }
}


// // DELETE TASK ACTIONS
export const deleteTaskActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        dispatch(actions.deleteTask());

        // using interceptor for axios
        const response = await axiosConfig().delete(`/todo/${model}`)

        // dispatch success action
        dispatch(actions.deleteTaskSuccess(response.data));
        dispatch(retrieveTaskActions())                //dispatch retrieve action after deleting action 

    } catch (error) {
        // dispatch failure action
        dispatch(actions.deleteTaskFailure({ error }));
    }
}
