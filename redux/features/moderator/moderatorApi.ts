import baseApi from "@/redux/api/baseApi";

const moderatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeModerator: builder.mutation({
      query: (id) => ({
        url: `/moderator/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"],
    }),

    removeModerator: builder.mutation({
      query: (id) => ({
        url: `/moderator/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    getModerators: builder.query({
      query: () => ({
        url: "/moderator",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useMakeModeratorMutation, useRemoveModeratorMutation, useGetModeratorsQuery } = moderatorApi;