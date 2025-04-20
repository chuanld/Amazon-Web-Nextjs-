import { store } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import Container from './Container';
import toast from 'react-hot-toast';

const PaymentSuccessContent = () => {
    const [isClient, setIsClient] = React.useState(false);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const router = useRouter();
    const { resetCart } = store();
    const { data: session } = useSession();
    console.log(sessionId, session);

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        if (!sessionId && !session) {
            router.push('/');
        } else {
            resetCart();
            toast.success('Payment received successfully');
        }
    }, [sessionId, resetCart, router, session]);
    if (!isClient) {
        return null; // Prevent rendering during SSR
    }
  return (
    <Container>
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold">Your Payment Accepted by amazon-testing.chunchun</h1>
                    <p className="text-gray-600 mt-2">You can view your Orders or continue Shopping with us</p>
                    <div className="flex space-x-4 mt-6">
                        <button
                            onClick={() => router.push('/orders')}
                            className="bg-black text-white px-4 py-2 rounded-md"
                        >
                            View Orders
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-black text-white px-4 py-2 rounded-md"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </Container>
  )
}

export default PaymentSuccessContent