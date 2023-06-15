import React, { useEffect, useState } from 'react';
import womenImage from '../../../images/women.jpg';
import childrenImage from '../../../images/children.jpg';
import menImage from '../../../images/men.jpg';
import bgImage from '../../../images/ee.jpg'
import FeaturedProducts from '../recentproducts/index'
import BigSale from '../sale';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const CollectionsSection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://shohsulton.uz/api/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    return (
        <>
            <div className="site-blocks-cover" style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat" }} data-aos="fade">
                <div className="container">
                    <div className="row align-items-start align-items-md-center justify-content-end">
                        <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
                            <h1 className="mb-2" style={{ color: "white" }}>Finding Your Perfect things</h1>
                            <div className="intro-text text-center text-md-left">
                                <p className="mb-4" style={{ color: "white" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. </p>
                                <p>
                                    <Link to="#" className="btn btn-sm btn-primary">Shop Now</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section site-section-sm site-blocks-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-truck"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Free Shipping</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-refresh2"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Free Returns</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-help"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Customer Support</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                        <img src={`https://shohsulton.uz/api/images/${category.category_image}`} alt="" className="img-fluid" />
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

            <FeaturedProducts />
            <BigSale />
        </>
    );
};

export default CollectionsSection;
