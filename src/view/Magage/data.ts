const data: {[propName: string]: string | number}[] = []
// set up dummy data
for (let i = 0; i < 120; i++) {
  data.push({
    key: i + 1,
    stt: i + 1,
    bookingCode: '123942342',
    ticket: '1234535',
    status: 'chua su dung',
    useDate: '12/02/21',
    outDate: '12/12/2022',
    gate: 'Cong 1'
  })
}

data.unshift({
  key: 0,
  stt: 0,
  bookingCode: '34234234234',
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
  ticket: '324234234234',
  status: 'da su dung',
  useDate: '12/02/21',
  outDate: '12/12/2022',
  gate: ''
}
)
export default data


