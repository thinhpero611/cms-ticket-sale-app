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
    <div className={`btn-wrapper ${props?.className}`}>
        <span onClick={props.onClickEvent}>{props?.title}</span>
    </div>
  )
}

export default ExportFile