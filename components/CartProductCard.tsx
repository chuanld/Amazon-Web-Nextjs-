import { Product } from '@/type'
import Image from 'next/image'
import React from 'react'
import AddtoCartBtn from './AddtoCartBtn'
import PriceFormat from './PriceFormat'
import { store } from '@/lib/store'
import Link from 'next/link'

interface CartProductCardProps {
    product: Product
    key: string
}

const CartProductCard = ({ product }: CartProductCardProps) => {
    const { removeFromCart } = store()

    return (


        <div key={product.id} className="flex gap-4 border-b border-gray-200 py-4">
            <div className="w-[50rem] h-auto block relative">
                <Link href={{ pathname: `/product/${product.id}`, query: { id: product.id } }}>
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-contain"
                    />
                </Link>

            </div>

            <div className="flex-grow relative">
                <h3 className="text-lg font-medium">{product.title} ({product.dimensions?.width} x {product.dimensions?.height}) | {product.description}</h3>
                <h4 className='italic capitalize'>| {product.category}</h4>
                <p className="text-sm text-green-600 mb-2">In Stock</p>
                <p className="text-sm text-green-600 mb-2">{product.shippingInformation}</p>
                <AddtoCartBtn product={product} cls={''} showSubtotal={false}/>

                <div className="flex justify-between  items-center gap-2 mb-2 absolute bottom-0 left-40">
                    <p className='text-sm text-gray-500'>| </p>
                    <span
                        onClick={() => removeFromCart(product.id)}
                        className="text-sm text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        Delete
                    </span>
                    <p className='text-sm text-gray-500'>| </p>
                    <span
                        className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                        Save for later
                    </span>
                </div>
            </div>

            <div className="text-right">
                <PriceFormat
                    amount={product.price * (product.quantity || 1)}
                    className="text-lg font-bold"
                />
            </div>
        </div>

    )
}

export default CartProductCard