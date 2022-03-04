import { combineReducers } from '@reduxjs/toolkit'
import comboTicketStore from './comboTicket/comboTicketStore'
import ticketStore from './ticket/ticketStore'

const appReducers = combineReducers({
    ticket: ticketStore.reducer,
    comboTicket: comboTicketStore.reducer
})

export type RootState = ReturnType<typeof appReducers>
export default appReducers