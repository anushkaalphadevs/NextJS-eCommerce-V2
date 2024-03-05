import Link from 'next/link';
import { storeItem } from 'types';
import { useContext } from 'react';
import { DataContext } from 'layouts/Main';

const ProductItem = ({ itemCode,itemName, itemUnitPrice, itemImages }: storeItem) => {
  const  selectedData  = useContext(DataContext);
  
  return (
    <>
      <div className="product-item">
      <div className="product__image">
        {/* <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button> */}
        <Link  href="/product/[pid]"
   as={`/product/${itemCode?.toLowerCase()}`}>
          <a>
            <img src={itemImages} alt="product" />
            {/* {discount && 
              <span className="product__discount">{discount}%</span>
            } */}
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{itemName}</h3>
        <div className={"product__price "}>
          <h4>{selectedData.selectedCurrency?.code?selectedData.selectedCurrency?.code:selectedData.selectedDefaultcurrency  }{' '}{ selectedData.selectedCurrency?.rate?selectedData.selectedCurrency?.rate * itemUnitPrice:selectedData.defaultRate *selectedData.selectedCurrency?.rate}</h4>
        </div>
      </div>
    </div>
    </>
   

  )
};


export default ProductItem