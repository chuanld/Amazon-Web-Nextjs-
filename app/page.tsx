import {
  bannerFive,
  bannerFour,
  bannerOne,
  bannerThree,
  bannerTwo,
} from "@/assets";
import ProductsList from "@/components/ProductsList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useFetchData } from "@/hooks/fetchData";
import Image from "next/image";

export default async function Home() {

  const {products} = await useFetchData('https://dummyjson.com/products')


  const bannerImages = [
    { title: "bannerOne", source: bannerOne },
    { title: "bannerTwo", source: bannerTwo },
    { title: "bannerThree", source: bannerThree },
    { title: "bannerFour", source: bannerFour },
    { title: "bannerFive", source: bannerFive },
  ];
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {bannerImages?.map((item) => (
            <CarouselItem key={item?.title}>
              <Image
                src={item?.source}
                alt="bannerOne"
                className="w-full"
                height={1080}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="p-10">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
