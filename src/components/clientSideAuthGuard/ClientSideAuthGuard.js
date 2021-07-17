import React, { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { clientSideAuthGuardAction } from 'src/redux/globalClientState_redux/globalClientState_actions';


function ClientSideAuthGuard(props) {

    const router = useRouter();

    let dispatch = useDispatch()
    const reducerState = useSelector(
        (state) => (state)
    );
    let isAuthenticated = reducerState.globalClientStateReducer.isAuthenticated

    const getCookies = async () => {
        let userToken = Cookies.get("nextJWT");
        return await userToken
    }


    useEffect(async () => {
        let cookies = await getCookies()
        if (isAuthenticated || cookies) {
            dispatch(clientSideAuthGuardAction(cookies))
        }
        else {
            router.replace(`/user/signin`);
        }
        return () => {

        }
    }, [isAuthenticated])


    if (typeof window === "undefined") {
        return (
            <Fragment>
                {props.children}
            </Fragment>
        )
    }
    else if (typeof window !== "undefined") {
        if (isAuthenticated) {
            return (
                <Fragment>
                    {props.children}
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    Loading
                </Fragment>
            )
        }
    }
}

export default ClientSideAuthGuard
