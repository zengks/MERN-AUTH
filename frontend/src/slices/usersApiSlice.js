import { apiSlice } from './apiSlice'

const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        })
    })
})

// 'userLoginMutation' is the conventional way to name it
export const { useLoginMutation } = usersApiSlice;