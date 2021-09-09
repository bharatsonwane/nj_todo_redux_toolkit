import axios from "axios";
import { store } from "src/redux/store"
import { apiBaseURL } from './baseURLconfig';



/**
 * Interceptors are a feature that allows an application to intercept requests or responses before they are handled by the .then() or the .catch().
 * There are 2 type of interceptor 1) interceptors.request   &&   2) interceptors.response
 * Both types of Axios interceptors accept two functions. 
 * The first function of the request interceptor modifies the request if it’s a valid, successful request, 
 * the second function handles when the request is invalid and throws an error.
 * 
 */



let storeData
export const axiosConfigMiddleware = storeAPI => next => action => {
    // axiosConfigMiddleware is used to get store data outside of react component
    let result = next(action)
    storeData = storeAPI.getState()
    return result
}

const axiosConfig = () => {
    const instance = axios.create();

    instance.defaults.baseURL = apiBaseURL;


    // interceptors Request------------------------------------
    if (typeof window === "undefined") {
        // // window object is undefined means code is running on server side

        instance.interceptors.request.use(
            (config) => {
                let userToken
                if (storeData && storeData.globalServerStateReducer && storeData.globalServerStateReducer.serverCookie) {
                    userToken = storeData.globalServerStateReducer.serverCookie
                }

                let token = userToken ? userToken : '';

                if (!!token) {
                    config.headers = {
                        ...config.headers,
                        'Authorization': "bearer " + token
                    };
                }
                return config;
            },
            (error) => {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        );
    }
    else if (typeof window !== "undefined") {
        // // window object is not undefined means code is running on client side

        instance.interceptors.request.use(
            (config) => {
                // let userToken = localStorage.getItem('taskToken')
                // let tempCookies = cookies.load('userId');
                let userToken = "true"
                let token = userToken ? userToken : '';

                if (!!token) {
                    config.headers = {
                        ...config.headers,
                        'Authorization': "bearer " + token
                    };
                }
                return config;
            },
            (error) => {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        );
    }

    //validating the token expiration scenario --------------------------
    // interceptors Response------------------------------------
    instance.interceptors.response.use(
        (Response) => { return Response },
        (error) => {
            if (error.response && error.response.status === 401) {
                //dispatch action using store to show token expire popup-----
                if (typeof window === "undefined") {
                    console.log("tokenExpiryonServerSideResponse")
                }
                // store.dispatch(userTokenExpiryActions());
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }
    );

    return instance;
}

export default axiosConfig;
