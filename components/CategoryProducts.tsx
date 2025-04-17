'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { CategoryItems, Product } from '@/type';
import LoadingSpinner from './ui/loading';
import { useFetchData } from '@/hooks/fetchData';
import { AnimatePresence, motion } from 'motion/react';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';

interface CategoryProductsProps {
    id: string;
    categories: CategoryItems[];
}

const CategoryProducts = ({ id, categories }: CategoryProductsProps) => {
    const [currentCate, setCurrentCate] = useState(id)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    if (categories.length === 0) {
        return <div><LoadingSpinner size='md' text='' height='min-h-screen' /></div>;
    }

    const getProductByCategory = async () => {
        setIsLoading(true)
        try {
            const edp = `https://dummyjson.com/products/category/${currentCate}`
            const { products } = await useFetchData(edp)
            setProducts(products)
        } catch (err) {
            console.error(err)
        } finally { setIsLoading(false) }
    }

    useEffect(() => {
        if (!id) return
        getProductByCategory()
    }, [])

    const handleClickCategory = useCallback(
        (category: string) => {
            if (category === currentCate) return
            router.push(`/category/${category}`)
        }
        , [router, currentCate])

    return (
        <div className="flex mx-auto min-h-screen p-4">
            {/* Sidebar Section */}
            <div className="w-64 flex-shrink-0">
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-lg font-bold mb-2">Department</h2>
                    <div className="text-sm text-gray-700">
                        <div className="font-medium mb-2">{currentCate}</div>
                        <div className="text-amazonBlue hover:text-amazonOrange cursor-pointer">
                            International Shipping Available
                        </div>
                    </div>
                </div>
                

                <div>
                    <h2 className="text-lg font-bold mb-2">Categories</h2>
                    <ul className="text-sm text-gray-700 space-y-2">
                        {categories.map((category: any, index) => (
                            <li 
                                onClick={() => handleClickCategory(category)}
                                key={index} 
                                className={`cursor-pointer hover:text-amazonOrange
                                ${currentCate === category ? 'text-amazonOrange font-medium' : ''}`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Products Section */}
            <div className="flex-1 pl-8">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold capitalize">{currentCate}</h1>

                </div>

                {isLoading ? (
                    <LoadingSpinner size='lg' height='min-h-500' text='' />
                ) : products?.length ? (
                    <>
                        <div className="text-sm text-gray-600 mb-4">
                            1-{products.length} of over {products.length} results for <span className="text-amazonOrange font-medium">{currentCate}</span>
                        </div>
                        <AnimatePresence>
                            <motion.div
                                layout
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {products.map((product: Product) => (
                                    <ProductCard product={product} key={product.id} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </>
                ) : (
                    <p>No products available in {currentCate}</p>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;