import { Button } from 'antd'
import React from 'react'

interface Iprops {
    onClickEvent?: () => void
    title?: string
    className?: string
}
const EnableTicketButton = ( props: Iprops ) => {
  return (
    <div className={`${props.className} btn-wrapper`}>
        <span onClick={props.onClickEvent}>{props.title}</span>
    </div>
  )
}

export default EnableTicketButton