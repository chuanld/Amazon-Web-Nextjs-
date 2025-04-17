import AllProduct from '@/components/AllProduct'
import { useFetchData } from '@/hooks/fetchData'

export default async function ProductPage() {
    const getCategories = async () => {
        try {
            const edp = 'https://dummyjson.com/products/category-list'
            const res = await useFetchData(edp)
            return res
        } catch (err) {
            console.log(err)
        }

    }
    const categories = await getCategories()

    return (
        <div>
            <AllProduct categories={categories} />
        </div>
    )
}
