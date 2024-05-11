import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

import api from '../util/api';

function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, password };
      const response = await api.post('/login', payload);
      const { user } = response.data;

      if (!username || !password) {
        console.error('All fields are required.');
        return;
      }

      if (user) {
        setUser(user);
        navigate('/main');
      }
      setError('Error returning user data');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleRegisterClick = async (e) => {
    navigate('/register');      // Navigate to the Register/Login page
  }

  function handleHomePageClick() {
    navigate('/');              // Navigate to the Home page
  }

  // function handleBookshopPageClick() {
  //   navigate('/bookshop'); // Navigate to the Bookshop page
  // }

  return (

    <div className="div_insert_update">

      <h1>
        <Header />  {/* Header of the page */}
      </h1>

      <hr />

      <p className='p_center'>
        Please login to access the bookstore. <br />
        If you don't have an account, please register.
      </p>

      <br />

      <form className="form_3" onSubmit={handleLogin} >
        <div>
          <Input
            id="username"
            label="Username:"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <div className="div_row_buttons" />

          <Input
            id="password"
            label="Password:"
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="div_row_buttons" />   {/* Empty row for spacing */}

        <div className="div_row_buttons2">
          <Button onClick={handleLogin} label="Login" />
          <Button onClick={handleRegisterClick} label="Register" />
          {/* <Button onClick={handleBookshopPageClick} label="Bookshop" /> */}
          <Button onClick={handleHomePageClick} label="Home Page" />
        </div>
      </form>

      <hr />
      {error && (           // Show the error message if exists
        <div>
          <p className="p_error"> {error} </p>
          <hr />
        </div>
      )}

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );

};

export default LoginPage;