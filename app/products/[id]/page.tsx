import React from 'react'
import ProductSingle from '../../../components/ProductSingle';

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <ProductSingle id={id}/>
        </div>
    )
}

export default ProductDetail