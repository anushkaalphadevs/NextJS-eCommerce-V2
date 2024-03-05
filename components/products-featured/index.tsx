import { useGetstoreItemsQuery } from 'store/api';
import ProductsCarousel from './carousel';
import { useEffect, useState } from 'react';

const ProductsFeatured = () => {

 const {data:storeItems} = useGetstoreItemsQuery([])
 const [StoreItemrList, setStoreItemrList] = useState([]);
 
 useEffect(() => {
  getData();
}, [storeItems]);

const getData = async () => {
  setStoreItemrList(await storeItems);
  console.log(await storeItems);
};

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products/All Items" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={StoreItemrList} />
      </div>
    </section>
  )
};

export default ProductsFeatured