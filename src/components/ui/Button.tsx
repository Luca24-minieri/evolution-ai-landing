'use client'

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'whatsapp'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary-500 text-background font-semibold',
    'shadow-[0_0_20px_rgba(0,229,255,0.3)]',
    'hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]',
    'hover:bg-primary-400',
    'active:scale-[0.97]',
  ].join(' '),
  secondary: [
    'bg-transparent text-primary-400 font-medium',
    'border border-primary-500/40',
    'hover:bg-primary-500/10 hover:border-primary-400',
    'active:scale-[0.97]',
  ].join(' '),
  whatsapp: [
    'bg-whatsapp text-white font-semibold',
    'shadow-[0_0_20px_rgba(37,211,102,0.3)]',
    'hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]',
    'hover:bg-whatsapp-dark',
    'active:scale-[0.97]',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2',
      'transition-all duration-300 ease-out',
      'cursor-pointer select-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    if ('href' in props && props.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
