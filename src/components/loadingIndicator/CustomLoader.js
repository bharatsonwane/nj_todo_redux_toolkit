import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
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
    const reducerState = useSelector((state) => (state));
    const getIsLoadingValue = useMemo(() => {
        // // check isLoading in every reducer if in any reducer it is true then returen true elese (after checking every reducer) return false
        for (const reducer in reducerState) {  //  for in loop to iterate object
            if (reducerState[reducer].isLoading === true) {
                // checking (isLoading === true) condition in very reducer & if satisfied in any reducer then return true 
                return true
            }
        }
        // after checking (isLoading === true) condition in very reducer & not satisfied then return false 
        return false
    }, [reducerState])



    return (
        (routeEventLoading || getIsLoadingValue) ?
            <div className={allClass("", "Loader", mdl)}>
                <Spinner animation="border" variant="primary" />
            </div>
            : null
    )
}
