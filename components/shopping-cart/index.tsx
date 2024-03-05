
import { useLazyGetCartItemQuery } from 'store/api';
import Item from './item';
import { useEffect, useState } from 'react';
import { getCurrency, getRate } from 'utils/common-util';

const ShoppingCart = () => {
  const initialState = {
    orderId:
      typeof window !== "undefined"
        ? window.localStorage.getItem("orderId")
        : false,
  };
  const [getCartItem, { data: cartItem }] = useLazyGetCartItemQuery();
  const [cartItemListObject, setCartItemListObject] = useState<any>({});
  const [cartItemListArray, setCartItemListArray] = useState([]);
  const [rate] = useState<any>(getRate())
  const [Currency] = useState<any>(getCurrency())

  useEffect(() => {

    getData()
  }, [getCartItem])
  

  const getData = async () => {
    if(initialState?.orderId) {
      setCartItemListObject((await getCartItem(initialState?.orderId)).data)
      setCartItemListArray((await getCartItem(initialState?.orderId)).data.cartItem)
    }  
  }
  const getRefresh=  () => {
    console.log(cartItemListArray.length)
    if(cartItemListArray.length==1) {
      setCartItemListArray([])
    }
      getData()


  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          {/* <CheckoutStatus step="cart" /> */}
        </div>

        <div className="cart-list">
          {cartItemListArray?.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>Product</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cartItemListArray?.map((item:any )=> (
                  <Item 
                    key={item.id}
                    id={item.id}
                    itemTumb={item.itemThumbnail}
                    item={item}
                    orderID= {cartItemListObject?.orderID}
                    itemUnitPrice={item.itemUnitPrice}
                    orderQTY={item.orderQTY}
                    itemName = {item.itemName}
                    refetch= {cartItemListArray}
                    cartItems = {cartItem}
                    childParent = {()=>getRefresh()}
                    
                  />
                ))}
              </tbody>
            </table> 
          } 
          {cartItemListArray?.length === 0 && 
            <p>Nothing in the cart</p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/products/All Items" className="cart__btn-back"><i className="icon-left"></i> Continue Shopping</a>
          <input type="text" placeholder="Promo Code" className="cart__promo-code" />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Total cost <strong>{Currency+' '+cartItemListObject?.total*rate}</strong></p>
            <a href="/cart/checkout" className="btn btn--rounded btn--yellow">Checkout</a>
          </div>
        </div>
      </div>
    </section>
  )
};

  
export default ShoppingCart