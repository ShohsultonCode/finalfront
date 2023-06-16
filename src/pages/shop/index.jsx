import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Index() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [productName, setProductName] = useState('');
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

    const filterProducts = async () => {
        try {
            const response = await axios.post(
                'https://shohsulton.uz/api/filter/products',
                {
                    product_name: productName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProducts(response.data.data);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addToCart = (productId) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const product = products.find((item) => item._id === productId);

        if (product) {
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            toast.success('Product added to cart!');
        }
    };

    const sellProduct = (productId) => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            toast.error('Please login to add to cart', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        };

        axios
            .post(`https://shohsulton.uz/api/sell/${productId}`, null, config)
            .then((response) => {
                toast.success('Success', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                // Handle the error
                toast.error('Something went wrong', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    const renderProducts = () => {
        if (!products || products.length === 0) {
            return <div>No products found.</div>;
        }
        return products.map((product) => (
            <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up" key={product._id}>
                <div className="block-4 text-center border">
                    <figure className="block-4-image">
                        <Link to={`/single/${product._id}`}>
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
                            <Link>{product.product_name}</Link>
                            <p className='mx-5'>Count: {product.product_count}</p>
                        </h3>
                        <p className="mb-0">{product.product_description}</p>
                        <p className="text-primary font-weight-bold">${product.product_price}</p>

                        <div className="alll">
                            {token ? (
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(product._id)}>
                                        Cart
                                    </button>
                                    <button className="btn btn-primary btn-sm" onClick={() => sellProduct(product._id)}>
                                        Buy
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            toast.error('Please login to add to cart', {
                                                position: toast.POSITION.TOP_RIGHT,
                                            });
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = async (event) => {
        const searchValue = event.target.value;
        setProductName(searchValue);

        if (searchValue === '') {
            // If no search value, fetch all products
            fetchProducts();
        } else {
            // If search value exists, filter products
            filterProducts();
        }
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
                            <input
                                placeholder="Search Product"
                                type="text"
                                className="form-control w-25"
                                value={productName}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="text-center loader-animation">Loading...</div>
                    ) : (
                        <>
                            <div className="row">{renderProducts()}</div>
                            {totalPages > 1 && (
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
                                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
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
                                                            style={{ transition: 'all 0.3s' }}
                                                        >
                                                            &gt;
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Index;
