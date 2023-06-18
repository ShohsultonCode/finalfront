import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";

const Index = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            if (token) {
                const url =
                    currentPage === 1
                        ? "https://shohsulton.uz/api/duserpagination"
                        : `https://shohsulton.uz/api/userpagination/${currentPage}`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.products);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log("Error fetching data:", error);
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
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Username</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.user_first_name}</td>
                                <td>{user.user_last_name}</td>
                                <td>@{user.user_username}</td>
                                <td>
                                    <img
                                        className="userimage"
                                        src={`https://shohsulton.uz/api/images/${user.user_image}`}
                                        alt="User"
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    );
};

export default Index;
