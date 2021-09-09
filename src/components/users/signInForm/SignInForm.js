import React, { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import mdl from "./signInForm.module.scss"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import Cookies from 'js-cookie';
import { usePrevious } from 'src/helper/customHooks/customHooks';
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from 'next-auth/client';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next'
import { signInUserActions } from 'src/redux/user_redux/user_action';
import { clientSideAuthGuardAction } from 'src/redux/globalClientState_redux/globalClientState_actions'



function SignInForm() {

    // // ----------Localization hooks & Router Hooks-------------
    const router = useRouter();
    const { t } = useTranslation('userData')

    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let userReducer = reducerState.userReducer

    // // ----------hooks useState--------------------------------------------------
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const [userErr, setUserErr] = useState({
        emailErr: "",
        passwordErr: "",
    })

    const { email, password } = userData;
    const { emailErr, passwordErr } = userErr

    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { isLoading, signInUserResponce, createUserError } = userReducer
    const prevPropsState = usePrevious({ isLoading, signInUserResponce, createUserError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.signInUserResponce !== signInUserResponce && signInUserResponce) { // // createTaskResponse !== null && createTaskResponse !== undefined
                Cookies.set('nextJWT', signInUserResponce.nextJWT, { expires: 2 });
                dispatch(clientSideAuthGuardAction(signInUserResponce.nextJWT))
                setTimeout(() => {
                    toast.success(t("Signin successfully"))
                }, 500);
                router.push("/task/ssr/retrieve")
            }
            else if (prevPropsState.createUserError !== createUserError && createUserError) {
                setTimeout(() => {
                    toast.error(t("Not able to Sign In."))
                }, 500);
            }
        }
    }, [userReducer])





    // // HANDLE INPUT CHANGE
    const handleEmailInputChange = (e) => {
        setUserData({ ...userData, email: e.target.value })
        handleValidateEmailId(e.target.value)
    }


    const handlePasswordInputChange = (e) => {
        setUserData({ ...userData, password: e.target.value })
        handleValidatePassword(e.target.value)
    }

    // // HANDLE ALL VALIDATION
    const handleValidateAll = () => {
        let isValiduserEmailId = handleValidateEmailId(userData.email)
        let isValidPassword = handleValidatePassword(userData.password)
        return isValiduserEmailId && isValidPassword
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

    const handleValidatePassword = (password) => {
        let passwordValue = password
        let passwordErr = ""
        let isValidReturn = false

        if (passwordValue === "") {
            passwordErr = "Password Should not be empty."
        }
        else {
            passwordErr = ""
            isValidReturn = true
        }

        userErr.passwordErr = passwordErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }



    const handleSignInUser = async () => {
        if (handleValidateAll()) {
            dispatch(signInUserActions(userData))

            // const result = await signIn('credentials', {
            //     redirect: false,
            //     email: userData.email,
            //     password: userData.password,
            // });

            // if (!result.error) {
            //     // set some auth state
            //     router.replace('/');
            // }
        }

    }

    return (
        <Fragment>
            <div>
                <form name="myForm" className={allClass("", "formStyle", mdl)}>
                    < div >
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("E-mail")}:</label>
                            <input type="email" name="fullName" value={email} onChange={e => handleEmailInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter E-mail.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{emailErr}</small>
                    </div>


                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Enter Password")}:</label>
                            < input type="password" name="password" value={password} onChange={e => handlePasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", left: "50%" }}>{passwordErr}</small>
                    </div>


                    <div className={allClass("field-btn", "formButton", mdl)}>
                        <button type='button' onClick={event => handleSignInUser(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>{t("Sign In")}</button>
                        <Link href='/task/ssr/retrieve'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></Link>
                    </div>
                </form>
            </div>
        </Fragment >
    )
}

export default SignInForm
