import TicketEntity from "../../../../module/ticket/entity"
import { IFilterTicketProps } from "../../../../view/Magage/components/FilterModalComponent"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import store from ".."

const taskStore = store.collection('tickets')

const ticket = {
  fetchAll: <T>(...agrs): Promise<T[] | firebase.firestore.DocumentData[] | undefined> =>  {
    const data =  taskStore.get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData | T>) => {
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})) 
    })
    return data
  },
  fetchOne: <T>(id: string): Promise<T | firebase.firestore.DocumentData | undefined> => {
    const data = taskStore.doc(id).get().then((doc) => {
      return doc.data()
    })
    console.log("task with id: ", data)
    return data
  },
  createTask: <T>(data: TicketEntity): Promise<T | firebase.firestore.DocumentData | undefined> => {
    return taskStore.add({
      bookingCode: data.bookingCode,
      ticketNumber: data.ticketNumber,
      status: data.status,
      useDate: data.useDate,
      outDate: data.outDate,
      gate: data?.gate,
      event: data.event
    })
  },
  filterTicket: <T>( filter: IFilterTicketProps): Promise<T[] | firebase.firestore.DocumentData[]> => {
    console.log('run filter ticket ', filter.status)
    return taskStore
          .where("status", "==", filter?.status)
          .get()
          .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData | T>) => {
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
            })
  },
  filterTicketForControl: <T>( filter: IFilterTicketProps): Promise<T[] | firebase.firestore.DocumentData[]> => {
    return taskStore
          .where("isDoingForControlTicket", "==", filter.isDoingForControl)
          .get()
          .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData | T>) => {
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
            })
  },
  deleteTask: (id: string) => {
    taskStore.doc(id).delete()
  },
  updateTicket: (data: TicketEntity) => {
    taskStore.doc(data.id).update({
      type: data.type,
      isDoingForControlTicket: data.isDoningForControlTicket,
      event: data.event ? data.event : null
    })
  }
}

export default ticket