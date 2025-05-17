import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // Get all orders (admin only)
    getAllOrders: builder.query({
      query: (queryParams) => ({
        url: "/order",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Orders"],
    }),

    // Get single order by ID
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Orders", id }],
    }),

    // Get orders for current user
    getMyOrders: builder.query({
      query: () => ({
        url: "/order/my-orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // Update order status (admin only)
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ({ id }) => [{ type: "Orders", id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
