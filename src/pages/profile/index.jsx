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
            const response = await axios.get('https://shohsulton.uz/api/user', {
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


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

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
                                        src={`https://shohsulton.uz/api/images/${user.user_image}`}
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
                                        <p className="mb-1 h5">{statis.ownproduct.length}</p>
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
                                <Slider {...settings}>
                                    {statis.ownproduct.map((product) => (
                                        <div key={product.id}>
                                            <div className="item" key={product.sell_product._id}>
                                                <div className="block-4 text-center">
                                                    <figure className="block-4-image">
                                                        <img
                                                            src={`https://shohsulton.uz/api/images/${product.sell_product.product_image}`}
                                                            alt="Product Image"
                                                            className="block-4-img"
                                                        />
                                                    </figure>
                                                    <div className="block-4-text p-4">
                                                        <h3>
                                                            <a href="#">{product.sell_product.product_name}</a>
                                                        </h3>
                                                        <p className="mb-0">{product.sell_product.product_description}</p>
                                                        <p className="text-primary font-weight-bold">${product.sell_product.product_price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
