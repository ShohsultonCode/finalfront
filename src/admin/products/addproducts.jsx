import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_name: "",
        product_description: "",
        product_price: "",
        product_count: "",
        product_category: "",
        product_image: null,
    });
    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        fetchProductCategories();
    }, []);

    const fetchProductCategories = async () => {
        try {
            const response = await axios.get(
                "https://shohsulton.uz/api/categories",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProductCategories(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "product_image") {
            setFormData({ ...formData, product_image: e.target.files[0] });
        } else if (
            e.target.name === "product_price" ||
            e.target.name === "product_count"
        ) {
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("product_name", formData.product_name);
            formDataToSend.append("product_description", formData.product_description);
            formDataToSend.append("product_price", formData.product_price.toString());
            formDataToSend.append("product_count", formData.product_count.toString());
            formDataToSend.append("product_category", formData.product_category);
            formDataToSend.append("product_image", formData.product_image);

            const response = await axios.post(
                "https://shohsulton.uz/api/addproducts",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Successfully updated product");
            navigate("/products");
            // Handle success or redirect to another page
        } catch (error) {
            toast.error(error.response.data.message);
            // Handle error
        }
    };

    return (
        <>
            <h1 className="text-center mt-5">Add Product</h1>
            <ToastContainer />
            <div
                className="container mt-5"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product_name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            className="form-control"
                            id="product_description"
                            name="product_description"
                            value={formData.product_description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_price" className="form-label">
                            Price:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="product_price"
                            name="product_price"
                            value={formData.product_price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_count" className="form-label">
                            Count:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="product_count"
                            min={1}
                            name="product_count"
                            value={formData.product_count}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_category" className="form-label">
                            Category:
                        </label>
                        <select
                            className="form-control"
                            id="product_category"
                            name="product_category"
                            value={formData.product_category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {productCategories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_image" className="form-label">
                            Image:
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="product_image"
                            name="product_image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
