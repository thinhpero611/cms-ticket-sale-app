import moment from 'moment'
import { status } from './constant'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

export interface ITicket {
    id?: string
    bookingCode: string
    ticketNumber: string
    status: status.IN_USE | status.NOT_USE | status.EXPIRED
    useDate: Date | firebase.firestore.Timestamp
    outDate: Date | firebase.firestore.Timestamp 
    gate?: string
}

class TicketEntity {
    id?: string = ""
    bookingCode: string = ""
    ticketNumber: string = ""
    status: 'inUse' | 'notUse' | 'expired' = 'notUse'
    useDate: Date | string | firebase.firestore.Timestamp  = ""
    outDate: Date | string | firebase.firestore.Timestamp = ""
    gate?: string
    event?: string = ""
    constructor(ticket) {
        if (!ticket) return
        Object.assign(this, ticket)
    }
}

export default TicketEntity