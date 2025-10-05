import { Input, type InputProps } from 'antd'
import type { ReactNode } from 'react'

interface CustomInputType extends InputProps {
  id?: string
  value?: string | number | readonly string[]
  placeholder: string
  className?: string
  type?: string
  prefix?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  required?: boolean
  name?: string
  isRead?: boolean
  maxLength?: number
  minLength?: number
}

const CustomInput: React.FC<CustomInputType> = ({
  id,
  value,
  placeholder,
  className = '',
  type,
  prefix,
  disabled = false,
  autoFocus = false,
  isRead = false,
  maxLength,
  minLength,
  ...props
}) => {
  return (
    <Input
      id={id}
      placeholder={isRead && !value ? '' : placeholder}
      type={type}
      value={value}
      prefix={prefix}
      className={`custom-input ${
        disabled ? 'custom-input-disabled' : ''
      } h-12 px-4 py-[14px] ${className}`}
      disabled={disabled}
      autoFocus={autoFocus}
      maxLength={maxLength}
      minLength={minLength}
      {...props}
    />
  )
}

export default CustomInput
