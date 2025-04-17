import React, { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { useDebounce } from '@/hooks/debounce'

interface Props {
    categories: string[]
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    priceFilter: string
    setPriceFilter: (price: string) => void
    priceValue: number
    setPriceValue: (price: number) => void
    defaultPrice: number
    maxPrice: number
}
const ProductFilter = ({ categories
    ,selectedCategory, setSelectedCategory, priceFilter, setPriceFilter, priceValue, setPriceValue,defaultPrice,maxPrice
}: Props) => {

    const debounceSetFilterPrice = useDebounce(setPriceValue, 1000);

    const [categoriesArray, setCategoriesArray] = useState(categories.slice(0, 8))

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
               {
                categoriesArray?.map((item,idx) => (
                    <div key={idx} className='flex items-center gap-2 cursor-pointer'>
                        <Checkbox 
                            id={`category-${item}`}
                            checked={selectedCategory===item}
                            onCheckedChange={()=>setSelectedCategory(item)}
                        />
                        <Label className='capitalize'>{item}</Label>
                    </div>
                ))
               } 
               {
                categoriesArray?.length >8 ? <button onClick={()=>setCategoriesArray(categories.slice(0,8))}
                className='text-sm text-black-500 hover:text-amazonOrange text-left hoverEffect'>
                    Minimize categories
                </button> : <button 
                onClick={()=>setCategoriesArray(categories)}
                className='text-sm text-black-500 hover:text-amazonOrange text-left hoverEffect'>
                    Show all
                </button>
               }  
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-sm font-medium">Price Range: ${priceFilter}</label>
                <div className="space-y-2">
                    {[
                        {value:'desc',title:'High to low'},
                        {value:'asc',title:'Low to high'},
                    ].map((item)=>(
                        <div key={item?.title} className='flex items-center'>
                            <Checkbox
                            id={`price-${item?.value}`}
                            onCheckedChange={()=>setPriceFilter(item?.value)}
                            checked={priceFilter===item?.value}/>
                            <Label htmlFor={`price-${item?.value}`} className='capitalize ml-2'>{item?.title}</Label>
                        </div>
                    ))}
                </div>
                <Slider
                    max={maxPrice}
                    defaultValue={[defaultPrice]}
                    step={1}
                    onValueChange={(e) => debounceSetFilterPrice(e[0])}
                    className='cursor-pointer'
                />
                {
                    priceValue>0&&(
                        <p className="mt-3 text-sx">
                            Filter by price: <span className='font-bold'>${defaultPrice}</span>
                            to{" "}
                            <span className='font-bold'>${priceValue}</span>
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default ProductFilter
