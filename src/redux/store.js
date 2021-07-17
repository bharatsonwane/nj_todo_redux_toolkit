import { createWrapper } from 'next-redux-wrapper';
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { axiosConfigMiddleware } from 'src/constants/common/axiosConfig';


export const store = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(axiosConfigMiddleware),
        devTools: process.env.NODE_ENV !== "production",
    });

export const wrapper = createWrapper(store);