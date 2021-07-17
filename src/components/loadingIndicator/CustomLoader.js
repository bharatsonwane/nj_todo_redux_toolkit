import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { allClass } from 'src/constants/customHooks/customModuleClassMethod';
import mdl from "./CustomLoader.module.scss"
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner'



export default function CustomLoader(props) {
    const router = useRouter();
    // // *********loading functionality during route change / page transition*********
    const [routeEventLoading, setRouteEventLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url) => { setRouteEventLoading(true) };
        const handleComplete = (url) => { setRouteEventLoading(false) };

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [])



    // // *********loading functinality for api call depent on reducer*********
    const reducerState = useSelector(
        (state) => (state)
    );
    const [reducerStateObjectLength, setReducerStateObjectLength] = useState(null)
    useEffect(() => {
        setReducerStateObjectLength(Object.keys(reducerState).length)
    }, [])
    const getShowValue = () => {
        // // check isLoading in every reducer if in any reducer it is true then returen true elese (after checking every reducer) return false
        let iterationNumber = 0
        for (const reducer in reducerState) {
            if (reducerState[reducer].isLoading === true) {
                return true
            }
            else {
                if (iterationNumber >= (reducerStateObjectLength - 1)) {
                    return false
                }
                iterationNumber += 1
            }
        }
    }


    return (
        (routeEventLoading || getShowValue()) ?
            <div className={allClass("", "Loader", mdl)}>
                <Spinner animation="border" variant="primary" />
            </div>
            : null
    )
}
