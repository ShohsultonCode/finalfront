import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateProduct = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams('id');
    const navigate = useNavigate()
    const productId = id
    const [formData, setFormData] = useState({
        product_name: "",
        product_description: "",
        product_price: "",
        product_count: "",
        product_image: null,
    });


    const handleChange = (e) => {
        if (e.target.name === "product_image") {
            setFormData({ ...formData, product_image: e.target.files[0] });
        } else if (e.target.name === "product_price" || e.target.name === "product_count") {
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
            formDataToSend.append("product_image", formData.product_image);

            const response = await axios.put(
                `http://localhost:5000/api/product/${productId}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Successfully updated product");
            navigate('/products')
            // Handle success or redirect to another page

        } catch (error) {
            toast.error("Failed to update product");
            // Handle error
        }
    };


    return (
        <>
            <h1 className="text-center mt-5">Update Product</h1>
            <ToastContainer />
            <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product_name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="product_name" name="product_name" value={formData.product_name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_description" className="form-label">Description:</label>
                        <textarea className="form-control" id="product_description" name="product_description" value={formData.product_description} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_price" className="form-label">Price:</label>
                        <input type="number" className="form-control" id="product_price" name="product_price" value={formData.product_price} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_count" className="form-label">Count:</label>
                        <input type="number" className="form-control" id="product_count" name="product_count" value={formData.product_count} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_image" className="form-label">Image:</label>
                        <input type="file" className="form-control" id="product_image" name="product_image" onChange={handleChange} accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </>


    );
};

export default UpdateProduct;
