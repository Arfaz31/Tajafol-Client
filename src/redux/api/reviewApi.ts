import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reviews for a specific product
    getReviewsByProductId: builder.query({
      query: (productId) => ({
        url: `/feedback/get-all-review/${productId}`,
        method: "GET",
      }),
      providesTags: (productId) => [
        { type: "Reviews", id: productId },
        "Reviews",
      ],
    }),

    // Get total review count for a product
    getTotalReviewsByProductId: builder.query({
      query: (productId) => ({
        url: `/feedback/get-total-review/${productId}`,
        method: "GET",
      }),
      providesTags: (productId) => [
        { type: "Reviews", id: productId },
        "Reviews",
      ],
    }),

    // Create a new review
    createReview: builder.mutation({
      query: (data) => ({
        url: "/feedback/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: "Reviews", id: result?.data?.productId },
        "Reviews",
        "Products", // Invalidate products since review counts may change
      ],
    }),

    // Update an existing review
    updateReview: builder.mutation({
      query: ({ reviewId, review }) => ({
        url: `/feedback/update-review/${reviewId}`,
        method: "PATCH",
        body: { review },
      }),
      invalidatesTags: (result) => [
        { type: "Reviews", id: result?.data?.productId },
        "Reviews",
      ],
    }),

    // Delete a review (as a customer)
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/feedback/delete-review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews", "Products"], // Invalidate both since counts will change
    }),

    // Delete a review (as an admin)
    deleteReviewAsAdmin: builder.mutation({
      query: ({ reviewId, productId }) => ({
        url: `/feedback/delete-review-by-admin/${reviewId}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ({ productId }) => [
        { type: "Reviews", id: productId },
        "Reviews",
        "Products", // Invalidate products since review counts may change
      ],
    }),
  }),
});

export const {
  useGetReviewsByProductIdQuery,
  useGetTotalReviewsByProductIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useDeleteReviewAsAdminMutation,
} = reviewApi;
