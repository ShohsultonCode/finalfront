import React, { useEffect, useState } from "react";
import Users from '../users'
import axios from "axios";
import "./index.css";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://shohsulton.uz/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data.data);
        } catch (error) {
        }

    };

    return (
        <div>
            <div className="dashboard-containers">
                <h1>Welcome to the Dashboard</h1>
                <div className="containers gap-5 mt-5">
                    <div className="cart">
                        <h1 className="text-lights">Users: {data && data.alluser}</h1>
                    </div>
                    <div className="cart">
                        <h1 className="text-lights">Products: {data && data.allProducts}</h1>
                    </div>
                    <div className="cart">
                        <h1 className="text-lights">Sells: {data && data.allsells}</h1>
                    </div>
                    <div className="cart">
                        <h1 className="text-lights">Benefit: ${data && data.allbenefits}</h1>
                    </div>
                </div>
            </div>
            <Users />
        </div>
    );
};

export default Dashboard;
