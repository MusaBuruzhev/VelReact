import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className='logo'>
            <Link to="/">
              <img src="/images/logo.svg" alt="Логотип" />
            </Link>
          </li>
          <li className='glavv_link logg'><Link to="/">Главная</Link></li>
          <li className='logg'><Link to="/catalog">Каталог</Link></li>
          {currentUser ? (
            <>
              <li className='logg'><Link to="/profile">Профиль</Link></li>
              <li className='logg vv'><button onClick={handleLogout}><img src="/images/icons1.png" alt="Выйти" width={30} /></button></li>
            </>
          ) : (
            <li className='voit'><Link to="/login"><img src="/images/voyti.png" alt="Войти" /></Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;    