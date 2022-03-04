import { InputNumber } from 'antd'
import React from 'react'

interface Iprops {
    handleChange?: React.Dispatch<React.SetStateAction<number>>
    className?: string
    placeholder?: string
    value?: number
    width?: string
    height?: string
}

const InputNumnerComponent = ( props: Iprops ) => {

    const onChange = (value) => {
        props?.handleChange && props.handleChange(value)
    }
  return (
    <div className={`input-number-wrapper ${props.className}`}>
        <InputNumber 
            onChange={onChange}
            placeholder={props?.placeholder}
            value={props?.value}
            width={props?.width}
            height={props?.height}
        />
    </div>
  )
}

export default InputNumnerComponent