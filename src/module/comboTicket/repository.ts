import api from "../../core/firebase";
import { AppThunk } from "../../core/store";
import comboTicketStore from "./comboTicketStore";
import ComboTicketEntity from "./entity";


export const getAllComboTicketAsync = (): AppThunk => async (
    dispatch
) => {
    const data = await api.comboTicket.fetchAll<ComboTicketEntity>()
    dispatch(comboTicketStore.actions.fetchAllData({ results: data }))
}

export const createComboTicket = (newData: ComboTicketEntity): AppThunk => async (
    dispatch
) => {
    const documentData = await api.comboTicket.createTask<ComboTicketEntity>(newData)
    //@ts-ignore
    const retrievedData = await api.comboTicket.fetchOne<ComboTicketEntity>(documentData?.id)
    dispatch(comboTicketStore.actions.createComboTicket({ data: retrievedData}))
}