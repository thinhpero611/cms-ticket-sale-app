import api from '../../core/firebase'
import { AppThunk } from '../../core/store'
import { IFilterTicketProps } from '../../view/Magage'
import TicketEntity from './entity'
import ticketStore from './ticketStore'

export const getAllTicketAsync =  (): AppThunk => async (
    dispatch
) => {
    const data = await api.fetchAll<TicketEntity>()
    dispatch(ticketStore.actions.fetchAllData({results: data}))
}

export const getFilterTicketAsync = (filter: IFilterTicketProps): AppThunk => async (
    dispatch
) => {
    const data = await api.filterTicket<TicketEntity>(filter)
    dispatch(ticketStore.actions.fetchAllData({ results: data }))
}

export const getAllEventTicketAsync = (): AppThunk => async (
    dispatch
) => {
    const data = await api.fetchEventTicket<TicketEntity>()
    dispatch(ticketStore.actions.fetchAllData({ results: data }))
}

export const getAllFamilyTicketAsync = (): AppThunk => async (
    dispatch
) => {
    console.log('inside family ticket fetch')
    const data = await api.fetchFamilyTicket<TicketEntity>()
    dispatch(ticketStore.actions.fetchAllData({ results: data }))
}
