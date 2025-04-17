import { cn } from '@/lib/utils';
import React from 'react'

interface Props {
    children: React.ReactNode;
    className: string
}

const Title = ({children,className}: Props) => {
  return (
    <div className={cn("text-base font-semibold text-amazonBlue", className)}>{children}</div>
  )
}

export default Title