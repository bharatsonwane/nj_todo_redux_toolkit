import React, { Fragment } from 'react'
import SignupForm from 'src/components/users/signupForm/SignupForm'

function CreateUser() {

    let formField = {
        email: "",
        fullName: '',
        dob: "",
        password: '',
        confirmPassword: '',
    }

    let isFormUpdate = false



    return (
        <Fragment>
            <SignupForm formField={formField} isFormUpdate={isFormUpdate} />
        </Fragment>
    )
}

export default CreateUser
