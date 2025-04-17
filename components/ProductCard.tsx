import { Product } from '@/type'
import Link from 'next/link';
import React from 'react'
import ProductIcon from './ProductIcon';
import AddtoCartBtn from './AddtoCartBtn';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
  const isTopRated = product.rating >= 4.5;
  const isBestSeller = product.stock > 50;

  return (
    <Link href={`/product/${product.id}`} className="flex flex-col border border-gray-200 p-4 rounded hover:shadow-lg transition-shadow duration-200" aria-label={`View ${product.title}`}>
      {/* Badges */}
      <div className="flex items-center justify-between">
      <div className="flex gap-2 mb-2">
        {isBestSeller && (
          <span className="bg-amazonOrange text-white text-xs px-2 py-1 rounded">Best Seller</span>
        )}
        {isTopRated && (
          <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded flex items-center">
            Overall Pick <span className="ml-1">✓</span>
          </span>
        )}
        
      </div>
      <ProductIcon product={product}/>
        </div>
      

      <div className="relative">
        <img 
          src={product?.images[0]} 
          alt={product?.title} 
          className="w-full h-48 object-contain mb-3" 
        />
        
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-medium line-clamp-2 mb-1 flex-grow">{product.title}</h3>
        
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
          <span className="text-xs text-gray-500 ml-2">({Math.floor(Math.random() * 10000)})</span>
        </div>

        <div className="mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-sm">$</span>
            <span className="text-lg font-medium">{Math.floor(product.price)}</span>
            <span className="text-sm">{(product.price % 1).toFixed(2).substring(1)}</span>
          </div>
          {product.discountPercentage > 0 && (
            <div className="text-sm">
              <span className="text-red-600">Save {product.discountPercentage}%</span>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-2">
          Get it by{' '}
          <span className="font-medium">
            {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="mt-auto">
          <AddtoCartBtn product={product} cls="w-full" showSubtotal={true}/>
          {product.stock <= 20 && (
            <p className="text-xs text-red-600 mt-2">
              Only {product.stock} left in stock - order soon
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard