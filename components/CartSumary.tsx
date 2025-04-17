'use client'
import React, { useState } from 'react'
import PriceFormat from './PriceFormat'
import { store } from '@/lib/store'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Product } from '@/type'
const CartSumary = () => {

    const { cartProduct ,resetCart} = store()
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const calculateSubtotal = () => {
        return cartProduct?.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1))
        }, 0)
    }

    const handleCheckout = async () => {
        setIsLoading(true)
        try {   
            const res = await fetch('/api/checkout',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cartProduct,
                    email: session?.user?.email
                })
            })
            const result = await res.json()
            const checkoutUrl = await result?.url
            if(checkoutUrl) window.location.href=checkoutUrl
            if(result.error) alert(result?.error?.message)
        } catch (err) {
            console.error(err)
        }finally{
            setIsLoading(false)
        }
        
       

    }
    return (
        <div className="flex flex-col w-full lg:w-1/5 order-1 lg:order-2 ">
            <div className="bg-white p-4 border border-gray-200 rounded">
                <div className="flex  items-center justify-between">
                    <p className=" text-lg mb-4">
                        Subtotal ({cartProduct.reduce((acc, item) => acc + (item.quantity || 1), 0)} items):{' '}
                    </p>
                    <PriceFormat amount={calculateSubtotal()} className="font-bold" />
                </div>


                <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" id="gift" className="rounded" />
                    <label htmlFor="gift" className="text-sm">This order contains a gift</label>
                </div>

                {
                    cartProduct?.map((item: Product) => (
                        <div className='flex justify-between items-center gap-2 mb-2'>
                            <div className='flex justify-start items-center gap-2'>
                                <p className='text-sm text-amazonGreen'>#{item.tags} </p>
                                <p> [ x{item.quantity} ]</p>
                            </div>
                            <div className='items-end text-right'>{PriceFormat({ amount: item.price, className: '' })}</div>
                        </div>
                    ))
                }

                <button onClick={()=>handleCheckout()}
                    disabled={!session?.user || isLoading}
                    className="w-full bg-amazonYellow hover:bg-amazonYellow/90 text-black py-2 rounded">
                    Proceed to checkout
                </button>
            </div>
        </div>
    )
}

export default CartSumary