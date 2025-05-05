import ProductListDemo from '@/components/ProductListDemo'
import { fetchData } from '@/hooks/fetchData'

export default async function ProductsPage() {
    const getCategories = async () => {
        try {
            const edp = 'https://dummyjson.com/products/category-list'
            const res = await fetchData(edp)
            return res
        } catch (err) {
            console.log(err)
        }

    }
    const categories = await getCategories()

    return (
        <div>
            <ProductListDemo categories={categories} />
        </div>
    )
}
