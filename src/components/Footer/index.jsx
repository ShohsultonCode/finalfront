import React from 'react';
import heroImage from '../../../images/hero_1.jpg';
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <footer className="site-footer border-top">
         <div className="container">
            <div className="row">
               <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="row">
                     <div className="col-md-12">
                        <h3 className="footer-heading mb-4">Navigations</h3>
                     </div>
                     <div className="col-md-6 col-lg-4">
                        <ul className="list-unstyled">
                           <li><Link to="#">Sell online</Link></li>
                           <li><Link to="#">Features</Link></li>
                           <li><Link to="#">Shopping cart</Link></li>
                           <li><Link to="#">Store builder</Link></li>
                        </ul>
                     </div>
                     <div className="col-md-6 col-lg-4">
                        <ul className="list-unstyled">
                           <li><Link to="#">Mobile commerce</Link></li>
                           <li><Link to="#">Dropshipping</Link></li>
                           <li><Link to="#">Website development</Link></li>
                        </ul>
                     </div>
                     <div className="col-md-6 col-lg-4">
                        <ul className="list-unstyled">
                           <li><Link to="#">Point of sale</Link></li>
                           <li><Link to="#">Hardware</Link></li>
                           <li><Link to="#">Software</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <h3 className="footer-heading mb-4">Promo</h3>
                  <Link to="#" className="block-6">
                     <img src={heroImage} alt="Image placeholder" className="img-fluid rounded mb-4" />
                     <h3 className="font-weight-light mb-0">Finding Your Perfect Shoes</h3>
                     <p>Promo from January 15 &mdash; 25, 2019</p>
                  </Link>
               </div>
               <div className="col-md-6 col-lg-3">
                  <div className="block-5 mb-5">
                     <h3 className="footer-heading mb-4">Contact Info</h3>
                     <ul className="list-unstyled">
                        <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
                        <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
                        <li className="email">emailaddress@domain.com</li>
                     </ul>
                  </div>

                  <div className="block-7">
                     <form action="#" method="post">
                        <label htmlFor="email_subscribe" className="footer-heading">Subscribe</label>
                        <div className="form-group">
                           <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email" />
                           <input type="submit" className="btn btn-sm btn-primary" />
                           {/* ///easdfghjk? */}
                        </div>
                     </form>
                  </div>
               </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
               <div className="col-md-12">
                  <p>
                     {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                     &copy;<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
                     <script>{`document.write(new Date().getFullYear());`}</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" className="text-primary">Colorlib</a>
                     {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </p>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
