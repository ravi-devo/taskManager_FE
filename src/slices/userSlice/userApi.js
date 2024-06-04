import { apiSlice } from "../apiSlice";

const USERS_URL = '/api/users';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                return {
                    url: `${USERS_URL}/login`,
                    method: 'POST',
                    body: data
                }
            }
        }),
        register: builder.mutation({
            query: (data) => {
                return {
                    url: `${USERS_URL}/register`,
                    method: 'POST',
                    body: data
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation } = userApi;