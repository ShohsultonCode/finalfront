import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import axios from 'axios';

const index = () => {
   const [products, setProducts] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const token = localStorage.getItem('token');

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/lastproducts');
            const data = response.data.data;
            setProducts(data);
         } catch (error) {
            toast.error('Something went wrong', {
               position: toast.POSITION.TOP_RIGHT,
            });
         }
      };

      fetchProducts();
   }, []);




   const addToCart = (productId) => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
         toast.error('Please login to add to cart', {
            position: toast.POSITION.TOP_RIGHT,
         });
         return;
      }

      const config = {
         headers: {
            Authorization: `Bearer ${storedToken}`,
         },
      };

      axios
         .post(`http://localhost:5000/api/addcart`, { cart_product: productId }, config)
         .then((response) => {
            toast.success('Product added to cart!');
         })
         .catch((error) => {
            toast.error('Something went wrong', {
               position: toast.POSITION.TOP_RIGHT,
            });
         });
   };


   const removeFromCart = (productId) => {
      const updatedCartItems = cartItems.filter((item) => item._id !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
   };

   return (
      <div className="site-section block-3 site-blocks-2 bg-light">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-md-7 site-section-heading text-center pt-4">
                  <h2>Featured Products</h2>
               </div>
            </div>
            <div className="row justify-content-center">
               <div className="col-md-12">
                  <div className="nonloop-block-3 owl-carousel gap-5">
                     {products.map((product) => (
                        <div className="block-4 text-center border" key={product._id}>
                           <div className="block-4-image">
                              <figure className="block-4-image">
                                 <img
                                    src={`http://localhost:5000/api/images/${product.product_image}`}
                                    alt="Product Image"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                    className="img-fluid"
                                 />
                              </figure>
                              <div className="block-4-text p-4">
                                 <h3>
                                    <a href="#">{product.product_name}</a>
                                 </h3>
                                 <p className="mb-0">{product.product_description}</p>
                                 <p className="text-primary font-weight-bold">${product.product_price}</p>
                                 <button className="btn btn-primary" onClick={() => addToCart(product._id)}>Add to Cart</button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <ToastContainer />
      </div>

   );
};

export default index
