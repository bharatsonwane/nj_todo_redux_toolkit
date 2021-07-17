import React, { Fragment } from 'react'
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FormTask from 'src/components/task/formTask/FormTask'


export default function Create() {
    const taskField = {
        id: "",
        date: "",
        title: "",
        description: "",
        technology: { uiTech: "", backEndTech: "" },
        library: { redux: false, saga: false, numpy: false, pandas: false }
    }
    const isTaskUpdate = false
    return (
        <Fragment>
            <Head>
                <title>Create New Task</title>
                <meta name="description" content="NextJs Todo Application's Create New Task page." />
            </Head>
            <FormTask taskField={taskField} isTaskUpdate={isTaskUpdate} />
        </Fragment>
    )
}

Create.isRequiredClientSideAuthGuard = true

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['navbarMenu', 'task']),
    },
})