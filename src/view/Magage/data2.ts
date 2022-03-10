import { status } from "../../module/ticket/constant"

const data2: {[propName: string]: string | number}[] = []
const data1: {[propName: string]: string | number}[] = []
const data3: {[propName: string]: string | number}[] = []
// set up dummy data
for (let i = 0; i < 120; i++) {
  data2.push({
    bookingCode: '123942342',
    ticketNumber: '99996666',
    event: 'Will AI invade human civiliztion (~.~)',
    ticket: '1234535',
    status: status.IN_USE,
    useDate: '12/02/21',
    outDate: '12/12/2022',
    isDoingForControlTicket: status.DOING_FORCONTROL,
    gate: 'Cổng 1'
  })
}
for (let i = 0; i < 120; i++) {
  data3.push({
    bookingCode: '123942342',
    ticketNumber: '99996666',
    event: 'Will AI invade human civiliztion (~.~)',
    ticket: '1234535',
    status: status.NOT_USE,
    useDate: '12/02/21',
    outDate: '12/12/2022',
    isDoingForControlTicket: status.NOT_DOING_FORCONTROL,
    gate: 'Cổng 1'
  })
}
for (let i = 0; i < 120; i++) {
  data1.push({
    bookingCode: '123942342',
    ticketNumber: '99996666',
    event: '',
    ticket: '1234535',
    status: status.EXPIRED,
    useDate: '12/02/21',
    outDate: '12/12/2022',
    isDoingForControlTicket: status.DOING_FORCONTROL,
    gate: 'Cổng 1'
  })
}

data2.unshift({
  key: 0,
  stt: 0,
  bookingCode: '34234234234',
  event: 'Will AI invade human civiliztion (~.~)',
  ticket: '324234234234',
  status: 'het han',
  useDate: '12/02/21',
  outDate: '12/12/2022',
  gate: ''
},
{
  key: -1,
  stt: 0,
  bookingCode: '34234234234',
  event: 'Will AI invade human civiliztion (~.~)',
  ticket: '324234234234',
  status: 'da su dung',
  useDate: '12/02/21',
  outDate: '12/12/2022',
  gate: ''
}
)


function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}


export default shuffleArray([...data1, ...data2, ...data3 ])

// for (let i = 0; i < 20; i++) {
//   api.createTask({
//     bookingCode: '123942342',
//     event: 'Will AI invade human civiliztion (~.~)',
//     ticketNumber: '1234535',
//     status: status.NOT_USE,
//     useDate: '12/02/21',
//     outDate: '12/12/2022',
//     gate: 'Cong 2'
//   })
// }

// set up data
// const randomChoice = () => {
  //     let random = Math.round(Math.random())
  //     if (random === 0) return false
  //     if (random === 1) return true
  //     return false
  //   }
  //   // console.log('data', ticket.results)
  //  const data = [...ticket.results]
  //  const data2 = data.map((item) => ({ event: item.event ? item.event : null, type: 've cong', isDoningForControlTicket:randomChoice(), ...item }))
  //   console.log(data2)
  
  //   for (let i = 0; i < data2.length; i++) {
  //     api.updateTicket(data2[i])
  //   }
