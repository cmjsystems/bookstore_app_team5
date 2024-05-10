import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./../App.css";

import api from '../util/api';

import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Button from "../components/Button";
import Footer from "../components/Footer";

function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);  // List of Orders
  const [ordersApi, setOrdersApi] = useState([]);
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const isUserAdmin = user && user.type === 'admin';
  // const isUserUser = user && user.type === 'user';

  useEffect(() => {
    if (!user) {
      navigate('/booklist');
    }
  }, [user, navigate]);

  // Fetch the list of orders from the API
  const fetchOrders = async () => {
    try {
      let response;
      if (isUserAdmin) {
        response = await api.get('/orders'); // Fetch all orders for admin users
      } else if (user) {
        response = await api.get(`/orders/order/user/${user.id}`); // Fetch orders for non-admin users based on their user ID
      } else {
        // Handle the case when there's no user (optional)
        console.error('No user found.');
        return;
      }
      setOrdersApi(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching order list:', error);
    }
  };

  // Fetch the list of orders from the API by user ID
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let response;
        if (isUserAdmin) {
          response = await api.get('/orders'); // Fetch all orders for admin users
        } else if (user) {
          response = await api.get(`/orders/order/user/${user.id}`); // Fetch orders for non-admin users based on their user ID
        } else {
          // Handle the case when there's no user (optional)
          console.error('No user found.');
          return;
        }
        setOrdersApi(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };
    if (user){
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [isUserAdmin, user]);

  // Find the order by ID
  async function handleOrderByIdClick() {
    const order_id = prompt('Enter the order ID:');

    if (order_id === null) {
      setOrders(ordersApi);
      return;
    };

    if (order_id) {
      const filteredOrders = ordersApi.filter(order => order.id === parseInt(order_id));
      setOrders(filteredOrders);
    } else {
      setOrders(ordersApi);
    }
  }

  // Find the orders by Customer/User Name
  async function handleOrderByUserNameClick() {
    const orders_username = prompt('Enter the User/Customer name:');

    if (orders_username === null) {
      setOrders(ordersApi);
      return;
    };

    if (orders_username) {
      // const filteredOrders = ordersApi.filter(order => order.fullname === orders_username);
      // const filteredOrders = ordersApi.filter(order => order.fullname.includes(orders_username));
      const filteredOrders = ordersApi.filter(order => order.fullname.toLowerCase().includes(orders_username.toLowerCase()));
      setOrders(filteredOrders);
    } else {
      setOrders(ordersApi);
    }
  }

  function handleBooklistPageClick() {
    navigate('/booklist');          // Navigate to the Booklist page
  }

  function handleMainPageClick() {
    navigate('/main');              // Navigate to the Orders page
  }

  function handleHomePageClick() {
    clearCart();
    navigate('/');                  // Navigate to the Home page
  }

  function handleClearFilterClick() {
    fetchOrders();                  // Clear the filter
  }

  const handleDelOrderClick = async (id) => {
    try {
      const response = await api.delete(`/order/${id}`);
      if (response.status !== 200) {
        console.error('Error deleting order:', response.data);
      }
      fetchOrders();               // Refresh the list of orders after deleting one
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  const handleDetailOrderClick = (orderId) => {
    navigate(`/orderdetail/${orderId}`); // Navigate to the Order Detail page
  }

  return (
    <div className="div_insert_update">

      <h1>Bookstore - Orders</h1>
      <br />
      <br />

      {user && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, what would you like to do?
        </h2>
      )}
      <br />

      <div>
        <div className="div_row_buttons3">
          <>
            <Button onClick={handleOrderByIdClick} label="Filter order by ID" />
            <Button onClick={handleOrderByUserNameClick} label="Filter orders by User/Customer Name" />
          </>
        </div>

        <div className="div_row_buttons3">
          <>
            <Button onClick={handleBooklistPageClick} label="Book list" />
            <Button onClick={handleMainPageClick} label="Main" />
            <Button onClick={handleHomePageClick} label="Logout" />
          </>
        </div>
      </div>

      <p>
        <Button onClick={handleClearFilterClick} label="Clear Filter" />
        &ensp;
        &ensp;
        List of orders: ({orders.length})
      </p>
      <>
        <table className="table_1">
          <thead>
            <tr>
              {/* Show the buttons grupo bellow just if the logged user is administrator type */}
              {isUserAdmin && (
                <th className="table_th_1">                 </th>
              )}

              <th className="table_th_1">                 </th>
              <th className="table_th_1"> Id                </th>
              <th className="table_th_1"> Order Date        </th>
              <th className="table_th_1"> User/Customer Id  </th>
              <th className="table_th_1"> User/Customer Name</th>
              <th className="table_th_1"> Total             </th>
            </tr>
            </thead>
          <tbody>
            {orders.map((order) => (
              order && (
                <tr key={order.id}>
                  {/* Show the buttons grupo bellow just if the logged user is administrator type */}
                  {isUserAdmin && (
                  <td> <button onClick={() => handleDelOrderClick(order.id)}>Delete</button>      </td>
                  )}

                  <td> <button onClick={() => handleDetailOrderClick(order.id)}>Detail</button> </td>
                  <td className="table_td_1"> {order.id}                  </td>
                  <td className="table_td_1"> {order.order_date}          </td>
                  <td className="table_td_1"> {order.user_id}             </td>
                  <td className="table_td_1"> {order.fullname}            </td>
                  <td className="table_td_1"> {(order.total).toFixed(2)}  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </>
      {/* )} */}

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default OrdersPage;