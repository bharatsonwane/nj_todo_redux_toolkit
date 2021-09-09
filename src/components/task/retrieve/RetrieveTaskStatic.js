import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import mdl from './RetrieveTask.module.scss'
import { usePrevious } from 'src/helper/customHooks/customHooks'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskActions } from 'src/redux/task_redux/task_actions'
import { globalStateSaveActions } from 'src/redux/globalClientState_redux/globalClientState_actions'
import { toast } from 'react-toastify';


function RetrieveTaskStatic(props) {
    const router = useRouter();


    let dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer
    let taskList
    if (reducerState && taskReducer.retrieveTaskResponse) {
        // taskList = JSON.parse(taskReducer.retrieveTaskResponse) // parse data
        taskList = taskReducer.retrieveTaskResponse
    }




    // const [taskList, setTaskList] = useState(taskData)



    // // ----------hooks useEffect--------------------------------------------------
    // called only first time i.e. like componentDidMount()
    // useEffect(() => {
    //     handleRetrieveTask()
    // }, [])

    let isLoading = taskReducer.isLoading
    // let taskList = JSON.parse(taskReducer.retrieveTaskResponse)
    // // ***To check responce/error after success/error action from reducer***
    const { retrieveTaskResponse, retrieveTaskError, deleteTaskResponse, deleteTaskError } = taskReducer
    const prevPropsState = usePrevious({ retrieveTaskResponse, retrieveTaskError, deleteTaskResponse, deleteTaskError }) // custom hook to get previous props & state

    // called when its dependency changes i.e. like componentDidUpdate()
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.retrieveTaskResponse !== retrieveTaskResponse && retrieveTaskResponse) {
                // setTaskList(JSON.parse(retrieveTaskResponse))
            }
            if (prevPropsState.retrieveTaskError !== retrieveTaskError && retrieveTaskError) {
                setTimeout(() => {
                    toast.error("Something went wrong.")
                }, 500);
            }
            else if (prevPropsState.deleteTaskResponse !== deleteTaskResponse && deleteTaskResponse) {
                setTimeout(() => {
                    toast.success("Task deleted successfully")
                }, 500);
            }
            else if (prevPropsState.deleteTaskError !== deleteTaskError && deleteTaskError) {
                setTimeout(() => {
                    toast.error("Something went wrong. can not be delete task")
                }, 500);
            }
        }
    }, [taskReducer])



    // // ----------handler functions--------------------------------------------------
    // const handleRetrieveTask = () => {
    //     dispatch(retrieveTaskActions.retrieve())
    // }

    const handleDeleteTask = (task) => {
        dispatch(deleteTaskActions(task.id))
    }

    const handleUpdateTask = (task) => {
        dispatch(globalStateSaveActions(task))
        router.push(`/task/ssg/update/${task.id}`);
    }

    const handleTaskDetail = (task) => {
        dispatch(globalStateSaveActions(task))
        router.push(`/task/ssg/detail/${task.id}`)
    }

    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <h3>Task List By using <span style={{ color: 'red' }}>getStaticProps</span></h3>
                    {taskList != null && taskList[0] ?
                        <table className={allClass("table border shadow", "tableStyle", mdl)}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Sr.NO.</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskList && taskList.map((task, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{task.id}</td>
                                        <td>{task.date}</td>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <button
                                                className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}
                                                onClick={(e) => handleTaskDetail(task)} >
                                                Details
                                            </button>
                                            <button
                                                className={allClass("btn btn-warning", "buttonStyl", mdl)}
                                                onClick={() => handleUpdateTask(task)}
                                                type="button">
                                                Edit
                                            </button>
                                            <button
                                                className={allClass("btn btn-danger", "buttonStyl", mdl)}
                                                onClick={() => handleDeleteTask(task)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : <h3>Task List is not available.</h3>}
                </div>
            </div>
        </div>
    )
}

export default RetrieveTaskStatic
