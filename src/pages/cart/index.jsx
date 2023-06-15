import React from 'react';

const Cart = () => {
   return (
      <div>
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
                              <tr>
                                 <td className="product-thumbnail">
                                    <img src="images/cloth_1.jpg" alt="Image" className="img-fluid" />
                                 </td>
                                 <td className="product-name">
                                    <h2 className="h5 text-black">Top Up T-Shirt</h2>
                                 </td>
                                 <td>$49.00</td>
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
                                 <td>$49.00</td>
                                 <td><a href="#" className="btn btn-primary btn-sm">X</a></td>
                              </tr>
                              <tr>
                                 <td className="product-thumbnail">
                                    <img src="images/cloth_2.jpg" alt="Image" className="img-fluid" />
                                 </td>
                                 <td className="product-name">
                                    <h2 className="h5 text-black">Polo Shirt</h2>
                                 </td>
                                 <td>$49.00</td>
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
                                 <td>$49.00</td>
                                 <td><a href="#" className="btn btn-primary btn-sm">X</a></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </form>
               </div>
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
                                 <strong className="text-black">$230.00</strong>
                              </div>
                           </div>
                           <div className="row mb-5">
                              <div className="col-md-6">
                                 <span className="text-black">Total</span>
                              </div>
                              <div className="col-md-6 text-right">
                                 <strong className="text-black">$230.00</strong>
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
            </div>
         </div>
      </div>
   );
};

export default Cart;
