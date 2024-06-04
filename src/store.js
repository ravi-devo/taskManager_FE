import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice/authReducer';
import { apiSlice } from './slices/apiSlice';
import taskReducer from './slices/taskSlice/taskReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;