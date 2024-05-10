import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import HomePage from './pages/Home';
import HomePage from './pages/Bookshop';
import BookshopPage from './pages/Bookshop';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RegisterAdmPage from './pages/RegisterAdm';
import UsersPage from './pages/Users';
import MainPage from './pages/Main';
import BooklistPage from './pages/Booklist';
import OrdersPage from './pages/Orders';
import OrderDetailPage from './pages/OrderDetail';
import AddBookPage from './pages/AddBook';
import UpdBookPage from './pages/UpdBook';
import CartPage from './pages/Cart';
// import QuitPage from './pages/Quit';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<BookshopPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookshop" element={<BookshopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registeradm" element={<RegisterAdmPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/booklist" element={<BooklistPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orderdetail/:id" element={<OrderDetailPage />} />
        <Route path="/addbook" element={<AddBookPage />} />
        <Route path="/updbook/:id" element={<UpdBookPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/quit" element={<QuitPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
