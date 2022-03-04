import { Button } from 'antd'
import React from 'react'

interface Iprops {
    onClickEvent?: () => void
    title?: string
    className?: string
}
const EnableTicketButton = ( props: Iprops ) => {
  return (
    <div className={`${props.className}`}>
        <Button onClick={props.onClickEvent}>{props.title}</Button>
    </div>
  )
}

export default EnableTicketButton