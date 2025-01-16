import { cn } from 'src/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'group inline-flex items-center justify-between whitespace-nowrap rounded text-p tracking-widest font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-500',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: '',
        sm: 'py-2',
      },
      variant: {
        default:
          'bg-transparent text-foreground hover:text-background hover:bg-foreground h-20 w-auto min-w-[400px] px-8 py-2',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline:
          'border border-foreground/30 text-foreground hover:text-background hover:bg-foreground h-20 w-auto min-w-[400px] px-8 py-2',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
