import ticketApi from './firestore/collections/ticket'
import comboTicketApi from './firestore/collections/comboTicket'

const api = {
  ticket: ticketApi,
  comboTicket: comboTicketApi
}

export default api