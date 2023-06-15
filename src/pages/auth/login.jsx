import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_username: '',
        user_password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("https://shohsulton.uz/api/auth/login", formData);
            // Handle the response as needed
            localStorage.setItem("token", response.data.token);
            toast.success(`Login successful`, {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(() => {
                if (response.data.role === "admin") {
                    navigate("/admin/dashboard");
                } else if (response.data.role === "user") {
                    navigate("/");
                }
            }, 3000);
        } catch (error) {
            toast.error(`${error.response.data.message}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <section className="vh-100 gradient-custom all">
            <div className="container">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{ color: "black" }}>Login</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="username" name="user_username" className="form-control form-control-lg" value={formData.username} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="username">Username</label>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <div className="form-outline">
                                                <input type="password" id="password" name="user_password" className="form-control form-control-lg" value={formData.password} onChange={handleInputChange} />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Login" />
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

export default LoginPage;
