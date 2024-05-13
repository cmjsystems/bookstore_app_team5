import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

import api from '../util/api';

import "./../App.css";

function AddBookPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // const { setBook } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setISBN] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [error, setError] = useState('');

  const handleAddNewBook = async () => {
    if (!title || !author || !isbn || !category || !quantity || !price) {
      setError('All fields are required.');
      return;
    }
    try {
      const payload = { title, author, isbn, category, quantity, price };
      const response = await api.post('/book', payload);

      console.log(response)

      if (response.status === 201) {
        navigate('/booklist');
      }
    } catch (error) {
      setError('Error registering the book.', error);
    }
  };

  // Validate the Title field
  // if (setTitle.length < 3 || setTitle.length > 40 ) {
  //   setError("A title with a minimum of 3 and a maximum of 40 characters is mandatory.");
  //   return;
  // }

  function handleHomePageClick() {
    clearCart();
    navigate('/');        // Navigate to the Home page
  }

  function handleBooklistPageClick() {
    navigate('/booklist');   // Navigate to the Booklist page
  }

  return (
    <div className="div_insert_update">

      <h1>
        <Header /> {/* Header of the page */}
      </h1>

      <p>
        {user && (
          <h2>
            Hi {user.fullname} <i>(type: {user.type})</i>. Add New Book!
          </h2>
        )}
      </p>
      <br />
      <br />

      <form className="form_3" onSubmit={handleAddNewBook} >
        <Input
          id="title"
          label="Title:"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="div_row_buttons" />

        <Input
          id="author"
          label="Author:"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div className="div_row_buttons" />

        <Input
          id="isbn"
          label="ISBN:"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
        />

        <Input
          id="category"
          label="Category:"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Input
          id="quantity"
          label="Quantity:"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Input
          id="price"
          label="Price:"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="div_row_buttons" />

        <p className="p_error"> {error} </p>
        <div className="div_row_buttons2">
          <Button onClick={handleAddNewBook} label="Add Book" />
          <Button onClick={handleBooklistPageClick} label="Booklist" />
          <Button onClick={handleHomePageClick} label="Logout" />
        </div>
      </form>

      <hr />

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
};

export default AddBookPage; 