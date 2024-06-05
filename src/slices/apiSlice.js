import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({baseUrl: 'https://taskmanager-be.onrender.com'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Tasks'],
    endpoints: () => ({})
})
