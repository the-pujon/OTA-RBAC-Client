import baseApi from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    getPosts: builder.query({
      query: () => ({
        url: "/posts/get",
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/get/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;