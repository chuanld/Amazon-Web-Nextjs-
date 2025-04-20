'use client'
import { Suspense } from 'react'

import React from 'react'
import LoadingSpinner from '@/components/ui/loading'
import PaymentSuccessContent from '@/components/PaymentSuccess'


const PaymentSuccess = () => {


    return (
        <Suspense fallback={<LoadingSpinner size='md' text='' height='min-h-screen' />}>
            <PaymentSuccessContent/>
        </Suspense>
    );
}

export default PaymentSuccess