import { Fragment } from 'react'
import { wrapper } from 'src/redux/store'
import { retrieveTaskActions } from 'src/redux/task_redux/task_actions'
import RetrieveTaskStatic from 'src/components/task/retrieve/RetrieveTaskStatic'
import Head from 'next/head';


export default function RetrieveStatic() {

    return (
        <Fragment>
            <Head>
                <title>Statically Retrieve Task</title>
                <meta name="description" content="NextJs Todo Application's Static Retrieve page." />
            </Head>
            <RetrieveTaskStatic />
        </Fragment>
    )
}

RetrieveStatic.isRequiredClientSideAuthGuard = true



export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
    await store.dispatch(retrieveTaskActions());
    // let serverStore = store.getState()
    // let taskReducer = serverStore.taskReducer
    // let taskList = JSON.parse(taskReducer.retrieveResponce)

    return {
        props: {
            val: "val"
        },
        revalidate: 30, // on every 30 second static page will be regenerate on server
    };
});
