'use client'
import { store } from '@/lib/store'
import { Product } from '@/type'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'
import PriceFormat from './PriceFormat'

function AddtoCartBtn({ product, cls, showSubtotal=true }: { product: Product, cls: string, showSubtotal: boolean }) {

    const { addToCart, cartProduct, decreaseQuantity } = store()
    const [existingProduct, setExistingProduct] = useState<Product | null>(null)


    useEffect(() => {
        const availableItem = cartProduct.find((item) => item?.id === product?.id)
        setExistingProduct(availableItem || null)
    }, [product, cartProduct])

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        if (product) {
            addToCart(product).then(() => {
                toast.success(`${product.title} has been added to cart`);
            })
        }
    }

    const handleDeleteFromCart = (e: React.MouseEvent) => {
        e.preventDefault()
        if (existingProduct) {
            if (existingProduct?.quantity as number > 1) {
                decreaseQuantity(product.id)
                toast.success(`${product.title} has been removed from cart`);

            } else {
                // Remove the product from cart if quantity is 1
                store.getState().removeFromCart(product.id)
            }
        }
    }


    return (
        <>
            {existingProduct ? (
                <div className={`flex items-center justify-between gap-2 ${cls}`}>
                    <div className="flex items-center gap-2 mt-2 border border-amazonYellow rounded-3xl p-1 bg-amazonYellow/10 w-fit">
                        <button
                            onClick={(e) => handleDeleteFromCart(e)}
                            className="flex items-center justify-center w-8 h-8 text-amazonBlue rounded-full hover:bg-red-100 transition-colors duration-300"
                            aria-label="Remove one item"
                        >
                            <MdRemoveCircleOutline />
                        </button>
                        <span className="text-lg font-semibold">{existingProduct.quantity}</span>
                        <button
                            onClick={(e) => handleAddToCart(e)}
                            className="flex items-center justify-center w-8 h-8 text-amazonBlue rounded-full hover:bg-green-100 transition-colors duration-300"
                            aria-label="Add one more item"
                        >
                            <MdAddCircleOutline />
                        </button>
                    </div>
                    {
                        showSubtotal && (
                            <div className="flex flex-col justify-right items-right mt-2">
                                <p className="text-sm">Subtotal</p>
                                <PriceFormat amount={Number(existingProduct?.quantity) * existingProduct?.price} className="text-[15px] font-semibold ml-2" />
                            </div>
                        )
                    }


                </div>

            ) : (
                <div className='relative bottom-1'>
                    <button onClick={(e) => handleAddToCart(e)}
                        className="flex items-center justify-center mt-2 px-3 py-1 text-sm bg-yellow-400 text-amazonBlue rounded-3xl hover:bg-yellow-500 transition-colors duration-300">
                        Add to cart
                    </button>
                </div>
            )}
        </>

    )
}

export default AddtoCartBtn