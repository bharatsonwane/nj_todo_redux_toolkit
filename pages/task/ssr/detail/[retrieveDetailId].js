import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import RetrieveDetailTask from 'src/components/task/retrieveDetail/RetrieveDetailTask'



export default function RetrieveDetail() {


    // // ----------Localization hooks & Router Hooks-------------

    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const reducerState = useSelector((state) => (state));
    let globalClientStateReducer = reducerState.globalClientStateReducer
    let task = globalClientStateReducer.task
    let taskReducer = reducerState.taskReducer


    // // ----------hooks useState--------------------------------------------------




    return (
        <Fragment>
            {task && taskReducer &&
                <RetrieveDetailTask taskReducer={taskReducer} task={task} />
            }
        </Fragment>
    )
}

RetrieveDetail.isRequiredClientSideAuthGuard = true
