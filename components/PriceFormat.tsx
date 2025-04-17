import { cn } from '@/lib/utils';
import React from 'react'

interface PriceFormatProps {
    amount: number;
    className?: string;
}

const PriceFormat = ({amount, className}:PriceFormatProps) => {

    const formattedPrice = new Number(amount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

  return (
    <div className={cn("text-base font-semibold",className)}>{formattedPrice}</div>
  )
}

export default PriceFormat