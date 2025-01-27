import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

 const allAPI=createApi({
    reducerPath:"webchat",
    baseQuery:fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVERURL,credentials: "include",}),


    endpoints:(builder)=>({

        myAllchat: builder.query({
            query: () => ({ url: "/api/user/friends" }),
            // providesTags: ["Chat"],
            keepUnusedDataFor: 0,
          }),


    })
})


export const {useMyAllchatQuery}=allAPI
export default allAPI




