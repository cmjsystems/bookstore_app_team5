import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartProvider";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

import api from '../util/api';

import "./../App.css";

function UpdBookPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { clearCart } = useContext(CartContext);

  console.log('UpdBookPage: id =', id);

  // const { setBook } = useContext(AuthContext);

  const [title    , setTitle]     = useState('');
  const [author   , setAuthor]    = useState('');
  const [isbn     , setISBN]      = useState('');
  const [category , setCategory]  = useState('');
  const [quantity , setQuantity]  = useState('');
  const [price    , setPrice]     = useState('');

  const [error, setError] = useState('');

  // Load the book data to be updated from the database into the form
  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await api.get(`/books/book/${id}`);
        const { book } = response.data;
   
        setTitle(book.title);
        setAuthor(book.author);
        setISBN(book.isbn);
        setCategory(book.category);
        setQuantity(book.quantity);
        setPrice(book.price);
  
      } catch (error) {
        setError('Error fetching book data.');
      }
    }

    loadBook();
  }, [id]);

  // Update the book data in the database
  const handleUpdIdBook = async () => {
    if (!title || !author || !isbn || !category || !quantity || !price) {
      setError('All fields are required.');
      return;
    }
    
    try {
      const bookData = {
        title: title,
        author: author,
        isbn: isbn,
        category: category,
        quantity: quantity,
        price: price
      };
      const response = await api.put(`/book/${id}`, bookData);
      console.log(response)

      if (response.status === 200) {
        navigate('/booklist');      // Navigate to the Booklist page
      }
    } catch (error) {
      setError('Error updating the book.');
    }
  };
 
  function handleHomePageClick() {
    clearCart();
    navigate('/');            // Navigate to the Home page
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
            Hi {user.fullname} <i>(type: {user.type})</i>. Update Book!
          </h2>
        )}
      </p>
      <br />
      <br />

      <p>Book ID....: ({id})</p>
      <br />

      <form className="form_3" onSubmit={handleUpdIdBook} >
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

        {/* <div className="div_row_buttons" /> */}

        <p className="p_error"> {error} </p>
        <div className="div_row_buttons2">
          <Button onClick={handleUpdIdBook} label="Upd Book" />
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

export default UpdBookPage; 