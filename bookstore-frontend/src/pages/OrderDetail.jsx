import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import Button from "../components/Button";
import Footer from "../components/Footer";

import api from '../util/api';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";

function OrderDetail() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch the order and order items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await api.get(`/orders/order/${orderId}`);
        setOrder(orderResponse.data);
        const orderItemsResponse = await api.get(`/orders/details/${orderId}`);
        setOrderItems(orderItemsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [orderId]);

  function handleOrdersPageClick() {
    navigate('/orders');            // Navigate to the Orders page
  }

  // Calculate the total order value
  const total = orderItems ? orderItems.reduce((acc, orderItem) => {
    return acc + orderItem.quantity * orderItem.price;
  }, 0) : 0;

  return (
    <div className="div_insert_update">
    
      <h1> Bookstore - Order Details </h1>
      <br />
      {user && orderItems && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, that order has {orderItems.length} item(s)!
        </h2>
      )}
      <br />
      <p> Order ID: {orderId} / Date: {order && order.order_date && new Date(order.order_date).toISOString().split('T')[0]} </p>
      <p> Customer/User: {order && order.user_id} - {order && order.fullname} </p>
      
      <p> Total Order Value: {total.toFixed(2)} </p>
      
      {orderItems && (
        <table className="table_1">
          <thead>
            <tr>
              {/* <th className="table_th_1">Item     </th> */}
              <th className="table_th_1">Book ID      </th>
              <th className="table_th_1">Book Title   </th>
              <th className="table_th_1">Quantity     </th>
              <th className="table_th_1">Book Price   </th>
              <th className="table_th_1">Book Total   </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((orderitems) => (
              <tr key={orderitems.id}>
                {/* <td className="table_td_1">{orderitems.id}                                  </td> */}
                <td className="table_td_1">{orderitems.book_id}                                 </td>
                <td className="table_td_1">{orderitems.title}                                   </td>
                <td className="table_td_1">{orderitems.quantity}                                </td>
                <td className="table_td_1">{(orderitems.price).toFixed(2)}                      </td>
                <td className="table_td_1">{(orderitems.quantity * orderitems.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

<div className="div_row_buttons2">
        <>
          <Button onClick={handleOrdersPageClick} label="Back to Orders" />
        </>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default OrderDetail;