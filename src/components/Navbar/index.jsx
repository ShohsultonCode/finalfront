import React from 'react';
import './style.scss'
import { Link } from 'react-router-dom';

const Header = () => {
   const hasToken = localStorage.getItem('token');
   return (
      <>
         <header className="site-navbar" role="banner">
            <div className="site-navbar-top">
               <div className="container">
                  <div className="row align-items-center">

                     <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                        <form action="" className="site-block-top-search">
                           <span className="icon icon-search2"></span>
                           <input type="text" className="form-control border-0" placeholder="Search" />
                        </form>
                     </div>

                     <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                        <div className="site-logo">
                           <Link to="/" className="js-logo-clone">Shoppers</Link>
                        </div>
                     </div>

                     <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                        {hasToken ? (
                           <div className="site-top-icons">
                              <ul>
                                 <li><Link to="/profile"><span className="icon icon-person"></span></Link></li>
                                 <li>
                                    <Link to="/cart" className="site-cart">
                                       <span className="icon icon-shopping_cart"></span>
                                    </Link>
                                 </li>
                                 <li className="d-inline-block d-md-none ml-md-0"><Link to="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu"></span></Link></li>
                              </ul>
                           </div>
                        ) : (
                           <div className="site-top-icons">
                              <ul>
                                 <li><Link to="/signup"><button className="btn btn-signup">Sign Up</button></Link></li>
                                 <li><Link to="/login"><button className="btn btn-login">Login</button></Link></li>
                              </ul>
                           </div>
                        )}
                     </div>

                  </div>
               </div>
            </div>
            <nav className="site-navigation text-right text-md-center" role="navigation">
               <div className="container">
                  {
                     hasToken ? (
                        <ul className="site-menu js-clone-nav d-none d-md-block">
                           <li className="children">
                              <Link to="/">Home</Link>
                           </li>
                           <li><Link to="/shop">Shop</Link></li>
                           <li><Link to="/mycategories">Categories Settings</Link></li>
                           <li><Link to="/add/product">Contact</Link></li>
                        </ul>
                     )
                        : (
                           <ul className="site-menu js-clone-nav d-none d-md-block">
                              <li className="children">
                                 <Link to="/">Home</Link>
                              </li>
                              <li><Link to="/shop">Shop</Link></li>
                              <li><Link to="/mycategories">Categories</Link></li>
                              <li><Link to="/add/product">Contact</Link></li>
                           </ul>
                        )
                  }
               </div>
            </nav>
         </header>
      </>
   );
};

export default Header;
