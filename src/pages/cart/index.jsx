import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
   const [cartItems, setCartItems] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
         window.location = '/login';
         return;
      }

      fetchCartItems(storedToken);
   }, []);

   const fetchCartItems = async (token) => {
      try {
         const response = await axios.get('https://shohsulton.uz/api/allcarts', {
            headers: {
               'Authorization': `Bearer ${token}`,
            },
         });
         if (response.status === 200) {
            setCartItems(response.data.data);
         } else {
            toast.error('Failed to fetch cart items');
         }
      } catch (error) {
         toast.error('Failed to fetch cart items');
      } finally {
         setLoading(false);
      }
   };

   const removeFromCart = async (productId) => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
         window.location.href = '/login';
         return;
      }

      try {
         const response = await axios.delete(`https://shohsulton.uz/api/removecart/${productId}`, {
            headers: {
               'Authorization': `Bearer ${storedToken}`,
            },
         });

         if (response.data.statusCode === 200) {
            const updatedCartItems = cartItems.filter((item) => item.cart_product._id !== productId);
            setCartItems(updatedCartItems);
            toast.success('Cart item removed');
            setTimeout(() => {
               window.location.reload();
            }, 200);
         } else {
            toast.error('Failed to remove cart item');
         }
      } catch (error) {
         toast.error('Failed to remove cart item');
      }
   };

   const handleProductCountChange = (productId, productCount) => {
      setCartItems((prevCartItems) => {
         return prevCartItems.map((item) => {
            if (item.cart_product._id === productId) {
               return {
                  ...item,
                  cart_product: {
                     ...item.cart_product,
                     product_count: productCount,
                  },
               };
            }
            return item;
         });
      });
   };

   const handleBuyAll = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
         window.location.href = '/login';
         return;
      }

      try {
         const buyRequests = cartItems.map((item) => {
            const productCount = parseInt(item.cart_product.product_count);
            return axios.post(
               'https://shohsulton.uz/api/buycart',
               {
                  buy_product: [
                     {
                        product_id: item.cart_product._id,
                        product_count: productCount,
                     },
                  ],
               },
               {
                  headers: {
                     'Authorization': `Bearer ${storedToken}`,
                  },
               }
            );
         });

         await axios.all(buyRequests);
         toast.success('All items bought successfully');
         setCartItems([]);
      } catch (error) {
         toast.error(`${error.response.data.message}`);
      }
   };

   const calculateSubtotal = () => {
      return cartItems.reduce(
         (total, item) => total + item.cart_product.product_price * item.cart_product.product_count,
         0
      );
   };

   const calculateTotal = () => {
      return calculateSubtotal();
   };

   return (
      <div>
         {loading ? (
            <div className="loader-container d-flex justify-content-center align-items-center">
               <div className="loading-text mt-5">Loading...</div>
            </div>
         ) : (
            <div>
               <ToastContainer />
               <div className="bg-light py-3">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-12 mb-0">
                           <Link to="/shop">Shop</Link>
                           <span className="mx-2 mb-0">/</span>
                           <strong className="text-black">Cart</strong>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="site-section">
                  <div className="container">
                     {cartItems.length === 0 ? (
                        <div className="row mb-5">
                           <div className="col-md-12">
                              <h1>No items in the cart</h1>
                           </div>
                        </div>
                     ) : (
                        <div className="row mb-5">
                           <form className="col-md-12" method="post">
                              <div className="site-blocks-table">
                                 <table className="table table-bordered">
                                    <thead>
                                       <tr>
                                          <th className="product-thumbnail">Image</th>
                                          <th className="product-name">Product</th>
                                          <th className="product-price">Price</th>
                                          <th className="product-quantity">Quantity</th>
                                          <th className="product-total">Total</th>
                                          <th className="product-remove">Remove</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {cartItems.map((item) => (
                                          <tr key={item.cart_product._id}>
                                             <td className="product-thumbnail">
                                                <img
                                                   src={`https://shohsulton.uz/api/images/${item.cart_product.product_image}`}
                                                   alt="Product Image"
                                                   className="img-fluid"
                                                />
                                             </td>
                                             <td className="product-name">
                                                <h2 className="h5 text-black">{item.cart_product.product_name}</h2>
                                             </td>
                                             <td>${item.cart_product.product_price}</td>
                                             <td>
                                                <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                                                   <div className="input-group-prepend">
                                                      <button
                                                         className="btn btn-outline-primary js-btn-minus"
                                                         type="button"
                                                         onClick={() => {
                                                            const currentCount = item.cart_product.product_count;
                                                            if (currentCount > 1) {
                                                               handleProductCountChange(
                                                                  item.cart_product._id,
                                                                  currentCount - 1
                                                               );
                                                            }
                                                         }}
                                                      >
                                                         &minus;
                                                      </button>
                                                   </div>
                                                   <input
                                                      id={`productCount_${item.cart_product._id}`}
                                                      type="text"
                                                      className="form-control text-center"
                                                      value={item.cart_product.product_count}
                                                      placeholder=""
                                                      aria-label="Example text with button addon"
                                                      aria-describedby="button-addon1"
                                                      readOnly
                                                   />
                                                   <div className="input-group-append">
                                                      <button
                                                         className="btn btn-outline-primary js-btn-plus"
                                                         type="button"
                                                         onClick={() => {
                                                            const currentCount = item.cart_product.product_count;
                                                            handleProductCountChange(
                                                               item.cart_product._id,
                                                               currentCount + 1
                                                            );
                                                         }}
                                                      >
                                                         &plus;
                                                      </button>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>${item.cart_product.product_price * item.cart_product.product_count}</td>
                                             <td>
                                                <button
                                                   type="button"
                                                   className="btn btn-primary btn-sm"
                                                   onClick={() => {
                                                      removeFromCart(item._id)
                                                   }}
                                                >
                                                   X
                                                </button>
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           </form>
                        </div>
                     )}

                     {cartItems.length > 0 && (
                        <div className="row d-flex justify-content-end">
                           <div className="col-md-6 pl-5">
                              <div className="row justify-content-end">
                                 <div className="col-md-7">
                                    <div className="row">
                                       <div className="col-md-12 text-right border-bottom mb-5">
                                          <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                       </div>
                                    </div>
                                    <div className="row mb-3">
                                       <div className="col-md-6">
                                          <span className="text-black">Subtotal</span>
                                       </div>
                                       <div className="col-md-6 text-right">
                                          <strong className="text-black">${calculateSubtotal()}</strong>
                                       </div>
                                    </div>
                                    <div className="row mb-5">
                                       <div className="col-md-6">
                                          <span className="text-black">Total</span>
                                       </div>
                                       <div className="col-md-6 text-right">
                                          <strong className="text-black">${calculateTotal()}</strong>
                                       </div>
                                    </div>

                                    <div className="row">
                                       <div className="col-md-12">
                                          <button className="btn btn-primary btn-lg btn-block" onClick={handleBuyAll}>
                                             Buy All
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Cart;
