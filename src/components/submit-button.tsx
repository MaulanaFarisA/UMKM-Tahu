'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string
  children: ReactNode
}

export default function SubmitButton({
  pendingLabel = 'Memproses...',
  children,
  disabled,
  type = 'submit',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const isDisabled = disabled || pending

  return (
    <button type={type} disabled={isDisabled} aria-busy={pending} {...props}>
      {pending ? (
        <>
          <LoaderCircle
            size={16}
            strokeWidth={2.5}
            className="animate-spin"
            aria-hidden="true"
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  )
}
