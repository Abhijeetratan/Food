import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            try {
                const response = await fetch("/api/auth/myOrderData", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userEmail
                    })
                });
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData && orderData.orderData.map(order => (
                        <div key={order._id}>
                            {order.order_data && order.order_data.map(([orderItem, orderDate]) => (
                                <div key={orderDate}>
                                    <div className='m-auto mt-5'>
                                        {orderDate && <div>{orderDate}</div>}
                                        <hr />
                                    </div>
                                    {orderItem && orderItem.map(item => (
                                        <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <span className='m-1'>{orderDate}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
