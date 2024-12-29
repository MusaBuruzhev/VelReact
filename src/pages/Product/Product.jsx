import React, { useEffect, useState } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import products from '../../data/products';
  import ProductCard from '../../components/ProductCard/ProductCard';
  import './Product.css';

  const Product = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
      // Находим товар по ID
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        
        navigate('/catalog');
      }

   
      const randomProducts = getRandomProducts(3, foundProduct ? foundProduct.id : null);
      setRecommendedProducts(randomProducts);
    }, [id, navigate]);

    
    const getRandomProducts = (count, excludeId) => {
      const filteredProducts = products.filter((p) => p.id !== excludeId);
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    if (!product) {
      return <div>Загрузка...</div>;
    }

 
    const discountedPrice = product.discount
      ? (product.prais * (1 - product.discount)).toFixed(2)
      : null;

    return (
      <div className="product-page">
        <h1>{product.name}</h1>
        <img src={product.img} alt={product.name} />
        <div className='OP'> 
              <p>
                Цена: €{product.prais}{' '}
                {product.discount && (
                  <span className="discount"> </span>
                )}
              </p>

              {discountedPrice && <p className="discounted-price">Цена со скидкой: €{discountedPrice}</p>}
            
              <p>Категория: {product.category}</p>
              <p>Описание: {product.description || 'Описание отсутствует.'}</p>
              {product.weight && <p>Вес: {product.weight}</p>}
              {product.speed && <p>Скорость: {product.speed}</p>}
        </div>
        
        <button onClick={() => navigate(-1)}>Назад</button>

        <div className="recommended-products">
          <h2>Рекомендуемые товары</h2>
          <div className="products">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => {}} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Product;