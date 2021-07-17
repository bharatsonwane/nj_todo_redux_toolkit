import React, { Fragment } from 'react'
import Head from 'next/head';
import axiosConfig from 'src/constants/common/axiosConfig'
import { wrapper } from 'src/redux/store'
import { retrieveTaskActions } from 'src/redux/task_redux/task_actions'
import RetrieveDetailTaskStatic from 'src/components/task/retrieveDetail/RetrieveDetailTaskStatic'


export default function RetrieveDetail(props) {
    let task = props.task



    return (
        <Fragment>
            <Head>
                <title>{task && task.title ? task.title : "Task Detail"}</title>
                <meta name="description" content={`NextJs Todo Application's Task Detail Page`} />
                {task && task.title && <meta name="description" content={task.title} />}
            </Head>
            {task &&
                <RetrieveDetailTaskStatic task={task} />
            }
        </Fragment>
    )
}

RetrieveDetail.isRequiredClientSideAuthGuard = true


async function retrieveTask() {
    const response = await axiosConfig().get(`/todo`)
    return await response.data
}


export async function getStaticPaths() {
    const data = await retrieveTask()
    let taskList = JSON.parse(data)
    const ids = taskList.map(task => task.id)
    const pathsWithParams = ids.map(id => ({ params: { retrieveDetailId: `${id}` } }))

    return {
        fallback: true, // false or true or 'blocking'
        paths: pathsWithParams,
    };
}


export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
    let retrieveDetailId = params.retrieveDetailId
    await store.dispatch(retrieveTaskActions());
    let serverStore = store.getState()
    let taskReducer = serverStore.taskReducer
    let taskList = JSON.parse(taskReducer.retrieveResponce)
    let selectedTask = taskList.find(task => `${task.id}` === retrieveDetailId)

    return {
        props: {
            task: selectedTask
        },
        revalidate: 30, // on every 30 second static page will be regenerate on server
    };
});
