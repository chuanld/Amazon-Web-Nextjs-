'use client'
import { db } from '@/lib/firebase'
import { Order } from '@/type'
import { collection, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, {  useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import OrderLoader from './OrderLoader'
import Link from 'next/link'

const OrdersList =  () => {
  const { data: session } = useSession()
  const [orderLoading, ] = useState<boolean>(false)
  const [ordersSnapshot, loading] = useCollection(
    session?.user &&
    query(collection(db,'users',session?.user?.email as string, 'orders'))
  )




  const orders = ordersSnapshot?.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data()?.timestamp?.toDate()
  })) as Order[]



  console.log(orders, 'orders')
  

  return (
    <div>{ loading||orderLoading ? (
      <OrderLoader />
    ) : (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders List</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-4 flex items-center justify-between bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">Order #</span>
                  <span className="ml-2 text-gray-500">Total Amount</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm text-gray-500">Actions</span>
              </div>
            </div>
            {/* Order items will be mapped here */}
            {
              orders?.length > 0 && orders?.map((order:any) => (
                <div key={order.id} className="border-b border-gray-200">
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="font-medium">Order #</span>
                          <span className="ml-2 text-gray-500 w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">| {order.id} |</span>
                          <span className="ml-2 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">| {order.email} |</span>
                          <Link href={order?.value?.invoice?.invoice_url} className="ml-2 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">| Check Invoice |</Link>
                          <Link href={order?.value?.invoice?.invoice_pdf} className="ml-2 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">| Download Invoice |</Link>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">Amount: </span>
                          <span className="text-gray-500">${order.value?.amount}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {order.value?.items?.map((item:any, index:any) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-500">{item.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{item.quantity}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">${item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )}</div>


  )
}

export default OrdersList