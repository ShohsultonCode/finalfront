import React from 'react';
import { Link } from 'react-router-dom';

function Shop() {
    return (
        <>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0">
                            <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Shop</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-9 order-2">
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <div className="float-md-left mb-4">
                                        <h2 className="text-black h5">Shop All</h2>
                                    </div>
                                    <input type="text" className='form-control' placeholder='Search Product' />

                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                                    <div className="block-4 text-center border">
                                        <figure className="block-4-image">
                                            <Link to="/single">
                                                <img
                                                    src="images/cloth_1.jpg"
                                                    alt="Image placeholder"
                                                    className="img-fluid"
                                                />
                                            </Link>
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3>
                                                <Link to="shop-single.html">Tank Top</Link>
                                            </h3>
                                            <p className="mb-0">Finding perfect t-shirt</p>
                                            <p className="text-primary font-weight-bold">$50</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Add other product cards here */}
                            </div>

                            <div className="row" data-aos="fade-up">
                                <div className="col-md-12 text-center">
                                    <div className="site-block-27">
                                        <ul>
                                            <li>
                                                <Link to="#">&lt;</Link>
                                            </li>
                                            <li className="active">
                                                <span>1</span>
                                            </li>
                                            <li>
                                                <Link to="#">2</Link>
                                            </li>
                                            <li>
                                                <Link to="#">3</Link>
                                            </li>
                                            <li>
                                                <Link to="#">&gt;</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Shop;
