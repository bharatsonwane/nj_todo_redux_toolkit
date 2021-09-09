import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';
import { store } from 'src/redux/store'

export const createTaskActions = createAsyncThunk(
    "task/createTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/todo/create`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);

export const retrieveTaskActions = createAsyncThunk(
    "task/retrieveTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().get(`/todo/retrieve`)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);

export const updateTaskActions = createAsyncThunk(
    "task/updateTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().put(`/todo/update`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


export const deleteTaskActions = createAsyncThunk(
    "task/deleteTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().delete(`/todo/${model}`)
            // store.dispatch(retrieveTaskActions())
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);
