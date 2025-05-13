import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with filtering, searching, and pagination
    getAllProducts: builder.query({
      query: (args) => ({
        url: "/product",
        method: "GET",
        params: args,
      }),
      providesTags: ["Products"],
    }),

    // Get a single product by ID
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/single/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // Get new arrival products
    getNewArrivals: builder.query({
      query: () => ({
        url: "/product/new-arrivals",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create-product",
        method: "POST",
        body: formData,
        // Don't add Content-Type header for FormData
        formData: true,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update an existing product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: formData,
        // Don't add Content-Type header for FormData
        formData: true,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        "Products",
      ],
    }),

    // Delete a product (soft delete)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetNewArrivalsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
