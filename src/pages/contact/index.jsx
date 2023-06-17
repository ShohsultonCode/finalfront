import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        user_first_name: '',
        user_last_name: '',
        user_email: '',
        user_subject: '',
        user_message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.user_first_name === '' ||
            formData.user_last_name === '' ||
            formData.user_email === '' ||
            formData.user_subject === '' ||
            formData.user_message === ''
        ) {
            // Display toast notification
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('https://shohsulton.uz/api/contact', formData);
            console.log(response.data);
            toast.success(`${response.data.message}`);

            // Handle success or show a success message
        } catch (error) {
            toast.error(`${error.response.data.message}`);
        }
    };

    return (
        <div className="site-section">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="h3 mb-3 text-black">Get In Touch</h2>
                    </div>
                    <div className="col-md-7">
                        <form onSubmit={handleSubmit}>
                            <div className="p-3 p-lg-5 border">
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="user_first_name" className="text-black">
                                            First Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="user_first_name"
                                            name="user_first_name"
                                            value={formData.user_first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="user_last_name" className="text-black">
                                            Last Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="user_last_name"
                                            name="user_last_name"
                                            value={formData.user_last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="user_email" className="text-black">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="user_email"
                                            name="user_email"
                                            placeholder=""
                                            value={formData.user_email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="user_subject" className="text-black">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="user_subject"
                                            name="user_subject"
                                            value={formData.user_subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="user_message" className="text-black">
                                            Message
                                        </label>
                                        <textarea
                                            name="user_message"
                                            id="user_message"
                                            cols="30"
                                            rows="7"
                                            className="form-control"
                                            value={formData.user_message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <input
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-block"
                                            value="Send Message"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5 ml-auto">
                        <div className="p-4 border mb-3">
                            <span className="d-block text-primary h6 text-uppercase">New York</span>
                            <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                        </div>
                        <div className="p-4 border mb-3">
                            <span className="d-block text-primary h6 text-uppercase">London</span>
                            <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                        </div>
                        <div className="p-4 border mb-3">
                            <span className="d-block text-primary h6 text-uppercase">Canada</span>
                            <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ContactPage;
