import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import "./../App.css";

// import { AuthContext } from "../contexts/AuthProvider";

// import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";

function BookshopPage() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);  // List of books
  const [bookListApi, setBookListApi] = useState([]);

  // Validate the password with a maximum of attempts
  function handleLogin() {
    const max_attempts = 3;
    let attempts = 0;

    while (attempts < max_attempts) {
      const password = prompt('Enter password:');

      if (password === 'team5') {
        return true;
      }
      attempts++;
    }

    alert('Too many attempts. Try again later.');

    return false;
  }

  // function handleHomePageClick() {
  //   navigate('/'); // Navigate to the Home page
  // }

  const fetchBookList = async () => {
    try {
      const response = await api.get('/books');
      const { books } = response.data;
      setBookListApi(books);            // Set bookListApi to the books array
      setBookList(books);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  function handleLoginPageClick() {
    navigate('/login'); // Navigate to the Login/Register page
  }

  function handleRegisterAdmPageClick() {
    if (handleLogin()) {
      navigate('/registeradm');  // Navigate to the Register Adm page
    }
  }

  // Find the books by title
  async function handleBooksByTitleClick() {
    const title = prompt('Enter the title:');

    if (title === null) {
      setBookList(bookListApi);
      return;
    };

    if (title) {
      // const filteredBooks = bookListApi.filter(book => book.title === title);
      // const filteredBooks = bookListApi.filter(book => book.title.includes(title));
       const filteredBooks = bookListApi.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
      setBookList(filteredBooks);
    } else {
      setBookList(bookListApi);
    }
  }

  // Find the books by author
  async function handleBooksByAuthorClick() {
    const author = prompt('Enter the author:');

    if (author === null) {
      setBookList(bookListApi);
      return;
    };

    if (author) {
      // const filteredBooks = bookListApi.filter(book => book.author === author);
      // const filteredBooks = bookListApi.filter(book => book.author.includes(author));
       const filteredBooks = bookListApi.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
      setBookList(filteredBooks);
    } else {
      setBookList(bookListApi);
    }
  }

  // Find the books by category
  async function handleBooksByCategoryClick() {
    const category = prompt('Enter the category:');

    if (category === null) {
      setBookList(bookListApi);
      return;
    };

    if (category) {
      // const filteredBooks = bookListApi.filter(book => book.category === category);
      // const filteredBooks = bookListApi.filter(book => book.category.includes(category));
      const filteredBooks = bookListApi.filter(book => book.category.toLowerCase().includes(category.toLowerCase()));
      setBookList(filteredBooks);
    } else {
      setBookList(bookListApi);
    }
  }

  // Find the books under price
  async function handleBooksByPriceClick() {
    const minPrice = parseFloat(prompt('Enter the minimum price:'));
    const maxPrice = parseFloat(prompt('Enter the maximum price:'));

    if (minPrice === null || maxPrice === null) {
      setBookList(bookListApi);
      return;
    }

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      alert('Please enter valid prices.');
      return;
    }

    const filteredBooks = bookListApi.filter(book => book.price >= parseFloat(minPrice) && book.price <= parseFloat(maxPrice));
    setBookList(filteredBooks);
  }

  function handleClearFilterClick() {
    fetchBookList();              // Clear the filter
  }

  return (
    <div className="div_insert_update">

      <h1>
        Welcome to the Team 5 Bookstore!
        <br />
        {/* <Header />  Header of the page */}
      </h1>

      <p>In our bookstore you will find several varieties of books from the most diverse categories...</p>

      <br />
      <br />

      <div className="div_row_buttons3">
        {/* <Button onClick={handleHomePageClick} label="Home Page" /> */}
        <Button onClick={handleLoginPageClick} label="Login" />
        <Button onClick={handleRegisterAdmPageClick} label="Intranet (create admin user only)" />
      </div>

      <div className="div_row_buttons3">
          <>
            <Button onClick={handleBooksByTitleClick} label="Filter all books by title" />
            <Button onClick={handleBooksByAuthorClick} label="Filter all books by author" />
            <Button onClick={handleBooksByCategoryClick} label="Filter all books by category" />
            <Button onClick={handleBooksByPriceClick} label="Filter all books by price" />
          </>
      </div>

      <br />

      {/* Show the booklist */}
      
      <p>
        <Button onClick={handleClearFilterClick} label="Clear Filter" />
        &ensp;
        &ensp;
        &ensp;
        
        List of available books: ({bookList.length})
      </p>
      <>
        <table className="table_1">
          <thead>
            <tr>
              <th className="table_th_1"> Id        </th>
              <th className="table_th_1"> Title     </th>
              <th className="table_th_1"> Author    </th>
              <th className="table_th_1"> ISBN      </th>
              <th className="table_th_1"> Category  </th>
              <th className="table_th_1"> Price     </th>
            </tr>
          </thead>
          <tbody>
            {bookList && bookList.map(book => (
              <tr key={book.id}>
                <td className="table_td_1"> {book.id}                 </td>
                <td className="table_td_1"> {book.title}              </td>
                <td className="table_td_1"> {book.author}             </td>
                <td className="table_td_1"> {book.isbn}               </td>
                <td className="table_td_1"> {book.category}           </td>
                <td className="table_td_1"> {(book.price).toFixed(2)} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      <hr />

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default BookshopPage;