import React, { useEffect, useState } from 'react';
import Sells from './admin/sells/sells'
import Private from './private/Private';
import Dashboard from './admin/sells';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CollectionsSection from './components/categoriesSection/index';
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
import axios from 'axios';
import Sidebar from './admin/siderbar';
import Products from './admin/products';
import UpdateProduct from './admin/products/updateproduct';
import AddProduct from './admin/products/addproducts';

const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      if (token) {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data.user_role);
      }
    } catch (error) { }
  };

  return (
    <div className='site-rap'>
      {user && user === 'user' ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<CollectionsSection />} />
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/update/profile' element={<UpdatePage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/mycategories' element={<CategorisAuth />} />
            <Route path='/recent/products' element={<FeaturedProducts />} />
            <Route path='/single/:id' element={<SingleProduct />} />
            <Route path='*' element={<Private />} />
          </Routes>
          <Footer />
        </>
      ) : user && user === 'admin' ? (
        <div className='layout'>
          <Sidebar />
          {/* Routes ss  */}
          <div className='content'>
            <Routes>
              {/* ///s */}
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/product/:id' element={<UpdateProduct />} />
              <Route path='/add/product' element={<AddProduct />} />
              <Route path='/sells' element={<Sells />} />
              <Route path='*' element={<Private />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<CollectionsSection />} />
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/update/profile' element={<UpdatePage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/mycategories' element={<CategorisAuth />} />
            <Route path='/recent/products' element={<FeaturedProducts />} />
            <Route path='/single/:id' element={<SingleProduct />} />
            <Route path='*' element={<Private />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
