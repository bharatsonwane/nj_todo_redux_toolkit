import React from 'react'
import { wrapper } from 'src/redux/store'
import { getSession } from 'next-auth/client';


export default function updateUser() {

    return (
        <div>
            <h1>Update</h1>
        </div>
    )
}

updateUser.isRequiredClientSideAuthGuard = true



export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    // // ****** uses *next-auth library* for protected api******
    // // we are getting cookies in gestServerSideProps
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/user/signin',
                permanent: false
            }
        }
    }

    return {
        props: {
            val: "val"
        },
    };
});
