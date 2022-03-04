import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import store from ".."

const taskStore = store.collection('comboTickets')

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
  createTask: <T>(data): Promise<T | firebase.firestore.DocumentData | undefined> => {
    return taskStore.add({
        code: data.packCode,
        comboPrice: data.comboTicketPrice,
        outDate: data.outDate,
        packName: data.ticketPackName,
        status: data.status,
        ticketPrice: data.ticketPrice,
        useDate: data.useDate
    })
  },
  deleteTask: (id: string) => {
    taskStore.doc(id).delete()
  },
  updateTicket: (data) => {
    taskStore.doc(data.id).update({
      type: data.type,
      isDoingForControlTicket: data.isDoningForControlTicket,
      event: data.event ? data.event : null
    })
  }
}

export default ticket