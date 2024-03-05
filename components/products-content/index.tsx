import { useContext, useState } from 'react';
import List from './list';
import 'react-responsive-pagination/themes/classic.css';
import { useRouter } from 'next/router';
import { DataContext } from 'layouts/Main';

const ProductsContent = () => {
  const  data  = useContext<any>(DataContext);
  const router = useRouter()
  console.log(data)
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>{router.query.products}</h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List />
    </section>
  );
};
  
export default ProductsContent
