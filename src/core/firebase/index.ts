import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import TicketEntity from "../../module/ticket/entity";
import { IFilterTicketProps } from "../../view/Magage/components/FilterModalComponent";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC54e5R_ZL4NUMUC6Kz0YRhp4V3uEivmHw",
    authDomain: "cms-ticket-sale.firebaseapp.com",
    projectId: "cms-ticket-sale",
    storageBucket: "cms-ticket-sale.appspot.com",
    messagingSenderId: "677204468378",
    appId: "1:677204468378:web:0cafc1a67bc12273697523",
    measurementId: "G-RRR1H5N0KE"
};

const store = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();
const taskStore = store.collection('tickets')

const api = {
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
          .where("isDoingForControl", "==", filter?.isDoingForControl)
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

export default api