import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import axios from 'axios';

const FeaturedProducts = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('https://shohsulton.uz/api/lastproducts');
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
                  <div className="nonloop-block-3 owl-carousel">
                     {products.map((product) => (
                        <div className="item" key={product._id}>
                           <div className="block-4 text-center">
                              <figure className="block-4-image">
                                 <img
                                    src={`https://shohsulton.uz/api/images/${product.product_image}`}
                                    alt="Product Image"
                                    className="block-4-img"
                                 />
                              </figure>
                              <div className="block-4-text p-4">
                                 <h3>
                                    <a href="#">{product.product_name}</a>
                                 </h3>
                                 <p className="mb-0">{product.product_description}</p>
                                 <p className="text-primary font-weight-bold">${product.product_price}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FeaturedProducts;
