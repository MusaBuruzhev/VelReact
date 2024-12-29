import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Profile from './pages/Profile/Profile';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Product from './pages/Product/Product';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;