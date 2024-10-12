import React from 'react'

export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`} {...props}>
    {children}
  </div>
)

export const CardHeader = ({ children, className, ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h3>
)

export const CardContent = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)