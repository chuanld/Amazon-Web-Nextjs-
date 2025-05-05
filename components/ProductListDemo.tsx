'use client'
import { Product } from '@/type'


import React, { useState, useEffect, useRef } from 'react'
import Title from './Title'
import Container from './Container'
import { Card, CardContent } from './ui/card'
import ProductFilter from './ProductFilter'
import ProductCard from './ProductCard'
import LoadingSpinner from './ui/loading'
import { AnimatePresence, motion } from 'motion/react'
import { fetchData } from '@/hooks/fetchData'
import useOnScreen from '@/hooks/useScreen'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'



export default function ProductListDemo({ categories }: { categories: string[] }) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string | ''>('')
    const [priceFilter, setPriceFilter] = useState<string>('')
    const [priceValue, setPriceValue] = useState<number>(0)
    const [hasMore, setHasMore] = useState(true)
    const maxPrice = 40000
    const defaultPrice = 0
    const perPage = 20
    const observerRef = useInfiniteScroll({
        hasMore,
        loading,
        onLoadMore: () => setCurrentPage(prev => prev + 1),
    })

    const loadProducts = async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;
        setLoading(true)
        const categoryFilter = selectedCategory ? `/category/${selectedCategory}` : '';
        const filterPrice = priceFilter ? `sortBy=price&order=${priceFilter}` : '';
        const edp = `https://dummyjson.com/products${categoryFilter}?${filterPrice}&limit=${perPage}&skip=${reset ? 0 : (currentPage - 1) * perPage}`;
        try {
            const data = await fetchData(edp);
            if (reset) {
                console.log('product reset')
                setProducts(data?.products || [])
                setHasMore(data?.products?.length > 0)
                setCurrentPage(1)
            } else if (data?.products?.length > 0) {
                console.log('product continue load')

                setProducts((prev) => [...prev, ...data?.products])
            } else { setHasMore(false) }

        } catch (err) {
            console.error('Error loading more products:', err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [currentPage])

    useEffect(() => {
        loadProducts(true)
    }, [selectedCategory, priceFilter])

    // useEffect(() => {
    //     if (loading) return
    //     const observer = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting && hasMore) {
    //             setTimeout(() => {
    //                 setCurrentPage(prev => prev + 1)
    //             }, 2000)
    //         }
    //     })

    //     if (observerRef.current) {
    //         observer.observe(observerRef.current)
    //     }

    //     return () => {
    //         if (observerRef.current) {
    //             observer.unobserve(observerRef.current)
    //         }
    //     }
    // }, [loading, hasMore])

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
                    <div className="text-sm text-gray-600 mb-4">
                        1-{products.length} of over {products.length} results for <span className="text-amazonOrange font-medium">{selectedCategory}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {products.map((product: Product, idx: number) => (

                            <ProductCard product={product} key={idx.toString()} />


                        ))}


                    </div>
                    {loading && <div className='w-full'>
                        <LoadingSpinner size='lg' height='h-min-screen text-ama
                                            -500 py-8' text='' />
                    </div>}
                    <div ref={observerRef} className="h-1" />



                </Card>
            </div>
        </Container>
    )
}
