import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

 const allAPI=createApi({
    reducerPath:"webchat",
    // baseQuery:fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVERURL,credentials: "include",}),
    baseQuery:fetchBaseQuery({baseUrl: "/",credentials: "include",}),


    endpoints:(builder)=>({


        myAllchat: builder.query({
            query: () => ({ url: "/api/user/friends" }),
            // providesTags: ["Chat"],
            keepUnusedDataFor: 0,
          }),
          chatMembers:builder.query({
            query:(id)=>({url:`/api/user/members/${id}`})
          }),
          chatMessages:builder.query({
            query:({id,page})=>({url:`/api/user/messages/${id}?page=${page}`}),
            keepUnusedDataFor: 0,
          })

    })
})


export const {useMyAllchatQuery,useChatMembersQuery,useChatMessagesQuery}=allAPI
export default allAPI




