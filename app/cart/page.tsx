import { auth } from '@/auth'
import Container from '@/components/Container'
import Title from '@/components/Title'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
import CartProducts from '@/components/CartProducts'

export const metadata: Metadata = {
    title: 'Cart | Amazon shopping',
    description: 'Cart page | Amazon shopping online',
}

const CartPage = async () => {
    const session = await auth()
    if (!session?.user) {
        localStorage.removeItem('store-storage')
        return redirect('/login')
    }

    return (
        <div className='flex flex-col gap-4 mx-auto  py-10 min-h-screen scroll-smooth p-10'>
            <CartProducts />
        </div>
    )
}

export default CartPage