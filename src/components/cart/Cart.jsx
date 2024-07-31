import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../features/cart/cartSlice';
import { incrementByAmount, decrementByAmount, reset } from '../../features/counter/counterSlice';
import './Cart.css';
import CustomButton from '../button/CustomButton';
import Modal from '../customModal/CustomModal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.counter.value);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (productId, quantity) => {
    dispatch(removeFromCart(productId));
    dispatch(decrementByAmount({ amount: quantity }));
  };

  const handleQuantityChange = (productId, amount) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + amount;
      if (newQuantity >= 0) {
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
        if (amount > 0) {
          dispatch(incrementByAmount({ amount }));
        } else {
          dispatch(decrementByAmount({ amount: -amount }));
        }
      }
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * (item.discont_price || item.price);
    }, 0).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrder = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearCart());
    dispatch(reset());
    navigate('/LeerCart'); // перенаправляем на страницу LeerCart после закрытия модального окна
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="cartContainer">
      <div className="cartLeft">
        <h2>Shopping cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cartItem">
            <img src={`http://localhost:3333${item.image}`} alt={item.title} className="cartItemImage" />
            <div className="cartItemDetails">
              <h3>{item.title}</h3>
              <div className="cartItemActions">
                <div className="cartItemQuantity">
                  <div className='countRight' onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>-</div >
                  <span className='valueSpan'>{item.quantity}</span>
                  <div className='countLeft' onClick={() => handleQuantityChange(item.id, 1)}>+</div >
                </div>
                <p>Price: ${(item.discont_price ? item.discont_price : item.price).toFixed(2)}</p>
                <p>Total: ${(item.quantity * (item.discont_price ? item.discont_price : item.price)).toFixed(2)}</p>
                <button className="removeButton" onClick={() => handleRemove(item.id, item.quantity)}>✖</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cartRight">
        <form className="orderForm">
          <h3>Order Details</h3>
          <p className='countFormTitle'> {calculateTotalItems()} Items</p>
          <div className='infoTitleForm'>
            <div><p className='countFormTitle total' >Total </p></div>
            <div className='TotalPrice'><p> ${calculateTotalPrice()}</p></div>
          </div>
          <Box className='formInputColumn'
            component="form"
            sx={{
              '& > :not(style)': { m: 0 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="phone" label="Phone number" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
          </Box>
          <div className='orderButton'>
            <CustomButton onClick={handleOrder}>Order</CustomButton>
          </div>
        </form>
      </div>
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleModalClose}
          message={{ title: 'Success', body: 'Your order has been placed successfully!' }}
        />
      )}
    </div>
  );
};

export default Cart;
