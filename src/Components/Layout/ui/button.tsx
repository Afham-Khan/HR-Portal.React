import React from 'react'

export const Button = ({ children, className, variant = 'default', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  }

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}