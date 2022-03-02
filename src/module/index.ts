import { combineReducers } from '@reduxjs/toolkit'
import ticketStore from './ticket/ticketStore'

const appReducers = combineReducers({
    ticket: ticketStore.reducer
})

export type RootState = ReturnType<typeof appReducers>
export default appReducers