import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';
import { Link, useNavigate } from 'react-router-dom';

const CarouselComponent = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Импортируем и инициализируем useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pet-shop-backend.slavab.kz/categories/all');
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Неправильный формат данных:', response.data);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Используем navigate для перенаправления
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // Количество слайдов, которое будет прокручиваться за одно нажатие
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className='carousel'>
      <div className="carouselHeader">
        <h3>Categories</h3>
        <div className="line"></div>
        <Link to="/pages/categories"><button className='carouselBtn'>All categories</button></Link>
      </div>
      {categories.length > 0 ? (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // означает рендеринг карусели на сервере
          infinite={true}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="categoriesPageItem"
              onClick={() => handleCategoryClick(category.id)}
              style={{ cursor: 'pointer' }} // Устанавливаем курсор как указатель
            >
              {category.image ? (
                <img src={`https://pet-shop-backend.slavab.kz${category.image}`} alt={category.title} className="category-image" />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
              <p className="category-title">{category.title}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default CarouselComponent;
