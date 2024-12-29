import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [cart, setCart] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);


  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };


  const handleOrder = () => {
    setIsModalOpen(true);
    clearCart();
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile">
      <h1>Ваш профиль</h1>
      <div className="cart">
        <div className='off'>
          <h2>Корзина</h2>
          {cart.length > 0 && (
            <button className="order-button" onClick={handleOrder}>
              Оформить
            </button>
          )}
        </div>
        
        <div className='car'>
        {cart.length === 0 ? (
          <div className='folse'><p>Ваша корзина пуста</p></div>
          
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.img} alt="" />
                <h4>From: €{item.prais}</h4>
                <div > <button className='btn' onClick={() => removeFromCart(item.id)}>Удалить</button></div>
               
              </li>
            ))}
          </ul>
        )}
        </div>
       
        
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Оплата прошла успешно!</h2>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;