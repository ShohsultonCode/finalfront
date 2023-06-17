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

        }
    };

    const filterProducts = async () => {
        try {
            const url = token
                ? 'https://shohsulton.uz/api/filter/products'
                : 'https://shohsulton.uz/api/noauthfilter/products';

            const response = await axios.post(
                url,
                {
                    product_name: productName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setProducts(response.data.data);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } catch (error) {
        }
    };

    const addToCart = (productId) => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            toast.error('Please login to add to cart', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        };

        axios
            .post(`https://shohsulton.uz/api/addcart`, { cart_product: productId }, config)
            .then((response) => {
                toast.success('Product added to cart!');
            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    const sellProduct = (productId) => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            toast.error('Please login to buy', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        };

        axios
            .post(`https://shohsulton.uz/api/sell/${productId}`, {}, config)
            .then((response) => {
                toast.success('Success', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
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

    const renderPagination = () => {
        if (!totalPages) return null;
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {pages}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <>
            <div className="site-section site-section-sm site-blocks-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col">
                                    <div className="form-inline">
                                        <input
                                            placeholder="Search Product"
                                            type="text"
                                            className="form-control w-25"
                                            value={productName}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                {isLoading ? (
                                    <div className="col text-center">Loading...</div>
                                ) : (
                                    renderProducts()
                                )}
                            </div>
                            <div className="row mt-3">
                                <div className="col text-center">{renderPagination()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Index;
