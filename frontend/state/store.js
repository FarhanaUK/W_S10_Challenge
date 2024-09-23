import { configureStore } from '@reduxjs/toolkit'
import { PizzaApi } from './pizzaApi'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    [PizzaApi.reducerPath]: PizzaApi.reducer
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(PizzaApi.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
