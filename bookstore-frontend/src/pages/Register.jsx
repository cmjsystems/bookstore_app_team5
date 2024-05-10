import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthProvider";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

import api from '../util/api';

import "./../App.css";

function RegisterPage() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');

  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !fullname) {
      setError('All fields are required.');
    return;
    }
    try {
      const payload = { username, password, fullname, type: 'user' };
      const response = await api.post('/register', payload);
      const { user } = response.data;

      if (user) {
        setUser(user);
        navigate('/main');
      }
        } catch (error) {
          setError('Error registering the user.', error);
        }
  };

  function handleHomePageClick() {
    navigate('/');        // Navigate to the Home page
  }

  function handleLoginPageClick() {
    navigate('/login');   // Navigate to the Login/Register page
  }

  return (
    <div className="div_insert_update">

      <h1>
        <Header /> {/* Header of the page */}
      </h1>

      <p>Add New User/Customer</p>
      <br />
      <br />

      <form className="form_3" onSubmit={handleRegister} >
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

        <div className="div_row_buttons" />

        <Input
          id="fullname"
          label="Full Name:"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />

        <div className="div_row_buttons" />

        <div className="div_row_buttons2">
          <Button onClick={handleRegister} label="Register" />
          <Button onClick={handleLoginPageClick} label="Login" />
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

export default RegisterPage; 