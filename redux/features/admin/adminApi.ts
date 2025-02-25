import baseApi from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"],
    }),

    removeAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    getAdmins: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useMakeAdminMutation, useRemoveAdminMutation, useGetAdminsQuery } = adminApi;