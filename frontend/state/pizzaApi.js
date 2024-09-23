import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PizzaApi = createApi({
reducerPath: 'pizzaApi',
baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/pizza/'}),
tagTypes: ['Order'],
endpoints: build => ({
    getPastOrders: build.query({
        query: () => 'history',
        providesTags: ['Order']
    }),
    createNewPizza: build.mutation({
        query: order => ({
            url: 'order',
            method: 'POST',
            body: order
        }),
        invalidatesTags: ['Order']
    }),
})



})

export const { useGetPastOrdersQuery, useCreateNewPizzaMutation} = PizzaApi