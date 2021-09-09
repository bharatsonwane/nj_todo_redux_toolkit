import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import mdl from './RetrieveDetailTask.module.scss'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { globalStateSaveActions } from "src/redux/globalClientState_redux/globalClientState_actions"
import { deleteTaskActions } from "src/redux/task_redux/task_actions"
import { toast } from 'react-toastify';



function RetrieveDetailTaskStatic(props) {


    // // ----------Localization hooks & Router Hooks-------------
    const router = useRouter();

    // // ----------Props & context & ref ------------------------------
    let task = props.task


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer


    // // ----------hooks useState--------------------------------------------------



    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { deleteTaskResponse, deleteTaskError } = taskReducer
    const prevPropsState = usePrevious({ deleteTaskResponse, deleteTaskError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.deleteTaskResponse !== deleteTaskResponse && deleteTaskResponse) {
                router.push(`/task/ssr/retrieve`);
                setTimeout(() => {
                    toast.success("Task deleted successfully")
                }, 500);
            } else if (prevPropsState.deleteTaskError !== deleteTaskError && deleteTaskError) {
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
        router.push(`/task/ssg/update/${task.id}`);
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
            <div className={allClass("", "header", mdl)}>
                <h3>Task Detail By using {" "}
                    <span style={{ color: 'orange' }}>getStaticPaths</span> {" "} & {" "}
                    <span style={{ color: 'red' }}>getStaticProps</span>
                </h3>
                <div >
                    <Link href={`/task/ssg/retrieve`} ><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Go Back</button></Link>
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

export default RetrieveDetailTaskStatic
