import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getUsers: builder.query({
      query: (data) => ({   
        url: "/auth",
        method: "GET",
        params: data,
     }),
      providesTags: ["user"],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUsersQuery } = authApi;