class ComboTicketEntity {
    packCode?: string = ""
    ticketPackName?: string = ""
    useDate?: Date | string = ""
    outDate?: Date | string = ""
    ticketPrice?: number = 0
    comboTicketPrice?: number = 0
    status?: boolean = true
    constructor(entity) {
        if (!entity) return
        Object.assign(this, entity)
    }
}

export default ComboTicketEntity