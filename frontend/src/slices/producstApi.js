//register api service to help fetching data from backend api
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const serverUrl = import.meta.env.VITE_SERVER_URL;

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/`
console.log(baseUrl);
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "getProducts",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
