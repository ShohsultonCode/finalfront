import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
   const [cartItems, setCartItems] = useState([]);

   useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
         window.location = '/login'; // Redirect to the login page if token is not found
         return;
      }

      fetchCartItems(storedToken);
   }, []);

   const fetchCartItems = async (token) => {
      try {
         const response = await fetch('https://shohsulton.uz/api/allcarts', {
            headers: {
               'Authorization': `Bearer ${token}`,
            },
         });
         if (response.ok) {
            const data = await response.json();
            setCartItems(data.data);
         } else {
            toast.error('Failed to fetch cart items');
         }
      } catch (error) {
         console.error(error);
         toast.error('Failed to fetch cart items');
      }
   };

   const removeFromCart = async (productId) => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
         window.location.href = '/login'; // Redirect to the login page if token is not found
         return;
      }

      try {
         const response = await fetch(`https://shohsulton.uz/api/removecart/${productId}`, {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${storedToken}`,
            },
         });
         if (response.ok) {
            const updatedCartItems = cartItems.filter((item) => item.cart_product.id !== productId);
            setCartItems(updatedCartItems);
            toast.success('Cart item removed');
         } else {
            toast.error('Failed to remove cart item');
         }
      } catch (error) {
         console.error(error);
         toast.error('Failed to remove cart item');
      }
   };

   const calculateSubtotal = () => {
      return cartItems.reduce((total, item) => total + item.cart_product.product_price, 0);
   };

   const calculateTotal = () => {
      return calculateSubtotal();
   };

   return (
      <div>
         <ToastContainer />
         <div className="bg-light py-3">
            <div className="container">
               <div className="row">
                  <div className="col-md-12 mb-0">
                     <a href="index.html">Home</a>
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
                                    <tr key={item.cart_product.id}>
                                       <td className="product-thumbnail">
                                          <img src={`https://shohsulton.uz/api/images/${item.cart_product.product_image}`} alt="Product Image" className="img-fluid" />
                                       </td>
                                       <td className="product-name">
                                          <h2 className="h5 text-black">{item.cart_product.product_name}</h2>
                                       </td>
                                       <td>${item.cart_product.product_price}</td>
                                       <td>
                                          <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
                                             <div className="input-group-prepend">
                                                <button className="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                                             </div>
                                             <input type="text" className="form-control text-center" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                             <div className="input-group-append">
                                                <button className="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                                             </div>
                                          </div>
                                       </td>
                                       <td>${item.cart_product.product_price}</td>
                                       <td><button className="btn btn-primary btn-sm" onClick={() => removeFromCart(item.cart_product.id)}>X</button></td>
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
                                    <button className="btn btn-primary btn-lg py-3 btn-block" onClick={() => window.location = 'checkout.html'}>Buy All</button>
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
   );
};

export default Cart;
