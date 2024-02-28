import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss'
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [statis, setStatis] = useState(null);
    const token = localStorage.getItem('token');
    const productsPerPage = 3; // Number of products to display per page
    const [currentPage, setCurrentPage] = useState(1);


    if (!token) {
        window.location.href = '/login'
    }

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);
    const handleLogout = () => {
        localStorage.removeItem('token');

        toast.success('Log out succsessfuly', {
            position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data.data);
            setStatis(response.data.status);
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    if (!user) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the index range for products to be displayed on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = statis.ownproduct.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(statis.ownproduct.length / productsPerPage);

    return (
        <section className="gradient-custom-2">
            <ToastContainer />
            <div className="containe w-100 py-5 h-100 d-flex justify-content-center align-items-center ">
                <div className="row w-75 d-flex justify-content-center align-items-center ">
                    <div className="col  w-100">
                        <div className="card">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img
                                        src={`http://localhost:5000/api/images/${user.user_image}`}
                                        alt="Generic placeholder image"
                                        className="img-fluid img-thumbnail mt-4 mb-2"
                                        style={{ width: '150px', zIndex: 1 }}
                                    />
                                    <Link to="/update/profile" type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>
                                        Edit profile
                                    </Link>



                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <h5>{user.user_location}</h5>
                                    <h2>{user.user_first_name} {user.user_last_name}</h2>
                                </div>

                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <p className="mb-1 h5">{statis.sells}</p>
                                        <p className="small text-muted mb-0">All Sells</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="mb-1 h5">{statis.ownproducts}</p>
                                        <p className="small text-muted mb-0">Buy Products</p>
                                    </div>

                                </div>

                            </div>
                            <div className="card-body p-4 text-black">
                                <div className="mb-5">
                                    <button className="btn btn-outline-dark" onClick={handleLogout} style={{ zIndex: 1, float: "right" }}>
                                        Log Out
                                    </button>
                                    <h2>You Balance: ${user.user_payment}</h2>
                                    <p className="lead fw-normal mt-5 mb-1">Description</p>
                                    <div className="p-4 mt-3" style={{ backgroundColor: '#f8f9fa' }}>
                                        <p className="font-italic mb-1">{user.user_description}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className="lead fw-normal mb-0">My Products</p>
                                </div>
                                <div className="row">

                                    {currentProducts.map((product) => (
                                        <div
                                            className="col-sm-6 col-lg-4 mb-4"
                                            key={product.sell_product._id}
                                        >
                                            <div className="block-4 text-center border">
                                                <figure className="block-4-image">
                                                    <img
                                                        src={`http://localhost:5000/api/images/${product.sell_product.product_image}`}
                                                        alt="Product Image"
                                                        className="img-fluid"
                                                        style={{ height: '200px', objectFit: 'cover' }}

                                                    />
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3 className="block-4-title">
                                                        <Link to={`/product/${product.sell_product._id}`}>
                                                            {product.sell_product.product_name}
                                                        </Link>
                                                    </h3>
                                                    <p className="block-4-description">
                                                        {product.sell_product.product_description}
                                                    </p>
                                                    <p className="block-4-price">
                                                        ${product.sell_product.product_price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Pagination */}
                                    <nav className="pagination-container">
                                        <ul className="pagination justify-content-center">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li
                                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''
                                                        }`}
                                                    key={index + 1}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
