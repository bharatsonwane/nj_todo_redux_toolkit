import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import FormTask from 'src/components/task/formTask/FormTask';
import Head from 'next/head';



export default function Update() {

    const reducerState = useSelector(
        (state) => (state)
    );
    let globalClientStateReducer = reducerState.globalClientStateReducer
    let taskField = globalClientStateReducer.task
    let isTaskUpdate = true



    return (
        <Fragment>
            <Head>
                <title>{taskField && taskField.title ? taskField.title : "Task Update"}</title>
                <meta name="description" content={`NextJs Todo Application's Task Update Page`} />
                {taskField && taskField.title && <meta name="description" content={taskField.title} />}
            </Head>
            {taskField &&
                <FormTask taskField={taskField} isTaskUpdate={isTaskUpdate} />
            }
        </Fragment>
    )
}

 Update.isRequiredClientSideAuthGuard = true

