'use client'
import { store } from '@/lib/store'
import { Product } from '@/type'
import { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

const ProductIcon = ({ product }: { product: Product }) => {

    const { favoriteProduct, addToFavorite } = store()
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        const isFavorite = favoriteProduct.some((item) => item.id === product.id)
        setFavorite(isFavorite)
    }, [favoriteProduct, product.id])

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        setFavorite(!favorite)
        addToFavorite(product).then(() => {
            toast.success(favorite ? `${product.title} has been removed` : `${product.title} has been added`);
        })
    }
    return (
        <div className=' flex items-center gap-2' >
            <p>{product?.discountPercentage}%</p>

            {favorite ? <MdFavorite onClick={(e) => handleFavorite(e)} /> : <MdFavoriteBorder onClick={(e) => handleFavorite(e)} />}
        </div>
    )
}

export default ProductIcon