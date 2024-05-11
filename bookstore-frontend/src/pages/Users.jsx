import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Button from "../components/Button";
import Footer from "../components/Footer";

function UsersPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);  // List of users
  const [userListApi, setUserListApi] = useState([]);
  const { clearCart } = useContext(CartContext);

  const fetchUserList = async () => {
    try {
      const response = await api.get('/users');
      const { users } = response.data;
      setUserListApi(users);            // Set UserListApi to the users array
      setUserList(users);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  function handleMainPageClick() {
    navigate('/main');                    // Navigate to the Orders page
  }

  // Find the user by Full Name
  async function handleUserByFullNameClick() {
    const fullname = prompt('Enter the full name:');

    if (fullname === null) {
      setUserList(userListApi);
      return;
    };

    if (fullname) {
      // const filteredUsers = userListApi.filter(user => user.fullname === fullname);
      // const filteredUsers = userListApi.filter(user => user.fullname.includes(fullname));
       const filteredUsers = userListApi.filter(user => user.fullname.toLowerCase().includes(fullname.toLowerCase()));
       setUserList(filteredUsers);
    } else {
      setUserList(userListApi);
    }
  }

  // Find the user by User Name
  async function handleUserByUserNameClick() {
    const username = prompt('Enter the user name:');

    if (username === null) {
      setUserList(userListApi);
      return;
    };

    if (username) {
      // const filteredUsers = userListApi.filter(user => user.username === username);
      // const filteredUsers = userListApi.filter(user => user.username.includes(username));
       const filteredUsers = userListApi.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
       setUserList(filteredUsers);
    } else {
      setUserList(userListApi);
    }
  }

    // Find the user by Type
    async function handleUserByTypeClick() {
      const usertype = prompt('Enter the user type:');
  
      if (usertype === null) {
        setUserList(userListApi);
        return;
      };
  
      if (usertype) {
        // const filteredUsers = userListApi.filter(user => user.type === usertype);
        // const filteredUsers = userListApi.filter(user => user.type.includes(usertype));
         const filteredUsers = userListApi.filter(user => user.type.toLowerCase().includes(usertype.toLowerCase()));
         setUserList(filteredUsers);
      } else {
        setUserList(userListApi);
      }
    }
  
  function handleClearFilterClick() {
    fetchUserList();                      // Clear the filter
  }
  
  function handleHomePageClick() {
    clearCart();
    navigate('/');                        // Navigate to the Home page
  }

  return (
    <div className="div_insert_update">

      <h1>Bookstore - User List</h1>

      <br />
      <br />

      {user && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, what would you like to do?
        </h2>
      )}
      <br />

      <div className="div_row_buttons3">
        <>
          <Button onClick={handleUserByFullNameClick} label="Filter by full name" />
          <Button onClick={handleUserByUserNameClick} label="Filter by user name" />
          <Button onClick={handleUserByTypeClick} label="Filter by user type" />
        </>
      </div>

      <div className="div_row_buttons3">
        <>
          <Button onClick={handleMainPageClick} label="Main" />
          <Button onClick={handleHomePageClick} label="Logout" />
        </>
      </div>

      <p>
        <Button onClick={handleClearFilterClick} label="Clear Filter" />
        &ensp;
        &ensp;
        &ensp;
        
        List of available users: ({userList.length})
      </p>

      <table className="table_1">
        <thead>
          <tr>
            <th className="table_th_1">ID           </th>
            <th className="table_th_1">Full Name    </th>
            <th className="table_th_1">User Name    </th>
            <th className="table_th_1">Type         </th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.map(user => (
            <tr key={user.id}>
              <td className="table_td_1">{user.id}       </td>
              <td className="table_td_1">{user.fullname} </td>
              <td className="table_td_1">{user.username} </td>
              <td className="table_td_1">{user.type}     </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default UsersPage;
