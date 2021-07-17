import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import mdl from './RetrieveDetailTask.module.scss'
import { allClass } from 'src/constants/customHooks/customModuleClassMethod'
import { usePrevious } from 'src/constants/customHooks/customHooks' // custome useStateCallback hook
import { useDispatch } from 'react-redux'
import { globalStateSaveActions } from "src/redux/globalClientState_redux/globalClientState_actions"
import { deleteTaskActions } from "src/redux/task_redux/task_actions"
import { toast } from 'react-toastify';



function RetrieveDetailTask(props) {


    // // ----------Localization hooks & Router Hooks-------------
    const router = useRouter();

    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // const reducerState = useSelector(
    //     (state) => (state)
    // );
    // let globalClientStateReducer = reducerState.globalClientStateReducer
    // let task = globalClientStateReducer.task
    // let taskReducer = reducerState.taskReducer
    let task = props.task
    let taskReducer = props.taskReducer


    // // ----------hooks useState--------------------------------------------------



    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { deleteResponce, deleteError } = taskReducer
    const prevPropsState = usePrevious({ deleteResponce, deleteError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.deleteResponce !== deleteResponce && deleteResponce) {
                router.replace(`/task/ssr/retrieve`);
                setTimeout(() => {
                    toast.success("Task deleted successfully")
                }, 500);
            } else if (prevPropsState.deleteError !== deleteError && deleteError) {
                setTimeout(() => {
                    toast.error("Error occure during deleting Task")
                }, 500);
            }
        }
    }, [taskReducer])



    // // ----------handler functions--------------------------------------------------
    const handleDeleteTask = (id) => {
        dispatch(deleteTaskActions(id))
    }

    const handleUpdateTask = (task) => {
        dispatch(globalStateSaveActions(task))
        router.replace(`/task/ssg/update/${task.id}`);
    }

    const { id, date, title, description, technology, library } = task
    let libraryList = []
    if (library.redux === true) {
        libraryList.push("redux")
    }
    if (library.saga === true) {
        libraryList.push("saga")
    }
    if (library.numpy === true) {
        libraryList.push("numpy")
    }
    if (library.pandas === true) {
        libraryList.push("pandas")
    }

    return (
        <React.Fragment>
            <Head>
                <title>{task && task.title ? task.title : "Task Detail"}</title>
                <meta name="description" content={`NextJs Todo Application's Task Detail Page`} />
                {task && task.title && <meta name="description" content={task.title} />}
            </Head>
            <div className={allClass("", "header", mdl)}>
                <h3>Task Detail By using {" "} <span style={{ color: 'orange' }}>getServerSideProps</span></h3>
                <div >
                    <Link href={`/task/ssr/retrieve`} ><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Go Back</button></Link>
                    <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleUpdateTask(task)} > Edit </button>
                    <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => handleDeleteTask(task.id)} > Delete </button>
                </div>
            </div>
            <div className={allClass("", "container", mdl)}>
                <table className={allClass("", "tableStyle", mdl)} >
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>{date}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{title}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <th>UI Technology</th>
                            <td>{technology.uiTech}</td>
                        </tr>
                        <tr>
                            <th>Back End Technology</th>
                            <td>{technology.backEndTech}</td>
                        </tr>
                        <tr>
                            <th>Library Used</th>
                            <td>
                                {libraryList.join(", ")}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default RetrieveDetailTask
