import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            if (token) {
                setLoading(true); // Set loading to true before fetching data
                const response = await axios.get(`https://shohsulton.uz/api/productspagination/${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data.products);
                setTotalPages(response.data.totalPages);
                setLoading(false); // Set loading to false after data is fetched
            }
        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUpdate = (productId) => {
        // Logic to open the form for the product and handle the update operation
        console.log("Update product with ID:", productId);
    };

    const handleDelete = async (productId) => {
        // Logic to handle the delete operation
        try {
            if (token) {
                await axios.delete(`https://shohsulton.uz/api/product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.success('Success to remove porudct');
                fetchData(); // Fetch data again to reflect the updated list
            }
        } catch (error) {
            toast.error('Failed to remove porudct');
        }
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`pagination-btn ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return <div className="pagination-container">{pageNumbers}</div>;
    };

    return (
        <div>
            <ToastContainer />
            <div className="container d-flex justify-content-between">
                <h1>All Products</h1>
                <Link to="/add/product" className="btn btn-outline-primary">+</Link>
            </div>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <table className="table table-striped mt-5 mk">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Count</th>
                            <th scope="col">Image</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.reverse().map((product, index) => (
                                <tr key={product._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.product_name}</td>
                                    <td>${product.product_price}</td>
                                    <td>{product.product_count}</td>
                                    <td>
                                        <img className="userimage" src={`https://shohsulton.uz/api/images/${product.product_image}`} alt="product" />
                                    </td>
                                    <td>
                                        <Link to={`/product/${product._id}`} className="icon-button" onClick={() => handleUpdate(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                            </svg>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link className="icon-button" onClick={() => handleDelete(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
            {renderPagination()}
        </div>
    );
};

export default Products;

