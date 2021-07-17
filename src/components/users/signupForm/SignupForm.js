import React, { Fragment, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import mdl from "./signupForm.module.scss"
import { allClass } from 'src/constants/customHooks/customModuleClassMethod';
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { createUserActions } from "src/redux/user_redux/user_action"


function SignupForm(props) {

    // // ----------Localization hooks & Router Hooks-------------
    const router = useRouter();
    const { t } = useTranslation('userData')


    // // ----------Props & context & ref ------------------------------
    let formFieldProps = props.formField
    let formField = JSON.parse(JSON.stringify({ ...formFieldProps })) //if orignal object is not muatable then first stringify it & then parse that object 
    const isFormUpdate = props.isFormUpdate

    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector(
        (state) => (state)
    );


    // // ----------hooks useState--------------------------------------------------
    const [userData, setUserData] = useState(formField)

    const [userErr, setUserErr] = useState({
        emailErr: "",
        fullNameErr: "",
        dobErr: "",
        passwordErr: "",
        confirmPasswordErr: "",
    })


    // // ----------hooks useEffect--------------------------------------------------
    const { email, fullName, dob, password, confirmPassword } = userData;
    const { emailErr, fullNameErr, dobErr, passwordErr, confirmPasswordErr, } = userErr



    // // HANDLE INPUT CHANGE
    const handleEmailInputChange = (e) => {
        setUserData({ ...userData, email: e.target.value })
        handleValidateEmailId(e.target.value)
    }

    const handlefullNameInputChange = (e) => {
        setUserData({ ...userData, fullName: e.target.value })
        handleValidateFullName(e.target.value)
    }

    const handleUserDOBInputChange = (e) => {
        setUserData({ ...userData, dob: e.target.value })
        handleValidateDOB(e.target.value)
    }

    const handlePasswordInputChange = (e) => {
        setUserData({ ...userData, password: e.target.value })
        handleValidatePassword(e.target.value)
    }

    const handleConfirmPasswordInputChange = (e) => {
        setUserData({ ...userData, confirmPassword: e.target.value })
        handleValidateConfirmPassword(e.target.value)
    }


    // // HANDLE ALL VALIDATION
    const handleValidateAll = () => {
        let isValiduserEmailId = handleValidateEmailId(userData.email)
        let isValidFullName = handleValidateFullName(userData.fullName)
        let isValidDOB = handleValidateDOB(userData.dob)
        let isValidPassword = handleValidatePassword(userData.password)
        let isValidconfirmPassword = handleValidateConfirmPassword(userData.confirmPassword)
        return isValiduserEmailId && isValidFullName && isValidDOB && isValidPassword && isValidconfirmPassword
    }


    // // HANDLE INDIVIDUAL VALIDATION
    const handleValidateEmailId = (email) => {
        let emailValue = email.trim()
        let emailErr = ""
        let isValidReturn = false;
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (emailValue === "") {
            emailErr = t("email must not be empty")
        }
        else {
            if (emailValue.match(regExp)) {
                emailErr = ""
                isValidReturn = true
            }
            else {
                emailErr = t('Entered email should be valid.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userErr.emailErr = emailErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }

    const handleValidateFullName = (fullName) => {
        let fullNameValue = fullName.trim()
        let fullNameErr = ""
        let isValidReturn = false;
        const regExp = /^[a-zA-Z ]+$/
        if (fullNameValue === "") {
            fullNameErr = t("Full name must not be empty")
        }
        else {
            if (fullNameValue.match(regExp)) {
                if (fullNameValue.length < 5) {
                    fullNameErr = t("Full name must contain at least 5 characters")
                }
                else if (fullNameValue.length > 15) {
                    fullNameErr = t("Full name must not exceed 15 characters")
                }
                else {
                    fullNameErr = ""
                    isValidReturn = true
                }
            }
            else {
                fullNameErr = t('Full name must contain only alphabet.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userErr.fullNameErr = fullNameErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }

    const handleValidateDOB = (dob) => {
        let dobValue = dob
        let dobErr = ""
        let isValidReturn = false

        if (dobValue === "") {
            dobErr = "Date of Birth should not be empty."
        }
        else {
            dobErr = ""
            isValidReturn = true
        }

        userErr.dobErr = dobErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }

    const handleValidatePassword = (password) => {
        let passwordValue = password
        let passwordErr = ""
        let isValidReturn = false

        let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
        if (passwordValue === "") {
            passwordErr = "Password Should not be empty."
        }
        else if (passwordValue.match(regExp)) {
            passwordErr = ""
            isValidReturn = true
        }
        else {
            if (passwordValue.length < 6) {
                passwordErr = "Password should be at least 6 charecter."
            }
            else {
                passwordErr = "Password should contain at least 1 uppercase, 1 lowercase & 1 special character."
            }
        }

        userErr.passwordErr = passwordErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }


    const handleValidateConfirmPassword = (confirmPassword) => {
        let confirmPasswordValue = confirmPassword
        let confirmPasswordErr = ""
        let isValidReturn = false

        if (confirmPasswordValue === "") {
            confirmPasswordErr = "Second Password should not be empty."
        }
        else if (confirmPasswordValue !== userData.password) {
            confirmPasswordErr = "Both Password should be match."
        }
        else {
            confirmPasswordErr = ""
            isValidReturn = true
        }

        userErr.confirmPasswordErr = confirmPasswordErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }


    const handleCreateNewUser = () => {
        if (handleValidateAll()) {
            let userDataforServer = {
                email: userData.email,
                fullName: userData.fullName,
                dob: userData.dob,
                password: userData.password
            }
            dispatch(createUserActions(userDataforServer))
        }
    }

    const handleUpdateUserDetail = () => {

    }

    const handleResetForm = () => {
        setUserData({
            email: "",
            fullName: '',
            dob: "",
            password: '',
            confirmPassword: '',
        })
        setUserErr({
            emailErr: "",
            fullNameErr: "",
            dobErr: "",
            passwordErr: "",
            confirmPasswordErr: "",
        })
    }



    return (
        <Fragment>
            <div>
                <form name="myForm" className={allClass("", "formStyle", mdl)}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("E-mail")}:</label>
                            <input disabled={isFormUpdate} type="email" name="fullName" value={email} onChange={e => handleEmailInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter E-mail.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{emailErr}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Full Name.")}:</label>
                            <input type="text" name="fullName" value={fullName} onChange={e => handlefullNameInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter User's Full Name.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{fullNameErr}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Date of Birth")}:</label>
                            <input type="date" name="dob" value={dob} onChange={e => handleUserDOBInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{dobErr}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Enter Password")}:</label>
                            <input type="password" name="password" value={password} onChange={e => handlePasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{passwordErr}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Conform Password")}:</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => handleConfirmPasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Conform Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{confirmPasswordErr}</small>
                    </div>

                    {isFormUpdate === false ?
                        <div className={allClass("field-btn", "formButton", mdl)}>
                            <button type='button' onClick={event => handleCreateNewUser()} className={allClass("btn btn-success", "buttonStyl", mdl)}>{t("Creat New User")}</button>
                            <button type="reset" onClick={event => handleResetForm(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >{t("Reset")}</button>
                            <Link href='/task/ssr/retrieve'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></Link>
                        </div>
                        :
                        <div className={allClass("field-btn", "formButton", mdl)}>
                            <button type='button' onClick={event => handleUpdateUserDetail(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>{t("Update User")}</button>
                            <Link href='/task/ssr/retrieve'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></Link>
                        </div>
                    }
                </form>
            </div>
        </Fragment>
    )
}

export default SignupForm
