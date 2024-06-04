import { apiSlice } from "../apiSlice";

const TASK_URL = '/api/tasks'

const taskAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTask: builder.mutation({
            query: (args) => {
                const { token, data } = args;
                return {
                    url: `${TASK_URL}/addTask`,
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: data
                }
            }
        }),
        getTask: builder.mutation({
            query: (token) => ({
                url: `${TASK_URL}/getTask`,
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            })
        }),
        updateTask: builder.mutation({
            query:(args) => {
                const {taskId, token, data} = args;
                return {
                    url: `${TASK_URL}/${taskId}`,
                    method: 'PUT',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: data
                }
            }
        }),
        deleteTask: builder.mutation({
            query: (args) => {
                const {token, taskId} = args;
                return {
                    url: `${TASK_URL}/${taskId}`,
                    method: 'DELETE',
                    headers: {'Authorization': `Bearer ${token}`}
                }
            }
        })
    })
});

export const { 
    useAddTaskMutation, 
    useGetTaskMutation, 
    useUpdateTaskMutation, 
    useDeleteTaskMutation 
} = taskAPI;