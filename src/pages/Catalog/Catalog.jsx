import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Catalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Загружаем все товары из API
    fetch('https://6770ef302ffbd37a63cdce38.mockapi.io/MBDataBB/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Изначально отображаем все товары
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  // Функция для фильтрации товаров по категории
  const filterProducts = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="catalog">
      <div className="filters">
        <button onClick={() => filterProducts('all')}>Все</button>
        <button onClick={() => filterProducts('bikes')}>Велосипеды</button>
        <button onClick={() => filterProducts('scooters')}>Скутеры</button>
        <button onClick={() => filterProducts('parts')}>Запчасти</button>
      </div>
      <div className="products">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;