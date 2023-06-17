import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CollectionsSection from './components/categoriesSection/index'
import Cart from './pages/cart';
import Shop from './pages/shop';
import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import ProfilePage from './pages/profile';
import FeaturedProducts from './components/recentproducts';
import CategorisAuth from './components/categories';
import SingleProduct from './pages/ProductsSingle';
import UpdatePage from './pages/editprofile';
import ContactPage from './pages/contact';

const App = () => {
  return (
    <div className='site-wrap'>
      <Navbar />
      <Routes>
        <Route path="/" element={<CollectionsSection />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update/profile" element={<UpdatePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mycategories" element={<CategorisAuth />} />
        <Route path="/recent/products" element={<FeaturedProducts />} />
        <Route path="/single/:id" element={<SingleProduct />} />



      </Routes>
      <Footer />
    </div>
  );
};

export default App;