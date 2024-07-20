import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCartItem } from '../../redux/actionCreators/productActions'
import DismissibleToasts from './DismissibleToasts';
import RemoveModal from './RemoveModal';
import './addToCart.css';

const AddToCart = () => {
  const dispatch = useDispatch();
  const { toastDetails } = useSelector((state) => state.allproducts);
  const { cartsItem, cartsDetail } = useSelector((state) => state.allproducts.carts);
  console.log('getCart from add to cart==>>>', cartsItem);
  const [removePopUp, setRemovePopUp] = useState(false);
  const [removeItem, setRemoveItem] = useState({});
  const [cart, setCart] = useState([]);

  let totalQuantity = 0;
  cartsItem.forEach(item => {
    totalQuantity += item.quantity
  });
  
  useEffect(() => {
    if (cartsItem.length === 0) {
      const getCartItems = JSON.parse(localStorage.getItem('cartItems'));
      setCart(getCartItems);
    } else {
      setCart(cartsItem);
    }
  }, [cartsItem])

  const deleteCartItem = (id) => {
    dispatch(removeCartItem(id));
    setRemovePopUp(false);
  }

  const showRemoveItemModal = (show, item = {}) => {
    setRemoveItem(item);
    setRemovePopUp(show);
  }

  return (
    <div className='container'>
      {
        toastDetails.showToast &&
        <DismissibleToasts />
      }
      {
        cart.length === 0 ?
          (
            <div className='addToCart-empty'>Cart is empty</div>
          )
          :

          cart.map((item, index) => {
            const { title, image, price, category, quantity } = item;
            return (
              <div className='mb-3' key={index}>
                <div className='addToCart-contain'>
                  <Image className='addToCart-image' src={image} />
                  <div className='addToCart-detail mx-3'>
                    <div className='addToCart-title'>{title}</div>
                    <div className='addToCart-category'>{category}</div>
                    <div className='addToCart-price'>$ {price}</div>
                    <div>
                      <Link className='addToCart-remove' onClick={() => showRemoveItemModal(true, item)} >REMOVE</Link>
                    </div>
                    <div className='my-2'>Item: {quantity}</div>
                  </div>
                </div>
              </div>
            )
          })
      }
      <RemoveModal
        show={removePopUp}
        onHide={() => showRemoveItemModal(false)}
        deleteCartItem={deleteCartItem}
        removeItem={removeItem}
      />
      {
        cartsItem.length === 0 ? '' :
          <div className='cartItem-detail'>
            <div className='cart-Box'>
              <div>
                <span className='cart-priceDetail'>Price details</span>
                <div>
                  <span>Total item: ({totalQuantity})</span>
                </div>
                <div>
                  <span className='cart-total'>Total amount: ({cartsDetail.totalPrice})</span>
                </div>
              </div>
            </div>
            <Link to={`/cart/placeOrder`}>
              <Button className='cart-placeholder my-2' >Place Order</Button>
            </Link>
          </div>
      }
    </div>
  )
}

export default AddToCart;