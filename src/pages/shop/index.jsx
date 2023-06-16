import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Index() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const url = token
                ? `https://shohsulton.uz/api/productspagination/${currentPage}`
                : `https://shohsulton.uz/api/pacepagination/${currentPage}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const renderProducts = () => {
        return products.map((product) => (
            <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up" key={product._id}>
                <div className="block-4 text-center border">
                    <figure className="block-4-image">
                        <Link to="/single">
                            <img
                                src={`https://shohsulton.uz/api/images/${product.product_image}`}
                                alt="Image placeholder"
                                className="img-fluid"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                        </Link>
                    </figure>
                    <div className="block-4-text p-4">
                        <h3>
                            <Link to="shop-single.html">{product.product_name}</Link>
                        </h3>
                        <p className="mb-0">{product.product_description}</p>
                        <p className="text-primary font-weight-bold">${product.product_price}</p>
                    </div>
                </div>
            </div>
        ));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        if (totalPages < 2) {
            return null;
        }

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="row" data-aos="fade-up">
                <div className="col-md-12 text-center">
                    <div className="site-block-27">
                        <ul>
                            {currentPage > 1 && (
                                <li>
                                    <Link
                                        to="#"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        style={{ transition: 'all 0.3s' }}
                                    >
                                        &lt;
                                    </Link>
                                </li>
                            )}
                            {pageNumbers.map((number) => (
                                <li
                                    key={number}
                                    className={currentPage === number ? 'active' : ''}
                                    style={{ transition: 'all 0.3s' }}
                                >
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            handlePageChange(number);
                                            setTimeout(() => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }, 300);
                                        }}
                                    >
                                        {number}
                                    </Link>
                                </li>
                            ))}
                            {currentPage < totalPages && (
                                <li>
                                    <Link
                                        to="#"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        style={{ transition: 'all 0.1s' }}
                                    >
                                        &gt;
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0">
                            <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>{' '}
                            <strong className="text-black">Products</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-12 text-center">
                            <h2 className="section-title mb-3">Products</h2>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <>
                            <div className="row">{renderProducts()}</div>
                            {renderPagination()}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Index;
