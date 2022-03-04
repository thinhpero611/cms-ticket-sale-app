import api from '../../core/firebase'
import { AppThunk } from '../../core/store'
import { IFilterTicketProps } from '../../view/Magage/components/FilterModalComponent'
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
