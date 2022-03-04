import { Button } from 'antd'
import React from 'react'
import { FiFilter } from 'react-icons/fi'

interface Iprops {
    onClickEvent?: () => void
    title?: string
    className?: string
}
const ExportFile = ( props: Iprops) => {
  return (
    <div className={`${props?.className}`}>
        <Button onClick={props.onClickEvent}>{props?.title}</Button>
    </div>
  )
}

export default ExportFile