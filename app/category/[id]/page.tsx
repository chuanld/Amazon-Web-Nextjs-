import CategoryProducts from '@/components/CategoryProducts'
import { useFetchData } from '@/hooks/fetchData'
import React from 'react'

type Props = Promise<{
  id: string
}>
const Category = async ({params}:{params:Props}) => {
  const {id} = await params
  const edp = 'https://dummyjson.com/products/category-list'
  const categories = await useFetchData(edp)


  return (
    <div>
      <CategoryProducts id={id} categories={categories}/>
    </div>
  )
}

export default Category