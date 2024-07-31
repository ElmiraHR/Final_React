import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductByCategory.css';
import CustomButton from '../button/CustomButton';
import Modal from '../customModal/CustomModal'; // Импортируем вашу модалку CustomModal
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice'; // Проверьте путь к вашему срезу

const ProductsByCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/categories/${id}`);
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
          setCategoryName(response.data.category.title || 'Category Title Not Available');
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Останавливаем распространение события
    dispatch(addToCart({ ...product, quantity: 1 }));
    setModalMessage('Product added to cart successfully!');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const truncateDescription = (description) => {
    if (typeof description !== 'string') {
      console.error('Description is not a string:', description);
      return 'No Description Available';
    }
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  };

  return (
    <div className='productByCategoryPage'>
      <h3>{categoryName}</h3>
      <div className="productGrid">
        {products.map((product) => (
          <div key={product.id} className="productItem" onClick={() => handleProductClick(product)}>
            <div className="productImageWrapper">
              {product.image ? (
                <img src={`http://localhost:3333${product.image}`} alt={product.title} className="productImage" />
              ) : (
                <div className="placeholderImage">No Image</div>
              )}
              {product.discont_price && (
                <div className="discountBadge">
                  {Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                </div>
              )}
            </div>
            <p className="productDescription">{truncateDescription(product.description)}</p>
            <div className="priceContainer">
              {product.price && (
                <>
                  {product.discont_price && (
                    <div className="price-container">
                      <div className="discount-price">${product.discont_price.toFixed(2)}</div>
                      <div className="original-price">${product.price.toFixed(2)}</div>
                    </div>
                  )}
                  {!product.discont_price && (
                    <div className="price-container">
                      <div className="discount-price">${product.price.toFixed(2)}</div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className='productAction'>
              <CustomButton clickedText="Added" onClick={(e) => handleAddToCart(product, e)}>
                Add to cart
              </CustomButton>
            </div>
          </div>
        ))}
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

export default ProductsByCategory;
