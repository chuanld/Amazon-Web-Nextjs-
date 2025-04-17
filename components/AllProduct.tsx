'use client'
import { Product } from '@/type'


import React, { useState, useEffect } from 'react'
import Title from './Title'
import Container from './Container'
import { Card, CardContent } from './ui/card'
import ProductFilter from './ProductFilter'
import ProductCard from './ProductCard'
import LoadingSpinner from './ui/loading'
import { AnimatePresence, motion } from 'motion/react'
import { useFetchData } from '@/hooks/fetchData'
import useOnScreen from '@/hooks/useScreen'

export default function AllProduct({ categories }: { categories: string[] }) {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string | ''>('')
    const [priceFilter, setPriceFilter] = useState<string>('')
    const [priceValue, setPriceValue] = useState<number>(0)
    const [hasMore, setHasMore] = useState(true)
    const maxPrice = 40000
    const defaultPrice = 0
    const perPage = 12
    const [applicationRef, setApplicationRef] = useState<HTMLDivElement | null>(null)
    const observerRef = useOnScreen(applicationRef)

    console.log(applicationRef, observerRef)




    const loadMoreProducts = async (reset = false) => {
        if (isLoading || (!hasMore && !reset)) return;
        setIsLoading(true)
        const categoryFilter = selectedCategory ? `/category/${selectedCategory}` : '';
        const filterPrice = priceFilter ? `sortBy=price&order=${priceFilter}` : '';
        const edp = `https://dummyjson.com/products${categoryFilter}?${filterPrice}&limit=${perPage}&skip=${reset ? 0 : (currentPage - 1) * perPage}`;
        try {
            const data = await useFetchData(edp);
            if (reset) {
                setProducts(data?.products || [])
                setHasMore(data?.products?.length > 0)
                setCurrentPage(1)
            } else if (data?.products?.length > 0) {
                setProducts(prev => [...prev, ...data?.products])
            } else { setHasMore(false) }

        } catch (err) {
            console.error('Error loading more products:', err);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadMoreProducts()
    }, [currentPage])

    useEffect(() => {
        loadMoreProducts(true)
    }, [selectedCategory, priceFilter])


    useEffect(() => {
        if (observerRef && hasMore) {
            setTimeout(() => {
                setCurrentPage(prev => prev + 1)
            }, 2000)
        }
    }, [observerRef, hasMore])


    return (
        <Container className='flex flex-col gap-4 mx-auto max-w-7xl py-10 min-h-screen scroll-smooth'>
            <Title className='flex text-4xl font-bold text-center mb-5'>
                Discover the best products for your home
            </Title>
            <div className='flex gap-4 border-none'>
                <Card className='mb-10 w-1/4 '>
                    <CardContent className='flex flex-col gap-4 p-6 sm:flex-row sm:justify-between'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:gap-0'>
                            <ProductFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                priceFilter={priceFilter}
                                setPriceFilter={setPriceFilter}
                                priceValue={priceValue}
                                setPriceValue={setPriceValue}
                                defaultPrice={defaultPrice}
                                maxPrice={maxPrice}

                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className='w-3/4 border-none min-h-screen'>
                    {isLoading ? (
                        <LoadingSpinner size='lg' height='h-min-screen' text='' />
                    ) : products?.length ? (
                        <>
                            <div className="text-sm text-gray-600 mb-4">
                                1-{products.length} of over {products.length} results for <span className="text-amazonOrange font-medium">{selectedCategory}</span>
                            </div>
                            <AnimatePresence>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0.2 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
                                >
                                    {products.map((product: Product, idx: number) => (
                                        <div key={idx.toString()} className='grid'>
                                            <ProductCard product={product} />
                                        </div>

                                    ))}
                                </motion.div>
                            </AnimatePresence>
                            <div ref={setApplicationRef}>
                                {
                                    observerRef && (
                                        <div className='w-full'>
                                            <LoadingSpinner size='lg' height='h-min-screen text-ama
                                            -500' text='' />
                                        </div>
                                    )
                                }

                            </div>
                        </>
                    ) : (
                        <p>No products available in {selectedCategory}</p>
                    )}
                </Card>
            </div>
        </Container>
    )
}