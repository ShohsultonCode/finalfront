import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from 'react-router-dom';
import './style.scss'
import axios from 'axios';

const categorisAuth = () => {
    const token = localStorage.getItem('token');

    const [categories, setCategories] = useState([]);
    const [authcategories, setAuthCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchAuthCategories();
        } else {
            fetchCategories();
        }
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data.data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const fetchAuthCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/owncategories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuthCategories(response.data.data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleClick = async (categoryId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/updateowncategories/${categoryId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Updated successful', {
                position: toast.POSITION.TOP_RIGHT,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            // Perform any additional logic or updates after successful API call
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <>
            <ToastContainer /> {/* Add ToastContainer component here */}
            {isLoading ? (
                <div className="loader-animation">Loading...</div>
            ) : token ? (
                <div className="site-section site-blocks-2">
                    <div className="container">
                        <div className="row">
                            {authcategories.map((category) => (
                                <div
                                    className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
                                    data-aos="fade"
                                    data-aos-delay=""
                                    key={category.id}
                                >
                                    <Link className="block-2-item" to="#">
                                        <figure className="image">
                                            <img
                                                src={`http://localhost:5000/api/images/${category.category.category_image}`}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </figure>
                                        <div className="text">
                                            <span className="text-uppercase">Collections</span>
                                            <h3>{category.category.category_name}</h3>
                                        </div>
                                    </Link>
                                    <div className="status-toggle mt-5">
                                        <button
                                            className={`btn ${category.category_status ? 'btn-primary' : 'btn-danger'
                                                }`}
                                            onClick={() => handleClick(category.category._id)}
                                        >
                                            {category.category_status ? 'On' : 'Off'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="site-section site-blocks-2">
                    <div className="container">
                        <div className="row">
                            {categories.map((category) => (
                                <div
                                    className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
                                    data-aos="fade"
                                    data-aos-delay=""
                                    key={category.id}
                                >
                                    <Link className="block-2-item" to="#">
                                        <figure className="image">
                                            <img
                                                src={`http://localhost:5000/api/images/${category.category_image}`}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </figure>
                                        <div className="text">
                                            <span className="text-uppercase">Collections</span>
                                            <h3>{category.category_name}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default categorisAuth;
