'use client'
import { fetchData } from '@/hooks/fetchData';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AddtoCartBtn from './AddtoCartBtn';
import PriceFormat from './PriceFormat';
import { store } from '@/lib/store';
import { paymentImage } from '@/assets';
import { MdStarRate } from 'react-icons/md';
import toast from 'react-hot-toast';
import LoadingSpinner from './ui/loading';

const ProductSingle = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<any>(null);
  const { cartProduct,addToCart } = store()



  const getProductById = async (id: string) => {
    try {
      const edp = `https://dummyjson.com/products/${id}`;
      const res = await fetchData(edp);
      setProduct(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id, cartProduct]);

  if (!product) {
    return <div><LoadingSpinner size='md' text='' height='min-h-screen'/></div>;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product) {
      addToCart(product).then(() => {
        toast.success(`${product.title} has been added to cart`);
      })
    }
  }

  return (
    <>
      <div className="flex mx-auto min-h-screen p-4">
        <div className="flex flex-col gap-7 md:w-4/6">
          <div className="flex md:flex-row gap-5 ">
            <div className="flex flex-col items-center md:w-2/3">
              <div className="w-full h-96 relative">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <div className="flex gap-2 mt-4">
                {product.images.map((image: string, index: number) => (
                  <div key={index} className="w-20 h-20 relative border rounded-lg">
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="fit"
                      className="block rounded-lg transition-transform duration-500 group hover:scale-125"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Product Details */}
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500 text-lg font-semibold">
                  {product.rating} ★
                </span>
                <span className="text-sm text-gray-500">
                  ({product.stock} in stock)
                </span>
              </div>
              <PriceFormat
                amount={product.price}
                className="text-3xl font-bold text-amazonOrange mb-4"
              />
              <div className="mb-4">
                <AddtoCartBtn product={product} cls='' showSubtotal={true}  />
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Brand: {product.brand}</li>
                  <li>Category: {product.category}</li>
                  <li>Stock: {product.stock}</li>
                </ul>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">About this item</h2>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
              <div className='flex items-center my-4 gap-4'>
                <p className='italic text-sm'>Payment with: </p>
                <Image src={paymentImage} className='object-cover' alt='Payment' />
              </div>
            </div>
          </div>
          {/* Left Section: Image Gallery */}
          <div className="mt-8 px-20">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <div className=" flex justify-start items-center align-baseline gap-4 mb-10">
              {product?.reviews.map((review: any, i: number) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-lg p-4 shadow-sm min-w-400 flex-grow"
                >
                  <div className="flex items-center justify-between mb-2 ">
                    <p className="text-sm font-semibold">{review.reviewerName}</p>
                    <div className="flex items-center justify-center font-semibold ">

                      {
                        Array?.from({ length: 5 })?.map((_, idx) => (
                          <MdStarRate key={idx} className={`${idx < review.rating ? "text-yellow-500" : "text-lightText"}`} />
                        ))
                      }
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Section */}
        <div className="mt-8 md:mt-0 w-70 md:w-100  p-4 rounded-lg shadow-md">
          <PriceFormat
            amount={product.price}
            className="text-3xl font-bold text-amazonOrange mb-4"
          />
          <p className="text-sm text-red-600 mb-2">
            Only {product.stock} left in stock - order soon.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="quantity" className="text-sm font-semibold">
              Quantity:
            </label>
            <select
              id="quantity"
              className="border border-gray-300 rounded-md p-1"
            >
              {[...Array(product.stock).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={(e) => handleAddToCart(e)}
            className="w-full bg-yellow-400 text-amazonBlue py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors mb-2">
            Add to Cart
          </button>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors">
            Buy Now
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Ships from and sold by Amazon.com
          </p>
        </div>

        {/* Bottom Section: About the Product */}
        <div className="fixed top-0 right-0 z-100 w-[120px] bg-white p-4 h-screen overflow-auto scroll-smooth">
          <button className="w-full bg-transparent text-amazonBlue py-1 rounded-2xl text-sm border border-black hover:bg-yellow-500 transition-colors mb-2">
            Go to Cart
          </button>
          {
            cartProduct.length > 0 ? (

              cartProduct.map((item) => (
                <div key={item.id} className="flex flex-col justify-center items-center gap-4 mt-4">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="text-sm font-semibold flex flex-nowrap justify-start items-start">{item.title}</p>
                    <p className="text-sm text-red-600">
                      {item.price} x {item.quantity}.
                    </p>
                    <div className="flex items-center gap-2 mt-2">

                      <div className="mb-4">
                        <AddtoCartBtn product={item} cls={'flex-col items-left text-sm'} showSubtotal={true} />
                      </div>
                    </div>
                  </div>
                </div>
              ))


            ) : (<></>)
          }

        </div>

      </div>

    </>
  );
};

export default ProductSingle;