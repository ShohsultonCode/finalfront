import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const FeaturedProducts = () => {
    const products = [
        {
            id: 1,
            image: 'images/cloth_1.jpg',
            name: 'Tank Top',
            description: 'Finding perfect t-shirt',
            price: 50,
        },
        {
            id: 2,
            image: 'images/shoe_1.jpg',
            name: 'Corater',
            description: 'Finding perfect products',
            price: 50,
        },
        {
            id: 3,
            image: 'images/cloth_2.jpg',
            name: 'Polo Shirt',
            description: 'Finding perfect products',
            price: 50,
        },
        {
            id: 4,
            image: 'images/cloth_3.jpg',
            name: 'T-Shirt Mockup',
            description: 'Finding perfect products',
            price: 50,
        },
        {
            id: 5,
            image: 'images/shoe_1.jpg',
            name: 'Corater',
            description: 'Finding perfect products',
            price: 50,
        },
    ];

    return (
        <div className="site-section block-3 site-blocks-2 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 site-section-heading text-center pt-4">
                        <h2>Featured Products</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel className="nonloop-block-3 owl-carousel" items={4} margin={10} loop nav>
                            {products.map((product) => (
                                <div className="item" key={product.id}>
                                    <div className="block-4 text-center">
                                        <figure className="block-4-image">
                                            <img src={product.image} alt="Image placeholder" className="img-fluid" />
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3>
                                                <a href="#">{product.name}</a>
                                            </h3>
                                            <p className="mb-0">{product.description}</p>
                                            <p className="text-primary font-weight-bold">${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
