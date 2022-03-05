import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ComboTicketEntity from "./entity";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
// import { status } from "./constant";

export interface ComboTicketState {
    results: ComboTicketEntity[]
    status: boolean
}

const initialState: ComboTicketState = {
    results: [],
    status: true
}

const comboTicketStore  = createSlice({
    name: 'ticket',
    initialState: initialState,
    reducers: {
        fetchAllData: (state, action: PayloadAction<{results: firebase.firestore.DocumentData[] | ComboTicketEntity[] | undefined}>) => {
            Object.assign(state, {
                status: action.payload.results !== null,
                results: action.payload.results
            })
        },
        createComboTicket: (state, action: PayloadAction<{ data: firebase.firestore.DocumentData | ComboTicketEntity | undefined }>) => {
            Object.assign(state, {
                status: action.payload.data !== null,
                results: [ action.payload.data ]
            })
        }
    }
})

export default comboTicketStore