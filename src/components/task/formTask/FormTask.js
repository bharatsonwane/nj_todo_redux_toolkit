import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import mdl from "./FormTask.module.scss"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { createTaskActions, updateTaskActions } from "src/redux/task_redux/task_actions"
import { toast } from 'react-toastify';

function FormTask(props) {

    // // ----------Localization hooks & Router Hooks-------------
    const router = useRouter();
    const { t } = useTranslation('task')


    // // ----------Props & context & ref ------------------------------
    // 1st way ==> get data from another component ==> by using props 
    let taskFieldProp = props.taskField
    let taskField = JSON.parse(JSON.stringify({ ...taskFieldProp })) //if orignal object is not muatable then first stringify it & then parse that object 
    const isTaskUpdate = props.isTaskUpdate


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer


    // // ----------hooks useState--------------------------------------------------
    const [task, setTask] = useStateCallback(taskField); // same API as useState + setState with class base
    const [err, setErr] = useStateCallback({
        idErr: "", titleErr: "", uiTechErr: "", backEndTechErr: "",
    })
    const [formEdit, setFormEdit] = useState(isTaskUpdate === true ? true : false)


    // // ----------hooks useEffect--------------------------------------------------
    const { id, date, title, description, technology, library } = task;
    const { idErr, titleErr, uiTechErr, backEndTechErr, } = err

    // // ***To check responce/error after success/error action from reducer***
    const { createTaskResponse, createTaskError, updateTaskResponse, updateTaskError, isLoading } = taskReducer
    const prevPropsState = usePrevious({ createTaskResponse, createTaskError, updateTaskResponse, updateTaskError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.createTaskResponse !== createTaskResponse && createTaskResponse) { // // createTaskResponse !== null && createTaskResponse !== undefined
                setTimeout(() => {
                    toast.success(t("Task Added successfully"))
                }, 500);
                router.replace(`/task/ssr/retrieve`);
            }
            else if (prevPropsState.createTaskError !== createTaskError && createTaskError) {
                setTimeout(() => {
                    toast.error(t("Not able to create task."))
                }, 500);
            }
            if (prevPropsState.updateTaskResponse !== updateTaskResponse && updateTaskResponse) {
                router.replace(`/task/ssr/retrieve`);
                setTimeout(() => {
                    toast.success(t("Task Updated successfully!"))
                }, 500);
            }
            else if (prevPropsState.updateTaskError !== updateTaskError && updateTaskError) {
                setTimeout(() => {
                    toast.error(t("Not able to edit task."))
                }, 500);
            }
        }
    }, [taskReducer])


    // // ----------handler functions--------------------------------------------------
    // HANDLE INPUT CHANGE
    const handleCommonInputChange = (e) => {
        // This function use for input where no vliadation required
        if (e.target.type === "checkbox") {
            let updatedTask = { ...task }
            updatedTask.library[e.target.name] = !updatedTask.library[e.target.name]
            setTask({ ...updatedTask })
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            // no any dropdown or radio button handle by handleCommonInputChange
        }
        else {
            setTask({ ...task, [e.target.name]: e.target.value })
        }
    };


    const handleTaskIdInputChange = (e) => {
        setTask({ ...task, id: e.target.value })
        handleValidateTaskId(e.target.value)
    }

    const handleTaskTitleInputChange = (e) => {
        setTask({ ...task, title: e.target.value })
        handleValidateTaskTitle(e.target.value)
    }

    const handleTaskUiTechInputChange = (e) => {
        // // // ###1st way to update nested state###
        let updatedTask = { ...task }
        updatedTask.technology.uiTech = e.target.value
        setTask({ ...updatedTask })
        handleValidateTaskUiTech(e.target.value)
    }

    const handleTaskBackEndTechInputChange = (e) => {
        // // // ###1st way to update nested state###
        let updatedTask = { ...task }
        updatedTask.technology.backEndTech = e.target.value
        setTask({ ...updatedTask })
        handleValidateTaskBackEndTech(e.target.value)
    }


    // // HANDLE ALL VALIDATION
    const handleValidateAll = () => {
        let isValidTaskId = handleValidateTaskId(task.id)
        let isValidTaskTitle = handleValidateTaskTitle(task.title)
        let isValidTaskUiTech = handleValidateTaskUiTech(task.technology.uiTech)
        let isValidTaskBackEndTech = handleValidateTaskBackEndTech(task.technology.backEndTech)

        return isValidTaskId && isValidTaskTitle && isValidTaskUiTech && isValidTaskBackEndTech
    }

    // // HANDLE INDIVIDUAL VALIDATION
    const handleValidateTaskId = (id) => {
        let idValue = id.trim()
        let idErr = ""
        let isValidReturn = false;

        if (idValue === "" || null) {
            idErr = t("ID must not be empty")
        }
        else if (idValue.trim().length < 3) {
            idErr = t('Id must be at least 3 characters!')
        }
        else {
            idErr = ""
            isValidReturn = true
        }

        // // ###1st way to update state in loop ###
        // err.idErr = idErr
        // setErr(prevState => ({ ...prevState, ...err })) // useState hook if we update errState normaly in loop then only last state will update 

        // // ###2nd way to update state in loop ###
        setErr(prevState => ({ ...prevState, idErr: idErr })) // useState hook if we update errState normaly in loop then only last state will update 

        return isValidReturn
    }


    const handleValidateTaskTitle = (title) => {
        let titleValue = title.trim()
        let titleErr = ""
        let isValidReturn = false;
        const regExp = /^[0-9a-zA-Z ]+$/
        if (titleValue.trim() === "") {
            titleErr = t("Title must not be empty")
        }
        else {
            if (titleValue.match(regExp)) {
                if (titleValue.trim().length < 5) {
                    titleErr = t("Title must contain at least 5 characters")
                }
                else if (titleValue.trim().length > 15) {
                    titleErr = t("Title must not exceed 15 characters")
                }
                else {
                    titleErr = ""
                    isValidReturn = true
                }
            }
            else {
                titleErr = t('Title must not contain any symbols')
            }
        }

        // // ###1st way to update state in loop ###
        // err.titleErr = titleErr
        // setErr(prevState => ({ ...prevState, ...err }))

        // // ###2nd way to update state in loop ###
        setErr(prevState => ({ ...prevState, titleErr: titleErr })) // useState hook if we update errState normaly in loop then only last state will update 

        return isValidReturn
    }


    const handleValidateTaskUiTech = (uiTech) => {
        let uiTechValue = uiTech
        let uiTechErr = ""
        let isValidReturn = false
        if (uiTechValue === "") {
            uiTechErr = t("Select UI Technology.")
        }
        else {
            uiTechErr = ""
            isValidReturn = true
        }
        // // ###1st way to update state in loop ###
        // err.uiTechErr = uiTechErr
        // setErr(prevState => ({ ...prevState, ...err }))

        // // ###2nd way to update state in loop ###
        setErr(prevState => ({ ...prevState, uiTechErr: uiTechErr })) // useState hook if we update errState normaly in loop then only last state will update 

        return isValidReturn
    }

    const handleValidateTaskBackEndTech = (backEndTech) => {
        const backEndTechValue = backEndTech
        let backEndTechErr = ""
        let isValidReturn = false

        if (backEndTechValue === "") {
            backEndTechErr = t("Select Back End Technology.")
        }
        else {
            backEndTechErr = ""
            isValidReturn = true
        }
        // // ###1st way to update state in loop ###
        // err.backEndTechErr = backEndTechErr
        // setErr(prevState => ({ ...prevState, ...err }))

        // // ###2nd way to update state in loop ###
        setErr(prevState => ({ ...prevState, backEndTechErr: backEndTechErr })) // useState hook if we update errState normaly in loop then only last state will update 

        return isValidReturn
    }



    const handleCreateTask = async (e) => {
        if (handleValidateAll()) {
            dispatch(createTaskActions(task))
        }
    }

    const handleUpdateTask = async (e) => {
        if (handleValidateAll()) {
            dispatch(updateTaskActions(task))
        }
    }

    const handleResetTask = () => {
        setTask({
            id: "",
            date: "",
            title: "",
            description: "",
            technology: { uiTech: "", backEndTech: "" },
            library: { redux: false, saga: false, numpy: false, pandas: false },
        })
        setErr({
            idErr: "",
            titleErr: "",
            uiTechErr: "",
            backEndTechErr: "",
        })
    }

    return (
        <div>
            <form name="myForm" className={allClass("", "formStyle", mdl)}>
                <div>
                    <div className={allClass("", "formField col", mdl)} >
                        <label className={allClass("", "formLable", mdl)} > {t("Task id.")} :</label>
                        <input disabled={formEdit} type="text" name="id" value={id} onChange={e => handleTaskIdInputChange(e)} className={allClass("", "text-field formInput", mdl)} placeholder={t("Enter task ID.")} /><br></br>
                    </div>
                    <small style={{ color: "red", position: "relative", left: "50%" }}>{idErr}</small>
                </div>

                <div className={allClass("", "formField col", mdl)} >
                    <label className={allClass("", "formLable", mdl)} >{t("Date")}:</label>
                    <input type="date" name="date" value={date} onChange={e => handleCommonInputChange(e)} className={allClass("", "text-field formInput", mdl)} />
                </div>

                <div>
                    <div className={allClass("", "formField col", mdl)} >
                        <label className={allClass("", "formLable", mdl)}>{t("Task Title")}:</label>
                        <input type="text" name="title" value={title} onChange={e => handleTaskTitleInputChange(e)} className={allClass("", "text-field formInput", mdl)} placeholder={t("Enter Task Title.")} />
                    </div>
                    <small style={{ color: "red", position: "relative", left: "50%" }}>{titleErr}</small>
                </div>
                <div className={allClass("", "formField col", mdl)} >
                    <label className={allClass("", "formLable", mdl)} >{t("Task description")} :</label>
                    <textarea rows="6" cols="30" name="description" value={description} onChange={e => handleCommonInputChange(e)} className={allClass("", "text-field formInput textarea", mdl)} />
                </div>
                <div>
                    <div className={allClass("", "formField col", mdl)} >
                        < div className={allClass("", "formLable", mdl)} > {t("UI Technology")}: </div>
                        <select name='uiTech' value={technology.uiTech} onChange={e => handleTaskUiTechInputChange(e)} className="form-dropdown text-field">
                            <option value="" > {t("Select")} </option>
                            <option value="react" > React </option>
                            <option value="angular"> Angular </option>
                            <option value="flutter"> Flutter </option>
                            <option value="vue.js"> Vue.js </option>
                        </select>
                    </div>
                    <small style={{ color: "red", position: "relative", left: "50%" }}>{uiTechErr}</small>
                </div>
                <div>
                    <div className={allClass("", "formField col", mdl)} >
                        <div className={allClass("", "formLable", mdl)} >{t("Back-End Technology")} :</div>
                        <label className={allClass("", "formBackEndLabel", mdl)}>Python
                            <input type="radio" name="backEndTech" value="python" onChange={e => handleTaskBackEndTechInputChange(e)} checked={technology.backEndTech === 'python'} />
                        </label>
                        <label className={allClass("", "formBackEndLabel", mdl)}>.NET
                            <input type="radio" name="backEndTech" value=".net" onChange={e => handleTaskBackEndTechInputChange(e)} checked={technology.backEndTech === '.net'} />
                        </label>
                        <label className={allClass("", "formBackEndLabel", mdl)}>PHP
                            <input type="radio" name="backEndTech" value="php" onChange={e => handleTaskBackEndTechInputChange(e)} checked={technology.backEndTech === 'php'} />
                        </label >
                    </div>
                    <small style={{ color: "red", position: "relative", left: "50%" }}>{backEndTechErr}</small>
                </div>
                <div className={allClass("", "formField col", mdl)} >
                    <div className={allClass("", "formLable", mdl)} >{t("Library Used")}:</div>
                    <label className={allClass("", "formLibraryLabel", mdl)}>Redux<input type="checkbox" name="redux" onChange={e => handleCommonInputChange(e)} checked={task.library.redux} /> </label>
                    <label className={allClass("", "formLibraryLabel", mdl)}>Saga<input type="checkbox" name="saga" onChange={e => handleCommonInputChange(e)} checked={task.library.saga} /> </label>
                    <label className={allClass("", "formLibraryLabel", mdl)}>Numpy<input type="checkbox" name="numpy" onChange={e => handleCommonInputChange(e)} checked={task.library.numpy} /> </label>
                    <label className={allClass("", "formLibraryLabel", mdl)}>Pandas<input type="checkbox" name="pandas" onChange={e => handleCommonInputChange(e)} checked={task.library.pandas} /></label>
                </div>


                {formEdit === false ?
                    <div className={allClass("", "field-btn formButton", mdl)}>
                        <button type='button' onClick={event => handleCreateTask(event)} className={allClass("btn btn-success", "buttonStyl", mdl)}>{t("Add Task")}</button>
                        <button type="reset" onClick={event => handleResetTask(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >{t("Reset")}</button>
                        <Link href='/task/ssr/retrieve'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></Link>
                    </div>
                    :
                    <div className={allClass("", "field-btn formButton", mdl)}>
                        <button type='button' onClick={event => handleUpdateTask(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>{t("Update Task")}</button>
                        <Link href='/task/ssr/retrieve'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></Link>
                    </div>
                }
            </form>
        </div>
    )
}

export default FormTask
