import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setAddedToCart(cart.some((item) => item.id === product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Пожалуйста, войдите в профиль, чтобы добавить товар в корзину');
      navigate('/login');
      return;
    }

    onAddToCart(product);
    setAddedToCart(true);
  };

  // Рассчитываем цену со скидкой
  const discountedPrice = product.discount
    ? (product.prais * (1 - product.discount)).toFixed(2)
    : null;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
      <div className='maga'><img src={product.img} alt={product.name} /></div>
        
        <h4>
          {discountedPrice ? (
            <>
              <span className="original-price">€{product.prais}</span>{' '}
              <span className="discounted-price">€{discountedPrice}</span>
            </>
          ) : (
            `From: €${product.prais}`
          )}
        </h4>
      </Link>
      {addedToCart ? (
        <Link to="/profile" className="added-to-cart">
          В корзине
        </Link>
      ) : (
        <button onClick={handleAddToCart}>Добавить в корзину</button>
      )}
    </div>
  );
};

export default ProductCard;