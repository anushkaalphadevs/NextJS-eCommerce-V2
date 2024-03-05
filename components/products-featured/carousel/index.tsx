import { storeItem } from 'types';
import ProductItem from './../../product-item';


// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/react';

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if(window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if(window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

type ProductsCarouselType = {
  products: storeItem[]
}

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper 
      spaceBetween={spaceBetween} 
      loop={true}
      navigation={true} 
      centeredSlides={centeredSlides} 
      watchOverflow={true} 
      slidesPerView={slidesPerView} 
      className="swiper-wrapper">
        {products.map((item:any) => (
          <SwiperSlide key={item.id}>
            <ProductItem 
              itemName={item.itemName}
              itemUnitPrice={item.itemUnitPrice}
              key={item.id}
              itemImages={item.itemImages?.[0]?.url} 
              itemCode={item.itemCode} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductsCarousel