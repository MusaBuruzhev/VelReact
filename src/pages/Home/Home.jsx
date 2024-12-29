import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Загружаем все товары из API
    fetch('https://6770ef302ffbd37a63cdce38.mockapi.io/MBDataBB/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  // Фильтруем товары по категориям
  const bikes = products.filter((product) => product.category === 'bikes').slice(0, 3);
  const scooters = products.filter((product) => product.category === 'scooters').slice(0, 3);
  const parts = products.filter((product) => product.category === 'parts').slice(0, 3);

  // Функция для получения товаров с самыми большими скидками
  const getTopDiscountedProducts = (count) => {
    const productsWithDiscount = products.filter((product) => product.discount);
    const sortedByDiscount = productsWithDiscount.sort((a, b) => b.discount - a.discount);
    return sortedByDiscount.slice(0, count);
  };

  const topDiscountedProducts = getTopDiscountedProducts(3); // Получаем 3 товара с самыми большими скидками

  return (
    <div className="home">
      <div className='OPIS'>
        <div className="OPIS_LEFT">
          <h2>Велосипеды для любого стиля жизни</h2>
          <h5><li>Высокое качество материалов</li></h5>
          <h5><li>Современный дизайн</li></h5>
          <h5><li>Широкий ассортимент</li></h5>
          <h5><li>Комфорт и удобство</li></h5>
          <li className='CAT_LI'><Link to="/catalog">Каталог</Link></li>
        </div>
        <div className="OPIS_RR">
          <img src="/images/IMAGE.png" alt="Велосипед" />
        </div>
      </div>

      <section className="category">
        <div className="products">
          {bikes.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {}}
            />
          ))}
        </div>
        <div className='category_opis'>
          <h3>Хит продаж — выбирайте лучшее!</h3>
          <p>Топовые модели, которые уже полюбились нашим клиентам! В этом разделе собраны самые популярные велосипеды и скутеры. Высокое качество, стильный дизайн и отличные отзывы — вот что делает их хитами продаж. Успейте купить по выгодной цене!</p>
          <li className='CAT_LI'><Link to="/catalog">Каталог</Link></li>
        </div>  
      </section>

      <div className='OPIS'>
        <div className="OPIS_LEFT">
          <h2>Скутеры: стиль, скорость, удобство</h2>
          <h5><li>Высокое качество материалов</li></h5>
          <h5><li>Современный дизайн</li></h5>
          <h5><li>Лёгкость управления</li></h5>
          <h5><li>Экономичность</li></h5>
          <h5><li>Безопасность</li></h5>
          <li className='CAT_LI'><Link to="/catalog">Каталог</Link></li>
        </div>
        <div className="OPIS_RR">
          <img src="/images/IMAGE.png" alt="Скутер" />
        </div>
      </div>

      <section className="category">
        <div className="products">
          {topDiscountedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {}}
            />
          ))}
        </div>
        <div className='category_opis'>
          <h3>Самые выгодные предложения</h3>
          <p>Товары с самыми большими скидками! Успейте купить по лучшей цене и получите дополнительные бонусы. Акции ограничены по времени, так что не откладывайте покупку!</p>
          <li className='CAT_LI'><Link to="/catalog">Каталог</Link></li>
        </div>
      </section>
    </div>
  );
};

export default Home;