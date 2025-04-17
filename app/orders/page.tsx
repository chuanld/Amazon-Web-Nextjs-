import { auth } from '@/auth'
import Container from '@/components/Container'
import OrdersList from '@/components/OrdersList'
import { redirect } from 'next/navigation'
import React from 'react'

const Orders = async () => {
    const session = await auth()
    if (!session?.user) {
        return redirect('/')
    }


    return (
        <Container>
            <OrdersList />
        </Container>

    )
}

export default Orders