import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './register.css';

const RegisterPage = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        user_first_name: '',
        user_last_name: '',
        user_username: '',
        user_password: '',
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://shohsulton.uz/api/categories");
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Handle category selection separately
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all inputs are filled
        if (
            formData.user_first_name.trim() === '' ||
            formData.user_last_name.trim() === '' ||
            formData.user_username.trim() === '' ||
            formData.user_password.trim() === ''
        ) {
            // Display toast notification for form validation
            toast.error('Please fill in all fields', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }


        // Send form data to the backend
        try {
            const response = await axios.post("https://shohsulton.uz/api/auth/register", formData);
            // Handle the response as needed
            localStorage.setItem("token", response.data.token)
            toast.success(`${response.data.message}`, {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(() => {
                if (response.data.role === "admin") {
                    window.location.href = '/admin/dashboard'
                } else if (response.data.role === "user") {
                    window.location.href = '/'
                }
            }, 2000);

        } catch (error) {
            if (error.response.data.statusCode === 400) {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
        }
    };


    return (
        <section className="vh-100 gradient-custom all">
            <div className="container">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{ color: "black" }}>Registration</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="firstName" name="user_first_name" className="form-control form-control-lg" value={formData.user_first_name} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="firstName">First Name</label>

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="lastName" name="user_last_name" className="form-control form-control-lg" value={formData.user_last_name} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <input type="text" id="username" name="user_username" className="form-control form-control-lg" value={formData.user_username} onChange={handleInputChange} />
                                                <label htmlFor="username" className="form-label">Username</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="password" id="password" name="user_password" className="form-control form-control-lg" value={formData.user_password} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-2">
                                        {formError && <p className="text-danger">{formError}</p>}
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default RegisterPage;
