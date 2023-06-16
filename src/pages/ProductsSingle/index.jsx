import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const token = localStorage.getItem('token');
    const storedToken = localStorage.getItem('token');
    const sellProduct = (productId) => {
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

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const url = token
                ? `https://shohsulton.uz/api/userproduct/${id}`
                : `https://shohsulton.uz/api/noauthproduct/${id}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    if (!product) {
        return <div className="loading-container">
            <div className="loading-text">Loading...</div>
        </div>
    }
    return (
        <div>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0">
                            <Link to="/shop">Shop</Link> <span className="mx-2 mb-0">/</span>{' '}
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
                                src={`https://shohsulton.uz/api/images/${product.product_image}`}
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

                                <button className="buy-now btn btn-sm btn-primary">
                                    Add To Cart
                                </button>
                            </p>
                            <button className="btn btn-primary btn-sm" onClick={() => sellProduct(product._id)}>
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
