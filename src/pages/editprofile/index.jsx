import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './style.css';

const UpdatePage = () => {
    const [formData, setFormData] = useState({
        user_first_name: "",
        user_last_name: "",
        user_username: "",
        user_location: "",
        user_description: "",
        user_password: "",
        user_image: null  // Add user_image field to the initial state
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, user_image: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new object to store the updated form data
        const updatedData = {};

        // Check each field and update the value if it is filled
        for (const field in formData) {
            if (formData[field] !== "") {
                updatedData[field] = formData[field];
            }
        }

        // Check if any field is filled
        if (Object.keys(updatedData).length === 0) {
            toast.error("Please fill in at least one field", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        // Create a FormData object to send the data as multipart/form-data
        const updatedFormData = new FormData();

        // Append the updated data fields to the FormData object
        for (const field in updatedData) {
            updatedFormData.append(field, updatedData[field]);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "http://localhost:5000/api/auth/update",
                updatedFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
                    },
                }
            );

            toast.success(`${response.data.message}`, {
                position: toast.POSITION.TOP_RIGHT,
            });

            setTimeout(() => {
                window.location.href = "/profile";
            }, 1000);
        } catch (error) {
            if (error.response.data.statusCode === 400) {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return;
            }
        }
    };

    return (
        <section className="vh-100 gradient-custom h-100">
            <div className="container">
                <div className="row justify-content-center align-items-center h-00">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{ color: "black" }}>Update Profile</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="firstName" name="user_first_name" className="form-control form-control-lg" value={formData.user_first_name} onChange={handleInputChange} />
                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="lastName" name="user_last_name" className="form-control form-control-lg" value={formData.user_last_name} onChange={handleInputChange} />
                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="username" name="user_username" className="form-control form-control-lg" value={formData.user_username} onChange={handleInputChange} />
                                        <label className="form-label" htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="location" name="user_location" className="form-control form-control-lg" value={formData.user_location} onChange={handleInputChange} />
                                        <label className="form-label" htmlFor="location">Location</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <textarea id="description" name="user_description" className="form-control form-control-lg" rows="4" value={formData.user_description} onChange={handleInputChange}></textarea>
                                        <label className="form-label" htmlFor="description">Description</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="password" name="user_password" className="form-control form-control-lg" value={formData.user_password} onChange={handleInputChange} />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="file" id="image" name="user_image" className="form-control form-control-lg" onChange={handleImageChange} />
                                        <label className="form-label" htmlFor="image">Profile Image</label>
                                    </div>
                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Update" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default UpdatePage;
