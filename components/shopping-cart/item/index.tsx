import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { useState } from "react";
import { useDeleteCartItemMutation } from "store/api";
import { ICart } from "types";
import { getCurrency, getRate } from "utils/common-util";

const ShoppingCart = ({
  id,
  itemTumb,
  itemName,
  itemUnitPrice,
  orderQTY,
  item,
  orderID,
  childParent,
  cartItems,
}: ICart) => {
  const [count, setCount] = useState<any>(orderQTY);
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [rate] = useState<any>(getRate())
  const [Currency] = useState<any>(getCurrency())

  const removeFromCart = (cartItem: ICart) => {
    let objectClone = { ...cartItem };
    objectClone.orderID = orderID;
    deleteCartItem(objectClone).then(() => {
      childParent({refresh:true})
      if (cartItems?.cartItem?.length == 1) {
        localStorage.removeItem("orderId");
      }
    
    });
  };

  const setProductCount = (count: number) => {
    if (count > 0) {
      setCount(count);
    }
  };

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={itemTumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{itemName}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-button">
          <button
            type="button"
            onClick={() => setProductCount(count - 1)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={() => setProductCount(count + 1)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>{Currency+' '+itemUnitPrice*rate}</td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => removeFromCart(item)}></i>
      </td>
    </tr>
  );
};

export default ShoppingCart;
