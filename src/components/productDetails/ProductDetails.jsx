import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Импортируем useDispatch из react-redux
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useNavigate из react-router-dom
import './ProductDetails.css';
import CustomButton from '../button/CustomButton';
import Modal from "../customModal/CustomModal"
import { addToCart } from '../../features/cart/cartSlice'; // Импортируем действие addToCart

const ProductDetails = () => {
  const { productId } = useParams(); // Получение идентификатора продукта из URL
  const navigate = useNavigate(); // Инициализация useNavigate для навигации
  const [product, setProduct] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch(); // Используем useDispatch для получения dispatch

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/products/${productId}`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProduct(response.data[0]); // Получаем первый элемент массива
        } else {
          console.error('Product data not found or invalid format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const { image, title, description = '', discont_price, price } = product;
  const discountedPrice = discont_price ? discont_price.toFixed(2) : 'N/A';
  const originalPrice = price ? price.toFixed(2) : 'N/A';
  const descriptionText = description || 'No description available';

  const descriptionStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: showMore ? 'unset' : '5',
    height: showMore ? 'auto' : '227px', // Изменяем высоту в зависимости от состояния showMore
  };

  const handleButtonClick = (product, e) => {
    e.stopPropagation();
    if (quantity > 0) {
      dispatch(addToCart({ ...product, quantity })); // Передаем продукт и количество
      setModalMessage('Product added to cart successfully!');
      setShowModal(true);
  
      // Переход на страницу корзины через 2 секунды
      setTimeout(() => {
        navigate('/cart');
      }, 2000);
    } else {
      setModalMessage('Quantity must be greater than 0');
      setShowModal(true);
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount)); // Устанавливаем минимальное количество 1
  };

  return (
    <div className='productDetails'>
      <div className='productImageContainer'>
        <img
          src={`http://localhost:3333${image}`}
          alt={title}
          className='productImage'
        />
      </div>
      <div className='productInfo'>
        <h1 className='productTitle'>{title}</h1>
        <p className='productPrice'>
          {discountedPrice !== 'N/A' ? (
            <div className='priceBox'>
              <p className='discountedPrice'>${discountedPrice}</p>
              <p className='originalPrice'>${originalPrice}</p>
              <div className="Badge">
                {Math.round(((product.price - product.discont_price) / product.price) * 100)}%
              </div>
            </div>
          ) : (
            <span className='price'>${originalPrice}</span>
          )}
        </p>
        <div className='productCounter'>
          <div className='counterLeft' onClick={() => handleQuantityChange(-1)}>-</div>
          <span className='counterValue'>{quantity}</span>
          <div className='counterRight' onClick={() => handleQuantityChange(1)}>+</div>
         <CustomButton className="detailsButton" clickedText="Added" onClick={(e) => handleButtonClick(product, e)}>
              Add to cart
            </CustomButton>
        </div>
        <div className='productAction'>
            
          </div>
        <div className='productDescription' style={descriptionStyle}>
          <p className='descriptionTitle'>Description</p>
          {descriptionText}
        </div>
        {description.length > 100 && (
          <button className='readMoreButton' onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
      {showModal && (
        <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        message={{ title: 'Success', body: modalMessage }}
      />
      )}
    </div>
  );
};

export default ProductDetails;
