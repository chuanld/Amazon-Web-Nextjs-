'use client'
import { store } from '@/lib/store'
import React from 'react'
import { Product } from '@/type'
import PriceFormat from './PriceFormat'
import Title from './Title'
import CartProductCard from './CartProductCard'
import CartSumary from './CartSumary'

const CartProducts = () => {
    const { cartProduct } = store()

    if (!cartProduct?.length) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-bold mb-4">Your Amazon Cart is empty</h2>
            <p className="text-gray-600">Shop today&apos;s deals</p>
        </div>
    )

    const calculateSubtotal = () => {
        return cartProduct.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1))
        }, 0)
    }

    return (

        <div className="flex flex-col lg:flex-row gap-8 justify-between ">
            {/* Left side - Cart items */}
            <div className="flex flex-col flex-grow w-4/5">
                <Title className="text-3xl font-bold mb-4">Shopping Cart</Title>
                <div className="border-b border-gray-200 mb-4"></div>

                {cartProduct?.map((item: Product) => (
                    <CartProductCard product={item}  key={item.id.toString()} />
                ))}

                <div className="text-right mt-4">
                    <p className="text-lg">
                        Subtotal ({cartProduct.reduce((acc, item) => acc + (item.quantity || 1), 0)} items):{' '}
                        
                    </p><PriceFormat amount={calculateSubtotal()} className="font-bold" />
                </div>
            </div>

            {/* Right side - Checkout */}
            <CartSumary />
        </div>
    )
}

export default CartProducts
