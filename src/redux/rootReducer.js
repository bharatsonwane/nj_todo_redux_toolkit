import { combineReducers } from "redux";
import { globalClientStateSlice } from './globalClientState_redux/globalClientState_slice'
import { globalServerStateSlice } from "./globalServerState_redux/globalServerState_slice";
import { taskSlice } from './task_redux/task_slice';
import { userSlice } from "./user_redux/user_slice";


//Combined all reducer to root reducer
export const rootReducer = combineReducers({
  globalClientStateReducer: globalClientStateSlice.reducer,
  globalServerStateReducer: globalServerStateSlice.reducer,
  taskReducer: taskSlice.reducer,
  userReducer: userSlice.reducer,
});
