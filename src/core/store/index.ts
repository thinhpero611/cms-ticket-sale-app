import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducers, { RootState } from '../../module'

export const store = configureStore({
    reducer: appReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['ticket/fetchAllData', 'comboTicket/fetchAllData', 'comboTicket/createComboTicket'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
