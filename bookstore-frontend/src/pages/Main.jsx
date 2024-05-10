import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./../App.css";

import { AuthContext } from "../contexts/AuthProvider";
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { CartContext } from "../contexts/CartProvider";

function MainPage() {
  // const loggedUser = { id: 1, username: 'admin', type: 'admin' };
  // const isUserAdmin = loggedUser && loggedUser.type === 'admin';
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isUserAdmin = user && user.type === 'admin';
  // const isUserUser = user && user.type === 'user';
  const { clearCart } = useContext(CartContext);

//   const inventory = useContext(InventoryContext);
//   const [showBooks, setShowBooks] = useState(inventory.books.length > 0);

//   useEffect(() => {
//     setShowBooks(inventory.books.length > 0);
//   }, [inventory.books.length]);

  function handleBooklistPageClick() {
    navigate('/booklist');       // Navigate to the Booklist page
  }

  function handleOrdersPageClick() {
    navigate('/orders');        // Navigate to the Orders page
  }

  function handleUsersPageClick() {
    navigate('/users');         // Navigate to the Users page
  }

  function handleHomePageClick() {
    clearCart();
    navigate('/');              // Navigate to the Home page
  }

  return (
    <div className="div_insert_update">

      <h1>
        <Header /> {/* Header of the page */}
      </h1>

      <br />
      <br />

      {user && (
        <h2>
          Hi {user.fullname} <i>(type: {user.type})</i>, what would you like to do? <br />
        </h2>
      )}

      <div>
         <div className="div_row_buttons2">
            <Button onClick={handleBooklistPageClick} label="Book list" />
            <Button onClick={handleOrdersPageClick} label="Orders" />

            {/* Show the Users button just if the logged user is admininistrator type */}
            {isUserAdmin && (
              <Button onClick={handleUsersPageClick} label="Users" />
            )}
          </div>

          <div className="div_row_buttons2">
            <Button onClick={handleHomePageClick} label="Logout" />
          </div>
      </div>

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>

    </div>
  );
}

export default MainPage;