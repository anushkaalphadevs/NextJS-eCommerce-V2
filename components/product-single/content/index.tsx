import { useContext, useState } from 'react';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import productsColors from './../../../utils/data/products-colors';
import productsSizes from './../../../utils/data/products-sizes';
import CheckboxColor from './../../products-filter/form-builder/checkbox-color';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../store/reducers/cart';
import { toggleFavProduct } from '../../../store/reducers/user';
import { Cart, ICart, ProductStoreType } from '../../../types/index';
import { useAddToCartMutation } from '../../../store/api';
import { toastr } from 'react-redux-toastr';
import { DataContext } from '../../../layouts/Main';
import React from 'react';


const Content = ({ product }: any) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>('');
  const [itemSize, setItemSize] = useState<string>('');
  const [addtoCart] = useAddToCartMutation()
  let storeCode = process.env.STORE_CODE || 15
  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setItemSize(e.target.value);
  const  selectedData  = useContext(DataContext);
  console.log(selectedData)
  // const { favProducts } = useSelector((state: any) => state.user);
  const isFavourite = true;

  const toggleFav = () => {
    dispatch(toggleFavProduct(
      { 
        id: product.id,
      }
    ))
  }
  
  const  createCartEntry =():ICart =>  {
    return {
      ...new Cart(),
      storeCode: storeCode,
      orderID: localStorage.getItem('orderId'),
      orderQTY: count,
      itemCode: product?.itemCode
    }
  }
  const addToCart = async () => {
    const cartEntry = createCartEntry();
    await addtoCart(cartEntry)
    .then((res: any) => {
      if (res.data) {
        localStorage.setItem('orderId', res.data.orderID);
        toastr.success(res.data.item.itemCode,' Added to cart sucessfully');
      } else {
        toastr.error(res.error.data.title ,'failed');
      }
      console.log(res);
    })
    const productToSave: ProductStoreType = { 
      id: product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : '',
      price: product.currentPrice,
      selectedCount: count,
      color: color,
      size: itemSize
    }

    const productStore = {
      count,
      product: productToSave
    }

    dispatch(addProduct(productStore));
  }

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">Product ID:<br></br>{product?.itemCode}</h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product?.itemName}</h2>

        <div className="product__prices">
          <h4>{selectedData.selectedCurrency?.code?selectedData.selectedCurrency?.code:selectedData.selectedDefaultcurrency  }{' '}{ selectedData.selectedCurrency?.rate?selectedData.selectedCurrency?.rate * product?.itemUnitPrice:selectedData.defaultRate *selectedData.selectedCurrency?.rate}</h4>
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {productsColors.map(type => (
              <CheckboxColor 
                key={type.id} 
                type={'radio'} 
                name="product-color" 
                color={type.color}
                valueName={type.label}
                onChange={onColorSet} 
              />
            ))}
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Size: <strong>See size table</strong></h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map(type => (
                  <option value={type.label}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button type="button" onClick={() => setCount(count - 1)} className="quantity-button__btn">
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={() => setCount(count + 1)} className="quantity-button__btn">
                +
              </button>
            </div>
            
            <button type="submit" onClick={() => addToCart()} className="btn btn--rounded btn--yellow">Add to cart</button>
            <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};
  
export default Content;
    