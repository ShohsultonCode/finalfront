import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const storedToken = localStorage.getItem('token');

    const sellProduct = (productId) => {
        if (!storedToken) {
            toast.error('Please login to buy the product', {
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
            .post(`http://localhost:5000/api/sell/${productId}`, null, config)
            .then((response) => {
                toast.success('Product bought successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    const addToCart = (productId) => {
        if (!storedToken) {
            toast.error('Please login to add the product to the cart', {
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
            .post(
                'http://localhost:5000/api/addcart',
                { cart_product: productId },
                config
            )
            .then((response) => {
                toast.success('Product added to cart successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const url = storedToken
                ? `http://localhost:5000/api/userproduct/${id}`
                : `http://localhost:5000/api/noauthproduct/${id}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setProduct(response.data.data);
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    if (!product) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <ToastContainer />
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0">
                            <Link to="/shop">Shop</Link>{' '}
                            <span className="mx-2 mb-0">/</span>{' '}
                            <strong className="text-black">{product.product_name}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={`http://localhost:5000/api/images/${product.product_image}`}
                                alt="Image"
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-6 mt-5">
                            <h2 className="text-black">{product.product_name}</h2>
                            <p>{product.product_description}</p>
                            <p>Count: {product.product_count}</p>
                            <p>
                                <strong className="text-primary h4">${product.product_price}</strong>
                            </p>
                            <p>
                                <button
                                    className="buy-now btn btn-sm btn-primary"
                                    onClick={() => addToCart(product._id)}
                                >
                                    Add To Cart
                                </button>
                            </p>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => sellProduct(product._id)}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
