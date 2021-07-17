import React, { Fragment } from 'react'
import { wrapper } from 'src/redux/store'
import cookie from "cookie"
import { getSession } from 'next-auth/client';
import { saveServerCookieActions } from 'src/redux/globalServerState_redux/globalServrState_actions'


export default function Profile() {


    return (
        <Fragment>
            <h1>Profile</h1>
        </Fragment>
    )
}

Profile.isRequiredClientSideAuthGuard = true


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    // // ****** usesing JWT token for protected api Route******
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    let tokenCookie = parsedCookies.nextJWT
    if (tokenCookie) {
        await store.dispatch(saveServerCookieActions(tokenCookie)) // set token in globaleServerState reducer to access in axiosConfig.js file for server side
        return {
            props: {
                val: "val"
            },
        }
    }
    else {
        // // if token not avalable in cookies then redirect to sign in
        return {
            redirect: {
                destination: '/user/signin',
                permanent: false
            }
        }
    }
});

