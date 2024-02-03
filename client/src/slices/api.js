import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "post",
        body: data,
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "post",
        body: data,
      }),
    }),
    savePassGet :builder.mutation({
      query :() =>({
        url :"/pass/getdata",
        method :"get",
      })

    }),

    savePass: builder.mutation({
      query: (data) => ({
        url: "pass/passwords",
        method: "post",
        body: data,
      }),
    }),
    deletePass : builder.mutation({
      query : (data) => ({
        url : `pass/delete/${data}`,
        method : "get",
      })

    }), 
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "get",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useSavePassMutation,
  useSavePassGetMutation,
  useDeletePassMutation
} = userApiSlice;
