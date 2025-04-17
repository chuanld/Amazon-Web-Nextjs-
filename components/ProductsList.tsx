import React from "react";
import { Product } from "@/type";
import ProductCard from "./ProductCard";
import  Container  from "@/components/Container";
interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({products}:ProductsListProps) => {

  return <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
    {
      products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))

    }
  </Container>;
};

export default ProductsList;
