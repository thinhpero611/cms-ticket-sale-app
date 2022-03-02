import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TicketEntity from "./entity";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { ColumnGroupType, ColumnType } from "antd/lib/table";
import { IFilterTicketProps } from "../../view/Magage";
import { status } from "./constant";

export interface TicketState {
    results: TicketEntity[]
    status: boolean
}

const initialState: TicketState = {
    results: [],
    status: true
}

const ticketStore  = createSlice({
    name: 'ticket',
    initialState: initialState,
    reducers: {
        fetchAllData: (state, action: PayloadAction<{results: firebase.firestore.DocumentData[] | TicketEntity[] | undefined}>) => {
            Object.assign(state, {
                status: action.payload.results !== null,
                results: action.payload.results
            })
        },
        filterTicketInUse: (state) => {
            Object.assign(state, {
                results: state.results.filter((entity) => entity.status === status.IN_USE)
            })
        },
        filterTicketNotUse: (state) => {
            Object.assign(state, {
                results: state.results.filter((entity) => entity.status === status.NOT_USE)
            })
        },
        filterTicketExpired: (state) => {
            Object.assign(state, {
                results: state.results.filter((entity) => entity.status === status.EXPIRED)
            })
        }
    }
})

export default ticketStore