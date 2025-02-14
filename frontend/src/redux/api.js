import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const allAPI = createApi({
  reducerPath: "webchat",
  // baseQuery:fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVERURL,credentials: "include",}),
  baseQuery: fetchBaseQuery({ baseUrl: "/", credentials: "include" }),

  endpoints: (builder) => ({
    myAllchat: builder.query({
      query: () => ({ url: "/api/user/friends" }),
      providesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),
    chatMembers: builder.query({
      query: (id) => ({ url: `/api/user/members/${id}`}),
    }),
    chatMessages: builder.query({
      query: ({ id, page }) => ({
        url: `/api/user/messages/${id}?page=${page}`,
      }),
      keepUnusedDataFor: 0,
    }),
    searchUser: builder.query({
      query: (search) => ({ url: `/api/user/users?search=${search}` }),
      providesTags:["FriendRequests"],

    }),
    sendFrindRequest: builder.mutation({
      query: (data) => ({
        url: "/api/user/sendrequest",
        method: "POST", 
        body: data, 
        headers: {
          "Content-Type": "application/json"
        },
      }),
    }),
    getFrindRequest: builder.query({
      query: () => ({ url: `/api/user/requests`}),
      keepUnusedDataFor: 0,
      providesTags: ["FriendRequests"]
    }),
    handleFrindRequest: builder.mutation({
      query: (data) => ({ 
        body:data,
        method: "POST", 
        url: `/api/user/handlerequest`,
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ["FriendRequests", "Chat"],
    }),
  }),
});

export const {
  useMyAllchatQuery,
  useChatMembersQuery,
  useChatMessagesQuery,
  useLazySearchUserQuery,
  useSendFrindRequestMutation,
  useGetFrindRequestQuery,
  useHandleFrindRequestMutation
} = allAPI;
export default allAPI;
