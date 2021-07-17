import { Fragment, useEffect } from 'react'
import { wrapper } from 'src/redux/store'
import cookie from "cookie"
import { retrieveTaskActions } from 'src/redux/task_redux/task_actions'
import { saveServerCookieActions } from 'src/redux/globalServerState_redux/globalServrState_actions'
import RetrieveTask from 'src/components/task/retrieve/RetrieveTask'
import Head from 'next/head';

function Retrieve() {

  return (
    <Fragment>
      <Head>
        <title>Retrieve Task</title>
        <meta name="description" content="NextJs Todo Application's Retrieve Task page." />
      </Head>
      <RetrieveTask />
    </Fragment>
  )
}

export default Retrieve



export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
  // // ****** usesing JWT token for protected api Route******
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  let tokenCookie = parsedCookies.nextJWT
  if (tokenCookie) {
    await store.dispatch(saveServerCookieActions(tokenCookie)) // set token in globaleServerState reducer to access in axiosConfig.js file for server side
    await store.dispatch(retrieveTaskActions());
    return {
      props: {
        val: "val"
      },
    }
  }
  else {
    // // if token not avalable in cookies then redirect to sign in
    return {
      // redirect: {
      //   destination: '/user/signin',
      //   permanent: false
      // }
      props: {
        val: "val1"
      },
    }
  }
});
