"use client"

import { configureStore } from '@reduxjs/toolkit'
import {alphaCoreAPI} from './api'

import {reducer as toastrReducer} from 'react-redux-toastr'
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [alphaCoreAPI.reducerPath]: alphaCoreAPI.reducer,
      toastr: toastrReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alphaCoreAPI.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']