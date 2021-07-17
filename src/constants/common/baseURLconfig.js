// Api base url depend on environment
const handleGetApiBaseURL = () => {
    let apiBaseUrlList = {
        devApiUrl: 'http://localhost:3005',
        testApiUrl: 'http://localhost:3005',
        prodApiUrl: 'http://localhost:3005',
    }

    let returnApiBaseUrl = apiBaseUrlList.devApiUrl
    // let returnApiBaseUrl = apiBaseUrlList.testApiUrl
    // let returnApiBaseUrl = apiBaseUrlList.prodApiUrl

    return returnApiBaseUrl
}


// Client base url depend on environment
const handleGetClientBaseURL = () => {
    let clientBaseUrlList = {
        devClientUrl: 'http://localhost:4200',
        testClientUrl: 'http://localhost:4200',
        prodClientUrl: '',
    }

    let returnClientBaseUrl = clientBaseUrlList.devClientUrl
    // let returnClientBaseUrl = clientBaseUrlList.testClientUrl
    // let returnClientBaseUrl = clientBaseUrlList.prodClientUrl

    return returnClientBaseUrl
}


export const apiBaseURL = handleGetApiBaseURL()
export const clientBaseURL = handleGetClientBaseURL()