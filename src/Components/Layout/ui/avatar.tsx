import React from 'react'

export const Avatar = ({ className, ...props }) => (
  <div className={`w-10 h-10 rounded-full overflow-hidden ${className}`} {...props} />
)

export const AvatarImage = ({ src, alt, className, ...props }) => (
  <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} {...props} />
)

export const AvatarFallback = ({ children, className, ...props }) => (
  <div className={`w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 ${className}`} {...props}>
    {children}
  </div>
)