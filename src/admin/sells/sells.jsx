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
                const url =
                    currentPage === 1
                        ? "https://shohsulton.uz/api/dsellpagination"
                        : `https://shohsulton.uz/api/sellpagination/${currentPage}`;

                const response = await axios.get(url, {
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
                <h1>Sells</h1>
            </div>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <table className="table table-striped mt-5 mk">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Price</th>
                            <th scope="col">Product Count</th>
                            <th scope="col">Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((sell, index) => (
                                <tr key={sell._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img className="userimage" src={`https://shohsulton.uz/api/images/${sell.sell_user.user_image}`} alt="sell" />
                                    </td>
                                    <td>${sell.sell_price}</td>
                                    <td>{sell.sell_product_count}</td>
                                    <td>
                                        <img className="userimage" src={`https://shohsulton.uz/api/images/${sell.sell_product.product_image}`} alt="sell" />
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
