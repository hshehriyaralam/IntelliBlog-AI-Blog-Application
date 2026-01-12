import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api/"}),
    tagTypes: ["Blog", "User","Like","Bookmark"],
    endpoints : (builder) => ({
        // Fetch Profile
        getProfile  : builder.query({
            query : () => "user",
            providesTags: ["Blog", "User","Like","Bookmark"]
        }),
        // Fetch all user
        allUser : builder.query({
            query : () => "allUsers",
            providesTags : ["Blog", "User","Like","Bookmark"],
            keepUnusedDataFor: 500,
        }),
        // fetch Single Authors for Author dynamic page 
        singleUser : builder.query({
            query : (id: string) => `allUsers/${id}`,
            providesTags : ["Blog", "User","Like","Bookmark"]
        }),
         // Delete profile 
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: "user/delete",
                method: "DELETE",
            }),
            invalidatesTags: ["Blog", "User","Like","Bookmark"],
            }),
    })
})
export const {
    useGetProfileQuery,
    useAllUserQuery,
    useSingleUserQuery,
    useDeleteProfileMutation,
    useLazyGetProfileQuery
} = userApi